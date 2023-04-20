<p align="center">
   <img width="300" height="300" src="./public/sora.png" />
   <h2 align="center">SORA QRCODE WEB</h2>

[![Continuous Integration (Prettier, ESLint, Typescript)](https://github.com/reacto11mecha/sora-qrcode-web/actions/workflows/ci.yml/badge.svg)](https://github.com/reacto11mecha/sora-qrcode-web/actions/workflows/ci.yml)

</p>

Ini adalah repositori pendukung untuk [sora#v2](https://github.com/reacto11mecha/sora/tree/v2) karena fiturnya yang membutuhkan peserta pemilih untuk mengunduh gambar QR Code yang dibutuhkan untuk bukti bahwa dia memiliki hak pilih.

## Cara Pemakaian

Di bawah ini adalah tata cara pemakaian repositori ini.

### Prerequisites

- Node.js setidaknya versi 18.15.0 atau LTS, kunjungi https://nodejs.org/en
- npm (sudah bawaan Node.js) atau pnpm (kunjungi https://pnpm.io/installation)

### Menggunakan template repositori ini dan clone

Tekan tombol `Use this template` dan pilih [`Create a new repository`](https://github.com/reacto11mecha/sora-qrcode-web/generate), kemudian clone repositori tersebut ke komputer lokal.

![Pakai Template Repositori Ini](./assets/001-pakai-template.png)

Buat repositori sebagai private repo dikarenakan akan terdapat informasi sensitif di dalamnya.

![Buat Repositori Private](./assets/002-buat-repositori.png)

Lalu clone repositori private tersebut ke komputer lokal.

![Clone ke komputer lokal](./assets/003-clone-ke-local.png)

### Menginstall dependensi

Install dependensi yang diperlukan supaya web ini dapat berjalan. Bisa menggunakan pnpm (disarankan) atau menggunakan npm.

```sh
npm install

# atau menggunakan pnpm
pnpm install
```

![Hasil setelah menjalankan pnpm install](./assets/004-install-dependensi.png)

### Unduh data keseluruhan partisipan

Buka halaman administrator voting, menuju ke halaman partisipan. Disitu akan ditampilkan siapa saja peserta dan beberapa tombol yang dapat digunakan. Klik tombol `Export JSON` untuk mendapatkan data keseluruhan peserta.

![Tekan tombol Export JSON untuk mendapatkan data keseluruhan peserta](./assets/005-export-json.png)

Akan muncul prompt unduh, letakan dalam folder `/data` dengan nama `data-partisipan.json` (secara default seperti ini).

![Download file json ke folder data](./assets/006-download-data.png)

### Membuild web

Setelah data sudah siap, saatnya build aplikasi terlebih dahulu supaya dapat di preview di lokal dan tidak terlalu menjadi beban. Jalankan perintah dibawah ini untuk membuild web ini.

```sh
npm build

# atau menggunakan pnpm
pnpm build
```

![Hasil output setelah menjalankan build](./assets/007-run-build.png)

### Komentari baris yang ada di `.gitignore`

Pada awalnya data json yang di dapatkan dari administrator awalnya tidak bisa di commit beserta gambar yang dihasilkan, oleh karena itu komentari 2 baris terakhir yang ada di file [`.gitignore`](./.gitignore)

```diff
# Komentari dua baris di bawah ini
# ketika sudah di clone
-data/*.json
-public/img/*.png
+# data/*.json
+# public/img/*.png
```

![Setelah di comment](./assets/008-setelah-comment-gitignore.png)
