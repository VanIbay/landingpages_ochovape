# 🏍️ Ocho Vape Store - Landing Page vape store & Service vape

## 📋 Ringkasan Proyek

Membangun landing page profesional dan SEO-friendly untuk **Ocho Vape Store** — vape store & service vape. Website ini akan menampilkan layanan vape store, membangun kepercayaan pelanggan, dan mengoptimalkan pencarian lokal (Local SEO).

**Tech Stack:** React + Vite + Tailwind CSS v3

> [!IMPORTANT]
> **Mobile-First Design** — Website ini UTAMANYA akan dibuka di handphone. Seluruh desain harus mengutamakan tampilan mobile terlebih dahulu, baru kemudian di-scale up untuk tablet dan desktop. Setiap section WAJIB responsive sempurna di semua device (320px – 1920px+).

---

## 🎯 Struktur Section Landing Page

### 1. 🔝 Navbar / Header
- Logo Ocho Vape Store (kiri)
- Menu navigasi: Beranda | Layanan | Tentang Kami | Galeri | Testimoni | Blog | FAQ | Kontak
- Tombol CTA: **"Booking Sekarang"** (highlight warna)
- **🌗 Dark/Light Mode Toggle** (icon sun/moon di navbar)
- Hamburger menu untuk mobile (full-screen overlay menu)
- **Sticky navbar** saat scroll (efek glassmorphism transparan)
- **📱 Mobile:** Bottom navigation bar atau hamburger dengan smooth slide-in
- SEO: semantic `<nav>`, `aria-label`

### 2. 🦸 Hero Banner (Full-Width)
- **Background:** Video atau gambar hero vapista sedang bekerja dengan overlay gradient gelap
- **Headline utama:** "vape store vape Terpercaya — Servis Cepat, Harga Transparan"
- **Sub-headline:** "Spesialis service vape semua merk. vapista berpengalaman, spare part original."
- **Dual CTA Button:**
  - 🟢 "Hubungi Kami via WhatsApp" (link ke WA)
  - 🔵 "Lihat Layanan Kami" (scroll ke section layanan)
- **Animasi:** Fade-in text + slide-up button saat halaman dimuat
- **Badge/trust indicator:** "⭐ 4.9/5 Rating | 500+ Pelanggan Puas"
- SEO: `<h1>` untuk headline utama

### 3. 📢 Running Text / Marquee 3D (Setelah Hero) ✅
- **Efek 3D:** Perspective, text-shadow depth, shine animation, edge highlights
- Teks berjalan otomatis dari kanan ke kiri (infinite loop, CSS animation `marquee3d`)
- Fade masks di sisi kiri & kanan untuk efek kedalaman
- Separator icon ⚡ (FiZap) antar teks dengan glow effect
- Konten contoh:
  - "🔧 Promo Ganti Oli Gratis Cek Mesin!"
  - "📞 Booking Online Sekarang — Tanpa Antri!"
  - "🏆 vape store Terpercaya Sejak 2015"
  - "⚡ Service Express 30 Menit!"
- Bisa di-manage dari Admin Panel (teks & status aktif/nonaktif)
- Background gradient merah (`from-[#1a0000] via-primary to-[#1a0000]`), font bold uppercase
- Hover pause animation

### 4. 🔧 Section Layanan / Services
- **Tagline:** "Melayani Semua Jenis Sepeda vape"
- **Layout:** Grid 2 kolom di mobile, 4 kolom di desktop
- Kartu layanan dengan **ikon, judul, deskripsi singkat, dan harga mulai dari**
- **Daftar Layanan:**
  - 🛢️ **Ganti Oli** — Oli original, berbagai merk
  - 🔧 **Tune Up** — Cek & setel mesin agar performa optimal
  - 🛒 **Sparepart** — Jual spare part original & aftermarket
  - ⚙️ **Service** — Service ringan & berkala semua merk
  - 🛞 **Tambal Ban** — Tambal ban tubeless & ban dalam
  - 🏗️ **Turun Mesin** — Overhaul mesin total
  - 🚀 **BoreUp** — Upgrade kapasitas mesin
  - 🔋 **Kelistrikan** — Perbaikan sistem kelistrikan & injection
- **Catatan:** Melayani semua jenis sepeda vape (Matic, Bebek, Sport, dll)
- Hover/tap effect: lift card + shadow + accent border
- Tombol "Selengkapnya" di tiap kartu (opsional)
- **📱 Mobile:** Horizontal scroll cards atau swipeable grid
- SEO: `<h2>` untuk judul section, schema markup `Service`

### 5. ❓ Kenapa Pilih Ocho Vape Store? (Why Choose Us)
- **Layout:** 4 kolom icon-box atau alternating image-text
- Poin keunggulan:
  - ✅ vapista Berpengalaman
  - ✅ Spare Part Original & Garansi
  - ✅ Harga Transparan, Tanpa Biaya Tersembunyi
- Counter animasi: "10+ Tahun Pengalaman", "5000+ vape Diservis", "50+ vapista Ahli"
- SEO: `<h2>`, deskriptif alt-text pada gambar

### 6. 📸 Galeri vape store
- **Layout:** Masonry grid / lightbox gallery
- Foto-foto: suasana vape store, proses service, before-after, tim vapista
- Hover: zoom-in effect
- Lazy loading untuk performa
- SEO: `alt` tag deskriptif pada setiap gambar

### 7. ⭐ Testimoni Pelanggan
- **Layout:** Carousel/slider dengan auto-play
- Setiap card testimoni:
  - Foto pelanggan (avatar)
  - Nama & jenis vape
  - Rating bintang (⭐⭐⭐⭐⭐)
  - Kutipan testimoni
- Navigasi: dots indicator + swipe gesture di mobile
- SEO: Schema markup `Review`

### 8. 📍 Lokasi & Google Maps
- **Google Maps embed interaktif** (iframe responsive, full-width)
- Pin lokasi vape store dengan marker custom (logo Ocho Vape Store)
- Informasi:
  - Alamat lengkap vape store
  - Jam operasional (Senin–Sabtu: 08:00–17:00)
  - Nomor telepon & WhatsApp
- Tombol **"Dapatkan Arah / Get Directions"** (buka Google Maps / Waze)
- **📱 Mobile:** Map bisa di-tap untuk langsung buka app Google Maps
- SEO: Schema markup `LocalBusiness`

### 9. 📞 Section CTA / Contact Form
- **Layout:** Split — form di kiri, info kontak di kanan
- Form fields:
  - Nama lengkap
  - Nomor WhatsApp
  - Jenis vape
  - Keluhan / jenis layanan (dropdown)
  - Pesan (textarea)
- Tombol "Kirim Pesan" (dummy, simpan ke state/localStorage)
- **Info Kontak & Sosial Media:**
  - 📱 **WhatsApp:** Link langsung chat WA (nomor vape store)
  - 📸 **Instagram:** @OchoVape (link ke profil IG)
  - 🎵 **TikTok:** @OchoVape (link ke profil TikTok)
- Floating WhatsApp button (fixed di pojok kanan bawah)
- SEO: Schema markup `ContactPoint`

### 10. ❓ FAQ (Frequently Asked Questions)
- **Layout:** Accordion / collapsible list
- Contoh pertanyaan:
  - "Berapa lama waktu service?"
  - "Apakah bisa booking online?"
  - "Spare part apa yang digunakan? Original atau aftermarket?"
  - "Apakah ada garansi service?"
  - "vape apa saja yang bisa diservis?"
  - "Bagaimana cara booking via WhatsApp?"
  - "Berapa biaya turun mesin?"
  - "Apakah melayani BoreUp?"
- Bisa di-manage dari Admin Panel
- **📱 Mobile:** Touch-friendly, area tap yang cukup besar
- SEO: Schema markup `FAQPage` (sangat powerful untuk SEO!)

### 11. 📝 Blog / Artikel
- **Layout:** Grid 2 kolom di desktop, 1 kolom di mobile
- Halaman list artikel + halaman detail artikel
- Contoh artikel:
  - "Cara Merawat vape Matic Agar Awet"
  - "Tanda-Tanda vape Harus Ganti Oli"
  - "Tips Memilih Spare Part Original vs Aftermarket"
  - "Kapan Waktu yang Tepat untuk Tune Up vape?"
  - "Panduan Lengkap BoreUp vape"
- Setiap artikel: judul, thumbnail, tanggal, konten, tags
- Bisa di-manage dari Admin Panel (CRUD artikel, simpan di localStorage)
- Share button (WhatsApp, copy link)
- **Manfaat SEO:** Long-tail keywords, meningkatkan authority domain
- SEO: Schema markup `BlogPosting`, `Article`

### 12. 🦶 Footer
- Logo & tagline Ocho Vape Store
- Link navigasi cepat
- **Sosial Media Links:**
  - 📱 WhatsApp (link chat langsung)
  - 📸 Instagram (@OchoVape)
  - 🎵 TikTok (@OchoVape)
- Copyright © 2026 Ocho Vape Store
- **Credit:** "Dibuat dengan ❤️ oleh [sadux.my.id](https://sadux.my.id)" — ditampilkan di bagian paling bawah footer
- Link ke halaman Privacy Policy & Terms (opsional)
- SEO: `<footer>` semantic

---

## 🌗 Dark / Light Mode ✅

- Toggle button di navbar (icon FiSun / FiMoon dari react-icons)
- Default: **Dark Mode** (hardcoded `true`, tidak mengikuti `prefers-color-scheme`)
- Preferensi disimpan di `localStorage` (key: `roma-theme`)
- ThemeContext mengelola state dan menambah/hapus class `dark` pada `<html>` dan `<body>`
- **CSS Custom Properties** untuk adaptif text colors:
  - `--text-heading`: Putih (dark) / #1a1a2e (light)
  - `--text-body`: #9ca3af (dark) / #4b5563 (light)
  - `--text-muted`: #6b7280 (kedua mode)
  - `--border-subtle` & `--border-light` untuk border adaptif
- Transisi smooth saat switch mode (`transition-colors duration-300`)
- Semua section & admin panel mendukung kedua mode
- Light mode overrides untuk `.glass`, `.section-title`, `.section-subtitle`, `.bg-dark-card`

---

## 🌐 Multi Bahasa (i18n) ✅

- **Bahasa tersedia:** 🇮🇩 Indonesia (default) & 🇬🇧 English
- Toggle bahasa di navbar (🌐 icon FiGlobe + kode bahasa uppercase)
- Implementasi menggunakan `react-i18next` (tanpa `LanguageDetector` — default langsung ke `id`)
- File terjemahan:
  - `src/locales/id/translation.json`
  - `src/locales/en/translation.json`
- Preferensi bahasa disimpan di `localStorage` (key: `roma-lang`)
- Semua teks statis di-translate (navbar, headings, button, FAQ, dll)
- Konten dinamis (layanan, testimoni, blog) tetap dalam Bahasa Indonesia
- SEO: `<html lang="id">` pada `index.html`

---

## 📊 Analytics Integration

- **Google Analytics 4 (GA4)**
  - Tracking pageview otomatis
  - Event tracking untuk:
    - Klik tombol WhatsApp
    - Submit contact form
    - Klik "Get Directions" di Maps
    - Klik nomor telepon
    - Download / share artikel blog
    - Switch bahasa
    - Switch dark/light mode
- **Google Tag Manager (GTM)** — opsional, untuk fleksibilitas
- **Conversion tracking** — tracking goal (booking, kontak via WA)
- Kode analytics di-inject via `react-helmet-async` atau langsung di `index.html`
- Admin dashboard menampilkan statistik dummy (siap integrasi real data nanti)

---

## 🔐 Admin Panel (Dummy — Tanpa Database)

### Autentikasi
- **Username:** `roma`
- **Password:** `OchoVape1234`
- Login form sederhana, validasi di frontend (hardcoded)
- Session disimpan di `localStorage`
- Route: `/admin/login`

### Halaman Dashboard Admin
Route: `/admin/dashboard`

#### Fitur Admin:
| Menu | Deskripsi |
|------|-----------|
| **📊 Dashboard** | Ringkasan statistik (dummy data: total pengunjung, total booking, dll) |
| **📢 Running Text** | CRUD teks marquee (simpan di localStorage) |
| **🔧 Layanan** | CRUD daftar layanan (judul, deskripsi, harga, ikon) |
| **📸 Galeri** | Upload/hapus foto galeri (simpan URL di localStorage) |
| **⭐ Testimoni** | CRUD testimoni pelanggan |
| **❓ FAQ** | CRUD pertanyaan & jawaban |
| **📝 Blog** | CRUD artikel blog (judul, konten, thumbnail, tags) |
| **📞 Pesan Masuk** | Lihat daftar pesan dari contact form |
| **⚙️ Pengaturan** | Edit info vape store (nama, alamat, no telp, jam operasional, link sosmed) |

### Desain Admin Panel
- Sidebar navigation (collapsible, hamburger di mobile)
- Dark theme / dashboard style
- **📱 Responsive untuk mobile, tablet & desktop**
- Touch-friendly di semua interaksi
- Data disimpan di **localStorage** (sebagai dummy, siap migrasi ke backend)

---

## 🔍 Strategi SEO Terintegrasi

### On-Page SEO
- **Title tag:** "Ocho Vape Store — vape store & Service vape Terpercaya di [Kota]"
- **Meta description:** Deskripsi 150-160 karakter yang mengandung keyword
- **Heading hierarchy:** H1 → H2 → H3 yang terstruktur
- **Image optimization:** Format WebP, lazy loading, alt-text deskriptif
- **Internal linking:** Semua section terhubung via smooth scroll

### Technical SEO
- **Sitemap.xml** (generate otomatis atau manual)
- **robots.txt** konfigurasi
- **Canonical URL** tag
- **Open Graph & Twitter Card** meta tags (untuk share di sosmed)
- **Favicon & Apple Touch Icon**
- **Lighthouse score target:** Performance > 90, SEO > 95

### Schema Markup (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Ocho Vape Store",
  "description": "vape store & Service vape Terpercaya",
  "address": { ... },
  "telephone": "...",
  "openingHours": "Mo-Sa 08:00-17:00",
  "aggregateRating": { ... }
}
```

### Local SEO
- Optimasi untuk pencarian lokal ("vape store vape terdekat", "service vape [kota]")
- Google My Business integration (link)
- NAP consistency (Name, Address, Phone)

---

## 🎨 Desain & UI/UX

### Palet Warna (Saran)
| Elemen | Warna | Hex |
|--------|-------|-----|
| Primary | Merah Racing | `#E63946` |
| Secondary | Hitam Elegan | `#1D1D1D` |
| Accent | Kuning / Emas | `#F4A261` |
| Background | Abu-abu Gelap | `#0F0F0F` |
| Teks Utama | Putih | `#FFFFFF` |
| Teks Secondary | Abu-abu Terang | `#A8A8A8` |

### Tipografi
- **Heading:** `Montserrat` atau `Poppins` (bold, uppercase untuk heading besar)
- **Body:** `Inter` atau `Open Sans`
- Import via Google Fonts

### Animasi & Efek
- Scroll-triggered animations (AOS library atau Framer Motion)
- Smooth scrolling antar section
- Parallax effect pada hero banner
- Loading skeleton saat data dimuat
- Micro-interactions pada button hover

---

## 📁 Struktur Folder Proyek (Sesuai Implementasi)

```
OchoVape/
├── public/
│   ├── robots.txt                     # ✅ Disallow /admin/, sitemap link
│   └── sitemap.xml                    # ✅ Homepage + blog posts
├── src/
│   ├── main.jsx                       # ✅ Entry point + i18n import
│   ├── App.jsx                        # ✅ Router + Providers
│   ├── index.css                      # ✅ Tailwind + custom CSS + 3D marquee + light/dark vars
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx             # ✅ Sticky glassmorphism, theme toggle, lang switch
│   │   │   ├── Footer.jsx             # ✅ 4 kolom, social links, credit sadux.my.id
│   │   │   ├── WhatsAppFloat.jsx      # ✅ Fixed bottom-right
│   │   │   └── ScrollToTop.jsx        # ✅ Fixed bottom-left
│   │   ├── home/
│   │   │   ├── HeroBanner.jsx         # ✅ Trust badge, headline, dual CTA, stats
│   │   │   ├── RunningText.jsx        # ✅ 3D marquee effect
│   │   │   ├── Services.jsx           # ✅ 8 layanan, grid responsive
│   │   │   ├── WhyChooseUs.jsx        # ✅ Counter animation + 3 keunggulan
│   │   │   ├── Gallery.jsx            # ✅ Masonry grid + lightbox
│   │   │   ├── Testimonials.jsx       # ✅ Swiper carousel
│   │   │   ├── Location.jsx           # ✅ Google Maps embed + info cards
│   │   │   ├── FAQ.jsx                # ✅ Accordion, CSS vars for light/dark
│   │   │   ├── BlogList.jsx           # ✅ 3 card grid, tags, read more
│   │   │   └── ContactForm.jsx        # ✅ Form 5 fields + sidebar social
│   │   └── admin/
│   │       ├── AdminLayout.jsx        # ✅ Sidebar collapsible + mobile menu
│   │       ├── Dashboard.jsx          # ✅ 6 stat cards + recent messages
│   │       ├── RunningTextManager.jsx # ✅ Add/toggle/delete
│   │       ├── ServicesManager.jsx    # ✅ CRUD modal (icon, title, desc, price)
│   │       ├── GalleryManager.jsx     # ✅ Add/delete + grid view
│   │       ├── TestimonialsManager.jsx# ✅ CRUD modal + star rating
│   │       ├── FAQManager.jsx         # ✅ CRUD modal (question + answer)
│   │       ├── BlogManager.jsx        # ✅ CRUD + auto-slug, tags, content
│   │       ├── MessagesManager.jsx    # ✅ View/delete/clear all
│   │       └── SettingsManager.jsx    # ✅ Shop info form + save
│   ├── pages/
│   │   ├── HomePage.jsx               # ✅ All sections + SEO + JSON-LD
│   │   ├── BlogDetailPage.jsx         # ✅ Dynamic route + share buttons
│   │   ├── AdminLogin.jsx             # ✅ Glassmorphism login card
│   │   └── AdminDashboard.jsx         # ✅ Dynamic panel switching
│   ├── context/
│   │   ├── DataContext.jsx            # ✅ Central data store + localStorage
│   │   └── ThemeContext.jsx           # ✅ Dark/light mode + CSS class toggle
│   ├── hooks/
│   │   └── useLocalStorage.js         # ✅ Generic localStorage hook
│   ├── locales/
│   │   ├── id/translation.json        # ✅ Bahasa Indonesia (default)
│   │   └── en/translation.json        # ✅ English
│   ├── data/
│   │   └── defaultData.js             # ✅ Seed data (8 services, 5 testimonials, etc.)
│   ├── utils/
│   │   ├── auth.js                    # ✅ Hardcoded credentials check
│   │   └── i18n.js                    # ✅ i18next config (lng: 'id', localStorage)
│   └── routes/
│       └── ProtectedRoute.jsx         # ✅ Auth guard redirect to /admin/login
├── index.html                         # ✅ SEO meta, OG tags, canonical, lang="id"
├── docs/
│   └── landing-page-plan.md           # 📄 Dokumen ini
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 📦 Dependencies

### Production
| Package | Fungsi |
|---------|--------|
| `react` | UI Library |
| `react-dom` | DOM rendering |
| `react-router-dom` | Routing (landing page + admin + blog) |
| `react-icons` | Icon library |
| `framer-motion` | Animasi & transisi |
| `react-helmet-async` | SEO meta tags management |
| `swiper` | Carousel untuk testimoni |
| `react-i18next` + `i18next` | Multi-bahasa (i18n) |
| ~~`i18next-browser-languagedetector`~~ | ~~Auto-detect bahasa browser~~ (dihapus, default langsung ke `id`) |

### Development
| Package | Fungsi |
|---------|--------|
| `vite` | Build tool |
| `tailwindcss` | Utility-first CSS |
| `postcss` | CSS processing |
| `autoprefixer` | Vendor prefix |
| `@vitejs/plugin-react` | React plugin untuk Vite |

---

## ✅ Checklist Fitur

### Landing Page
- [x] Setup project (Vite + React + Tailwind)
- [x] Navbar responsive + sticky + hamburger mobile
- [x] Dark / Light Mode Toggle (default dark)
- [x] Multi Bahasa (ID / EN) — default Indonesian
- [x] Hero Banner dengan animasi (Framer Motion)
- [x] Running Text / Marquee **3D** (perspective, text-shadow, shine)
- [x] Section Layanan — 8 layanan (Ganti Oli, Tune Up, Sparepart, Service Berkala, Tambal Ban, Turun Mesin, BoreUp, Kelistrikan)
- [x] Section Kenapa Pilih Kami (counter animasi + useInView)
- [x] Galeri vape store (masonry grid + lightbox)
- [x] Testimoni (Swiper carousel)
- [x] Lokasi & Google Maps (iframe embed + info cards + Dapatkan Arah)
- [x] FAQ Accordion (CSS vars untuk light/dark mode)
- [x] Blog / Artikel (list grid + detail page + share WA/copy)
- [x] Contact Form (simpan ke localStorage via DataContext)
- [x] Footer + credit sadux.my.id
- [x] Floating WhatsApp Button
- [x] Scroll To Top Button

### Admin Panel
- [x] Admin Login Page (user: `ocho`, pass: `ochovape1234`)
- [x] Admin Dashboard (6 stat cards + recent messages)
- [x] Admin CRUD Running Text (add/toggle/delete)
- [x] Admin CRUD Layanan (modal: icon, title, desc, price)
- [x] Admin CRUD Galeri (add URL/delete)
- [x] Admin CRUD Testimoni (modal + star rating picker)
- [x] Admin CRUD FAQ (modal: question + answer)
- [x] Admin CRUD Blog (modal: title, auto-slug, date, tags, content)
- [x] Admin Lihat Pesan (view/delete/clear all)
- [x] Admin Pengaturan vape store (shop info form + save)

### SEO & Teknis
- [x] SEO: Meta tags, OG tags, schema markup (AutoRepair JSON-LD)
- [x] SEO: sitemap.xml & robots.txt
- [x] SEO: Schema AutoRepair, BlogPosting (di masing-masing page)
- [ ] Google Analytics 4 integration *(belum — P2)*
- [ ] Event tracking (WA click, form submit, maps click, dll) *(belum — P2)*
- [x] Responsive design — **mobile-first** (320px+)
- [x] Performance optimization (lazy loading images)
- [x] Smooth scroll & animasi (Framer Motion)

---

## 💡 Saran Tambahan (Future Enhancement)

### 🟡 Bisa Ditambahkan Nanti:

1. **Promo / Banner Pop-up**
   - Modal pop-up promo saat pertama kali buka website
   - Countdown timer untuk promo terbatas

2. **Booking Online System**
   - Form booking dengan pilihan tanggal & waktu
   - Konfirmasi via WhatsApp otomatis

3. **Before-After Showcase**
   - Slider interaktif sebelum dan sesudah service

4. **PWA (Progressive Web App)**
   - Agar bisa di-install di HP pelanggan
   - Offline-capable dengan service worker

5. **Speed Dial / Quick Action**
   - Tombol floating expandable: WA, Telepon, Maps

### 🟢 Prioritas Implementasi:

| Prioritas | Fitur |
|-----------|-------|
| 🔴 **P0 - Wajib** | Navbar, Hero, Running Text, Layanan (8 jenis), Testimoni, Kontak, Footer, Admin Panel, Dark/Light Mode |
| 🟡 **P1 - Penting** | SEO lengkap, Galeri, Maps, WhatsApp Float, FAQ, Blog, Multi Bahasa, Analytics |
| 🟢 **P2 - Nice to Have** | Booking System, Before-After, Promo Pop-up |
| 🔵 **P3 - Future** | PWA, Speed Dial |

---

## 📱 Responsive Design Strategy

> [!CAUTION]
> Website ini **UTAMANYA dibuka di handphone**. Mobile-first adalah WAJIB, bukan opsional!

### Breakpoints (Tailwind CSS):
| Breakpoint | Ukuran | Target Device |
|------------|--------|---------------|
| Default | 0–639px | **📱 Mobile (prioritas utama)** |
| `sm` | 640px+ | Mobile landscape |
| `md` | 768px+ | Tablet |
| `lg` | 1024px+ | Laptop |
| `xl` | 1280px+ | Desktop |

### Prinsip Mobile-First:
- Desain dimulai dari **layar terkecil (320px)**, scale up ke desktop
- Touch target minimum **44x44px** untuk semua tombol & link
- Font size minimum **16px** untuk body text (hindari zoom otomatis di iOS)
- Swipe gesture support untuk carousel & gallery
- Bottom navigation / sticky CTA di mobile
- Gambar responsive dengan `srcset` atau Tailwind responsive utilities
- Form input yang nyaman diisi di handphone (autocomplete, input type yang tepat)
- Hamburger menu full-screen overlay untuk navigasi mobile
- Scroll snap pada section-section tertentu

---

## 🚀 Timeline & Status

| Fase | Durasi | Status |
|------|--------|--------|
| **Setup & Structure** | ✅ Selesai | Project init, routing, layout, i18n, theme |
| **Landing Page Core** | ✅ Selesai | Hero, Running Text 3D, Layanan, Why Us, Galeri, Testimoni |
| **Landing Page Extended** | ✅ Selesai | Maps, FAQ, Blog, Contact Form, Footer |
| **Admin Panel** | ✅ Selesai | Login, dashboard, CRUD semua fitur |
| **SEO & Polish** | ✅ Selesai | Meta tags, schema, robots.txt, sitemap, multi-bahasa |
| **Testing & Responsive** | ✅ Selesai | Dark/light mode, mobile responsive, bug fixes |
| **GA4 Analytics** | ⬜ Belum | Google Analytics 4 + event tracking |

---

## 📝 Catatan Implementasi

> **📌 Storage:** Plan ini menggunakan localStorage sebagai penyimpanan data dummy. Ketika siap untuk production, data bisa dimigrasikan ke backend (Node.js + Express + MySQL/MongoDB) dengan perubahan minimal pada komponen React — cukup ganti fungsi localStorage dengan API call.

> **📌 CSS Variables:** Untuk mendukung dark/light mode tanpa circular dependency PostCSS, komponen menggunakan CSS custom properties (`var(--text-heading)`, `var(--text-body)`) melalui inline styles alih-alih override class Tailwind.

> **📌 i18n:** `i18next-browser-languagedetector` dihapus karena menyebabkan default bahasa browser (EN) menimpa default Indonesia. Sekarang menggunakan `lng: 'id'` langsung dengan fallback localStorage.

> **📌 Running Text 3D:** Implementasi menggunakan CSS perspective, text-shadow depth layers, gradient shine animation, dan fade masks di sisi kiri/kanan untuk efek kedalaman premium.
