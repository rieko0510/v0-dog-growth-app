import type React from "react"
import { DogRecordsProvider } from "@/hooks/use-dog-records"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <DogRecordsProvider>{children}</DogRecordsProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
