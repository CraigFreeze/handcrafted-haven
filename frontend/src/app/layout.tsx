import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "./ui/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description: "Discover, buy, and sell unique handmade items at Handcrafted Haven.",
  keywords: ["handmade", "marketplace", "crafts", "artisan", "shop"],
  openGraph: {
    title: "Handcrafted Haven",
    description: "Discover, buy, and sell unique handmade items at Handcrafted Haven.",
    url: "https://handcrafted-haven-rosy.vercel.app/",
    siteName: "Handcrafted Haven",
    images: [
      {
        url: "/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Handcrafted Haven",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <TopBar />
          {children}
      </body>
    </html>
  );
}
