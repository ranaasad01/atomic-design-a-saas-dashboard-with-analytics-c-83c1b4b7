import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocaleProvider from "@/components/LocaleProvider";
import ConditionalShell from "@/components/ConditionalShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Toby Website Builder — SaaS Dashboard",
  description: "Build and manage beautiful websites with Toby Website Builder.",
  keywords: ["analytics", "dashboard", "SaaS", "metrics", "business intelligence"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0F172A] text-[#F8FAFC] font-sans antialiased min-h-screen flex flex-col">
        <LocaleProvider>
          <ConditionalShell>{children}</ConditionalShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
