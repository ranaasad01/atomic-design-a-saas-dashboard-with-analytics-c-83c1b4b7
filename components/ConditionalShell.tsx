'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import AuthGuard from '@/components/AuthGuard';

interface ConditionalShellProps {
  children: React.ReactNode;
}

export default function ConditionalShell({ children }: ConditionalShellProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <LanguageToggle />
    </AuthGuard>
  );
}
