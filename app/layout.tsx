import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lilfybr",
  description: "Handmade crochet pieces by Lilfybr",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
