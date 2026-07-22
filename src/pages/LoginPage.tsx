import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { loginUser } from '../services/authService'

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      await loginUser(email, password)

      navigate('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan saat login.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
          Selamat datang kembali
        </p>

        <h1 className="text-3xl font-black">
          Masuk ke CPNS Master
        </h1>

        <p className="mt-3 text-sm text-neutral-400">
          Lanjutkan perjalanan belajar kamu.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="nama@email.com"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Masukkan password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Masuk'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        Belum memiliki akun?{' '}

        <Link
          to="/register"
          className="font-semibold text-yellow-400 hover:text-yellow-300"
        >
          Daftar sekarang
        </Link>
      </p>
    </div>
  )
}

export default LoginPage