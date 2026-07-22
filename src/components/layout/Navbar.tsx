import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../ui/Button'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800/50 bg-neutral-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg font-black text-neutral-950">
            CM
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide text-white">
              CPNS <span className="text-yellow-400">MASTER</span>
            </p>

            <p className="hidden text-[10px] text-neutral-500 sm:block">
              Learn · Practice · Pass
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-neutral-400 transition hover:text-white"
          >
            Fitur
          </a>

          <a
            href="#about"
            className="text-sm text-neutral-400 transition hover:text-white"
          >
            Tentang
          </a>

          <a
            href="/login"
            className="text-sm text-neutral-400 transition hover:text-white"
          >
            Masuk
          </a>

          <Button size="sm">
            Mulai Belajar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-neutral-300 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <a href="#features" className="text-neutral-300">
              Fitur
            </a>

            <a href="#about" className="text-neutral-300">
              Tentang
            </a>

            <a href="/login" className="text-neutral-300">
              Masuk
            </a>

            <Button>
              Mulai Belajar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar