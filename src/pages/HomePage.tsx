import { ArrowRight, BookOpen, Brain, Trophy } from 'lucide-react'

import Navbar from '../components/layout/Navbar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32">
        <div className="absolute left-1/2 top-0 z-0 h-125 w-175 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
          <Badge variant="premium">
            Persiapan CPNS Lebih Terarah
          </Badge>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Belajar Lebih Terarah.
            <br />
            <span className="text-yellow-400">
              Lulus Lebih Siap.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
            Platform belajar dan latihan CPNS untuk membantu kamu
            mempersiapkan diri dengan materi terstruktur, ribuan soal,
            dan simulasi CAT yang realistis.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg">
              Mulai Belajar Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
            >
              Lihat Fitur
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow-400">
            Semua yang kamu butuhkan
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Persiapkan dirimu dengan lebih cerdas
          </h2>

          <p className="mt-4 text-neutral-400">
            Belajar bukan hanya tentang mengerjakan banyak soal.
            Tetapi tentang belajar dengan strategi yang tepat.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card
            variant="outlined"
            className="p-8 transition hover:-translate-y-1 hover:border-yellow-400/50"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
              <BookOpen className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold">
              Materi Terstruktur
            </h3>

            <p className="mt-3 leading-7 text-neutral-400">
              Pelajari materi berdasarkan kategori dan tahapan
              sehingga proses belajar menjadi lebih terarah.
            </p>
          </Card>

          <Card
            variant="outlined"
            className="p-8 transition hover:-translate-y-1 hover:border-yellow-400/50"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
              <Brain className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold">
              Ribuan Latihan Soal
            </h3>

            <p className="mt-3 leading-7 text-neutral-400">
              Latih kemampuanmu dengan berbagai jenis soal dan
              pahami pembahasan setiap jawaban.
            </p>
          </Card>

          <Card
            variant="outlined"
            className="p-8 transition hover:-translate-y-1 hover:border-yellow-400/50"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
              <Trophy className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold">
              Simulasi CAT
            </h3>

            <p className="mt-3 leading-7 text-neutral-400">
              Rasakan pengalaman mengerjakan simulasi dengan
              timer dan sistem penilaian yang realistis.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-6 pb-24 lg:px-8"
      >
        <div className="overflow-hidden rounded-3xl border border-yellow-400/20 bg-yellow-400 p-8 text-neutral-950 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">
                Siap mulai perjalananmu?
              </h2>

              <p className="mt-3 max-w-xl text-neutral-800">
                Belajar lebih terarah. Latihan lebih cerdas.
                Lulus lebih siap.
              </p>
            </div>

            <Button
              variant="secondary"
              size="lg"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © 2026 CPNS Master. All rights reserved.
          </p>

          <p>
            Belajar lebih terarah. Latihan lebih cerdas. Lulus lebih siap.
          </p>
        </div>
      </footer>
    </main>
  )
}

export default HomePage