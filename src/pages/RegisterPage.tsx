import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { registerUser } from '../services/authService'

function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] =
    useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')

    if (password !== passwordConfirmation) {
      setError('Konfirmasi password tidak sama.')
      return
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }

    setIsLoading(true)

    try {
      const data = await registerUser({
        name,
        email,
        password,
      })

      if (data.session) {
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan saat registrasi.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-yellow-400">
          Mulai perjalananmu
        </p>

        <h1 className="text-3xl font-black">
          Buat akun CPNS Master
        </h1>

        <p className="mt-3 text-sm text-neutral-400">
          Bergabung dan mulai persiapkan dirimu.
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
          id="name"
          type="text"
          label="Nama Lengkap"
          placeholder="Nama lengkap kamu"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

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
          placeholder="Minimal 8 karakter"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <Input
          id="password_confirmation"
          type="password"
          label="Konfirmasi Password"
          placeholder="Ulangi password"
          value={passwordConfirmation}
          onChange={(event) =>
            setPasswordConfirmation(
              event.target.value,
            )
          }
          required
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading
            ? 'Membuat akun...'
            : 'Buat Akun'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        Sudah memiliki akun?{' '}

        <Link
          to="/login"
          className="font-semibold text-yellow-400 hover:text-yellow-300"
        >
          Masuk sekarang
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage