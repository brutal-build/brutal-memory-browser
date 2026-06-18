import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function BracketButton({ children, className = '', ...props }: Props) {
  return (
    <button
      className={`border-2 border-white px-3 py-1.5 text-sm font-mono
        hover:bg-white hover:text-black transition-colors duration-100
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white
        ${className}`}
      {...props}
    >
      [ {children} ]
    </button>
  )
}
