import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CompareBar from "@/components/CompareBar";
import { CompareProvider } from "@/context/CompareContext";

export const metadata: Metadata = {
  title: {
    default: "PRATYUSH WORLD | Premium Mountain Bike Collection",
    template: "%s | PRATYUSH WORLD",
  },
  description:
    "Discover the perfect mountain bike for every trail, mountain, and adventure. Explore 30 leading mountain bike models across six categories with PRATYUSH WORLD.",
  keywords: [
    "PRATYUSH WORLD",
    "mountain bikes",
    "all-mountain bikes",
    "enduro mountain bikes",
    "trail bikes",
    "downhill bikes",
    "hardtail mountain bikes",
    "cross-country XC bikes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#0B0D0C] text-white antialiased selection:bg-[#4CAF50] selection:text-[#0B0D0C]">
        <CompareProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}
