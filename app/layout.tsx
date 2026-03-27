import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VIOLIN Benchmark - Visual Obedience Level-4 Evaluation',
  description: 'Evaluating AI\'s Ability to Generate Pure Colors with Pixel-Perfect Precision',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo.png',  // 统一使用 logo.png
        type: 'image/png',
      },
    ],
    apple: '/logo.png',  // Apple 设备也使用 logo.png
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}