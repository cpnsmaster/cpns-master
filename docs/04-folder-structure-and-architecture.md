# CPNS Master — Folder Structure & Architecture

**Version:** 2.0  
**Last Updated:** 2026-07-22

---

# 1. Architecture Overview

CPNS Master menggunakan arsitektur frontend berbasis React + TypeScript.

Teknologi utama:

```text
React
TypeScript
Vite
React Router
Tailwind CSS
TanStack Query
Supabase
```

Arsitektur utama:

```text
User
    ↓
React Application
    ↓
AuthContext
    ↓
Supabase Auth
    ↓
Profile
    ↓
Role & Status
    ↓
Route Guard
    ↓
Layout
    ↓
Feature
    ↓
Supabase Database
```

---

# 2. Project Structure

```text
src/
│
├── app/
│   ├── router.tsx
│   ├── providers.tsx
│   └── config.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileSidebar.tsx
│   │   └── AppLayout.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Select.tsx
│   │   └── Spinner.tsx
│   │
│   └── feedback/
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       └── LoadingState.tsx
│
├── contexts/
│   └── AuthContext.tsx
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── learning/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── questions/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── simulations/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── admin/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   └── super-admin/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useMyProfile.ts
│   ├── useRole.ts
│   └── usePermissions.ts
│
├── layouts/
│   ├── AuthLayout.tsx
│   ├── AppLayout.tsx
│   └── AdminLayout.tsx
│
├── lib/
│   ├── supabase.ts
│   ├── queryClient.ts
│   └── utils.ts
│
├── pages/
│   ├── public/
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── user/
│   │   ├── DashboardPage.tsx
│   │   ├── LearningPage.tsx
│   │   ├── PracticePage.tsx
│   │   ├── SimulationPage.tsx
│   │   ├── ProgressPage.tsx
│   │   └── ProfilePage.tsx
│   │
│   ├── admin/
│   │   ├── AdminDashboardPage.tsx
│   │   ├── MaterialsPage.tsx
│   │   ├── QuestionsPage.tsx
│   │   ├── CategoriesPage.tsx
│   │   └── ImportPage.tsx
│   │
│   └── super-admin/
│       ├── SuperAdminDashboardPage.tsx
│       ├── UsersPage.tsx
│       ├── AdminsPage.tsx
│       ├── AuditLogsPage.tsx
│       └── SystemSettingsPage.tsx
│
├── routes/
│   ├── ProtectedRoute.tsx
│   ├── RoleRoute.tsx
│   └── PublicRoute.tsx
│
├── services/
│   ├── authService.ts
│   ├── profileService.ts
│   └── storageService.ts
│
├── stores/
│   └── appStore.ts
│
├── types/
│   ├── auth.ts
│   ├── profile.ts
│   ├── database.ts
│   └── common.ts
│
├── utils/
│   ├── constants.ts
│   ├── formatters.ts
│   └── validators.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 3. Application Layers

CPNS Master menggunakan beberapa lapisan utama.

```text
Pages
    ↓
Features
    ↓
Hooks
    ↓
Services
    ↓
Supabase
```

Contoh:

```text
QuestionsPage
    ↓
useQuestions()
    ↓
questionService
    ↓
Supabase
```

---

# 4. App Layer

Folder:

```text
src/app/
```

Berisi konfigurasi utama aplikasi.

```text
app/
├── router.tsx
├── providers.tsx
└── config.ts
```

## router.tsx

Mengatur:

```text
Public Routes
Protected Routes
Admin Routes
Super Admin Routes
```

## providers.tsx

Mengatur provider:

```text
QueryClientProvider
AuthProvider
ThemeProvider
```

---

# 5. Components Layer

Folder:

```text
src/components/
```

Berisi komponen reusable.

Contoh:

```text
Button
Card
Modal
Table
Input
Badge
```

Komponen di sini tidak boleh bergantung pada fitur bisnis tertentu.

Contoh yang baik:

```tsx
<Button>
    Simpan
</Button>
```

Contoh yang sebaiknya tidak berada di shared component:

```tsx
<CreateQuestionButton />
```

Karena itu merupakan bagian dari feature Questions.

---

# 6. Feature-Based Architecture

Fitur yang kompleks dikelompokkan berdasarkan domain.

```text
features/
├── auth/
├── learning/
├── questions/
├── simulations/
├── admin/
└── super-admin/
```

Setiap feature dapat memiliki:

```text
components
hooks
services
types
```

Contoh:

```text
features/questions/
├── components/
│   ├── QuestionCard.tsx
│   ├── QuestionForm.tsx
│   └── QuestionOptionEditor.tsx
│
├── hooks/
│   ├── useQuestions.ts
│   └── useQuestion.ts
│
├── services/
│   └── questionService.ts
│
└── types/
    └── question.ts
```

---

# 7. Authentication Architecture

```text
Supabase Auth
    ↓
AuthContext
    ↓
useAuth()
    ↓
Application
```

AuthContext bertanggung jawab terhadap:

```text
Current User
Session
Login
Register
Logout
Auth Loading
```

Contoh:

```tsx
const {
    user,
    session,
    isLoading,
    login,
    logout,
} = useAuth()
```

---

# 8. Authorization Architecture

Authentication:

```text
Siapa user tersebut?
```

Authorization:

```text
Apa yang boleh dilakukan user tersebut?
```

Flow:

```text
User
    ↓
Authenticated
    ↓
Load Profile
    ↓
Check Status
    ↓
Check Role
    ↓
Check Permission
    ↓
Allow / Deny
```

---

# 9. Route Architecture

## Public Routes

```text
/
├── /login
├── /register
└── /forgot-password
```

## User Routes

```text
/dashboard
/learning
/practice
/simulation
/progress
/profile
```

## Admin Routes

```text
/admin
/admin/materials
/admin/questions
/admin/categories
/admin/import
```

## Super Admin Routes

```text
/super-admin
/super-admin/users
/super-admin/admins
/super-admin/audit-logs
/super-admin/settings
```

---

# 10. Route Guard Architecture

```text
PublicRoute
    ↓
ProtectedRoute
    ↓
RoleRoute
```

Contoh:

```text
Public Route
    ↓
Login
    ↓
Protected Route
    ↓
Role Route
    ↓
Page
```

---

# 11. Layout Architecture

## Public Layout

```text
PublicLayout
├── Navbar
└── Content
```

## User Layout

```text
AppLayout
├── Sidebar
├── MobileSidebar
├── Header
└── Main Content
```

## Admin Layout

```text
AdminLayout
├── Admin Sidebar
├── Header
└── Main Content
```

## Super Admin Layout

```text
SuperAdminLayout
├── Super Admin Sidebar
├── Header
└── Main Content
```

---

# 12. Sidebar Architecture

Sidebar menu ditentukan berdasarkan role.

```text
User
    ↓
User Navigation
```

```text
Admin
    ↓
User Navigation
    +
Admin Navigation
```

```text
Super Admin
    ↓
User Navigation
    +
Admin Navigation
    +
Super Admin Navigation
```

Contoh:

```text
Sidebar
├── Dashboard
├── Belajar
├── Latihan Soal
├── Simulasi CAT
├── Progress
│
├── ADMIN
│   ├── Materi
│   ├── Bank Soal
│   └── Kategori
│
└── SUPER ADMIN
    ├── User Management
    ├── Admin Management
    ├── Audit Logs
    └── System Settings
```

---

# 13. Service Layer

Service bertanggung jawab terhadap komunikasi dengan Supabase.

Contoh:

```text
Page
    ↓
Hook
    ↓
Service
    ↓
Supabase
```

Contoh:

```ts
useQuestions()
    ↓
questionService.getQuestions()
    ↓
supabase.from('questions')
```

Service tidak boleh dipanggil langsung dari komponen UI jika operasi tersebut kompleks.

---

# 14. Hook Layer

Hook menghubungkan UI dengan data.

Contoh:

```ts
useQuestions()
useQuestion()
useCreateQuestion()
useUpdateQuestion()
useDeleteQuestion()
```

TanStack Query digunakan untuk:

```text
Fetching
Caching
Mutation
Loading State
Error State
Refetching
```

---

# 15. Data Flow

```text
User Interaction
        ↓
Component
        ↓
Hook
        ↓
Service
        ↓
Supabase
        ↓
Database
```

Response:

```text
Database
        ↓
Supabase
        ↓
Service
        ↓
Hook
        ↓
Component
        ↓
UI
```

---

# 16. Database Domain Architecture

```text
Authentication
    ↓
profiles
```

```text
Content
    ↓
exam_categories
    ↓
subjects
    ↓
materials
    ↓
questions
    ↓
question_options
```

```text
Learning
    ↓
question_attempts
    ↓
simulations
    ↓
simulation_answers
    ↓
user_progress
```

```text
Administration
    ↓
audit_logs
```

---

# 17. Role-Based Feature Architecture

```text
USER
│
├── Dashboard
├── Learning
├── Practice
├── Simulation
├── Progress
└── Profile
```

```text
ADMIN
│
├── Dashboard
├── Materials
├── Questions
├── Categories
└── Import
```

```text
SUPER ADMIN
│
├── Dashboard
├── User Management
├── Admin Management
├── Audit Logs
└── System Settings
```

---

# 18. SKD and SKB Architecture

Content tidak dibuat hardcoded berdasarkan formasi.

```text
Exam Category
    ↓
Subject
    ↓
Material
    ↓
Question
```

Contoh:

```text
SKD
├── TWK
├── TIU
└── TKP
```

```text
SKB
└── Pranata Komputer
```

Di masa depan:

```text
SKB
├── Pranata Komputer
├── Guru
├── Analis Hukum
└── Formasi Lainnya
```

---

# 19. Naming Conventions

## Components

```text
PascalCase

QuestionCard.tsx
DashboardPage.tsx
UserTable.tsx
```

## Hooks

```text
camelCase dengan prefix use

useAuth.ts
useQuestions.ts
useMyProfile.ts
```

## Services

```text
camelCase + Service

authService.ts
questionService.ts
profileService.ts
```

## Types

```text
camelCase

question.ts
profile.ts
database.ts
```

---

# 20. Dependency Rules

Dependency flow:

```text
Pages
    ↓
Features
    ↓
Hooks
    ↓
Services
    ↓
Lib
```

Shared components:

```text
Components
    ↓
Tidak bergantung pada Feature tertentu
```

Service:

```text
Services
    ↓
Tidak mengatur UI
```

Pages:

```text
Pages
    ↓
Tidak langsung mengandung query database kompleks
```

---

# 21. Scalability Principles

Arsitektur harus dapat mendukung:

```text
10 users
    ↓
1.000 users
    ↓
10.000 users
    ↓
100.000 users
```

Dengan penambahan:

```text
Caching
Pagination
Lazy Loading
Code Splitting
Database Indexing
Query Optimization
```

---

# 22. Final Architecture

```text
┌────────────────────────────┐
│           User             │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│        React App           │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│       AuthContext          │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│    Profile + Role Status   │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│       Route Guard          │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│          Layout            │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│          Feature           │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│           Hook             │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│          Service           │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│      Supabase + RLS        │
└────────────────────────────┘
```

---

# 23. Architecture Principles

CPNS Master menggunakan prinsip:

```text
Separation of Concerns
Feature-Based Architecture
Reusable Components
Secure Authorization
Scalable Database Access
Type Safety
```

Tujuan akhir:

```text
Mudah dikembangkan
Mudah dirawat
Mudah dipahami
Aman
Scalable
```

---

## End of Document
