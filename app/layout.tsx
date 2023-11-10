"use client";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layouts";
import { UserAuthenticationProvider } from "@/contexts";
import { KeyboardAccessibilityProvider } from "@/contexts/keyboard-accessibility";

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <UserAuthenticationProvider>
          <KeyboardAccessibilityProvider>
            <Layout>{children}</Layout>
          </KeyboardAccessibilityProvider>
        </UserAuthenticationProvider>
      </body>
    </html>
  );
}
