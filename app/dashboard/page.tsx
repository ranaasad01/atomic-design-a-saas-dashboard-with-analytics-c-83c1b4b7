"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
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
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, RefreshCw, Calendar } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME, type ChartPeriod } from "@/lib/data";

// ── Mock data ──────────────────────────────────────────────────────────────────

const sessionData = [
  { day: "Jan 1", sessions: 3200 },
  { day: "Jan 2", sessions: 4100 },
  { day: "Jan 3", sessions: 3800 },
  { day: "Jan 4", sessions: 5200 },
  { day: "Jan 5", sessions: 4700 },
  { day: "Jan 6", sessions: 3900 },
  { day: "Jan 7", sessions: 4300 },
  { day: "Jan 8", sessions: 5800 },
  { day: "Jan 9", sessions: 6200 },
  { day: "Jan 10", sessions: 5500 },
  { day: "Jan 11", sessions: 6800 },
  { day: "Jan 12", sessions: 7100 },
  { day: "Jan 13", sessions: 6400 },
  { day: "Jan 14", sessions: 5900 },
  { day: "Jan 15", sessions: 7400 },
  { day: "Jan 16", sessions: 8100 },
  { day: "Jan 17", sessions: 7600 },
  { day: "Jan 18", sessions: 8900 },
  { day: "Jan 19", sessions: 9200 },
  { day: "Jan 20", sessions: 8500 },
  { day: "Jan 21", sessions: 7800 },
  { day: "Jan 22", sessions: 9600 },
  { day: "Jan 23", sessions: 10200 },
  { day: "Jan 24", sessions: 9800 },
  { day: "Jan 25", sessions: 11000 },
  { day: "Jan 26", sessions: 10500 },
  { day: "Jan 27", sessions: 9900 },
  { day: "Jan 28", sessions: 11400 },
  { day: "Jan 29", sessions: 12100 },
  { day: "Jan 30", sessions: 11800 },
];

const revenueData = {
  "7d": [
    { label: "Mon", revenue: 12400, mrr: 9800 },
    { label: "Tue", revenue: 14200, mrr: 10200 },
    { label: "Wed", revenue: 13100, mrr: 10500 },
    { label: "Thu", revenue: 15800, mrr: 11000 },
    { label: "Fri", revenue: 17200, mrr: 11400 },
    { label: "Sat", revenue: 14900, mrr: 11600 },
    { label: "Sun", revenue: 16300, mrr: 12000 },
  ],
  "30d": [
    { label: "W1", revenue: 58000, mrr: 42000 },
    { label: "W2", revenue: 67000, mrr: 48000 },
    { label: "W3", revenue: 74000, mrr: 53000 },
    { label: "W4", revenue: 82000, mrr: 61000 },
  ],
  "90d": [
    { label: "Jan", revenue: 210000, mrr: 158000 },
    { label: "Feb", revenue: 245000, mrr: 182000 },
    { label: "Mar", revenue: 278000, mrr: 204000 },
  ],
  "1y": [
    { label: "Jan", revenue: 210000, mrr: 158000 },
    { label: "Feb", revenue: 245000, mrr: 182000 },
    { label: "Mar", revenue: 278000, mrr: 204000 },
    { label: "Apr", revenue: 302000, mrr: 221000 },
    { label: "May", revenue: 334000, mrr: 248000 },
    { label: "Jun", revenue: 318000, mrr: 239000 },
    { label: "Jul", revenue: 356000, mrr: 267000 },
    { label: "Aug", revenue: 389000, mrr: 291000 },
    { label: "Sep", revenue: 412000, mrr: 308000 },
    { label: "Oct", revenue: 445000, mrr: 334000 },
    { label: "Nov", revenue: 478000, mrr: 358000 },
    { label: "Dec", revenue: 512000, mrr: 384000 },
  ],
};

const trafficSources = [
  { name: "Organic Search", value: 38, color: "#6366F1" },
  { name: "Direct", value: 24, color: "#22D3EE" },
  { name: "Referral", value: 18, color: "#8B5CF6" },
  { name: "Social", value: 12, color: "#34D399" },
  { name: "Email", value: 8, color: "#F59E0B" },
];

const userGrowthData = [
  { month: "Jan", newUsers: 1240, churned: 180 },
  { month: "Feb", newUsers: 1580, churned: 210 },
  { month: "Mar", newUsers: 1920, churned: 195 },
  { month: "Apr", newUsers: 2140, churned: 230 },
  { month: "May", newUsers: 2480, churned: 260 },
  { month: "Jun", newUsers: 2210, churned: 290 },
  { month: "Jul", newUsers: 2760, churned: 245 },
  { month: "Aug", newUsers: 3100, churned: 280 },
  { month: "Sep", newUsers: 3450, churned: 310 },
  { month: "Oct", newUsers: 3820, churned: 295 },
  { month: "Nov", newUsers: 4200, churned: 330 },
  { month: "Dec", newUsers: 4680, churned: 360 },
];

const kpiCards = [
  {
    label: "Total Revenue",
    value: 512000,
    display: "$512K",
    change: "+18.4%",
    positive: true,
    icon: DollarSign,
    sub: "vs last period",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.25)",
  },
  {
    label: "Monthly MRR",
    value: 384000,
    display: "$384K",
    change: "+12.7%",
    positive: true,
    icon: TrendingUp,
    sub: "vs last month",
    color: "#22D3EE",
    glow: "rgba(34,211,238,0.2)",
  },
  {
    label: "Active Users",
    value: 28419,
    display: "28,419",
    change: "+9.2%",
    positive: true,
    icon: Users,
    sub: "monthly active",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    label: "Churn Rate",
    value: 2.4,
    display: "2.4%",
    change: "-0.6%",
    positive: true,
    icon: Activity,
    sub: "monthly churn",
    color: "#34D399",
    glow: "rgba(52,211,153,0.2)",
  },
];

// ── Animated counter ───────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number = 1400, start: boolean = true) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, start]);

  return count;
}

// ── Custom tooltip ─────────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
  prefix = "",
  suffix = "",
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  prefix?: string;
  suffix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900/95 border border-white/10 rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold ml-auto pl-4">
            {prefix}
            {(entry.value ?? 0).toLocaleString("en-US")}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
}

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0];
  if (!item) return null;
  return (
    <div className="bg-slate-900/95 border border-white/10 rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <div className="flex items-center gap-2 text-sm">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: item.payload?.color ?? "#6366F1" }}
        />
        <span className="text-slate-300">{item.name}:</span>
        <span className="text-white font-semibold ml-2">{item.value}%</span>
      </div>
    </div>
  );
}

// ── KPI Card ───────────────────────────────────────────────────────────────────

function KPICardComponent({
  card,
  index,
}: {
  card: (typeof kpiCards)[number];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isPercent = card.display.includes("%");
  const isDollar = card.display.startsWith("$");
  const rawNum = card.value;
  const counted = useCountUp(rawNum, 1200 + index * 100, visible);

  let displayValue = "";
  if (isPercent) {
    displayValue = `${(counted / 10).toFixed(1)}%`;
  } else if (isDollar && rawNum >= 1000) {
    displayValue = `$${(counted / 1000).toFixed(0)}K`;
  } else if (isDollar) {
    displayValue = `$${counted.toLocaleString("en-US")}`;
  } else {
    displayValue = counted.toLocaleString("en-US");
  }

  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 overflow-hidden group cursor-default"
      style={{
        boxShadow: `0 1px 2px rgba(0,0,0,0.1), 0 8px 24px -8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Glow */}
      <div
        className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: card.glow }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${card.color}20`,
              border: `1px solid ${card.color}30`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: card.color }} />
          </div>
          <span
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              card.positive
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/15 text-red-400 border border-red-500/20"
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

        <p className="text-3xl font-bold tracking-tight text-white mb-1">
          {displayValue}
        </p>
        <p className="text-sm font-medium text-slate-300">{card.label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{card.sub}</p>
      </div>
    </motion.div>
  );
}

// ── Period selector ────────────────────────────────────────────────────────────

function PeriodSelector({
  value,
  onChange,
}: {
  value: ChartPeriod;
  onChange: (p: ChartPeriod) => void;
}) {
  const periods: ChartPeriod[] = ["7d", "30d", "90d", "1y"];
  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
            value === p
              ? "bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <h2 className="text-base font-semibold text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const t = useTranslations();
  const [revPeriod, setRevPeriod] = useState<ChartPeriod>("30d");
  const [lastUpdated, setLastUpdated] = useState("Just now");
  const [refreshing, setRefreshing] = useState(false);

  const currentRevData = revenueData[revPeriod] ?? revenueData["30d"];

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated("Just now");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#0F172A] pt-20 pb-16">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t("dashboard.title")}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {t("dashboard.subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Jan 1 – Jan 30, 2025</span>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
                {lastUpdated}
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {kpiCards.map((card, i) => (
            <KPICardComponent key={card.label} card={card} index={i} />
          ))}
        </motion.div>

        {/* Active Sessions Area Chart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={scaleIn}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 mb-6"
          style={{
            boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 8px 32px -8px rgba(0,0,0,0.35)",
          }}
        >
          <SectionHeader
            title={t("dashboard.sessions.title")}
            subtitle={t("dashboard.sessions.subtitle")}
            right={
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
            }
          />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={sessionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sessionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={4}
              />
              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#sessionGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Revenue + Donut row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Revenue Line Chart — 60% */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
            style={{
              boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 8px 32px -8px rgba(0,0,0,0.35)",
            }}
          >
            <SectionHeader
              title={t("dashboard.revenue.title")}
              subtitle={t("dashboard.revenue.subtitle")}
              right={
                <PeriodSelector value={revPeriod} onChange={setRevPeriod} />
              }
            />
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={currentRevData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                  }
                />
                <Tooltip content={<CustomTooltip prefix="$" />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94A3B8", paddingTop: "12px" }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#22D3EE"
                  strokeWidth={2}
                  strokeDasharray="5 3"
                  dot={false}
                  activeDot={{ r: 4, fill: "#22D3EE", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Sources Donut — 40% */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
            style={{
              boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 8px 32px -8px rgba(0,0,0,0.35)",
            }}
          >
            <SectionHeader
              title={t("dashboard.traffic.title")}
              subtitle={t("dashboard.traffic.subtitle")}
            />
            <div className="flex flex-col items-center">
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
                    stroke="none"
                  >
                    {trafficSources.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full space-y-2 mt-2">
                {trafficSources.map((src) => (
                  <div key={src.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: src.color }}
                      />
                      <span className="text-slate-400">{src.name}</span>
                    </div>
                    <span className="text-white font-semibold">{src.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Monthly User Growth Bar Chart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={scaleIn}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
          style={{
            boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 8px 32px -8px rgba(0,0,0,0.35)",
          }}
        >
          <SectionHeader
            title={t("dashboard.growth.title")}
            subtitle={t("dashboard.growth.subtitle")}
            right={
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-indigo-500 inline-block" />
                  New Users
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-red-400/70 inline-block" />
                  Churned
                </span>
              </div>
            }
          />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={userGrowthData}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="newUsers" name="New Users" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="churned" name="Churned" fill="rgba(248,113,113,0.6)" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}