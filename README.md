# Portofolio Najwa Az Zahrah 🎨

Website portofolio pribadi untuk **Najwa Az Zahrah**, siswi **SMKN 4 Tarakan**
jurusan **Rekayasa Perangkat Lunak (RPL)**. Sudah pernah membuat aplikasi kasir
(Visual Basic) dan web perpustakaan (PHP). Digital art hanya dijalani sebagai hobi.

Tema warna website memakai warna favoritnya: **#224DFE**.

Dibuat dengan **HTML + CSS + JavaScript murni** — tanpa proses build,
jadi bisa langsung dibuka di browser.

## 📁 Struktur Folder

```
portfolio-najwa/
├── index.html          # Halaman utama (beranda + semua bagian)
├── css/
│   └── style.css       # Semua tampilan / desain
├── js/
│   └── main.js         # Interaksi (menu, animasi, galeri, form)
├── assets/
│   ├── foto-profil.jpg # Foto profil Najwa
│   ├── karya-1..6.jpg  # Karya digital art milik Najwa
│   ├── favicon.svg     # Ikon tab (monogram NZ)
│   ├── favicon.png     # Ikon tab cadangan (versi PNG)
│   └── *.svg           # placeholder lama (tidak dipakai lagi)
└── README.md
```

## 🚀 Cara Membuka

Cukup **klik dua kali** file `index.html`, atau klik kanan → *Open with* → browser.

Sudah ada bagian-bagian berikut:
1. **Beranda** — nama, sekolah (SMKN 4 Tarakan), jurusan (Rekayasa Perangkat Lunak), hobi (Digital Art), dan foto profil.
2. **Tentang** — deskripsi singkat + statistik.
3. **Keahlian** — bahasa pemrograman (Visual Basic, PHP, MySQL, HTML/CSS/JS) dengan progress bar, ditambah bagian **Proyek** (Aplikasi Kasir & Web Perpustakaan).
4. **Hobi** — galeri karya digital art (bisa diklik untuk diperbesar).
5. **Kontak** — form (dengan validasi) + media sosial.

## ✏️ Cara Mengganti Isi

### 1. Ganti foto profil
Foto profil saat ini tersimpan sebagai `assets/foto-profil.jpg`.
- Cara termudah: **timpa** file `assets/foto-profil.jpg` dengan fotomu
  (nama file harus sama: `foto-profil.jpg`).
- Kalau nama filenya berbeda, buka `index.html` dan ubah **semua**
  kemunculan `assets/foto-profil.jpg` (ada 2 tempat: foto di beranda dan
  foto di bagian Tentang).
- Pengaturan posisi crop ada di `css/style.css` pada `object-position`
  (`.profile-img` dan `.about-avatar`).

### 2. Ganti gambar karya
- Simpan gambar karyamu di folder `assets/`.
- Buka `js/main.js`, pada bagian `var artworks = [...]`, ubah `src` dan `title`
  sesuai karyamu. Bisa juga menambah/mengurangi jumlah karya.

### 3. Ubah teks / kontak
- Nama, sekolah, deskripsi → di `index.html`.
- Email & media sosial → pada bagian Kontak di `index.html`
  (ganti `azzahrahnajwa00@gmail.com` dan tanda `#` pada link sosial media).

### 4. Formulir "Kirim Pesan" (otomatis ke email)
Form sudah tersambung ke layanan **FormSubmit** supaya pesan benar-benar
dikirim ke email **azzahrahnajwa00@gmail.com** — tanpa perlu server sendiri.

- Alamat email tujuan dipakai di 2 tempat:
  1. `index.html` → atribut `action` pada `<form>`
  2. `js/main.js` → di dalam `fetch(form.action.replace(...))` (ikut `action` yang sama)
- **Penting (sekali saja):** saat form pertama kali dikirim, FormSubmit
  mengirim email **konfirmasi/aktivasi** ke alamat tujuan. Klik tautannya
  sekali, setelah itu semua pesan masuk otomatis ke inbox.
- Pengaturan tambahan (subjek email, template tabel, captcha nonaktif,
  honeypot anti-spam) ada di `<input type="hidden">` di dalam form.

## 🎨 Mengubah Warna

Semua warna utama ada di bagian atas `css/style.css` pada `:root`.
Warna favoritmu **#224DFE** dipakai sebagai `--primary`, dan gradient
dibuat dari `--grad` (biru muda → #224DFE → biru cerah). Ubah nilainya
untuk mengganti tema warna seluruh website.

---
© Najwa Az Zahrah — Siswi RPL SMKN 4 Tarakan.
