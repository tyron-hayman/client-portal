import type { Metadata } from "next";
import { Urbanist, Inter } from "next/font/google";
import "./globals.css";
import "@/assets/styles/global/main.css"
import { Toaster } from "@/components/ui/sonner"

const urbanist = Urbanist({
  variable: "--font-urbanist-sans",
  weight: ['600', '800'],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evnt Horizon - Minimal Client Portal",
  description: "Evnt Horizon is a client portal built for small projects or those looking for a minimal and easy to use client and project management tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${inter.variable} antialiased dark`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
