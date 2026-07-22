import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'premium'
}

function Badge({
  variant = 'default',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      'bg-neutral-800 text-neutral-300',
    success:
      'bg-green-500/10 text-green-400',
    warning:
      'bg-yellow-500/10 text-yellow-400',
    premium:
      'bg-yellow-400 text-neutral-950',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge