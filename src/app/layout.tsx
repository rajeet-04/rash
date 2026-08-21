import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.rajeet.in'
  ),
  title: 'RASH | Portfolio - Creative Developer & Designer',
  description: 'Portfolio of Rajeet Ash — creative developer and designer crafting full-stack web, AI/ML, mobile, and cloud experiences with TypeScript, Next.js, and modern UI/UX.',
  keywords: [
    'Rajeet Ash', 'RASH', 'portfolio', 'software engineer', 'full stack developer', 'AI engineer',
    'Next.js', 'TypeScript', 'React', 'UI designer', 'UX designer', 'cloud', 'mobile', 'web',
  ],
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
    title: 'RASH | Portfolio - Creative Developer & Designer',
    description: 'Creative developer blending design, AI/ML, and full-stack engineering to ship bold digital products.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RASH Portfolio',
    images: [
      {
        url: '/r.png',
        width: 512,
        height: 512,
        alt: 'RASH logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RASH | Creative Developer & Designer',
    description: 'Explore the work of Rajeet Ash: full-stack, AI/ML, mobile, and thoughtful UX.',
    images: ['/r.png'],
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
        <link rel="icon" href="/r.png" type="image/png" />
        <link rel="shortcut icon" href="/r.png" type="image/png" />
        <link rel="apple-touch-icon" href="/r.png" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
