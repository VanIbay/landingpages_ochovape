# 📖 Dokumentasi Database Google Sheets — Roma Motor

## Daftar Isi
- [Arsitektur](#arsitektur)
- [Setup Google Spreadsheet](#setup-google-spreadsheet)
- [Deploy Google Apps Script](#deploy-google-apps-script)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Struktur Spreadsheet](#struktur-spreadsheet)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

---

## Arsitektur

```
┌──────────────┐      GET (baca)       ┌────────────────────┐                ┌────────────────┐
│  React App   │ ◄───────────────────► │  Google Apps Script │ ◄────────────► │ Google Sheets  │
│  (Vercel)    │      POST (tulis)     │  (Web App / API)   │   read/write   │ (Database)     │
└──────────────┘                       └────────────────────┘                └────────────────┘
```

**Cara Kerja:**
1. Website (React) di-deploy di **Vercel**
2. Apps Script di-deploy sebagai **Web App** — bertindak sebagai REST API
3. Data disimpan di **Google Sheets** — bisa diedit langsung atau via admin dashboard

---

## Setup Google Spreadsheet

### Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **"Blank spreadsheet"** (Spreadsheet kosong)
3. Beri nama: `Roma Motor Database`

### Langkah 2: Buat 8 Tab/Sheet
Klik tanda **+** di bagian bawah untuk menambah tab baru. Buat **8 tab** dengan nama **persis** seperti berikut (case-sensitive):

| No | Nama Tab | Fungsi |
|----|----------|--------|
| 1 | `services` | Daftar layanan bengkel |
| 2 | `testimonials` | Testimoni pelanggan |
| 3 | `faqs` | Pertanyaan yang sering ditanya |
| 4 | `running_texts` | Teks berjalan di header |
| 5 | `blog_posts` | Artikel blog |
| 6 | `gallery` | Galeri foto bengkel |
| 7 | `settings` | Pengaturan website (key-value) |
| 8 | `messages` | Pesan masuk dari contact form |

### Langkah 3: Isi Header dan Data
Buka file-file di folder `docs/spreadsheet-data/` dan copy-paste ke masing-masing tab:

1. Buka file CSV → **Ctrl+A** (Select All) → **Ctrl+C** (Copy)
2. Klik tab yang sesuai di Google Sheets → Klik **cell A1** → **Ctrl+V** (Paste)

> **Penting:** Baris pertama adalah **header** — jangan dihapus!

### Langkah 4: Catat Spreadsheet ID
Dari URL spreadsheet Anda:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_ADA_DI_SINI/edit
```
Copy bagian antara `/d/` dan `/edit` — itu adalah **Spreadsheet ID**.

---

## Deploy Google Apps Script

### Langkah 1: Buat Project Baru
1. Buka [Google Apps Script](https://script.google.com)
2. Klik **"New Project"**
3. Ubah nama project menjadi: `Roma Motor API`

### Langkah 2: Copy-Paste Code
1. Hapus semua isi default di `Code.gs`
2. Buka file `docs/apps-script.js` dari project ini
3. **Ctrl+A** → **Ctrl+C** → Paste ke `Code.gs`
4. **Penting:** Pastikan `SPREADSHEET_ID` di baris 21 sudah terisi ID spreadsheet Anda

```javascript
const SPREADSHEET_ID = '1CAr1qJyK9HwUznGlIsjQubJ0GaH6arAZRCoKVVBNEd8'; // ← ID Anda
```

### Langkah 3: Deploy sebagai Web App
1. Klik **Deploy** → **New deployment**
2. Klik ikon ⚙️ (gear) → pilih **Web app**
3. Isi form:
   - **Description**: `Roma Motor API v1`
   - **Execute as**: **Me** (akun Google Anda)
   - **Who has access**: **Anyone**
4. Klik **Deploy**

### Langkah 4: Authorize
1. Jika muncul popup "Authorization required" → klik **Review Permissions**
2. Pilih akun Google Anda
3. Jika muncul "Google hasn't verified this app":
   - Klik **Advanced** (di kiri bawah)
   - Klik **Go to Roma Motor API (unsafe)**
4. Klik **Allow**

### Langkah 5: Copy URL
Setelah deploy berhasil, akan muncul **Web App URL** seperti:
```
https://script.google.com/macros/s/AKfycby.../exec
```
**Copy URL ini** — akan dipakai di konfigurasi `.env`.

### ⚠️ Update Deployment
Jika Anda mengubah code di Apps Script, Anda harus **deploy ulang**:
1. Klik **Deploy** → **Manage deployments**
2. Klik ikon ✏️ (edit) pada deployment yang ada
3. Di **Version**, pilih **New version**
4. Klik **Deploy**

---

## Konfigurasi Environment

### File `.env`
Tambahkan 2 variabel berikut di file `.env`:

```env
# Google Sheets Database
VITE_GOOGLE_SHEETS_ID=your_spreadsheet_id_here
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/your_deployment_id/exec
```

### Vercel Environment Variables
Karena project di-deploy di Vercel, Anda juga harus menambahkan environment variables di Vercel:

1. Buka [Vercel Dashboard](https://vercel.com) → pilih project
2. Klik **Settings** → **Environment Variables**
3. Tambahkan:
   - `VITE_APPS_SCRIPT_URL` = URL Web App Anda
   - `VITE_GOOGLE_SHEETS_ID` = Spreadsheet ID Anda
4. Klik **Save**
5. **Redeploy** project agar environment variables aktif

---

## Struktur Spreadsheet

### Tab: `services`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `id` | Number | `1` | ID unik otomatis |
| `icon` | String | `🛢️` | Emoji icon layanan |
| `title` | String | `Ganti Oli` | Nama layanan |
| `description` | String | `Oli original...` | Deskripsi layanan |
| `price` | String | `Mulai Rp 35.000` | Harga layanan |

### Tab: `testimonials`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `id` | Number | `1` | ID unik |
| `name` | String | `Ahmad` | Nama pelanggan |
| `vehicle` | String | `Honda Vario` | Jenis motor |
| `rating` | Number | `5` | Rating 1-5 |
| `text` | String | `Bengkel terbaik...` | Isi testimoni |
| `avatar` | String | (URL) | URL foto (opsional) |

### Tab: `faqs`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `id` | Number | `1` | ID unik |
| `question` | String | `Apakah...` | Pertanyaan |
| `answer` | String | `Ya, kami...` | Jawaban |

### Tab: `running_texts`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `id` | Number | `1` | ID unik |
| `text` | String | `🔧 Promo...` | Teks berjalan |
| `active` | Boolean | `TRUE` | Aktif/nonaktif |

### Tab: `blog_posts`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `id` | Number | `1` | ID unik |
| `title` | String | `Cara Merawat...` | Judul artikel |
| `slug` | String | `cara-merawat-motor` | URL slug |
| `thumbnail` | String | (URL) | URL gambar (opsional) |
| `date` | String | `2026-03-10` | Format YYYY-MM-DD |
| `tags` | String | `tips,matic` | Pisahkan dengan koma |
| `content` | String | `Isi artikel...` | Konten artikel |

### Tab: `gallery`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `id` | Number | `1` | ID unik |
| `url` | String | (URL) | URL gambar |
| `caption` | String | `Suasana bengkel` | Caption foto |

### Tab: `settings`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `key` | String | `shopName` | Nama pengaturan |
| `value` | String | `Roma Motor` | Nilai pengaturan |

**Key yang tersedia:** `shopName`, `tagline`, `address`, `phone`, `whatsapp`, `email`, `instagram`, `tiktok`, `operatingHours`, `mapEmbedUrl`

### Tab: `messages`
| Kolom | Tipe | Contoh | Keterangan |
|-------|------|--------|------------|
| `id` | Number | `1742...` | Timestamp ID |
| `name` | String | `John` | Nama pengirim |
| `whatsapp` | String | `0812...` | Nomor WA |
| `vehicle` | String | `Honda Beat` | Jenis motor |
| `service` | String | `Ganti Oli` | Layanan dipilih |
| `message` | String | `Mau booking...` | Isi pesan |
| `date` | String | `2026-03-24T...` | ISO timestamp |

---

## API Reference

### Base URL
```
https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

### GET — Baca Data
```
GET ?sheet=services     → Ambil semua services
GET ?sheet=testimonials → Ambil semua testimonials
GET (tanpa parameter)   → Ambil SEMUA data dari semua tab
```

### POST — Tulis Data
```json
// Tambah baris baru
{ "action": "add", "sheet": "services", "data": { "icon": "🔧", "title": "...", ... } }

// Update baris
{ "action": "update", "sheet": "services", "id": 1, "data": { "title": "Judul Baru" } }

// Hapus baris
{ "action": "delete", "sheet": "services", "id": 1 }

// Replace semua (untuk settings)
{ "action": "replace", "sheet": "settings", "data": [{ "key": "shopName", "value": "..." }] }
```

---

## Troubleshooting

### Data tidak muncul di website
1. Pastikan `VITE_APPS_SCRIPT_URL` sudah diisi di `.env`
2. Pastikan Apps Script sudah di-deploy dengan **Who has access: Anyone**
3. Cek Console browser (F12) untuk error messages
4. Pastikan nama tab di spreadsheet **persis** sama (case-sensitive)

### Error saat save dari admin dashboard
1. Pastikan Apps Script sudah di-authorize
2. Pastikan spreadsheet bisa diakses oleh akun yang deploy Apps Script
3. Coba deploy ulang Apps Script dengan version baru

### Data lama masih tampil setelah edit di Sheets
Data di-fetch saat halaman dimuat. Refresh halaman (F5) untuk melihat data terbaru.

### Error CORS
Pastikan `Content-Type` request adalah `text/plain`, bukan `application/json`. File `googleSheets.js` sudah menghandle ini.
