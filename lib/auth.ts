'use client';

export const AUTH_COOKIE = 'pulse_auth';

export function isAuthenticated(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((c) => c.trim() === 'pulse_auth=true');
}

export function login(password: string): boolean {
  if (password !== 'admin123') return false;
  document.cookie = 'pulse_auth=true; path=/; max-age=86400';
  return true;
}

export function logout(): void {
  document.cookie = 'pulse_auth=; path=/; max-age=0';
}
