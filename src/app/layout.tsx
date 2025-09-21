import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'RASH | Portfolio - Creative Developer & Designer',
  description: 'Rajeet Ash - 19-year-old innovator blending creativity with technology. B.Tech Computer Science student at IEM Newtown.',
  keywords: ['portfolio', 'developer', 'designer', 'creative', 'technology', 'computer science'],
  authors: [{ name: 'Rajeet Ash' }],
  openGraph: {
    title: 'RASH | Portfolio',
    description: 'Creative Developer & Designer - Blending creativity with technology',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff3333',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/r.jpeg" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}