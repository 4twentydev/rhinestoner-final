import type React from "react"
import type { Metadata } from "next"
import { Poppins, Lilita_One } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/use-cart"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lilita",
})

export const metadata: Metadata = {
  title: "Rhinestoner | Shine Brighter. Be Extra.",
  description: "Luxury rhinestone accessories for lighters, cases, containers, and phones.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${poppins.variable} ${lilitaOne.variable} font-sans min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'