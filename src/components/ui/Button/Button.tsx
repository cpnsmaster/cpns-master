import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary:
      'bg-yellow-400 text-neutral-950 hover:bg-yellow-300',
    secondary:
      'bg-neutral-800 text-white hover:bg-neutral-700',
    outline:
      'border border-neutral-700 text-white hover:border-yellow-400 hover:text-yellow-400',
    ghost:
      'text-neutral-300 hover:bg-neutral-800 hover:text-white',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-7 py-4 text-base',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button