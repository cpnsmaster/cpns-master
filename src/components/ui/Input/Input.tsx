import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-300"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`w-full rounded-xl border bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/10 ${
          error
            ? 'border-red-500'
            : 'border-neutral-800'
        } ${className}`}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input