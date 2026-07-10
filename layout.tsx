import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const metadata: Metadata = {
  title: 'MIB Chat',
  description: 'Messaging app with admin controls',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={cn(inter.className, "bg-dark-primary text-dark-text antialiased overflow-hidden")}>
        {children}
      </body>
    </html>
  )
}