/**
 * ============================================================
 * Google Apps Script — Roma Motor API
 * ============================================================
 *
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Copy-paste this entire code into Code.gs
 * 4. Set SPREADSHEET_ID to your Google Sheets ID
 * 5. Deploy → New deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL into .env as VITE_APPS_SCRIPT_URL
 *
 * ============================================================
 */

// ━━━ CONFIG ━━━
const SPREADSHEET_ID = '1CAr1qJyK9HwUznGlIsjQubJ0GaH6arAZRCoKVVBNEd8';

// Sheet names in the spreadsheet
const SHEET_NAMES = {
  services: 'services',
  testimonials: 'testimonials',
  faqs: 'faqs',
  running_texts: 'running_texts',
  blog_posts: 'blog_posts',
  gallery: 'gallery',
  settings: 'settings',
  messages: 'messages',
};

// ━━━ HELPERS ━━━

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(name);
}

function sheetToJson(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  const headers = data[0];
  const rows = data.slice(1);

  return rows.map((row) => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] !== undefined ? row[i] : '';
    });
    return obj;
  });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function setCorsHeaders(output) {
  return output;
}

// ━━━ GET HANDLER ━━━

function doGet(e) {
  const params = e.parameter;
  const sheetName = params.sheet;

  if (!sheetName || !SHEET_NAMES[sheetName]) {
    // Return all sheets
    const allData = {};
    Object.keys(SHEET_NAMES).forEach((key) => {
      const sheet = getSheet(SHEET_NAMES[key]);
      if (sheet) {
        allData[key] = sheetToJson(sheet);
      }
    });
    return jsonResponse({ status: 'ok', data: allData });
  }

  const sheet = getSheet(SHEET_NAMES[sheetName]);
  if (!sheet) {
    return jsonResponse({ status: 'error', message: `Sheet "${sheetName}" not found` });
  }

  return jsonResponse({ status: 'ok', data: sheetToJson(sheet) });
}

// ━━━ POST HANDLER ━━━

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { action, sheet: sheetName, data, id } = body;

    if (!sheetName || !SHEET_NAMES[sheetName]) {
      return jsonResponse({ status: 'error', message: 'Invalid sheet name' });
    }

    const sheet = getSheet(SHEET_NAMES[sheetName]);
    if (!sheet) {
      return jsonResponse({ status: 'error', message: `Sheet "${sheetName}" not found` });
    }

    switch (action) {
      case 'add':
        return handleAdd(sheet, sheetName, data);
      case 'update':
        return handleUpdate(sheet, data, id);
      case 'delete':
        return handleDelete(sheet, id);
      case 'replace':
        return handleReplace(sheet, sheetName, data);
      default:
        return jsonResponse({ status: 'error', message: `Unknown action: ${action}` });
    }
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

// ━━━ CRUD OPERATIONS ━━━

function handleAdd(sheet, sheetName, data) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Auto-generate ID if not provided
  if (!data.id) {
    data.id = Date.now();
  }

  const row = headers.map((h) => {
    const val = data[h];
    return val !== undefined ? val : '';
  });

  sheet.appendRow(row);

  return jsonResponse({ status: 'ok', message: 'Row added', data: data });
}

function handleUpdate(sheet, data, id) {
  const allData = sheet.getDataRange().getValues();
  const headers = allData[0];
  const idCol = headers.indexOf('id');

  if (idCol === -1) {
    return jsonResponse({ status: 'error', message: 'No "id" column found' });
  }

  // Find the row with matching ID
  for (let i = 1; i < allData.length; i++) {
    if (String(allData[i][idCol]) === String(id)) {
      // Update the row
      headers.forEach((header, col) => {
        if (data[header] !== undefined) {
          sheet.getRange(i + 1, col + 1).setValue(data[header]);
        }
      });

      return jsonResponse({ status: 'ok', message: 'Row updated' });
    }
  }

  return jsonResponse({ status: 'error', message: `Row with id ${id} not found` });
}

function handleDelete(sheet, id) {
  const allData = sheet.getDataRange().getValues();
  const headers = allData[0];
  const idCol = headers.indexOf('id');

  if (idCol === -1) {
    return jsonResponse({ status: 'error', message: 'No "id" column found' });
  }

  for (let i = 1; i < allData.length; i++) {
    if (String(allData[i][idCol]) === String(id)) {
      sheet.deleteRow(i + 1);
      return jsonResponse({ status: 'ok', message: 'Row deleted' });
    }
  }

  return jsonResponse({ status: 'error', message: `Row with id ${id} not found` });
}

function handleReplace(sheet, sheetName, data) {
  // Replace all data in the sheet (used for settings)
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Clear existing data (keep headers)
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clear();
  }

  // Write new data
  if (Array.isArray(data)) {
    data.forEach((item) => {
      const row = headers.map((h) => item[h] !== undefined ? item[h] : '');
      sheet.appendRow(row);
    });
  }

  return jsonResponse({ status: 'ok', message: 'Sheet replaced' });
}
