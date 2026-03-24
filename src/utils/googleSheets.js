/**
 * Google Sheets API via Apps Script
 *
 * Communicates with a deployed Google Apps Script Web App
 * for reading and writing data to Google Sheets.
 *
 * Set VITE_APPS_SCRIPT_URL in .env to the deployed Web App URL.
 */

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

// ━━━ READ ━━━

/**
 * Fetch all sheets data at once
 */
export async function fetchAllData() {
  if (!APPS_SCRIPT_URL) {
    console.warn('[Sheets] No APPS_SCRIPT_URL configured, using default data.');
    return null;
  }

  const res = await fetch(APPS_SCRIPT_URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.message || 'API error');

  return json.data;
}

/**
 * Fetch a single sheet
 */
export async function fetchSheet(sheetName) {
  if (!APPS_SCRIPT_URL) return null;

  const res = await fetch(`${APPS_SCRIPT_URL}?sheet=${encodeURIComponent(sheetName)}`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.message || 'API error');

  return json.data;
}

// ━━━ WRITE ━━━

async function postToApi(body) {
  if (!APPS_SCRIPT_URL) {
    throw new Error('APPS_SCRIPT_URL not configured');
  }

  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`POST failed: ${res.status}`);

  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.message || 'API error');

  return json;
}

/**
 * Add a row to a sheet
 */
export async function addRow(sheetName, data) {
  return postToApi({ action: 'add', sheet: sheetName, data });
}

/**
 * Update a row by ID
 */
export async function updateRow(sheetName, id, data) {
  return postToApi({ action: 'update', sheet: sheetName, id, data });
}

/**
 * Delete a row by ID
 */
export async function deleteRow(sheetName, id) {
  return postToApi({ action: 'delete', sheet: sheetName, id });
}

/**
 * Replace all data in a sheet (used for settings)
 */
export async function replaceSheet(sheetName, data) {
  return postToApi({ action: 'replace', sheet: sheetName, data });
}

// ━━━ TYPE CASTING ━━━

export function castServices(rows) {
  return (rows || []).map((row) => ({
    id: Number(row.id),
    icon: row.icon || '🔧',
    title: String(row.title || ''),
    description: String(row.description || ''),
    price: String(row.price || ''),
  }));
}

export function castTestimonials(rows) {
  return (rows || []).map((row) => ({
    id: Number(row.id),
    name: String(row.name || ''),
    vehicle: String(row.vehicle || ''),
    rating: Number(row.rating) || 5,
    text: String(row.text || ''),
    avatar: String(row.avatar || ''),
  }));
}

export function castFaqs(rows) {
  return (rows || []).map((row) => ({
    id: Number(row.id),
    question: String(row.question || ''),
    answer: String(row.answer || ''),
  }));
}

export function castRunningTexts(rows) {
  return (rows || []).map((row) => ({
    id: Number(row.id),
    text: String(row.text || ''),
    active: row.active === true || String(row.active).toLowerCase() === 'true',
  }));
}

export function castBlogPosts(rows) {
  return (rows || []).map((row) => ({
    id: Number(row.id),
    title: String(row.title || ''),
    slug: String(row.slug || ''),
    thumbnail: String(row.thumbnail || ''),
    date: String(row.date || ''),
    tags: row.tags
      ? (typeof row.tags === 'string' ? row.tags.split(',').map((t) => t.trim()) : row.tags)
      : [],
    content: String(row.content || ''),
  }));
}

export function castGallery(rows) {
  return (rows || []).map((row) => ({
    id: Number(row.id),
    url: String(row.url || ''),
    caption: String(row.caption || ''),
  }));
}

export function castSettings(rows) {
  const obj = {};
  (rows || []).forEach((row) => {
    if (row.key) obj[row.key] = row.value ?? '';
  });
  return obj;
}

export function castMessages(rows) {
  return (rows || []).map((row) => ({
    id: Number(row.id),
    name: String(row.name || ''),
    whatsapp: String(row.whatsapp || row.phone || ''),
    vehicle: String(row.vehicle || ''),
    service: String(row.service || ''),
    message: String(row.message || ''),
    date: String(row.date || ''),
  }));
}
