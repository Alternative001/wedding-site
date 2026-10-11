/**
 * Lisa & Julian — RSVP backend (Google Apps Script, bound to a Google Sheet)
 * =========================================================================
 * The wedding website POSTs every RSVP here. This script:
 *   1. appends one row per RSVP to the "RSVPs" sheet (your overview table),
 *   2. keeps an "Overview" sheet with live totals (guests, kids, rooms, …),
 *   3. emails the guest a confirmation (German or English),
 *   4. emails you a notification for every new RSVP.
 *
 * Setup: paste this whole file into Extensions → Apps Script of your Sheet,
 * run `setup` once, then Deploy → New deployment → Web app
 * (Execute as: Me · Who has access: Anyone) and send the /exec URL to Claude.
 *
 * After editing this file later: Deploy → Manage deployments → ✏️ → Version:
 * "New version" → Deploy. (The URL stays the same.)
 */

const CONFIG = {
  SHEET_NAME: 'RSVPs',
  OVERVIEW_NAME: 'Overview',
  NOTIFY_EMAIL: 'wedding@lemon-spark.com',   // where "new RSVP" notifications go
  REPLY_TO: 'wedding@lemon-spark.com',       // guests' replies to the confirmation go here
  SENDER_NAME: 'Lisa & Julian',
  SEND_GUEST_CONFIRMATION: true,
  NOTIFY_COUPLE: true,
};

// Room ids sent by the website → one label per room (same for DE + EN guests,
// so the Overview can count them).
const ROOM_LABELS = {
  'junior-window':  'Junior Suite Spa · Large Window (€570)',
  'king-superior':  'King Superior Spa · Garden/Balcony (€620)',
  'junior-jacuzzi': 'Junior Suite Spa · Private Jacuzzi (€680)',
  'deluxe-suite':   'Deluxe Spa Suite · up to 4 (€790)',
};

const HEADERS = [
  'Timestamp', 'Language', 'Attending', 'Email', 'Arrival day',
  'Adults', 'Guest names', 'Kids', 'Kids ages (at wedding)', 'Total guests',
  'Dietary needs', 'Wants room at Forte', 'Room', 'Message', 'Decline reason',
];

/* ------------------------------------------------------------------ */
/* Web endpoints                                                       */
/* ------------------------------------------------------------------ */

function doGet() {
  return json({ ok: true, service: 'Lisa & Julian RSVP', status: 'running' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot: real guests never fill the hidden "website" field; bots do.
    if (data.website) return json({ ok: true });

    const r = normalise(data);
    getRsvpSheet().appendRow([
      new Date(), r.lang, r.yes ? 'Yes' : 'No', r.email, r.arrival,
      r.adults, r.names.join(', '), r.kids, r.kidsAges.join(', '), r.total,
      r.diet, r.wantRoom ? 'Yes' : 'No', r.room, r.message, r.noReason,
    ].map(cell));

    lock.releaseLock();

    if (CONFIG.NOTIFY_COUPLE) safe(() => notifyCouple(r));
    if (CONFIG.SEND_GUEST_CONFIRMATION) safe(() => confirmGuest(r));

    return json({ ok: true });
  } catch (err) {
    try { lock.releaseLock(); } catch (_) {}
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

/* ------------------------------------------------------------------ */
/* One-time setup — run this once from the editor                      */
/* ------------------------------------------------------------------ */

function setup() {
  const sheet = getRsvpSheet();
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS]).setFontWeight('bold')
    .setBackground('#1E47B5').setFontColor('#FFFBF2');
  sheet.setFrozenRows(1);
  sheet.setColumnWidths(1, HEADERS.length, 150);
  sheet.setColumnWidth(7, 260);   // guest names
  sheet.setColumnWidth(14, 320);  // message

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let ov = ss.getSheetByName(CONFIG.OVERVIEW_NAME);
  if (!ov) ov = ss.insertSheet(CONFIG.OVERVIEW_NAME, 0);
  ov.clear();
  const S = "'" + CONFIG.SHEET_NAME + "'!";
  const rows = [
    ['RSVP overview', ''],
    ['Responses (total)', '=COUNTA(' + S + 'A2:A)'],
    ['Attending (answers)', '=COUNTIF(' + S + 'C2:C,"Yes")'],
    ['Declined (answers)', '=COUNTIF(' + S + 'C2:C,"No")'],
    ['', ''],
    ['Total guests coming', '=SUM(' + S + 'J2:J)'],
    ['… adults', '=SUM(' + S + 'F2:F)'],
    ['… kids', '=SUM(' + S + 'H2:H)'],
    ['Guests arriving Friday', '=SUMIF(' + S + 'E2:E,"Friday",' + S + 'J2:J)'],
    ['Guests arriving Saturday', '=SUMIF(' + S + 'E2:E,"Saturday",' + S + 'J2:J)'],
    ['', ''],
    ['Room requests at the Forte', '=COUNTIF(' + S + 'L2:L,"Yes")'],
  ];
  Object.keys(ROOM_LABELS).forEach((id) => {
    rows.push(['… ' + ROOM_LABELS[id], '=COUNTIF(' + S + 'M2:M,"' + ROOM_LABELS[id] + '")']);
  });
  rows.push(['', ''], ['Answers with dietary notes', '=COUNTIF(' + S + 'K2:K,"?*")']);
  ov.getRange(1, 1, rows.length, 2).setValues(rows);
  ov.getRange('A1').setFontSize(14).setFontWeight('bold');
  ov.setColumnWidth(1, 330);
  ov.setColumnWidth(2, 90);
  ss.setActiveSheet(ov);
  return 'Setup done';
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function getRsvpSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function normalise(d) {
  const str = (v, max) => String(v == null ? '' : v).trim().slice(0, max || 500);
  const email = str(d.email, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('invalid email');
  if (d.attending !== 'yes' && d.attending !== 'no') throw new Error('invalid attending');
  const yes = d.attending === 'yes';
  const lang = d.lang === 'en' ? 'en' : 'de';

  const adults = yes ? clamp(d.adultCount, 1, 6) : 0;
  const kids = yes ? clamp(d.kidsCount, 0, 6) : 0;
  const names = yes ? (Array.isArray(d.adultNames) ? d.adultNames : []).slice(0, adults).map((n) => str(n, 120)) : [];
  const kidsAges = yes ? (Array.isArray(d.kidsAges) ? d.kidsAges : []).slice(0, kids).map((a) => str(a, 3)) : [];
  if (yes && (names.length !== adults || names.some((n) => !n))) throw new Error('missing guest names');

  const wantRoom = yes && !!d.wantRoom;
  return {
    lang, yes, email,
    arrival: yes ? ({ friday: 'Friday', saturday: 'Saturday' }[d.arrivalDay] || '') : '',
    adults, kids, names, kidsAges, total: adults + kids,
    diet: str(d.diet, 300),
    wantRoom,
    room: wantRoom ? (ROOM_LABELS[d.roomId] || str(d.roomName, 100)) : '',
    message: str(d.message, 2000),
    noReason: yes ? '' : str(d.noReason, 1000),
  };
}

function clamp(v, lo, hi) {
  const n = Math.round(Number(v));
  return isNaN(n) ? lo : Math.max(lo, Math.min(hi, n));
}

// Stop guest text being interpreted as a spreadsheet formula.
function cell(v) {
  return (typeof v === 'string' && /^[=+\-@]/.test(v)) ? "'" + v : v;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function safe(fn) {
  try { fn(); } catch (err) { console.error(err); }
}

/* ------------------------------------------------------------------ */
/* Emails                                                              */
/* ------------------------------------------------------------------ */

function confirmGuest(r) {
  if (MailApp.getRemainingDailyQuota() < 2) return;
  const de = r.lang === 'de';
  const first = (r.names[0] || '').split(' ')[0];
  const hello = 'Ciao' + (first ? ' ' + first : '') + '!';

  let subject, intro, details = '';
  if (r.yes) {
    subject = de ? 'Eure Zusage ist angekommen 💛 · Lisa & Julian' : 'Your RSVP is in 💛 · Lisa & Julian';
    intro = de
      ? 'wie schön — Eure Zusage für unsere Hochzeit am <b>24. Juli 2027</b> am Lago di Garda ist bei uns angekommen. Wir freuen uns riesig auf Euch!'
      : 'how wonderful — your RSVP for our wedding on <b>24 July 2027</b> at Lago di Garda has reached us. We can’t wait to celebrate with you!';
    const rows = [
      [de ? 'Gäste' : 'Guests', r.names.join(', ') + (r.kids ? (de ? ' + ' + r.kids + ' Kind(er)' : ' + ' + r.kids + ' kid(s)') : '')],
      [de ? 'Anreise' : 'Arrival', de ? ({ Friday: 'Freitag', Saturday: 'Samstag' }[r.arrival] || '–') : (r.arrival || '–')],
      [de ? 'Zimmer am Forte' : 'Room at the Forte', r.wantRoom ? (r.room || (de ? 'ja' : 'yes')) : (de ? 'nein' : 'no')],
      [de ? 'Essenswünsche' : 'Dietary needs', r.diet || '–'],
    ];
    details = '<table style="border-collapse:collapse;margin:16px 0;font-size:14px">' +
      rows.map(([k, v]) => '<tr><td style="padding:4px 14px 4px 0;color:#6b6b6b">' + esc(k) + '</td><td style="padding:4px 0;color:#0E2A6B"><b>' + esc(v) + '</b></td></tr>').join('') +
      '</table>';
  } else {
    subject = de ? 'Danke für Eure Antwort · Lisa & Julian' : 'Thank you for letting us know · Lisa & Julian';
    intro = de
      ? 'schade, dass Ihr nicht dabei sein könnt — danke, dass Ihr uns Bescheid gegeben habt. Wir werden Euch vermissen und stoßen am 24. Juli auf Euch an! 🥂'
      : 'such a shame you can’t make it — thank you for letting us know. We’ll miss you and raise a glass to you on 24 July! 🥂';
  }
  const outro = de
    ? 'Falls sich etwas ändert, antwortet einfach auf diese E-Mail.<br><br>Bis bald,<br><b>Lisa &amp; Julian</b>'
    : 'If anything changes, just reply to this email.<br><br>See you soon,<br><b>Lisa &amp; Julian</b>';

  const html =
    '<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:24px;background:#FFFBF2;color:#2b2b2b;line-height:1.6">' +
    '<div style="font-size:12px;letter-spacing:3px;color:#1E47B5;text-transform:uppercase">Lisa &amp; Julian · 24.07.2027</div>' +
    '<h2 style="color:#0E2A6B;font-weight:normal;margin:10px 0 6px">' + esc(hello) + '</h2>' +
    '<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px">' + intro + '</p>' +
    details +
    '<p style="font-family:Helvetica,Arial,sans-serif;font-size:15px">' + outro + '</p>' +
    '</div>';

  MailApp.sendEmail({
    to: r.email,
    subject: subject,
    htmlBody: html,
    name: CONFIG.SENDER_NAME,
    replyTo: CONFIG.REPLY_TO,
  });
}

function notifyCouple(r) {
  if (!CONFIG.NOTIFY_EMAIL || MailApp.getRemainingDailyQuota() < 2) return;
  const who = r.names.length ? r.names.join(', ') : r.email;
  const subject = 'Neue RSVP: ' + who + ' — ' + (r.yes ? 'JA (' + r.total + ')' : 'NEIN');
  const lines = [
    'Attending: ' + (r.yes ? 'YES' : 'no'),
    'Email: ' + r.email,
    'Language: ' + r.lang,
    r.yes ? 'Arrival: ' + r.arrival : '',
    r.yes ? 'Adults (' + r.adults + '): ' + r.names.join(', ') : '',
    r.yes && r.kids ? 'Kids (' + r.kids + '), ages: ' + r.kidsAges.join(', ') : '',
    r.yes ? 'Room at Forte: ' + (r.wantRoom ? (r.room || 'yes') : 'no') : '',
    r.diet ? 'Dietary: ' + r.diet : '',
    r.message ? 'Message: ' + r.message : '',
    !r.yes && r.noReason ? 'Reason: ' + r.noReason : '',
  ].filter(Boolean);
  lines.push('', 'Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
  MailApp.sendEmail({ to: CONFIG.NOTIFY_EMAIL, subject: subject, body: lines.join('\n'), name: 'Wedding RSVP' });
}
