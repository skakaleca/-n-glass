import type { Metadata } from 'next'
import { Fraunces, Inter_Tight } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'O&N Glass — Стъкларско ателие. Прецизна обработка на стъкло',
  description:
    'Душ кабини, огледала, паравани, аквариуми, стъкла по размер. Изработка и монтаж в Пловдив.',
  keywords: 'стъкло, душ кабини, огледала, паравани, аквариуми, Пловдив, стъкларско ателие',
  openGraph: {
    title: 'O&N Glass — Стъкларско ателие',
    description: 'Прецизна обработка на стъкло. Душ кабини, огледала, паравани и аквариуми.',
    locale: 'bg_BG',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg" className={`${fraunces.variable} ${interTight.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter-tight), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
