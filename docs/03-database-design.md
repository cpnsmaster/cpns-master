# CPNS Master — Database Design

**Version:** 2.0  
**Last Updated:** 2026-07-22

---

## 1. Database Strategy

CPNS Master menggunakan PostgreSQL melalui Supabase.

Database dirancang untuk mendukung:

- SKD
  - TWK
  - TIU
  - TKP
- SKB
  - Pranata Komputer
  - Formasi lain di masa depan
- Materi pembelajaran
- Bank soal
- Latihan soal
- Simulasi CAT
- Progress belajar
- Manajemen user
- Role-Based Access Control
- Subscription/premium di masa depan

Prinsip desain:

```text
Flexible
Scalable
Secure
Admin-managed
```

---

# 2. High-Level Entity Relationship

```text
auth.users
    │
    │ 1:1
    ▼
profiles
    │
    ├───────────────┐
    │               │
    ▼               ▼
user_progress   question_attempts
    │
    ▼
subjects
    │
    ├── exam_categories
    │
    ├── materials
    │
    └── questions
            │
            ▼
        question_options
```

Struktur utama:

```text
Exam Category
    ↓
Subject
    ↓
Material
    ↓
Question
    ↓
Question Options
```

Contoh:

```text
SKD
├── TWK
├── TIU
└── TKP

SKB
└── Pranata Komputer
```

---

# 3. Table: profiles

Tabel `profiles` menyimpan data tambahan user di luar Supabase Auth.

```text
profiles
├── id
├── full_name
├── avatar_url
├── role
├── status
├── target_exam
├── created_at
└── updated_at
```

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Relasi ke auth.users.id |
| full_name | text | Nama lengkap user |
| avatar_url | text | URL avatar |
| role | text | user, admin, super_admin |
| status | text | active, inactive, suspended |
| target_exam | text | Target ujian user |
| created_at | timestamptz | Waktu pembuatan |
| updated_at | timestamptz | Waktu perubahan |

## Role

```text
user
admin
super_admin
```

### User

Dapat:

- Membaca materi yang dipublikasikan
- Mengerjakan soal
- Mengikuti simulasi CAT
- Melihat progress sendiri
- Mengelola profil sendiri

### Admin

Dapat:

- Mengelola materi
- Mengelola soal
- Mengelola kategori ujian
- Import soal
- Publish konten

### Super Admin

Dapat:

- Semua akses Admin
- Mengelola user
- Mengelola role
- Mengelola admin
- Mengelola system settings
- Melihat audit logs

---

# 4. Account Status

```text
active
inactive
suspended
```

## active

User dapat menggunakan aplikasi secara normal.

## inactive

Akun dinonaktifkan.

User tidak dapat menggunakan fitur aplikasi.

## suspended

Akun ditangguhkan karena pelanggaran atau alasan administratif.

---

# 5. Table: exam_categories

Menyimpan kategori utama ujian.

```text
exam_categories
├── id
├── code
├── name
├── description
├── type
├── is_active
├── created_at
└── updated_at
```

## Example

| code | name | type |
|---|---|---|
| SKD | Seleksi Kompetensi Dasar | skd |
| SKB | Seleksi Kompetensi Bidang | skb |

---

# 6. Table: subjects

Menyimpan subjek atau bidang ujian.

```text
subjects
├── id
├── exam_category_id
├── code
├── name
├── description
├── sort_order
├── is_active
├── created_at
└── updated_at
```

## Example

```text
SKD
├── TWK
├── TIU
└── TKP

SKB
└── PRANATA_KOMPUTER
```

---

# 7. Table: materials

Menyimpan materi pembelajaran.

```text
materials
├── id
├── subject_id
├── title
├── slug
├── content
├── summary
├── status
├── author_id
├── published_at
├── created_at
└── updated_at
```

## Status

```text
draft
published
archived
```

---

# 8. Table: questions

Menyimpan bank soal.

```text
questions
├── id
├── subject_id
├── material_id
├── question_text
├── explanation
├── difficulty
├── status
├── created_by
├── updated_by
├── published_at
├── created_at
└── updated_at
```

## Difficulty

```text
easy
medium
hard
```

## Status

```text
draft
published
archived
```

---

# 9. Table: question_options

Menyimpan pilihan jawaban.

```text
question_options
├── id
├── question_id
├── option_key
├── option_text
├── is_correct
├── score
└── created_at
```

## Example

```text
A → Jawaban pertama
B → Jawaban kedua
C → Jawaban ketiga
D → Jawaban keempat
E → Jawaban kelima
```

Untuk TKP:

```text
A → score 5
B → score 4
C → score 3
D → score 2
E → score 1
```

---

# 10. Table: question_attempts

Menyimpan setiap jawaban user.

```text
question_attempts
├── id
├── user_id
├── question_id
├── selected_option_id
├── is_correct
├── score
├── time_spent_seconds
└── created_at
```

Data ini digunakan untuk:

- Menghitung akurasi
- Melihat riwayat latihan
- Menampilkan analisis kemampuan
- Membuat statistik belajar

---

# 11. Table: simulations

Menyimpan sesi simulasi CAT.

```text
simulations
├── id
├── user_id
├── exam_category_id
├── title
├── total_questions
├── started_at
├── completed_at
├── total_score
└── created_at
```

---

# 12. Table: simulation_answers

Menyimpan jawaban pada simulasi.

```text
simulation_answers
├── id
├── simulation_id
├── question_id
├── selected_option_id
├── is_correct
├── score
└── answered_at
```

---

# 13. Table: user_progress

Menyimpan ringkasan progress belajar user.

```text
user_progress
├── id
├── user_id
├── subject_id
├── total_questions
├── answered_questions
├── correct_answers
├── accuracy
├── total_study_time_seconds
├── last_studied_at
└── updated_at
```

---

# 14. Table: audit_logs

Menyimpan aktivitas penting admin dan super admin.

```text
audit_logs
├── id
├── user_id
├── action
├── entity_type
├── entity_id
├── metadata
├── created_at
└── ip_address
```

Contoh:

```text
USER_ROLE_UPDATED
QUESTION_CREATED
QUESTION_PUBLISHED
USER_SUSPENDED
USER_DELETED
```

---

# 15. Table: subscriptions

Disiapkan untuk monetisasi di masa depan.

```text
subscriptions
├── id
├── user_id
├── plan
├── status
├── started_at
├── expired_at
└── created_at
```

## Plan

```text
free
premium
```

## Status

```text
active
expired
cancelled
```

---

# 16. Relationships

```text
auth.users
    │
    └── profiles

exam_categories
    │
    └── subjects
            │
            ├── materials
            │
            └── questions
                    │
                    └── question_options

profiles
    │
    ├── question_attempts
    ├── simulations
    ├── user_progress
    ├── subscriptions
    └── audit_logs
```

---

# 17. Content Hierarchy

```text
Exam Category
    ↓
Subject
    ↓
Material
    ↓
Question
    ↓
Options
```

Contoh:

```text
SKD
└── TIU
    ├── Analogi
    │   ├── Materi
    │   └── Soal
    │
    ├── Silogisme
    │   ├── Materi
    │   └── Soal
    │
    └── Aritmatika
        ├── Materi
        └── Soal
```

---

# 18. Future Extensibility

Struktur ini dirancang agar dapat ditambahkan:

```text
SKB
├── Pranata Komputer
├── Guru
├── Analis Hukum
├── Penyuluh
└── Formasi lainnya
```

Tanpa mengubah struktur utama database.

---

# 19. Security Principles

Database menggunakan:

```text
Supabase Auth
+
Row Level Security
+
Role-Based Access Control
```

Prinsip:

```text
User hanya dapat mengubah data miliknya sendiri.

Admin hanya dapat mengelola konten sesuai izin.

Super Admin memiliki akses administrasi penuh.

Service Role Key tidak boleh berada di frontend.
```

---

# 20. Database Design Principle

CPNS Master menggunakan pendekatan:

```text
Content-driven
Role-aware
Scalable
Secure
Admin-managed
```

Tujuan akhir:

```text
Satu platform
    ↓
Banyak kategori ujian
    ↓
Banyak bidang
    ↓
Banyak materi
    ↓
Banyak soal
    ↓
Banyak pengguna
```

---

## End of Document
