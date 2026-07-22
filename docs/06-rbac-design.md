# CPNS Master — Role-Based Access Control (RBAC)

**Version:** 1.0  
**Last Updated:** 2026-07-22

---

## 1. Overview

CPNS Master menggunakan Role-Based Access Control (RBAC) untuk mengatur hak akses pengguna berdasarkan role.

```text
User
    ↓
Role
    ↓
Permissions
    ↓
Allowed Actions
```

Sistem memiliki tiga role utama:

```text
user
admin
super_admin
```

---

# 2. Role Hierarchy

```text
super_admin
    │
    ├── Semua akses admin
    │
    └── Akses manajemen sistem

admin
    │
    └── Akses manajemen konten

user
    │
    └── Akses pembelajaran
```

Role tidak bersifat hierarkis secara otomatis di database.

Akses harus didefinisikan secara eksplisit melalui permission dan policy.

---

# 3. Role Definitions

## 3.1 User

Role default untuk pengguna umum.

### Access

```text
Dashboard
Materials
Questions
Practice
Simulation
Progress
Profile
```

### Permissions

```text
profile.read_own
profile.update_own

material.read_published

question.read_published

practice.create
practice.read_own

simulation.create
simulation.read_own

progress.read_own
```

---

## 3.2 Admin

Role untuk pengelola konten.

### Access

```text
Semua fitur user
+
Admin Dashboard
Material Management
Question Management
Category Management
Import Management
```

### Permissions

```text
material.create
material.read
material.update
material.delete
material.publish

question.create
question.read
question.update
question.delete
question.publish

category.create
category.read
category.update
category.delete

import.create
```

Admin tidak memiliki akses:

```text
User Management
Role Management
Admin Management
System Settings
```

---

## 3.3 Super Admin

Role dengan akses administrasi tertinggi.

### Access

```text
Semua fitur user
+
Semua fitur admin
+
User Management
Admin Management
Role Management
Audit Logs
System Settings
```

### Permissions

```text
user.read
user.create
user.update
user.delete
user.suspend
user.activate

admin.create
admin.update
admin.remove

role.read
role.update

audit_log.read

system_settings.read
system_settings.update
```

---

# 4. Permission Matrix

| Resource | User | Admin | Super Admin |
|---|---:|---:|---:|
| Own Profile | CRUD | CRUD | CRUD |
| Published Materials | Read | CRUD | CRUD |
| Questions | Read | CRUD | CRUD |
| Categories | Read | CRUD | CRUD |
| Practice | CRUD Own | Read | Read |
| Simulation | CRUD Own | Read | Read |
| Progress | Read Own | Read | Read |
| Users | No | No | CRUD |
| Admins | No | No | CRUD |
| Roles | No | No | CRUD |
| Audit Logs | No | No | Read |
| System Settings | No | No | CRUD |

---

# 5. Account Status

Setiap akun memiliki status:

```text
active
inactive
suspended
```

## active

Akun dapat menggunakan sistem secara normal.

## inactive

Akun dinonaktifkan.

Akses aplikasi dibatasi.

## suspended

Akun ditangguhkan oleh administrator.

Akses aplikasi ditolak.

---

# 6. Authorization Flow

```text
User
    ↓
Supabase Auth
    ↓
Authenticated Session
    ↓
Load Profile
    ↓
Check Account Status
    ↓
Check Role
    ↓
Check Permission
    ↓
Allow / Deny
```

Contoh:

```text
User membuka:

/super-admin/users

        ↓

Apakah sudah login?
        │
        ├── Tidak → Redirect /login
        │
        └── Ya
              ↓

Apakah status active?
        │
        ├── Tidak → Access Denied
        │
        └── Ya
              ↓

Apakah role super_admin?
        │
        ├── Tidak → Access Denied
        │
        └── Ya → Allow
```

---

# 7. Frontend Route Protection

Frontend menggunakan route guard.

Contoh:

```text
Public Routes
├── /
├── /login
└── /register
```

```text
Protected Routes
├── /dashboard
├── /learning
├── /practice
├── /simulation
└── /profile
```

```text
Admin Routes
├── /admin
├── /admin/materials
├── /admin/questions
├── /admin/categories
└── /admin/import
```

```text
Super Admin Routes
├── /super-admin
├── /super-admin/users
├── /super-admin/admins
├── /super-admin/audit-logs
└── /super-admin/settings
```

---

# 8. Frontend Route Guard

Route guard bertugas untuk:

```text
Check Authentication
Check Account Status
Check Role
```

Contoh konsep:

```ts
<ProtectedRoute>
    <DashboardPage />
</ProtectedRoute>
```

Untuk admin:

```ts
<RoleRoute allowedRoles={['admin', 'super_admin']}>
    <AdminPage />
</RoleRoute>
```

Untuk super admin:

```ts
<RoleRoute allowedRoles={['super_admin']}>
    <UserManagementPage />
</RoleRoute>
```

---

# 9. Important Security Principle

Frontend route protection bukan satu-satunya lapisan keamanan.

```text
Frontend Guard
        +
Supabase RLS
        +
Database Policies
```

Frontend hanya bertugas memberikan pengalaman pengguna yang baik.

Keamanan sebenarnya harus ditegakkan di database.

---

# 10. Supabase Row Level Security

Semua tabel yang berisi data user harus menggunakan RLS.

Contoh:

```text
profiles
questions
materials
question_attempts
simulations
user_progress
audit_logs
```

---

# 11. User Data Policy

User hanya dapat membaca dan mengubah data miliknya sendiri.

```text
user_id = auth.uid()
```

Contoh:

```text
User A
    ↓
Hanya dapat membaca
    ↓
Data milik User A
```

User A tidak dapat membaca:

```text
Data User B
```

---

# 12. Profile Policy

User dapat:

```text
SELECT own profile
UPDATE own profile
```

User tidak dapat:

```text
UPDATE role
UPDATE status
UPDATE another user
```

Perubahan role dan status hanya dapat dilakukan oleh:

```text
super_admin
```

---

# 13. Content Policy

Published content dapat dibaca oleh user.

```text
status = 'published'
```

Admin dapat mengelola content.

Super Admin dapat mengelola semua content.

```text
user
    → read published

admin
    → create
    → read
    → update
    → delete
    → publish

super_admin
    → full access
```

---

# 14. Role Security

Role tidak boleh disimpan sebagai sumber kebenaran di:

```text
localStorage
sessionStorage
frontend state
```

Contoh yang tidak aman:

```ts
localStorage.setItem('role', 'super_admin')
```

Sumber role harus berasal dari:

```text
Supabase Database
```

atau mekanisme authorization server-side yang terpercaya.

---

# 15. Role Change Flow

```text
Super Admin
    ↓
Open User Management
    ↓
Select User
    ↓
Change Role
    ↓
Validate Permission
    ↓
Update profiles.role
    ↓
Create Audit Log
```

Contoh:

```text
user
    ↓
admin
```

atau:

```text
admin
    ↓
user
```

Perubahan role harus dicatat.

---

# 16. Account Status Change Flow

```text
Super Admin
    ↓
Select User
    ↓
Change Status
    ↓
Validate
    ↓
Update Profile
    ↓
Create Audit Log
```

Contoh:

```text
active
    ↓
suspended
```

atau:

```text
suspended
    ↓
active
```

---

# 17. User Management

Super Admin dapat:

```text
View Users
Search Users
Filter Users
View User Detail
Change User Role
Change User Status
Deactivate User
Suspend User
Activate User
```

User management tidak boleh tersedia untuk role:

```text
user
admin
```

---

# 18. Admin Management

Super Admin dapat:

```text
Create Admin
Promote User to Admin
Demote Admin to User
Suspend Admin
Activate Admin
```

Admin tidak dapat:

```text
Create Super Admin
Delete Super Admin
Change Super Admin Role
```

---

# 19. Super Admin Protection

Super Admin harus memiliki perlindungan khusus.

Sistem tidak boleh mengizinkan:

```text
Super Admin
    ↓
Accidentally deleted
```

atau:

```text
Super Admin
    ↓
Demoted by ordinary admin
```

Minimal harus terdapat:

```text
Super Admin Only Permission
```

---

# 20. Audit Logs

Semua tindakan administratif penting harus dicatat.

Contoh:

```text
USER_CREATED
USER_UPDATED
USER_SUSPENDED
USER_ACTIVATED
ROLE_CHANGED
MATERIAL_CREATED
MATERIAL_UPDATED
MATERIAL_DELETED
QUESTION_CREATED
QUESTION_PUBLISHED
```

Struktur:

```text
audit_logs
├── id
├── user_id
├── action
├── entity_type
├── entity_id
├── metadata
└── created_at
```

---

# 21. Security Layers

```text
Layer 1
Authentication
    ↓
Layer 2
Account Status
    ↓
Layer 3
Role
    ↓
Layer 4
Permission
    ↓
Layer 5
Row Level Security
```

Semua lapisan harus berjalan bersama.

---

# 22. Final RBAC Architecture

```text
┌───────────────────────────┐
│        Supabase Auth      │
└──────────────┬────────────┘
               │
               ▼
┌───────────────────────────┐
│         profiles          │
│                           │
│  role                     │
│  status                   │
└──────────────┬────────────┘
               │
               ▼
┌───────────────────────────┐
│       Route Guard         │
└──────────────┬────────────┘
               │
               ▼
┌───────────────────────────┐
│      Permission Check     │
└──────────────┬────────────┘
               │
               ▼
┌───────────────────────────┐
│      Supabase RLS         │
└───────────────────────────┘
```

---

# 23. RBAC Principles

CPNS Master menggunakan prinsip:

```text
Least Privilege
```

Artinya:

> Setiap role hanya mendapatkan akses yang benar-benar diperlukan.

```text
User
    → Learning

Admin
    → Content Management

Super Admin
    → System Management
```

---

## End of Document
