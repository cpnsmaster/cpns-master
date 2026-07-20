# CPNS Master — Component Library

> Belajar lebih terarah. Latihan lebih cerdas. Lulus lebih siap.

**Document Status:** Draft  
**Version:** 1.0.0  
**Last Updated:** 2026-07-20  
**Product Name:** CPNS Master  

---

# 1. Component Library Overview

Component Library adalah kumpulan komponen UI reusable yang digunakan di seluruh aplikasi CPNS Master.

Tujuannya:

- Menjaga konsistensi desain.
- Mempercepat development.
- Mengurangi duplikasi kode.
- Memudahkan maintenance.
- Memastikan pengalaman pengguna konsisten.

Prinsip utama:

> Build once. Reuse everywhere.

---

# 2. Component Architecture

Komponen dibagi menjadi beberapa tingkatan:

```text
Primitive Components
        ↓
Composite Components
        ↓
Feature Components
        ↓
Page Components
```

Contoh:

```text
Button
   ↓
SearchInput
   ↓
QuestionFilter
   ↓
QuestionManagementPage
```

---

# 3. Component Categories

```text
components/
├── ui/
├── layout/
├── feedback/
├── navigation/
└── data-display/
```

Feature-specific components berada di dalam feature masing-masing.

---

# 4. UI Components

Komponen dasar:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Switch
Card
Badge
Avatar
```

---

# 5. Button

## Variants

```text
primary
secondary
outline
ghost
danger
link
```

## Sizes

```text
sm
md
lg
```

## States

```text
default
hover
active
focus
disabled
loading
```

## Example

```tsx
<Button variant="primary">
  Mulai Belajar
</Button>
```

## Type

```typescript
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "link";

type ButtonSize = "sm" | "md" | "lg";
```

---

# 6. Input

Input digunakan untuk:

- Login.
- Search.
- Form admin.
- Filter.

## States

```text
default
focus
error
disabled
readonly
```

## Example

```tsx
<Input
  label="Email"
  placeholder="Masukkan email"
/>
```

## Props

```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
}
```

---

# 7. Textarea

Digunakan untuk:

- Pembahasan.
- Deskripsi.
- Materi.
- Catatan.

```tsx
<Textarea
  label="Pembahasan"
  rows={6}
/>
```

---

# 8. Select

Digunakan untuk:

- Kategori.
- Difficulty.
- Status.
- Filter.

```tsx
<Select
  label="Kategori"
  options={categories}
/>
```

---

# 9. Checkbox

Digunakan untuk:

- Multiple selection.
- Bulk action.
- Setting.

```tsx
<Checkbox>
  Pilih semua
</Checkbox>
```

---

# 10. Radio

Digunakan untuk:

- Pilihan jawaban.
- Single selection.

```tsx
<Radio
  name="answer"
  value="A"
>
  Jawaban A
</Radio>
```

---

# 11. Switch

Digunakan untuk:

- Active/inactive.
- Publish/unpublish.
- Setting.

```tsx
<Switch
  label="Aktif"
/>
```

---

# 12. Card

Card adalah komponen utama untuk mengelompokkan informasi.

## Variants

```text
default
outlined
elevated
interactive
```

## Example

```tsx
<Card>
  <CardHeader>
    <CardTitle>TIU</CardTitle>
  </CardHeader>

  <CardContent>
    Latihan kemampuan numerik.
  </CardContent>
</Card>
```

---

# 13. Badge

Digunakan untuk status.

Contoh:

```text
FREE
PREMIUM
DRAFT
PUBLISHED
COMPLETED
LOCKED
```

## Variants

```text
default
success
warning
error
info
premium
```

---

# 14. Avatar

Digunakan untuk:

- User profile.
- Author.
- Admin.

Ukuran:

```text
sm
md
lg
xl
```

Fallback:

```text
Initials
```

Contoh:

```text
RB
```

---

# 15. Feedback Components

```text
Alert
Toast
Modal
Confirm Dialog
Spinner
Skeleton
Empty State
Error State
```

---

# 16. Alert

Digunakan untuk informasi penting.

Variants:

```text
info
success
warning
error
```

Contoh:

```tsx
<Alert variant="success">
  Materi berhasil diselesaikan.
</Alert>
```

---

# 17. Toast

Untuk feedback singkat.

Contoh:

```text
Materi berhasil disimpan.
Soal berhasil ditambahkan.
Terjadi kesalahan.
```

Toast tidak boleh digunakan untuk informasi yang membutuhkan perhatian panjang.

---

# 18. Modal

Digunakan untuk:

- Form.
- Detail.
- Konfirmasi.

Struktur:

```text
Modal
├── ModalHeader
├── ModalContent
└── ModalFooter
```

---

# 19. Confirm Dialog

Digunakan untuk action destruktif.

Contoh:

```text
Hapus soal ini?

Data yang dihapus tidak dapat dikembalikan.

[ Batal ] [ Hapus ]
```

Action destructive harus selalu memiliki konfirmasi.

---

# 20. Spinner

Digunakan untuk loading singkat.

Contoh:

```text
[ Loading... ]
```

Jangan menggunakan spinner untuk loading halaman besar jika skeleton lebih sesuai.

---

# 21. Skeleton

Digunakan untuk:

- Card.
- Table.
- List.
- Detail page.

Contoh:

```text
████████████
████████
████████████████
```

Tujuan:

> Memberikan gambaran struktur konten sebelum data tersedia.

---

# 22. Empty State

Digunakan ketika tidak ada data.

Contoh:

```text
Belum ada materi.

Mulai tambahkan materi untuk membangun perjalanan belajar kamu.

[ Lihat Materi ]
```

Empty state harus memiliki:

- Judul.
- Deskripsi.
- Optional illustration.
- CTA.

---

# 23. Error State

Contoh:

```text
Terjadi kesalahan

Data tidak dapat dimuat.

[ Coba Lagi ]
```

Pesan error harus mudah dipahami.

---

# 24. Navigation Components

```text
Navbar
Sidebar
Breadcrumb
Tabs
Pagination
Dropdown Menu
```

---

# 25. Navbar

Digunakan pada:

- Public website.
- Learner dashboard.

Elemen:

```text
Logo
Navigation
User Menu
CTA
```

---

# 26. Sidebar

Digunakan pada:

- Learner dashboard.
- Admin dashboard.

Sidebar harus memiliki:

```text
Active State
Hover State
Collapsed State
Mobile State
```

---

# 27. Breadcrumb

Digunakan untuk menunjukkan lokasi.

Contoh:

```text
Dashboard
  /
Materi
  /
TWK
```

---

# 28. Tabs

Digunakan untuk mengelompokkan konten.

Contoh:

```text
Overview
Materi
Latihan
Progress
```

---

# 29. Pagination

Digunakan untuk:

- Question table.
- User table.
- Material list.

Pagination harus memiliki:

```text
Previous
Page Number
Next
```

---

# 30. Data Display Components

```text
Table
Stat Card
Progress Bar
Progress Ring
Question Card
Material Card
Activity Item
```

---

# 31. Table

Digunakan terutama untuk Admin CMS.

Contoh:

```text
┌────────────┬──────────────┬─────────┐
│ Title      │ Status       │ Action  │
├────────────┼──────────────┼─────────┤
│ TWK 01     │ Published    │ Edit    │
└────────────┴──────────────┴─────────┘
```

Table harus mendukung:

- Loading.
- Empty.
- Error.
- Pagination.
- Row action.

---

# 32. Stat Card

Digunakan untuk dashboard.

Contoh:

```text
┌─────────────────────┐
│ Total Soal          │
│ 1,250                │
│ +12%                 │
└─────────────────────┘
```

---

# 33. Progress Bar

Digunakan untuk:

- Materi.
- Learning progress.
- Exam progress.

Contoh:

```text
Progress
████████░░ 80%
```

---

# 34. Progress Ring

Digunakan untuk statistik visual.

Contoh:

```text
     75%
   Progress
```

---

# 35. Material Card

Menampilkan:

```text
Title
Category
Difficulty
Duration
Access Type
Progress
```

Contoh:

```text
┌─────────────────────────────┐
│ TWK                         │
│ Pancasila dan Nasionalisme  │
│                             │
│ 20 menit       [ FREE ]     │
│                             │
│ Progress 60%                │
└─────────────────────────────┘
```

---

# 36. Question Card

Komponen penting dalam aplikasi.

Menampilkan:

```text
Question Number
Question Text
Options
Submit
Explanation
```

---

# 37. Question Option

Setiap option memiliki:

```text
Option Key
Option Text
Selected State
Correct State
Wrong State
Disabled State
```

Contoh:

```text
(A) Jawaban pertama
(B) Jawaban kedua
(C) Jawaban ketiga
```

---

# 38. Exam Timer

Digunakan pada simulasi CAT.

Menampilkan:

```text
01:24:35
```

States:

```text
Normal
Warning
Critical
Finished
```

Timer harus menggunakan waktu yang konsisten dengan session.

---

# 39. Question Navigator

Digunakan untuk navigasi soal.

Status:

```text
Unanswered
Answered
Marked
Current
```

Contoh:

```text
[1] [2] [3] [4] [5]
[6] [7] [8] [9] [10]
```

---

# 40. Result Summary

Menampilkan:

```text
Total Questions
Correct
Wrong
Unanswered
Score
```

Contoh:

```text
Total Soal       100
Benar             78
Salah             15
Tidak Dijawab      7
Nilai             78
```

---

# 41. Component Folder Structure

```text
src/components/
│
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   │
│   ├── Input/
│   ├── Card/
│   ├── Badge/
│   └── Modal/
│
├── layout/
│   ├── Header/
│   ├── Sidebar/
│   └── Footer/
│
├── feedback/
│   ├── Alert/
│   ├── Toast/
│   ├── Skeleton/
│   └── EmptyState/
│
└── data-display/
    ├── Table/
    ├── StatCard/
    └── ProgressBar/
```

---

# 42. Feature Component Structure

Komponen khusus fitur disimpan di dalam fitur.

Contoh:

```text
features/questions/
├── components/
│   ├── QuestionCard.tsx
│   ├── QuestionOption.tsx
│   └── QuestionExplanation.tsx
```

Jangan memasukkan komponen khusus soal ke:

```text
src/components/ui/
```

karena komponen tersebut bukan generic.

---

# 43. Component Responsibility

## Generic Component

```text
Button
Input
Card
```

Dapat digunakan di mana saja.

## Feature Component

```text
QuestionCard
MaterialCard
ExamTimer
```

Memiliki business context tertentu.

---

# 44. Props Design

Props harus:

- Jelas.
- Minimal.
- Type-safe.
- Tidak terlalu banyak.

Kurang baik:

```tsx
<Component
  prop1={}
  prop2={}
  prop3={}
  prop4={}
  prop5={}
  prop6={}
/>
```

Lebih baik:

```tsx
<QuestionCard
  question={question}
  onAnswer={handleAnswer}
/>
```

---

# 45. Controlled vs Uncontrolled

Form component harus mendukung pendekatan yang jelas.

Controlled:

```tsx
<Input
  value={email}
  onChange={setEmail}
/>
```

Untuk form kompleks, dapat menggunakan form library.

---

# 46. Component State

Komponen harus memiliki state yang terdefinisi.

Contoh Button:

```text
Default
Hover
Active
Focus
Disabled
Loading
```

Contoh Question Option:

```text
Default
Selected
Correct
Wrong
Disabled
```

---

# 47. Accessibility

Komponen harus memperhatikan:

- Semantic HTML.
- Keyboard navigation.
- Focus state.
- ARIA label.
- Kontras warna.

Contoh:

```tsx
<button aria-label="Mulai latihan">
  Mulai
</button>
```

---

# 48. Responsive Components

Komponen harus dapat digunakan pada:

```text
Mobile
Tablet
Desktop
```

Contoh:

```text
Desktop Sidebar
      ↓
Mobile Drawer
```

---

# 49. Component Documentation

Setiap komponen penting sebaiknya memiliki:

- Description.
- Props.
- Variants.
- Example usage.
- States.

Contoh:

```text
Button
├── Purpose
├── Variants
├── Sizes
├── States
└── Usage
```

---

# 50. Reusability Rules

Sebelum membuat komponen baru, tanyakan:

```text
Apakah komponen ini sudah ada?
        │
       Yes
        ↓
Gunakan komponen yang ada.
        │
       No
        ↓
Apakah akan digunakan kembali?
        │
       Yes
        ↓
Buat reusable component.
        │
       No
        ↓
Buat feature-specific component.
```

---

# 51. Component Naming

Gunakan nama yang deskriptif.

Baik:

```text
QuestionOption
MaterialProgress
ExamTimer
```

Hindari:

```text
Box
Thing
Item
Component1
```

---

# 52. Design Token Integration

Komponen harus menggunakan design token.

Contoh:

```text
Primary Color
Spacing
Radius
Typography
Shadow
```

Jangan hardcode nilai yang seharusnya menjadi bagian dari design system secara berulang.

---

# 53. Component Testing

Prioritas testing:

```text
Button
Input
Modal
QuestionOption
ExamTimer
```

Testing minimal:

- Render.
- User interaction.
- State changes.
- Error state.

---

# 54. Component Development Workflow

```text
Design
   ↓
Define Props
   ↓
Create Component
   ↓
Add Variants
   ↓
Add States
   ↓
Responsive Check
   ↓
Accessibility Check
   ↓
Test
```

---

# 55. Recommended MVP Components

Untuk MVP awal, buat terlebih dahulu:

```text
Button
Input
Card
Badge
Modal
Alert
Toast
Skeleton
EmptyState
ErrorState
Header
Sidebar
Footer
Pagination
ProgressBar
StatCard
MaterialCard
QuestionCard
QuestionOption
ExamTimer
QuestionNavigator
ResultSummary
```

---

# 56. Component Priority

## Phase 1

```text
Button
Input
Card
Badge
Header
Sidebar
```

## Phase 2

```text
Modal
Toast
Alert
Skeleton
EmptyState
```

## Phase 3

```text
MaterialCard
QuestionCard
QuestionOption
ProgressBar
```

## Phase 4

```text
ExamTimer
QuestionNavigator
ResultSummary
```

---

# 57. Final Component Architecture

```text
Shared UI
    ↓
Layout Components
    ↓
Feature Components
    ↓
Page Composition
```

Contoh:

```text
Button
   ↓
QuestionOption
   ↓
QuestionCard
   ↓
PracticePage
```

---

# Final Component Statement

> Component Library CPNS Master dibuat untuk memastikan seluruh aplikasi memiliki bahasa visual dan interaksi yang konsisten.

> Komponen generic dibuat reusable.

> Komponen khusus fitur tetap berada di dalam feature domain masing-masing.

> Setiap komponen harus memiliki struktur yang jelas, state yang terdefinisi, dan dapat digunakan secara konsisten.

> Dengan Component Library ini, proses pengembangan CPNS Master akan menjadi lebih cepat, terstruktur, dan mudah dikembangkan.
