import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components/layouts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Basefolio',
  description: 'Platform to search hackathons and events. A base profile for all your learning experiences.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
