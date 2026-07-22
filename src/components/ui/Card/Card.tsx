import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined'
}

function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  const styles = {
    default:
      'rounded-2xl bg-neutral-900',
    outlined:
      'rounded-2xl border border-neutral-800 bg-neutral-900',
  }

  return (
    <div
      className={`${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card