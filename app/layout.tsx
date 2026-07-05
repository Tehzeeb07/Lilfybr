import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lilfybr",
  description: "Handmade crochet pieces by Lilfybr",
  icons: {
    icon: "/logoo.png"
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
