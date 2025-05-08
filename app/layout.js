import { Montserrat, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "eSimplee - Webbutveckling & Webbhotell",
  description: "eSimplee hjälper företag att utveckla, förvalta och hosta moderna, användarvänliga och säkra webbplatser. Vi erbjuder skräddarsydda digitala lösningar för att stärka din närvaro online.",
  keywords: "webbutveckling, webbhotell, webbplatsförvaltning, hosting, hemsidor, webbdesign, responsiv design",
  openGraph: {
    title: "eSimplee - Webbutveckling & Webbhotell",
    description: "Professionell webbutveckling och hosting-lösningar för ditt företag",
    url: "https://esimplee.se",
    siteName: "eSimplee",
    locale: "sv_SE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#4f46e5", // Du kan anpassa färgen efter företagets profilfärg
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserratSans.variable} ${spaceMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
