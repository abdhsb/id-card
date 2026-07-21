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
- Simpan banyak kartu ke database Supabase, muat ulang, dan hapus (opsional — aplikasi tetap jalan penuh tanpa ini).

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Menghubungkan database Supabase (opsional)

Tanpa langkah ini aplikasi tetap berfungsi penuh untuk membuat & mengunduh kartu, hanya saja kartu tidak tersimpan permanen (hilang saat refresh). Untuk mengaktifkan penyimpanan:

1. Buat project baru di [dashboard Supabase](https://supabase.com/dashboard) (tombol **New project**).
2. Buka **SQL Editor** di project tersebut, tempel isi file [`supabase/migration.sql`](./supabase/migration.sql), lalu jalankan (Run). Ini akan membuat tabel `id_cards` dan storage bucket `id-card-assets` untuk foto/logo.
3. Buka **Project Settings > API**, salin **Project URL** dan **anon public key**.
4. Salin `.env.example` menjadi `.env` di root project, lalu isi:
   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
5. Jalankan ulang `npm run dev`. Panel "Kartu Tersimpan" di sidebar kiri akan aktif — kamu bisa menyimpan, memuat, dan menghapus kartu.

> Catatan keamanan: karena aplikasi ini tidak punya sistem login, kebijakan RLS di `migration.sql` mengizinkan siapa pun yang punya anon key (yaitu siapa pun yang membuka aplikasi ini) untuk membaca/menulis/menghapus semua kartu. Ini cukup aman untuk pemakaian pribadi/internal, tapi kalau aplikasi ini akan dipakai publik, tambahkan autentikasi Supabase Auth dan perketat policy-nya terlebih dahulu.

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
- Supabase (Postgres + Storage) untuk penyimpanan kartu, lewat `@supabase/supabase-js`
