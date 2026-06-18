interface Props {
  children: React.ReactNode
  className?: string
}

export function BracketTag({ children, className = '' }: Props) {
  return (
    <span className={`text-xs text-white/60 font-mono ${className}`}>
      [ {children} ]
    </span>
  )
}
