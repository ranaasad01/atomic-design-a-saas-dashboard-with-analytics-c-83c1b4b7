"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart, ArrowUpRight, ArrowDownRight, Eye, MoreHorizontal, Download, Filter, RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { type ChartPeriod } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 48500, expenses: 31000, profit: 17500 },
  { month: "Mar", revenue: 55200, expenses: 33500, profit: 21700 },
  { month: "Apr", revenue: 51800, expenses: 30200, profit: 21600 },
  { month: "May", revenue: 63400, expenses: 36800, profit: 26600 },
  { month: "Jun", revenue: 71200, expenses: 40100, profit: 31100 },
  { month: "Jul", revenue: 68900, expenses: 38500, profit: 30400 },
  { month: "Aug", revenue: 79500, expenses: 43200, profit: 36300 },
  { month: "Sep", revenue: 84100, expenses: 45600, profit: 38500 },
  { month: "Oct", revenue: 91300, expenses: 48900, profit: 42400 },
  { month: "Nov", revenue: 98700, expenses: 52100, profit: 46600 },
  { month: "Dec", revenue: 112400, expenses: 58300, profit: 54100 },
];

const weeklyData = [
  { day: "Mon", users: 1240, sessions: 3820, conversions: 148 },
  { day: "Tue", users: 1580, sessions: 4210, conversions: 192 },
  { day: "Wed", users: 1390, sessions: 3950, conversions: 167 },
  { day: "Thu", users: 1720, sessions: 4680, conversions: 214 },
  { day: "Fri", users: 1950, sessions: 5120, conversions: 248 },
  { day: "Sat", users: 1100, sessions: 2890, conversions: 112 },
  { day: "Sun", users: 890, sessions: 2340, conversions: 89 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: "#6366F1" },
  { name: "Direct", value: 24, color: "#22D3EE" },
  { name: "Social Media", value: 19, color: "#8B5CF6" },
  { name: "Referral", value: 12, color: "#10B981" },
  { name: "Email", value: 7, color: "#F59E0B" },
];

const topPages = [
  { path: "/dashboard", views: 48291, bounce: "24%", duration: "4m 12s", trend: "up" },
  { path: "/pricing", views: 31847, bounce: "38%", duration: "2m 48s", trend: "up" },
  { path: "/features", views: 27503, bounce: "31%", duration: "3m 22s", trend: "down" },
  { path: "/blog/analytics-guide", views: 19284, bounce: "42%", duration: "5m 07s", trend: "up" },
  { path: "/integrations", views: 14920, bounce: "29%", duration: "3m 51s", trend: "up" },
];

const recentTransactions = [
  { id: "TXN-8821", customer: "Acme Corp", email: "billing@acme.com", amount: "$2,400", plan: "Enterprise", status: "paid", date: "Dec 18, 2024" },
  { id: "TXN-8820", customer: "Bright Labs", email: "admin@brightlabs.io", amount: "$890", plan: "Pro", status: "paid", date: "Dec 18, 2024" },
  { id: "TXN-8819", customer: "Nova Systems", email: "finance@novasys.com", amount: "$2,400", plan: "Enterprise", status: "pending", date: "Dec 17, 2024" },
  { id: "TXN-8818", customer: "Pixel Studio", email: "pay@pixelstudio.co", amount: "$290", plan: "Starter", status: "paid", date: "Dec 17, 2024" },
  { id: "TXN-8817", customer: "Drift Analytics", email: "ops@drift.ai", amount: "$890", plan: "Pro", status: "failed", date: "Dec 16, 2024" },
  { id: "TXN-8816", customer: "Cascade Inc", email: "billing@cascade.com", amount: "$2,400", plan: "Enterprise", status: "paid", date: "Dec 16, 2024" },
];

const kpiCards = [
  {
    label: "Total Revenue",
    value: "$847,291",
    change: "+18.4%",
    positive: true,
    icon: DollarSign,
    sub: "vs last quarter",
    color: "from-indigo-500/20 to-indigo-600/5",
    iconBg: "bg-indigo-500/20 text-indigo-400",
    glow: "shadow-[0_0_24px_rgba(99,102,241,0.15)]",
  },
  {
    label: "Active Users",
    value: "24,819",
    change: "+12.7%",
    positive: true,
    icon: Users,
    sub: "vs last month",
    color: "from-cyan-500/20 to-cyan-600/5",
    iconBg: "bg-cyan-500/20 text-cyan-400",
    glow: "shadow-[0_0_24px_rgba(34,211,238,0.12)]",
  },
  {
    label: "Conversion Rate",
    value: "5.82%",
    change: "+0.41%",
    positive: true,
    icon: TrendingUp,
    sub: "vs last month",
    color: "from-violet-500/20 to-violet-600/5",
    iconBg: "bg-violet-500/20 text-violet-400",
    glow: "shadow-[0_0_24px_rgba(139,92,246,0.12)]",
  },
  {
    label: "Churn Rate",
    value: "1.94%",
    change: "-0.28%",
    positive: true,
    icon: Activity,
    sub: "vs last month",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    glow: "shadow-[0_0_24px_rgba(16,185,129,0.12)]",
  },
  {
    label: "Avg. Order Value",
    value: "$1,284",
    change: "+6.2%",
    positive: true,
    icon: ShoppingCart,
    sub: "vs last quarter",
    color: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/20 text-amber-400",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.12)]",
  },
  {
    label: "Page Views",
    value: "3.41M",
    change: "-3.1%",
    positive: false,
    icon: Eye,
    sub: "vs last month",
    color: "from-rose-500/20 to-rose-600/5",
    iconBg: "bg-rose-500/20 text-rose-400",
    glow: "shadow-[0_0_24px_rgba(244,63,94,0.12)]",
  },
];

const PERIODS: { label: string; value: ChartPeriod }[] = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "1Y", value: "1y" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const map = {
    paid: {
      label: "Paid",
      icon: CheckCircle,
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    failed: {
      label: "Failed",
      icon: AlertCircle,
      cls: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    },
  };
  const { label, icon: Icon, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1E293B] border border-white/10 rounded-xl p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {typeof entry.value === "number"
              ? entry.value >= 1000
                ? `$${(entry.value / 1000).toFixed(1)}k`
                : entry.value.toLocaleString("en-US")
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardMainAnalyticsOverview() {
  const t = useTranslations();
  const [period, setPeriod] = useState<ChartPeriod>("1y");
  const [activeTab, setActiveTab] = useState<"revenue" | "traffic">("revenue");

  const chartData = period === "7d" ? weeklyData : revenueData;
  const isWeekly = period === "7d";

  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">
              {t("dashboard.eyebrow")}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">
              {t("dashboard.title")}
            </h1>
            <p className="text-slate-400 mt-1.5 text-sm leading-relaxed">
              {t("dashboard.subtitle")}
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm">
              <RefreshCw className="w-3.5 h-3.5" />
              {t("dashboard.refresh")}
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm">
              <Filter className="w-3.5 h-3.5" />
              {t("dashboard.filter")}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white text-sm font-medium shadow-[0_0_16px_rgba(99,102,241,0.35)] hover:shadow-[0_0_24px_rgba(99,102,241,0.55)] transition-all duration-300">
              <Download className="w-3.5 h-3.5" />
              {t("dashboard.export")}
            </button>
          </motion.div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${card.color} bg-[#1E293B] p-5 ${card.glow} cursor-default`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      card.positive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {card.positive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {card.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight mb-0.5">
                  {card.value}
                </p>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{card.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main Chart + Pie ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Revenue / Traffic Area Chart */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#1E293B]/80 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]"
          >
            {/* Chart header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {t("dashboard.chart.title")}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("dashboard.chart.subtitle")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Tab toggle */}
                <div className="flex rounded-lg bg-white/5 border border-white/10 p-0.5 text-xs">
                  {(["revenue", "traffic"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-md font-medium capitalize transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-indigo-500 text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {/* Period selector */}
                <div className="flex rounded-lg bg-white/5 border border-white/10 p-0.5 text-xs">
                  {PERIODS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setPeriod(p.value)}
                      className={`px-2.5 py-1.5 rounded-md font-medium transition-all duration-200 ${
                        period === p.value
                          ? "bg-white/10 text-white"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              {activeTab === "revenue" ? (
                <AreaChart data={isWeekly ? weeklyData : revenueData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey={isWeekly ? "day" : "month"}
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", color: "#94A3B8", paddingTop: "12px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    strokeWidth={2}
                    fill="url(#gradRevenue)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#6366F1", strokeWidth: 0 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    fill="url(#gradExpenses)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#22D3EE", strokeWidth: 0 }}
                  />
                </AreaChart>
              ) : (
                <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748B", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", color: "#94A3B8", paddingTop: "12px" }}
                  />
                  <Bar dataKey="sessions" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="#22D3EE" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Sources Pie */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="rounded-2xl border border-white/10 bg-[#1E293B]/80 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]"
          >
            <h2 className="text-base font-semibold text-white mb-0.5">
              {t("dashboard.traffic.title")}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              {t("dashboard.traffic.subtitle")}
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSources.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Share"]}
                  contentStyle={{
                    background: "#1E293B",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-2 mt-2">
              {trafficSources.map((src) => (
                <li key={src.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: src.color }}
                    />
                    {src.name}
                  </span>
                  <span className="font-semibold text-white">{src.value}%</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom Row: Top Pages + Transactions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Top Pages */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#1E293B]/80 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {t("dashboard.pages.title")}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("dashboard.pages.subtitle")}
                </p>
              </div>
              <button className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {(topPages ?? []).map((page, i) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <span className="text-xs font-bold text-slate-600 w-4 text-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-300 truncate group-hover:text-white transition-colors">
                      {page.path}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Bounce {page.bounce} · {page.duration}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-white">
                      {(page.views ?? 0).toLocaleString("en-US")}
                    </p>
                    <span
                      className={`text-xs ${
                        page.trend === "up" ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {page.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 inline" />
                      ) : (
                        <TrendingDown className="w-3 h-3 inline" />
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeIn}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#1E293B]/80 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">
                  {t("dashboard.transactions.title")}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("dashboard.transactions.subtitle")}
                </p>
              </div>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                {t("dashboard.transactions.viewAll")}
              </button>
            </div>
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-xs min-w-[480px]">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-slate-500 font-medium pb-2.5 px-2 first:pl-3 last:pr-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(recentTransactions ?? []).map((tx, i) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors group"
                    >
                      <td className="py-3 px-2 pl-3">
                        <p className="font-medium text-slate-200 group-hover:text-white transition-colors">
                          {tx.customer}
                        </p>
                        <p className="text-slate-600 mt-0.5">{tx.email}</p>
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs">
                          {tx.plan}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-semibold text-white">
                        {tx.amount}
                      </td>
                      <td className="py-3 px-2">
                        <StatusBadge status={tx.status as "paid" | "pending" | "failed"} />
                      </td>
                      <td className="py-3 px-2 pr-3 text-slate-500">{tx.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}