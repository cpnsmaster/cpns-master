# CPNS Master — Database Design

> Belajar lebih terarah. Latihan lebih cerdas. Lulus lebih siap.

**Document Status:** Draft  
**Version:** 1.0.0  
**Last Updated:** 2026-07-20  
**Product Name:** CPNS Master  
**Database:** PostgreSQL via Supabase  

---

# 1. Database Design Overview

Database CPNS Master dirancang untuk mendukung:

- Authentication.
- User profiles.
- Role-based access control.
- Learning materials.
- Question bank.
- Question explanations.
- Practice sessions.
- CAT simulations.
- Learning progress.
- Bookmarks.
- Admin CMS.
- Draft and publish workflow.
- Excel import.
- Future premium subscription.
- Audit logging.

Prinsip utama:

> Sederhana untuk MVP, aman untuk production, dan siap dikembangkan.

---

# 2. Database Architecture

Supabase digunakan sebagai backend utama.

```text
┌─────────────────────────────────────┐
│         SUPABASE AUTH               │
│        auth.users                   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│          PUBLIC DATABASE             │
│                                     │
│ profiles                            │
│ user_roles                          │
│ roles                               │
│                                     │
│ categories                          │
│ materials                           │
│ questions                           │
│ exam_packages                       │
│                                     │
│ learning_progress                   │
│ bookmarks                           │
│ practice_attempts                   │
│ exam_attempts                       │
│                                     │
│ audit_logs                          │
└─────────────────────────────────────┘
```

---

# 3. Core Design Principles

## 3.1 Authentication Separation

Authentication dikelola oleh:

```text
auth.users
```

Data profil tambahan dikelola oleh:

```text
public.profiles
```

Jangan menyimpan password secara manual di tabel public.

---

## 3.2 UUID Primary Key

Seluruh tabel utama menggunakan:

```text
uuid
```

Keuntungan:

- Aman.
- Tidak mudah ditebak.
- Cocok untuk distributed systems.
- Native dengan Supabase Auth.

---

## 3.3 Timestamps

Tabel yang relevan menggunakan:

```text
created_at
updated_at
```

Format:

```text
timestamptz
```

---

## 3.4 Soft Delete

Untuk data penting, lebih baik menggunakan:

```text
deleted_at
```

daripada langsung menghapus data secara permanen.

---

# 4. Entity Relationship Overview

```text
auth.users
     │
     ▼
profiles
     │
     ├──────────────┐
     ▼              ▼
user_roles       bookmarks
     │
     ▼
roles

categories
     │
     ├──────────────► materials
     │
     └──────────────► questions

materials
     │
     ▼
learning_progress

questions
     │
     ├──────────────► practice_attempts
     │
     └──────────────► exam_package_questions

exam_packages
     │
     ▼
exam_package_questions
     │
     ▼
questions

profiles
     │
     ├──────────────► practice_sessions
     │
     ├──────────────► exam_attempts
     │
     ├──────────────► bookmarks
     │
     └──────────────► learning_progress
```

---

# 5. Table Naming Convention

Nama tabel menggunakan:

```text
snake_case
```

Contoh:

```text
profiles
user_roles
learning_progress
exam_packages
```

Nama tabel menggunakan bentuk plural.

Contoh:

```text
questions
```

bukan:

```text
question
```

---

# 6. Authentication Tables

## 6.1 auth.users

Tabel ini dikelola oleh Supabase Auth.

Tidak dibuat secara manual.

Informasi umum:

```text
id
email
encrypted_password
created_at
```

Aplikasi tidak boleh mengakses password secara langsung.

---

# 7. profiles

Menyimpan informasi profil pengguna.

## Columns

| Column | Type | Required | Description |
|---|---|---|---|
| id | uuid | Yes | FK ke auth.users.id |
| full_name | text | No | Nama pengguna |
| avatar_url | text | No | URL avatar |
| bio | text | No | Deskripsi singkat |
| is_active | boolean | Yes | Status aktif |
| created_at | timestamptz | Yes | Waktu dibuat |
| updated_at | timestamptz | Yes | Waktu diperbarui |

## Relationship

```text
auth.users.id
      │
      ▼
profiles.id
```

Relationship:

```text
1 : 1
```

---

# 8. roles

Menyimpan role pengguna.

## Default Roles

```text
learner
premium_learner
content_editor
admin
super_admin
```

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| name | text | Nama role |
| description | text | Deskripsi |
| created_at | timestamptz | Waktu dibuat |

---

# 9. user_roles

Menghubungkan pengguna dengan role.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK profiles.id |
| role_id | uuid | FK roles.id |
| created_at | timestamptz | Waktu dibuat |

## Relationship

```text
profiles
    │
    ▼
user_roles
    │
    ▼
roles
```

Satu user dapat memiliki lebih dari satu role.

---

# 10. categories

Menyimpan kategori pembelajaran.

## Examples

```text
TWK
TIU
TKP
Pranata Komputer
Pengetahuan Umum
```

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| name | text | Nama kategori |
| slug | text | URL-friendly name |
| description | text | Deskripsi |
| icon | text | Icon identifier |
| is_active | boolean | Status aktif |
| sort_order | integer | Urutan |
| created_at | timestamptz | Waktu dibuat |
| updated_at | timestamptz | Waktu diperbarui |

---

# 11. materials

Menyimpan materi pembelajaran.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| category_id | uuid | FK categories.id |
| title | text | Judul materi |
| slug | text | URL slug |
| summary | text | Ringkasan |
| content | text | Isi materi |
| cover_image_url | text | Gambar cover |
| difficulty | text | Tingkat kesulitan |
| estimated_minutes | integer | Estimasi waktu |
| access_type | text | free/premium |
| status | text | draft/published/archived |
| author_id | uuid | FK profiles.id |
| published_at | timestamptz | Waktu publish |
| created_at | timestamptz | Waktu dibuat |
| updated_at | timestamptz | Waktu diperbarui |
| deleted_at | timestamptz | Soft delete |

---

# 12. material_topics

Digunakan apabila satu materi memiliki beberapa topik.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| material_id | uuid | FK materials.id |
| title | text | Judul topik |
| content | text | Isi topik |
| sort_order | integer | Urutan |
| created_at | timestamptz | Waktu dibuat |

---

# 13. questions

Menyimpan bank soal.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| category_id | uuid | FK categories.id |
| question_text | text | Pertanyaan |
| explanation | text | Pembahasan |
| difficulty | text | easy/medium/hard |
| access_type | text | free/premium |
| status | text | draft/published/archived |
| source | text | Sumber soal |
| author_id | uuid | FK profiles.id |
| published_at | timestamptz | Waktu publish |
| created_at | timestamptz | Waktu dibuat |
| updated_at | timestamptz | Waktu diperbarui |
| deleted_at | timestamptz | Soft delete |

---

# 14. question_options

Menyimpan pilihan jawaban.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| question_id | uuid | FK questions.id |
| option_key | text | A/B/C/D/E |
| option_text | text | Isi pilihan |
| is_correct | boolean | Jawaban benar |
| sort_order | integer | Urutan |
| created_at | timestamptz | Waktu dibuat |

## Relationship

```text
questions
     │
     ├── option A
     ├── option B
     ├── option C
     ├── option D
     └── option E
```

Satu soal dapat memiliki 2 sampai 5 pilihan jawaban.

---

# 15. exam_packages

Menyimpan paket simulasi.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| category_id | uuid | FK categories.id |
| title | text | Nama paket |
| slug | text | URL slug |
| description | text | Deskripsi |
| duration_minutes | integer | Durasi |
| question_count | integer | Jumlah soal |
| access_type | text | free/premium |
| status | text | draft/published/archived |
| author_id | uuid | FK profiles.id |
| published_at | timestamptz | Waktu publish |
| created_at | timestamptz | Waktu dibuat |
| updated_at | timestamptz | Waktu diperbarui |

---

# 16. exam_package_questions

Tabel pivot antara paket ujian dan soal.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| exam_package_id | uuid | FK exam_packages.id |
| question_id | uuid | FK questions.id |
| sort_order | integer | Urutan soal |
| created_at | timestamptz | Waktu dibuat |

## Relationship

```text
exam_packages
       │
       ▼
exam_package_questions
       │
       ▼
questions
```

Relationship:

```text
Many-to-Many
```

---

# 17. learning_progress

Menyimpan progress pengguna terhadap materi.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK profiles.id |
| material_id | uuid | FK materials.id |
| progress_percent | integer | 0-100 |
| is_completed | boolean | Status selesai |
| last_position | integer | Posisi terakhir |
| completed_at | timestamptz | Waktu selesai |
| created_at | timestamptz | Waktu dibuat |
| updated_at | timestamptz | Waktu diperbarui |

## Constraint

Satu user hanya memiliki satu progress untuk satu materi.

```text
UNIQUE(user_id, material_id)
```

---

# 18. bookmarks

Menyimpan materi atau soal yang disimpan pengguna.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK profiles.id |
| material_id | uuid | FK materials.id, nullable |
| question_id | uuid | FK questions.id, nullable |
| created_at | timestamptz | Waktu dibuat |

Satu bookmark hanya boleh mengarah ke:

```text
material
ATAU
question
```

---

# 19. practice_sessions

Menyimpan sesi latihan.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK profiles.id |
| category_id | uuid | FK categories.id |
| total_questions | integer | Jumlah soal |
| correct_answers | integer | Jawaban benar |
| wrong_answers | integer | Jawaban salah |
| unanswered | integer | Tidak dijawab |
| score | numeric | Nilai |
| started_at | timestamptz | Waktu mulai |
| completed_at | timestamptz | Waktu selesai |

---

# 20. practice_answers

Menyimpan jawaban pengguna dalam sesi latihan.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| session_id | uuid | FK practice_sessions.id |
| question_id | uuid | FK questions.id |
| selected_option_id | uuid | FK question_options.id |
| is_correct | boolean | Hasil jawaban |
| answered_at | timestamptz | Waktu menjawab |

---

# 21. exam_attempts

Menyimpan percobaan simulasi CAT.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK profiles.id |
| exam_package_id | uuid | FK exam_packages.id |
| total_questions | integer | Jumlah soal |
| correct_answers | integer | Jawaban benar |
| wrong_answers | integer | Jawaban salah |
| unanswered | integer | Tidak dijawab |
| score | numeric | Nilai |
| started_at | timestamptz | Waktu mulai |
| submitted_at | timestamptz | Waktu submit |

---

# 22. exam_answers

Menyimpan jawaban pada simulasi CAT.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| attempt_id | uuid | FK exam_attempts.id |
| question_id | uuid | FK questions.id |
| selected_option_id | uuid | FK question_options.id |
| is_marked | boolean | Ditandai |
| is_correct | boolean | Hasil jawaban |
| answered_at | timestamptz | Waktu menjawab |

---

# 23. content_imports

Menyimpan riwayat import soal.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| uploaded_by | uuid | FK profiles.id |
| file_name | text | Nama file |
| file_url | text | Lokasi file |
| total_rows | integer | Total baris |
| successful_rows | integer | Berhasil |
| failed_rows | integer | Gagal |
| status | text | pending/processing/completed/failed |
| error_log | jsonb | Detail error |
| created_at | timestamptz | Waktu dibuat |

---

# 24. subscriptions

Disiapkan untuk fitur premium di masa depan.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK profiles.id |
| plan_name | text | Nama paket |
| status | text | active/expired/cancelled |
| started_at | timestamptz | Mulai |
| expired_at | timestamptz | Berakhir |
| created_at | timestamptz | Waktu dibuat |

MVP dapat menggunakan access_type:

```text
free
premium
```

Sistem pembayaran dapat ditambahkan kemudian.

---

# 25. audit_logs

Menyimpan aktivitas penting administrator.

## Columns

| Column | Type | Description |
|---|---|---|
| id | uuid | Primary key |
| user_id | uuid | FK profiles.id |
| action | text | Aksi |
| entity_type | text | Tipe data |
| entity_id | uuid | ID data |
| old_data | jsonb | Data lama |
| new_data | jsonb | Data baru |
| created_at | timestamptz | Waktu aktivitas |

Contoh action:

```text
CREATE
UPDATE
DELETE
PUBLISH
ARCHIVE
IMPORT
```

---

# 26. Status Values

## Content Status

```text
draft
published
archived
```

## Access Type

```text
free
premium
```

## Difficulty

```text
easy
medium
hard
```

## Import Status

```text
pending
processing
completed
failed
```

---

# 27. Database Indexes

Index yang direkomendasikan:

```text
profiles.id

categories.slug

materials.slug
materials.category_id
materials.status
materials.access_type

questions.category_id
questions.status
questions.difficulty
questions.access_type

exam_packages.slug
exam_packages.status

learning_progress.user_id
learning_progress.material_id

bookmarks.user_id

practice_sessions.user_id

exam_attempts.user_id
exam_attempts.exam_package_id
```

---

# 28. Unique Constraints

## Categories

```text
UNIQUE(slug)
```

## Materials

```text
UNIQUE(slug)
```

## Questions

Tidak harus menggunakan slug.

## Exam Packages

```text
UNIQUE(slug)
```

## Learning Progress

```text
UNIQUE(user_id, material_id)
```

---

# 29. Foreign Key Strategy

Foreign key harus menggunakan:

```text
ON DELETE CASCADE
```

untuk data yang benar-benar bergantung pada parent.

Contoh:

```text
profiles
    ↓
learning_progress
```

Jika user dihapus, progress dapat ikut dihapus.

Untuk konten penting, pertimbangkan:

```text
ON DELETE RESTRICT
```

atau soft delete.

---

# 30. Row Level Security Strategy

Supabase RLS harus diaktifkan pada tabel yang berisi data pengguna.

Contoh:

```text
profiles
learning_progress
bookmarks
practice_sessions
practice_answers
exam_attempts
exam_answers
subscriptions
```

---

# 31. User Data Access

Pengguna hanya dapat melihat data miliknya sendiri.

Contoh:

```text
user_id = auth.uid()
```

Pengguna tidak boleh membaca data progress pengguna lain.

---

# 32. Public Content Access

Konten publik dapat dibaca jika:

```text
status = 'published'
```

Contoh:

```text
materials.status = 'published'
```

---

# 33. Admin Access

Admin dapat:

- Membuat konten.
- Mengedit konten.
- Menghapus konten.
- Mempublikasikan konten.

Akses harus ditentukan melalui role.

Jangan mengandalkan data role dari frontend.

---

# 34. Role Security

Role pengguna harus diverifikasi di database.

Contoh:

```text
auth.uid()
      ↓
user_roles
      ↓
roles
```

Frontend hanya digunakan untuk menampilkan UI.

Security sebenarnya harus berada pada:

```text
Supabase RLS
Database Policies
Server-side validation
```

---

# 35. Supabase Storage

Bucket yang direncanakan:

```text
avatars
```

Untuk avatar pengguna.

```text
material-assets
```

Untuk gambar dan aset materi.

```text
import-files
```

Untuk file Excel import.

```text
branding
```

Untuk logo dan aset aplikasi.

---

# 36. Storage Security

Storage harus memiliki aturan akses.

Contoh:

```text
avatars
→ User dapat mengelola avatar sendiri.

material-assets
→ Public read untuk konten published.

import-files
→ Hanya admin.

branding
→ Public read.
```

---

# 37. Data Lifecycle

## Material

```text
DRAFT
   ↓
PUBLISHED
   ↓
ARCHIVED
```

## Question

```text
DRAFT
   ↓
PUBLISHED
   ↓
ARCHIVED
```

## User Progress

```text
STARTED
   ↓
IN_PROGRESS
   ↓
COMPLETED
```

---

# 38. Data Integrity Rules

Sistem harus memastikan:

- Soal tidak boleh dipublish tanpa pilihan jawaban.
- Soal harus memiliki satu jawaban benar.
- Materi published harus memiliki konten.
- Paket ujian published harus memiliki soal.
- User hanya dapat membuat satu progress untuk satu materi.
- User hanya dapat membuat bookmark unik untuk satu konten.

---

# 39. Content Publishing Validation

Sebelum publish question:

```text
Question text exists
        ↓
At least 2 options
        ↓
Exactly 1 correct answer
        ↓
Explanation exists
        ↓
Category exists
        ↓
Publish allowed
```

---

# 40. Database Security Principles

1. Jangan menyimpan password manual.
2. Jangan percaya role dari frontend.
3. Gunakan RLS.
4. Validasi data di database.
5. Gunakan foreign key.
6. Gunakan unique constraint.
7. Gunakan soft delete untuk data penting.
8. Gunakan audit log untuk aksi administrator.

---

# 41. MVP Database Scope

Untuk MVP awal, tabel utama:

```text
profiles
roles
user_roles
categories
materials
questions
question_options
exam_packages
exam_package_questions
learning_progress
bookmarks
practice_sessions
practice_answers
exam_attempts
exam_answers
```

Tabel berikut dapat ditambahkan kemudian:

```text
content_imports
subscriptions
audit_logs
```

Namun struktur telah disiapkan sejak awal agar pengembangan berikutnya lebih mudah.

---

# 42. Recommended Initial Implementation Order

Urutan pembuatan database:

```text
1. profiles
      ↓
2. roles
      ↓
3. user_roles
      ↓
4. categories
      ↓
5. materials
      ↓
6. questions
      ↓
7. question_options
      ↓
8. exam_packages
      ↓
9. exam_package_questions
      ↓
10. learning_progress
      ↓
11. bookmarks
      ↓
12. practice_sessions
      ↓
13. practice_answers
      ↓
14. exam_attempts
      ↓
15. exam_answers
```

---

# 43. Future Database Expansion

Database dapat dikembangkan dengan:

- Daily challenges.
- Leaderboards.
- Achievements.
- Streaks.
- Notifications.
- AI conversations.
- Payment transactions.
- Coupons.
- Referral system.
- Affiliate tracking.
- Community discussions.

---

# 44. Final Database Decision

Database CPNS Master menggunakan:

```text
Supabase
      ↓
PostgreSQL
      ↓
Supabase Auth
      ↓
Supabase Storage
      ↓
Row Level Security
```

Arsitektur database dibuat:

> Simple enough for MVP. Secure enough for production. Flexible enough for growth.

---

# Final Database Statement

> Database CPNS Master harus menjadi fondasi yang aman, terstruktur, dan fleksibel bagi seluruh pengalaman belajar pengguna.

> Konten adalah data. Progress adalah data. Aktivitas pengguna adalah data.

> Semua data tersebut harus dikelola secara terstruktur agar CPNS Master dapat berkembang dari aplikasi sederhana menjadi platform pembelajaran yang scalable.
