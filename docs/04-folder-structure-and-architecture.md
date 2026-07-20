# CPNS Master — Folder Structure & Architecture

> Belajar lebih terarah. Latihan lebih cerdas. Lulus lebih siap.

**Document Status:** Draft  
**Version:** 1.0.0  
**Last Updated:** 2026-07-20  
**Product Name:** CPNS Master  

---

# 1. Architecture Overview

CPNS Master menggunakan arsitektur frontend modern berbasis:

```text
React
   ↓
Vite
   ↓
TypeScript
   ↓
Tailwind CSS
   ↓
Supabase
   ↓
PostgreSQL
```

Deployment:

```text
GitHub
   ↓
Vercel
   ↓
Production Application
```

---

# 2. Architecture Principles

Arsitektur project mengikuti prinsip:

1. Feature-oriented.
2. Modular.
3. Reusable.
4. Type-safe.
5. Easy to maintain.
6. Secure by default.
7. Mobile-first.
8. Scalable.

---

# 3. Recommended Project Structure

```text
cpns-master/
│
├── .github/
│   └── workflows/
│
├── docs/
│   ├── 01-product-requirement-document.md
│   ├── 02-ui-ux-design-system.md
│   ├── 03-database-design.md
│   ├── 04-folder-structure-and-architecture.md
│   └── 05-component-library.md
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── assets/
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   └── providers.tsx
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── feedback/
│   │   └── data-display/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── materials/
│   │   ├── questions/
│   │   ├── practice/
│   │   ├── simulation/
│   │   ├── bookmarks/
│   │   ├── progress/
│   │   └── admin/
│   │
│   ├── hooks/
│   │
│   ├── layouts/
│   │
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── query-client.ts
│   │   └── constants.ts
│   │
│   ├── pages/
│   │   ├── public/
│   │   ├── learner/
│   │   └── admin/
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── material.service.ts
│   │   ├── question.service.ts
│   │   ├── practice.service.ts
│   │   └── exam.service.ts
│   │
│   ├── stores/
│   │
│   ├── types/
│   │
│   └── utils/
│
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── functions/
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# 4. src/app

Berisi konfigurasi utama aplikasi.

## App.tsx

Root component aplikasi.

Responsibilities:

- Render aplikasi.
- Menyediakan global providers.
- Menentukan root structure.

---

## router.tsx

Menyimpan konfigurasi routing.

Contoh:

```text
/
├── /
├── /login
├── /register
├── /dashboard
├── /materials
├── /practice
├── /simulation
└── /admin
```

---

## providers.tsx

Menyediakan provider global.

Contoh:

```text
AuthProvider
QueryClientProvider
ThemeProvider
ToastProvider
```

---

# 5. src/components

Berisi komponen reusable yang dapat digunakan oleh berbagai feature.

Komponen di folder ini tidak boleh bergantung pada business logic yang terlalu spesifik.

---

## 5.1 components/ui

Komponen dasar:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Card
Badge
Modal
Dropdown
Tabs
Tooltip
```

---

## 5.2 components/layout

Komponen layout:

```text
Header
Sidebar
Footer
PageContainer
Section
```

---

## 5.3 components/feedback

Komponen feedback:

```text
Alert
Toast
Spinner
Skeleton
EmptyState
ErrorState
```

---

## 5.4 components/data-display

Komponen display data:

```text
Table
Pagination
StatCard
ProgressBar
Avatar
```

---

# 6. Feature-Based Architecture

Setiap fitur memiliki folder sendiri.

Contoh:

```text
features/materials/
├── components/
├── hooks/
├── services/
├── types.ts
└── index.ts
```

Keuntungan:

- Fitur terisolasi.
- Mudah dikembangkan.
- Mudah dihapus.
- Mudah di-test.
- Business logic lebih terorganisir.

---

# 7. Feature: Auth

```text
features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ForgotPasswordForm.tsx
│
├── hooks/
│   └── useAuth.ts
│
├── services/
│   └── auth.service.ts
│
├── types.ts
└── index.ts
```

Responsibilities:

- Login.
- Register.
- Logout.
- Password reset.
- Session management.

---

# 8. Feature: Materials

```text
features/materials/
├── components/
│   ├── MaterialCard.tsx
│   ├── MaterialList.tsx
│   ├── MaterialContent.tsx
│   └── MaterialProgress.tsx
│
├── hooks/
│   ├── useMaterials.ts
│   └── useMaterialProgress.ts
│
├── services/
│   └── material.service.ts
│
├── types.ts
└── index.ts
```

---

# 9. Feature: Questions

```text
features/questions/
├── components/
│   ├── QuestionCard.tsx
│   ├── QuestionOption.tsx
│   ├── QuestionExplanation.tsx
│   └── QuestionFilters.tsx
│
├── hooks/
│   └── useQuestions.ts
│
├── services/
│   └── question.service.ts
│
├── types.ts
└── index.ts
```

---

# 10. Feature: Practice

```text
features/practice/
├── components/
│   ├── PracticeQuestion.tsx
│   ├── PracticeResult.tsx
│   └── PracticeSummary.tsx
│
├── hooks/
│   └── usePracticeSession.ts
│
├── services/
│   └── practice.service.ts
│
├── types.ts
└── index.ts
```

---

# 11. Feature: Simulation

```text
features/simulation/
├── components/
│   ├── ExamTimer.tsx
│   ├── QuestionNavigator.tsx
│   ├── ExamQuestion.tsx
│   ├── ExamSummary.tsx
│   └── ExamResult.tsx
│
├── hooks/
│   ├── useExamTimer.ts
│   └── useExamSession.ts
│
├── services/
│   └── exam.service.ts
│
├── types.ts
└── index.ts
```

---

# 12. Feature: Admin

Admin memiliki beberapa domain.

```text
features/admin/
├── materials/
├── questions/
├── categories/
├── exam-packages/
├── users/
├── imports/
└── analytics/
```

Contoh:

```text
features/admin/questions/
├── components/
│   ├── QuestionForm.tsx
│   ├── QuestionTable.tsx
│   └── QuestionImport.tsx
│
├── hooks/
├── services/
├── types.ts
└── index.ts
```

---

# 13. Pages

Pages berfungsi sebagai composition layer.

Page tidak seharusnya memiliki business logic yang terlalu banyak.

Contoh:

```text
pages/learner/DashboardPage.tsx
```

Page akan menggabungkan:

```text
Layout
   ↓
Feature Components
   ↓
Shared Components
```

---

# 14. Layouts

Layout digunakan untuk struktur halaman.

```text
layouts/
├── PublicLayout.tsx
├── LearnerLayout.tsx
├── AdminLayout.tsx
└── AuthLayout.tsx
```

---

# 15. Services

Service layer bertanggung jawab terhadap komunikasi dengan Supabase.

Contoh:

```typescript
export const getMaterials = async () => {
  const { data, error } = await supabase
    .from("materials")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};
```

Komponen tidak seharusnya langsung melakukan query Supabase secara berulang.

---

# 16. Service Layer Rules

## Good

```text
Component
    ↓
Hook
    ↓
Service
    ↓
Supabase
```

## Avoid

```text
Component
    ↓
Supabase Query
```

Service layer membuat kode lebih mudah dirawat.

---

# 17. Hooks

Hooks digunakan untuk:

- Fetch data.
- Mutation.
- Auth state.
- Form logic.
- Timer.
- Progress.

Contoh:

```text
useAuth()
useMaterials()
useQuestions()
usePracticeSession()
useExamTimer()
useDebounce()
```

---

# 18. State Management

Tidak semua state harus disimpan secara global.

## Local State

Gunakan untuk:

- Modal.
- Input.
- Toggle.
- Tab.
- UI state.

## Server State

Gunakan untuk:

- Materials.
- Questions.
- User data.
- Progress.

## Global State

Gunakan hanya jika diperlukan.

Contoh:

- Auth session.
- Global UI preferences.
- Active exam session.

---

# 19. Recommended State Strategy

```text
Local UI State
      ↓
React useState

Server State
      ↓
TanStack Query

Global State
      ↓
Context / Lightweight Store
```

Pada MVP, hindari penggunaan state management yang terlalu kompleks.

---

# 20. Routing Architecture

Contoh:

```text
/
├── /
├── /login
├── /register
│
├── /dashboard
├── /materials
├── /materials/:slug
├── /practice
├── /simulation
├── /simulation/:id
├── /bookmarks
└── /progress
```

Admin:

```text
/admin
├── /dashboard
├── /materials
├── /questions
├── /categories
├── /exam-packages
├── /users
└── /imports
```

---

# 21. Route Protection

Route dibagi menjadi:

```text
Public Route
Protected Route
Admin Route
```

## Public Route

Dapat diakses tanpa login.

## Protected Route

Membutuhkan login.

## Admin Route

Membutuhkan role tertentu.

---

# 22. Route Protection Flow

```text
User Request
      ↓
Authenticated?
      │
   No ─┴─ Yes
   ↓       ↓
Login   Check Role
            │
       Authorized?
          │
       No ┴ Yes
       ↓     ↓
   Forbidden  Page
```

---

# 23. TypeScript Strategy

Semua data penting harus memiliki type.

Contoh:

```typescript
export interface Material {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  categoryId: string;
  status: "draft" | "published" | "archived";
}
```

Hindari:

```typescript
const data: any = {};
```

Gunakan `any` seminimal mungkin.

---

# 24. Types Organization

Types dapat disimpan berdasarkan domain.

```text
types/
├── auth.ts
├── material.ts
├── question.ts
├── practice.ts
├── exam.ts
└── user.ts
```

---

# 25. Constants

Konstanta disimpan di:

```text
src/lib/constants.ts
```

Contoh:

```typescript
export const APP_NAME = "CPNS Master";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
};
```

---

# 26. Environment Variables

File:

```text
.env.local
```

Contoh:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

File:

```text
.env.example
```

harus disimpan di GitHub.

File:

```text
.env.local
```

tidak boleh di-commit.

---

# 27. Supabase Client

Lokasi:

```text
src/lib/supabase.ts
```

Tanggung jawab:

- Membuat Supabase client.
- Menggunakan environment variables.
- Menjadi satu sumber koneksi.

---

# 28. Import Convention

Urutan import:

```text
1. React
2. External Libraries
3. Internal Components
4. Features
5. Services
6. Types
7. Utils
```

Contoh:

```typescript
import { useState } from "react";

import { Button } from "@/components/ui/Button";

import { useMaterials } from "@/features/materials";

import type { Material } from "@/types/material";
```

---

# 29. Naming Convention

## Components

```text
PascalCase.tsx
```

Contoh:

```text
MaterialCard.tsx
```

## Hooks

```text
useCamelCase.ts
```

Contoh:

```text
useMaterials.ts
```

## Services

```text
domain.service.ts
```

Contoh:

```text
material.service.ts
```

## Utilities

```text
camelCase.ts
```

---

# 30. Component Rules

Component harus:

- Memiliki satu tanggung jawab utama.
- Tidak terlalu besar.
- Reusable bila memungkinkan.
- Memiliki props yang jelas.
- Menggunakan TypeScript.

Jika komponen terlalu besar:

```text
Split Component
```

---

# 31. Data Fetching Flow

```text
Page
   ↓
Feature Hook
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
```

---

# 32. Error Handling

Error harus ditangani pada beberapa level:

```text
Database Error
      ↓
Service
      ↓
Hook
      ↓
UI Error State
```

Pengguna tidak perlu melihat error teknis mentah.

---

# 33. Loading Handling

Setiap proses async harus memiliki:

```text
Loading
Success
Error
Empty
```

Contoh:

```text
Loading
   ↓
Success
   │
   ├── Data
   └── Empty
   ↓
Error
```

---

# 34. Admin Architecture

Admin CMS memiliki layout terpisah:

```text
AdminLayout
      ↓
AdminSidebar
      ↓
AdminPage
      ↓
AdminFeature
```

Contoh:

```text
Admin Question Management
      ↓
Question Table
      ↓
Question Form
      ↓
Question Service
      ↓
Supabase
```

---

# 35. Import Architecture

Alur import Excel:

```text
Upload File
      ↓
Validate File
      ↓
Parse Excel
      ↓
Preview Data
      ↓
Validate Rows
      ↓
Show Errors
      ↓
Confirm Import
      ↓
Insert Database
```

Import harus menggunakan proses yang aman dan dapat menampilkan error per baris.

---

# 36. Git Workflow

Branch utama:

```text
main
```

Feature branch:

```text
feature/auth
feature/materials
feature/questions
feature/admin
```

Bug fix:

```text
fix/login-error
fix/question-validation
```

---

# 37. Commit Convention

Gunakan format:

```text
type: description
```

Contoh:

```text
feat: add authentication
fix: resolve material loading error
docs: update database design
refactor: simplify question service
style: update button component
chore: update dependencies
```

---

# 38. Development Workflow

```text
1. Read PRD
      ↓
2. Read Design System
      ↓
3. Read Database Design
      ↓
4. Plan Feature
      ↓
5. Create Types
      ↓
6. Create Service
      ↓
7. Create Hook
      ↓
8. Create Components
      ↓
9. Create Page
      ↓
10. Test
      ↓
11. Commit
```

---

# 39. Testing Strategy

Testing dapat dikembangkan secara bertahap.

Prioritas:

1. Manual testing.
2. TypeScript checking.
3. Linting.
4. Unit testing.
5. Integration testing.
6. End-to-end testing.

---

# 40. Performance Principles

Aplikasi harus:

- Menghindari request berulang.
- Menggunakan pagination.
- Menggunakan lazy loading bila diperlukan.
- Mengoptimalkan gambar.
- Menghindari render yang tidak perlu.

---

# 41. Scalability Strategy

Ketika aplikasi berkembang:

```text
MVP
 ↓
Feature Modules
 ↓
Reusable Components
 ↓
Service Layer
 ↓
Optimized Queries
 ↓
Caching
```

Jangan melakukan optimasi kompleks sebelum benar-benar dibutuhkan.

---

# 42. Security Architecture

Security harus diterapkan pada:

```text
Authentication
      ↓
Authorization
      ↓
RLS
      ↓
Input Validation
      ↓
Database Constraints
```

Frontend tidak boleh menjadi satu-satunya lapisan keamanan.

---

# 43. Recommended Aliases

Gunakan alias:

```text
@
```

untuk:

```text
src/
```

Contoh:

```typescript
import { Button } from "@/components/ui/Button";
```

Daripada:

```typescript
import { Button } from "../../../components/ui/Button";
```

---

# 44. Architecture Decision

CPNS Master menggunakan:

```text
Feature-Based Architecture
+
Reusable Component System
+
Service Layer
+
TypeScript
+
Supabase
```

Tujuan:

> Setiap bagian aplikasi memiliki tempat yang jelas dan tanggung jawab yang jelas.

---

# 45. Final Folder Structure

```text
cpns-master/
│
├── docs/
│
├── public/
│
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── stores/
│   ├── types/
│   └── utils/
│
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── functions/
│
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# Final Architecture Statement

> CPNS Master akan dibangun dengan arsitektur modular, feature-based, type-safe, dan scalable.

> Setiap fitur memiliki tanggung jawab yang jelas.

> Setiap komponen yang dapat digunakan kembali akan dibuat reusable.

> Setiap komunikasi dengan database akan melalui service layer.

> Security akan diterapkan pada database dan backend service, bukan hanya pada frontend.

> Dengan fondasi ini, CPNS Master dapat berkembang dari MVP sederhana menjadi platform pembelajaran CPNS yang lebih besar tanpa harus melakukan rewrite total terhadap aplikasi.
