'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import AuthGuard from '@/components/AuthGuard';

interface ConditionalShellProps {
  children: React.ReactNode;
}

const PROTECTED_ROUTES = ['/dashboard', '/reports', '/settings'];

export default function ConditionalShell({ children }: ConditionalShellProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isProtected = PROTECTED_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/') || pathname.startsWith('/dashboard-')
  );

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isProtected) {
    return (
      <AuthGuard>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <LanguageToggle />
      </AuthGuard>
    );
  }

  // Public pages (homepage, etc.) — show shell without auth guard
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <LanguageToggle />
    </>
  );
}
