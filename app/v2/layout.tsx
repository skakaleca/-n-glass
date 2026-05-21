import type { Metadata } from 'next'
import './v2.css'

export const metadata: Metadata = {
  title: 'O&N glass — v2 (frosted glass)',
  description: 'Алтернативен дизайн с матирано стъкло.',
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=DM+Serif+Display:ital@0;1&family=Geist+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
