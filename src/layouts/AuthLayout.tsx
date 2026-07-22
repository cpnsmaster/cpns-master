import { Link, Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Branding */}
        <section className="relative hidden overflow-hidden bg-neutral-900 lg:flex lg:items-center lg:justify-center">
          <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-[120px]" />

          <div className="relative max-w-md px-8">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-2xl font-black text-neutral-950">
              CM
            </div>

            <h1 className="text-4xl font-black">
              Persiapkan dirimu.
              <br />
              <span className="text-yellow-400">
                Raih impianmu.
              </span>
            </h1>

            <p className="mt-6 leading-8 text-neutral-400">
              Belajar lebih terarah. Latihan lebih cerdas.
              Lulus lebih siap.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">

            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-white"
            >
              ← Kembali ke beranda
            </Link>

            <Outlet />

          </div>
        </section>

      </div>
    </main>
  )
}

export default AuthLayout