import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const siteDescription = 'Rajeet Ash is a software engineer building AI systems, developer tools, and digital products across TypeScript, Python, Kotlin, and cloud infrastructure.'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rajeet-04.github.io/rash'),
  title: 'Rajeet Ash — Software Engineer & Builder',
  description: siteDescription,
  keywords: ['Rajeet Ash', 'RASH', 'software engineer', 'AI systems', 'developer tools', 'TypeScript', 'Python', 'Kotlin', 'portfolio'],
  authors: [{ name: 'Rajeet Ash' }],
  creator: 'Rajeet Ash',
  publisher: 'Rajeet Ash',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: '/' },
  icons: {
    icon: '/r.png',
    shortcut: '/r.png',
    apple: '/r.png',
  },
  openGraph: {
    title: 'Rajeet Ash — Software Engineer & Builder',
    description: siteDescription,
    type: 'website',
    locale: 'en_US',
    siteName: 'Rajeet Ash Portfolio',
    images: [{ url: '/r.png', width: 512, height: 512, alt: 'RASH logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajeet Ash — Software Engineer & Builder',
    description: siteDescription,
    images: ['/r.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070c18',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/r.png" type="image/png" />
        <link rel="shortcut icon" href="/r.png" type="image/png" />
        <link rel="apple-touch-icon" href="/r.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
