"use client";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layouts";

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
