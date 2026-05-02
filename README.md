# Task Management App

Aplikasi task management sederhana menggunakan React 19.2, Vite, Ant Design, Tailwind CSS, TanStack Query, Zustand, Axios, React Final Form, Yup, dan React Toastify.

## Menjalankan Aplikasi

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

## Environment

Contoh konfigurasi tersedia di `.env.example`.

```env
VITE_API_URL=https://jsonplaceholder.typicode.com/todos
VITE_STORAGE_KEY=task-management-app.local-tasks.v2
VITE_DELETED_STORAGE_KEY=task-management-app.deleted-task-ids.v2
VITE_ZUSTAND_STORE_NAME=TaskManagementApp
```

## Menu Aplikasi

### Dashboard

Menu `Dashboard` menampilkan ringkasan jumlah task:

- Total task
- Task completed
- Task pending

Menu ini berguna untuk melihat kondisi task secara cepat.

### Tasks

Menu `Tasks` adalah halaman utama untuk mengelola task.

Fitur yang tersedia:

- Menampilkan daftar task dari API
- Menambahkan task baru
- Mengubah status task menjadi completed atau pending
- Menghapus task
- Filter task berdasarkan `All`, `Completed`, dan `Pending`
- Search task menggunakan debounce
- Pagination menggunakan Ant Design
- Validasi input menggunakan React Final Form dan Yup
- Notifikasi sukses/error menggunakan React Toastify

Search dan filter dikirim sebagai query API. Data task baru disimpan melalui state global Zustand agar tetap tersedia saat dicari atau difilter.

### Reports

Menu `Reports` menampilkan laporan progress task:

- Progress completed
- Progress pending
- Jumlah task selesai
- Jumlah task belum selesai

Menu ini dipakai untuk melihat perbandingan status task dalam bentuk ringkasan visual.

### Settings

Menu `Settings` berisi pengaturan tampilan aplikasi:

- Compact cards
- Toggle sidebar laptop

Pengaturan sidebar dapat digunakan untuk membuka atau menutup sidebar pada tampilan laptop.

## Responsive Preview

Pada header setiap menu tersedia tombol:

- `Mobile`
- `Tablet`
- `Laptop`

Tombol ini digunakan untuk melihat penyesuaian layout berdasarkan device preview yang dipilih.


## Fetch API

Fetch API menggunakan Axios dan TanStack Query.

Query task mendukung:

- `title` untuk search
- `completed=true` untuk completed
- `completed=false` untuk pending
- `_page` dan `_per_page` untuk pagination
