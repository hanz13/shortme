# ShortMe - Your Solution URL Shortener

**ShortMe** is a professional-grade, high-performance, and feature-rich URL Shortening application. It is designed to be fully self-contained, light, lightning-fast, and secure.

---

## 🚀 Fitur Utama (Core Features)

- **Instan & Berkinerja Tinggi**: Pengalihan langsung (instant redirect) dalam skala mikrodetik.
- **Kustomisasi Slug / Alias**: Buat tautan pendek yang tepercaya, mudah diingat, dan bermerek sesuai kebutuhan Anda.
- **Dukungan Kustom Waktu Kedaluwarsa (Custom Expiration)**: Atur tanggal kedaluwarsa dinamis agar tautan nonaktif secara otomatis saat kampanye selesai.
- **Sistem Pelacakan & Riwayat Lengkap**: Analisis jumlah klik, pelacakan referer, dan riwayat waktu pembuatan di panel kontrol Anda secara lokal.
- **QR Code Generator Portabel**: Unduh kode QR beresolusi tinggi secara gratis untuk menjembatani media fisik dan digital.
- **Perisai Keamanan & Pembersih Link**: Deteksi potensi malware, filter tautan yang mencurigakan, dan sistem pelindung bot spam bawaan.
- **Dukungan Banyak Bahasa Internasional (Superb i18n)**: Pendeteksian GeoIP/Bahasa serta peralihan manual yang lancar untuk 19 bahasa, termasuk:
  - Inggris (`EN`), Spanyol (`ES`), Prancis (`FR`), Italia (`IT`), Jerman (`DE`), Ibrani (`HE`), Bulgaria (`BG`), Bengali (`BN`), Hindi (`HI`), Indonesia (`ID`)
  - **Dukungan Baru**: Jepang (`JA`), Portugis (`PT`), Polandia (`PL`), Rusia (`RU`), Vietnam (`VI`), Turki (`TR`), Korea (`KO`), Taiwan (`ZH_TW`), dan Arab (`AR`).

---

## 🗄️ Sistem Database & Kesiapan Proyek

### 1. Database Apakah yang Digunakan?
Sistem ini menggunakan **Database Berkas JSON yang Dipersistenkan di Disk Lokal (Local Disk-Persisted JSON File Database)** dengan skema manajemen canggih:
- **In-Memory Cache**: Seluruh pencarian tautan beroperasi pada memori RAM server, memastikan kecepatan pengalihan mendekati *0ms*.
- **Atomic File Writing**: Perubahan data disimpan secara atomik (`fs.writeFileSync` ke file temporer lalu dipindahkan melalui `fs.renameSync`) untuk menjamin konsistensi data dan menghindari *corruption* saat penulisan simultan.
- **Nol Konfigurasi Eksternal**: File disimpan langsung pada direktori `./data/db.json`. Anda tidak memerlukan penyusunan kredensial, migrasi tabel SQL, ataupun setup hosting database eksternal terpisah. Semuanya berjalan secara otomatis.

### 2. Apakah Sudah Siap Di-deploy?
**Ya, project ini 100% SUDAH SIAP untuk di-deploy!**
Semua komponen, routing backend, linter, optimalisasi visual, server pengembangan, skrip kompilasi, serta meta tag penelusuran (SEO) telah terintegrasi dengan sempurna. Anda dapat menyebarkan project ini langsung ke platform produksi berbasis container (seperti Cloud Run, Zeabur, Vercel/Render, Docker, dll.) tanda perlu memodifikasi kode dasarnya lagi.

---

## 🛠️ Tech Stack & Struktur Proyek

- **Frontend**: React 18 (TypeScript), Vite, Tailwind CSS, serta `motion/react` untuk transisi animasi super mulus.
- **Backend Service**: Express.js (TypeScript) yang bertindak sebagai server API sekaligus penyaji SPA statis jika dalam mode produksi.
- **Linting & Safety**: TypeScript ketat (`tsc --noEmit`), konfigurasi modern, dan ikonografi elegan dari `lucide-react` (mengganti ikon gunting lama dengan ikon koneksi rantai tautan professional).
- **SEO & Meta Tags**: Meta description profesional, visual OpenGraph & Twitter Cards, serta favicon interaktif dinamis yang disematkan langsung di dalam template HTML utama.

---

## 🔧 Pengembangan & Menjalankan Proyek Lokal

### Prasyarat:
- Node.js LTS (Versi 18 ke atas disarankan)
- npm atau yarn

### Instalasi:
```bash
# Instal dependensi pembangunan
npm install
```

### Jalankan Mode Pengembangan (Live Hot Reload):
```bash
npm run dev
```
Server akan berjalan secara lokal di port `3000`.

### Bangun untuk Produksi (Build for Production):
```bash
npm run build
```
Skrip ini akan mengompilasi bundel frontend statis ke dalam direktori `./dist` dan bundel server CJS backend mandiri terkompilasi ke dalam file `./dist/server.cjs` menggunakan `esbuild`.

### Jalankan Server Produksi:
```bash
npm run start
```
Sistem akan membaca `./dist/server.cjs` dan akan berjalan di port `3000` dengan konsumsi memori dan waktu dingin awal yang minimal.
