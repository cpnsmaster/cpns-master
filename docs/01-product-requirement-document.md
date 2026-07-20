# CPNS Master — Product Requirement Document (PRD)

> Belajar lebih terarah. Latihan lebih cerdas. Lulus lebih siap.

**Document Status:** Draft  
**Version:** 1.0.0  
**Last Updated:** 2026-07-20  
**Product Name:** CPNS Master  

---

# 1. Product Overview

## 1.1 Product Name

**CPNS Master**

## 1.2 Tagline

> Belajar lebih terarah. Latihan lebih cerdas. Lulus lebih siap.

## 1.3 Product Type

CPNS Master adalah platform pembelajaran digital yang membantu pengguna mempersiapkan diri menghadapi seleksi Calon Pegawai Negeri Sipil (CPNS).

Platform ini menggabungkan:

- Materi pembelajaran.
- Bank soal.
- Pembahasan soal.
- Latihan mandiri.
- Simulasi CAT.
- Analisis hasil belajar.
- Progress tracking.
- Sistem pengelolaan konten melalui Admin CMS.

---

# 2. Product Vision

Membantu calon peserta seleksi CPNS belajar secara lebih terarah, berlatih secara konsisten, dan mempersiapkan diri menghadapi ujian dengan lebih percaya diri.

CPNS Master tidak hanya berfungsi sebagai kumpulan soal, tetapi sebagai platform belajar yang membantu pengguna memahami:

1. Apa yang harus dipelajari.
2. Apa yang harus dilatih.
3. Bagaimana perkembangan kemampuan mereka.
4. Bagian mana yang masih perlu ditingkatkan.

---

# 3. Product Mission

CPNS Master memiliki misi untuk:

- Menyediakan materi belajar yang terstruktur.
- Menyediakan soal latihan berkualitas.
- Menyediakan pembahasan yang mudah dipahami.
- Membantu pengguna belajar secara konsisten.
- Menyediakan pengalaman simulasi yang menyerupai ujian CAT.
- Memberikan data dan insight mengenai perkembangan kemampuan pengguna.

---

# 4. Problem Statement

Calon peserta CPNS sering menghadapi beberapa masalah dalam proses persiapan, antara lain:

## 4.1 Materi Belajar Tidak Terstruktur

Pengguna sering belajar dari berbagai sumber tanpa memiliki roadmap belajar yang jelas.

## 4.2 Kesulitan Menemukan Soal Berkualitas

Banyak sumber soal yang tidak memiliki:

- Kategori yang jelas.
- Pembahasan yang baik.
- Tingkat kesulitan yang terstruktur.

## 4.3 Tidak Mengetahui Perkembangan Kemampuan

Pengguna sering mengerjakan soal, tetapi tidak memiliki data mengenai:

- Perkembangan skor.
- Kategori yang masih lemah.
- Jumlah soal yang telah dikerjakan.
- Konsistensi belajar.

## 4.4 Kurangnya Simulasi Ujian

Pengguna membutuhkan pengalaman latihan yang lebih mirip dengan kondisi ujian sebenarnya.

## 4.5 Pengelolaan Konten yang Tidak Efisien

Pemilik platform membutuhkan sistem agar dapat mengelola:

- Materi.
- Soal.
- Pembahasan.
- Kategori.
- Paket simulasi.

Tanpa harus mengubah source code aplikasi.

---

# 5. Target Users

## 5.1 Primary Users

Calon peserta seleksi CPNS yang sedang mempersiapkan diri menghadapi ujian.

## 5.2 Secondary Users

- Pelajar.
- Mahasiswa.
- Fresh graduate.
- Pekerja yang ingin mempersiapkan diri lebih awal.
- Pengguna yang ingin meningkatkan kemampuan pada bidang tertentu.

## 5.3 Content Managers

Orang yang bertugas membuat dan mengelola:

- Materi.
- Soal.
- Pembahasan.
- Paket latihan.

## 5.4 System Administrators

Pengelola teknis dan operasional platform.

---

# 6. User Roles

## 6.1 Guest

Pengguna yang belum login.

### Permissions

Guest dapat:

- Mengakses landing page.
- Melihat informasi CPNS Master.
- Melihat fitur platform.
- Melihat konten gratis yang tersedia.
- Membuat akun.

Guest tidak dapat:

- Menyimpan progress.
- Mengakses fitur personal.
- Mengakses konten premium.

---

## 6.2 Learner

Pengguna yang telah memiliki akun.

### Permissions

Learner dapat:

- Mengakses dashboard.
- Membaca materi yang tersedia.
- Mengerjakan soal.
- Melihat pembahasan.
- Menyimpan bookmark.
- Melihat riwayat latihan.
- Melihat progress belajar.
- Mengikuti simulasi yang tersedia untuk akun mereka.

---

## 6.3 Premium Learner

Learner yang memiliki akses premium.

### Additional Permissions

Premium Learner dapat:

- Mengakses materi premium.
- Mengakses soal premium.
- Mengakses simulasi premium.
- Melihat analisis performa yang lebih lengkap.
- Mengakses fitur premium lainnya sesuai paket langganan.

---

## 6.4 Content Editor

Pengguna yang bertugas mengelola konten.

### Permissions

Content Editor dapat:

- Membuat materi.
- Mengedit materi.
- Membuat soal.
- Mengedit soal.
- Membuat pembahasan.
- Mengelola kategori.
- Mengelola draft konten.
- Mempublikasikan konten sesuai kewenangan.

---

## 6.5 Admin

Pengelola operasional platform.

### Permissions

Admin dapat:

- Mengelola konten.
- Mengelola pengguna.
- Mengelola kategori.
- Mengelola paket ujian.
- Melihat statistik sistem.
- Mengelola konfigurasi tertentu.

---

## 6.6 Super Admin

Pengguna dengan akses penuh terhadap sistem.

### Permissions

Super Admin dapat:

- Mengelola seluruh pengguna.
- Mengelola seluruh konten.
- Mengelola role dan permission.
- Mengelola konfigurasi sistem.
- Mengelola paket premium.
- Mengakses seluruh data operasional.

---

# 7. Product Modules

CPNS Master terdiri dari beberapa modul utama.

```text
CPNS Master
│
├── Authentication
│
├── Learning Hub
│   ├── Materials
│   ├── Categories
│   └── Learning Progress
│
├── Practice Center
│   ├── Question Bank
│   ├── Practice Sessions
│   ├── Explanations
│   └── Bookmarks
│
├── CAT Simulation
│   ├── Exam Packages
│   ├── Timer
│   ├── Question Navigation
│   ├── Answer Submission
│   └── Result Analysis
│
├── User Dashboard
│   ├── Progress
│   ├── Statistics
│   ├── Recent Activity
│   └── Recommendations
│
└── Admin CMS
    ├── Content Management
    ├── Question Management
    ├── Category Management
    ├── Exam Management
    └── User Management
```

---

# 8. MVP Scope

MVP adalah versi pertama CPNS Master yang dapat digunakan oleh pengguna nyata.

## 8.1 Authentication

Fitur:

- Register.
- Login.
- Logout.
- Forgot Password.
- Reset Password.
- User Profile.

---

## 8.2 User Dashboard

Dashboard menampilkan:

- Ringkasan progress belajar.
- Jumlah soal yang telah dikerjakan.
- Jumlah jawaban benar.
- Persentase akurasi.
- Aktivitas belajar terakhir.
- Progress materi.
- Rekomendasi aktivitas belajar.

---

## 8.3 Learning Library

Pengguna dapat:

- Melihat daftar materi.
- Melihat kategori materi.
- Membuka materi.
- Membaca materi.
- Menandai materi sebagai selesai.
- Melihat progress pembelajaran.

### Materi dapat memiliki:

- Judul.
- Deskripsi.
- Konten.
- Kategori.
- Tingkat kesulitan.
- Estimasi waktu belajar.
- Status publikasi.
- Status akses.

---

## 8.4 Question Bank

Pengguna dapat:

- Melihat daftar soal.
- Memilih kategori soal.
- Memilih tingkat kesulitan.
- Mengerjakan soal.
- Melihat jawaban.
- Melihat pembahasan.
- Menyimpan soal ke bookmark.
- Melihat riwayat pengerjaan.

---

## 8.5 Practice Session

Pengguna dapat melakukan latihan berdasarkan:

- Kategori.
- Jumlah soal.
- Tingkat kesulitan.
- Mode latihan.

Contoh mode:

- Latihan bebas.
- Latihan berdasarkan kategori.
- Latihan soal yang belum pernah dikerjakan.
- Latihan soal yang pernah salah.

---

## 8.6 CAT Simulation

Simulasi CAT harus memiliki:

- Paket ujian.
- Timer.
- Navigasi nomor soal.
- Status soal.
- Fitur tandai soal.
- Jawaban pengguna.
- Submit ujian.
- Perhitungan nilai.
- Review hasil.

Status soal dapat berupa:

- Belum dijawab.
- Sudah dijawab.
- Ditandai.
- Belum dikunjungi.

---

## 8.7 Result Analysis

Setelah menyelesaikan latihan atau simulasi, pengguna dapat melihat:

- Nilai.
- Jumlah benar.
- Jumlah salah.
- Jumlah tidak dijawab.
- Persentase akurasi.
- Waktu pengerjaan.
- Performa berdasarkan kategori.

---

## 8.8 Bookmark

Pengguna dapat menyimpan:

- Materi.
- Soal.

Bookmark dapat digunakan untuk:

- Belajar kembali.
- Mengulang soal.
- Menyimpan materi penting.

---

# 9. Admin CMS

Admin CMS adalah bagian penting dari CPNS Master.

Tujuan utamanya adalah agar pengelola dapat mengelola platform tanpa harus mengubah source code.

---

## 9.1 Material Management

Admin dapat:

- Membuat materi.
- Mengedit materi.
- Menghapus materi.
- Menyimpan sebagai draft.
- Mempublikasikan materi.
- Mengatur kategori.
- Mengatur tingkat kesulitan.
- Mengatur akses gratis atau premium.

### Status Materi

```text
DRAFT
  ↓
PUBLISHED
  ↓
ARCHIVED
```

---

## 9.2 Question Management

Admin dapat:

- Membuat soal.
- Mengedit soal.
- Menghapus soal.
- Menambahkan pilihan jawaban.
- Menentukan jawaban benar.
- Menambahkan pembahasan.
- Menentukan kategori.
- Menentukan tingkat kesulitan.
- Menyimpan draft.
- Mempublikasikan soal.

---

## 9.3 Excel Import

Sistem direncanakan memiliki fitur import soal menggunakan file Excel.

Contoh kolom:

```text
question
option_a
option_b
option_c
option_d
option_e
correct_answer
explanation
category
difficulty
```

Import harus memiliki:

- Validasi file.
- Validasi kolom.
- Preview data.
- Informasi error.
- Proses import.
- Hasil import.

---

## 9.4 Category Management

Admin dapat:

- Membuat kategori.
- Mengedit kategori.
- Menghapus kategori.
- Mengatur status aktif.
- Mengatur urutan kategori.

---

## 9.5 Exam Package Management

Admin dapat:

- Membuat paket simulasi.
- Menambahkan soal.
- Mengatur durasi.
- Mengatur jumlah soal.
- Mengatur akses gratis atau premium.
- Mempublikasikan paket.

---

# 10. Content Model

Konten CPNS Master harus dikelola sebagai data.

## Content Hierarchy

```text
Category
    ↓
Material
    ↓
Topic
    ↓
Question
    ↓
Explanation
```

Contoh:

```text
TWK
│
├── Nasionalisme
│   ├── Materi Nasionalisme
│   ├── Latihan Nasionalisme
│   └── Simulasi Nasionalisme
│
├── Integritas
│
└── Bela Negara
```

---

# 11. Monetization Model

CPNS Master direncanakan menggunakan model freemium.

## 11.1 Free Access

Pengguna gratis dapat memperoleh:

- Sebagian materi.
- Soal gratis.
- Latihan terbatas.
- Simulasi terbatas.

---

## 11.2 Premium Access

Pengguna premium memperoleh:

- Akses materi premium.
- Akses bank soal premium.
- Akses simulasi premium.
- Analisis performa lebih lengkap.
- Fitur premium lainnya.

---

## 11.3 Future Monetization

Fitur monetisasi dapat dikembangkan menjadi:

- Langganan bulanan.
- Langganan tahunan.
- Paket belajar.
- Paket simulasi.
- Bundling materi.

Sistem pembayaran akan ditentukan pada fase pengembangan berikutnya.

---

# 12. User Journey

## 12.1 New User

```text
Landing Page
      ↓
Register
      ↓
Onboarding
      ↓
Dashboard
      ↓
Select Learning Path
      ↓
Learn Material
      ↓
Practice Questions
      ↓
Review Result
      ↓
Improve Weak Areas
```

---

## 12.2 Returning User

```text
Login
  ↓
Dashboard
  ↓
Continue Learning
  ↓
Practice
  ↓
Review Progress
```

---

## 12.3 CAT Simulation Journey

```text
Dashboard
    ↓
CAT Simulation
    ↓
Select Exam Package
    ↓
Exam Instructions
    ↓
Start Exam
    ↓
Answer Questions
    ↓
Submit
    ↓
Result
    ↓
Performance Analysis
```

---

# 13. Functional Requirements

## FR-001 Authentication

Sistem harus memungkinkan pengguna untuk membuat akun dan melakukan login.

## FR-002 Content Access

Sistem harus menampilkan konten berdasarkan status publikasi dan hak akses pengguna.

## FR-003 Learning Progress

Sistem harus menyimpan progress belajar pengguna.

## FR-004 Question Practice

Sistem harus memungkinkan pengguna mengerjakan soal dan menyimpan hasil pengerjaan.

## FR-005 CAT Simulation

Sistem harus menyediakan simulasi dengan timer dan sistem penilaian.

## FR-006 Content Management

Admin harus dapat mengelola konten melalui CMS.

## FR-007 Role-Based Access

Sistem harus membatasi akses berdasarkan role pengguna.

## FR-008 Content Status

Konten harus mendukung status draft, published, dan archived.

## FR-009 Import Data

Sistem harus mendukung import soal dari file Excel pada fase MVP atau fase lanjutan sesuai prioritas pengembangan.

## FR-010 Analytics

Sistem harus menyimpan data yang diperlukan untuk menampilkan progress dan statistik pengguna.

---

# 14. Non-Functional Requirements

## 14.1 Performance

Aplikasi harus memiliki waktu respons yang baik dan meminimalkan request yang tidak diperlukan.

## 14.2 Security

Sistem harus menggunakan:

- Authentication.
- Authorization.
- Row Level Security.
- Validasi input.
- Secure environment variables.

## 14.3 Responsiveness

Aplikasi harus dapat digunakan pada:

- Desktop.
- Tablet.
- Mobile.

## 14.4 Maintainability

Kode harus:

- Terstruktur.
- Modular.
- Mudah dipahami.
- Menggunakan naming convention yang konsisten.

## 14.5 Scalability

Arsitektur harus memungkinkan:

- Penambahan fitur.
- Penambahan konten.
- Penambahan pengguna.
- Pengembangan sistem premium.

---

# 15. Technology Stack

## Frontend

- React.
- Vite.
- TypeScript.
- Tailwind CSS.

## Backend Services

- Supabase.
- PostgreSQL.
- Supabase Auth.
- Supabase Storage.
- Supabase APIs.

## Deployment

- Vercel.

## Version Control

- Git.
- GitHub.

---

# 16. MVP Roadmap

## Version 0.1 — Foundation

- Project setup.
- React + Vite.
- TypeScript.
- Tailwind CSS.
- Supabase connection.
- Basic application structure.
- Authentication.

---

## Version 0.2 — Learning

- Categories.
- Materials.
- Material detail.
- Learning progress.

---

## Version 0.3 — Practice

- Question bank.
- Question practice.
- Explanations.
- Bookmarks.
- Practice history.

---

## Version 0.4 — CAT Simulation

- Exam packages.
- Timer.
- Question navigation.
- Answer submission.
- Scoring.
- Result analysis.

---

## Version 0.5 — Admin CMS

- Admin dashboard.
- Material CRUD.
- Question CRUD.
- Category CRUD.
- Exam package CRUD.
- Draft and publish workflow.

---

## Version 0.6 — Import and Analytics

- Excel import.
- Import validation.
- User analytics.
- Content analytics.

---

## Version 1.0 — Public MVP

CPNS Master dapat digunakan oleh pengguna umum.

---

# 17. Future Features

Fitur berikut dapat dipertimbangkan pada fase berikutnya:

- Personalized learning path.
- AI learning assistant.
- AI-generated question explanation.
- Adaptive practice.
- Leaderboard.
- Achievement badges.
- Streak system.
- Daily challenge.
- Notification system.
- Mobile application.
- Payment subscription.
- Referral system.
- Affiliate system.
- Community features.

---

# 18. Success Metrics

## User Metrics

- Jumlah pengguna terdaftar.
- Jumlah pengguna aktif.
- Daily Active Users.
- Monthly Active Users.

## Learning Metrics

- Jumlah materi yang diselesaikan.
- Jumlah soal yang dikerjakan.
- Rata-rata akurasi.
- Jumlah sesi belajar.

## Engagement Metrics

- Frekuensi login.
- Learning streak.
- Durasi belajar.
- Jumlah simulasi yang diselesaikan.

## Business Metrics

- Jumlah pengguna premium.
- Conversion rate.
- Retention rate.
- Monthly recurring revenue.

---

# 19. Product Principles

CPNS Master harus mengikuti prinsip:

1. User First.
2. Content Is Data.
3. Simple Over Complex.
4. Quality Over Quantity.
5. Security by Design.
6. Scalable by Design.
7. Admin Empowerment.
8. Consistency.
9. Continuous Improvement.

---

# 20. MVP Definition of Done

MVP dianggap siap digunakan apabila:

- Pengguna dapat membuat akun.
- Pengguna dapat login.
- Pengguna dapat membaca materi.
- Pengguna dapat mengerjakan soal.
- Pengguna dapat melihat pembahasan.
- Pengguna dapat melihat hasil latihan.
- Pengguna dapat mengikuti simulasi CAT.
- Admin dapat mengelola materi.
- Admin dapat mengelola soal.
- Admin dapat mengelola kategori.
- Sistem memiliki proteksi akses.
- Aplikasi dapat digunakan pada desktop dan mobile.
- Aplikasi dapat di-deploy ke environment production.

---

# 21. Product Decision

CPNS Master akan dikembangkan secara bertahap.

Prioritas utama adalah:

> Membangun produk yang sederhana, stabil, mudah digunakan, dan memiliki fondasi yang baik sebelum menambahkan fitur kompleks.

Versi pertama tidak harus memiliki semua fitur.

Namun, setiap fitur yang dirilis harus memberikan manfaat nyata bagi pengguna.

---

# Final Product Statement

> CPNS Master adalah platform belajar CPNS yang membantu pengguna belajar lebih terarah, berlatih lebih cerdas, memahami kelemahan mereka, dan mempersiapkan diri menghadapi ujian dengan lebih siap.

> Belajar lebih terarah. Latihan lebih cerdas. Lulus lebih siap.
