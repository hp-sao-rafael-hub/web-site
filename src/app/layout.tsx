import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={montserrat.variable}>
      <body
        className={`${montserrat.className} bg-creme text-charcoal antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}