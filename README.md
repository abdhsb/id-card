# ID Card Maker

Aplikasi web untuk membuat ID card / lanyard badge karyawan dengan desain kartu depan dan belakang, lengkap dengan foto, logo, dan QR code, terinspirasi dari desain badge "Sultan Coffee".

## Fitur

- Editor form untuk mengubah semua teks: nama perusahaan, jabatan, nama karyawan, alamat, ID karyawan, zona akses, masa berlaku, dan kontak darurat.
- Upload foto karyawan dan logo perusahaan (opsional, jika tidak diisi akan memakai logo teks bergaya cursive).
- QR code otomatis di bagian belakang kartu (isinya bisa dikustomisasi).
- 6 pilihan tema warna (Amber Gold, Royal Blue, Emerald, Crimson, Graphite Silver, Violet).
- Preview kartu depan & belakang secara real-time dengan mockup lanyard.
- Unduh kartu sebagai gambar PNG resolusi tinggi (kartu depan, belakang, atau keduanya).
- Cetak langsung dari browser.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk production

```bash
npm run build
```

Hasil build ada di folder `dist/`.

## Teknologi

- React + TypeScript + Vite
- Tailwind CSS v4
- qrcode.react untuk membuat QR code
- html-to-image untuk ekspor kartu ke PNG
- lucide-react untuk ikon
