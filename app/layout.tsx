import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Anton, Big_Shoulders_Inline } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const big_shoulders_inline = Big_Shoulders_Inline({
  variable: "--font-big_shoulders_inline",
  subsets: ["latin"],
  weight: "300",
});
export const metadata: Metadata = {
  title: "OverClockedX-AdminPanel",
  description: "Custom Admin Panel for OverClockedX E-commerce website, to handle Inventory Management, Orders Management, Product Management and Product Promotion Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${big_shoulders_inline.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
