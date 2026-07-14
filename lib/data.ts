export const APP_NAME = "Toby Website Builder";
export const APP_TAGLINE = "Build beautiful websites with ease.";
export const APP_ACCENT = "#6366F1";
export const APP_CYAN = "#22D3EE";

export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Dashboard", href: "/dashboard", type: "route" },
  { label: "Reports", href: "/reports", type: "route" },
  { label: "Settings", href: "/settings", type: "route" },
];

export interface KPICard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

export interface Transaction {
  id: string;
  user: string;
  email: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  date: string;
  plan: string;
}

export type ChartPeriod = "7d" | "30d" | "90d" | "1y";
