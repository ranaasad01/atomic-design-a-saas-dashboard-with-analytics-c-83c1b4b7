"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Activity, ArrowRight, BarChart2, Bell, Check, ChevronRight, Clock, Eye, GitBranch, Globe, Layout, Lock, Mail, Search, Settings, Sparkles, Star, TrendingUp, Users, Zap } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, users: 1200 },
  { month: "Feb", revenue: 51000, users: 1450 },
  { month: "Mar", revenue: 47000, users: 1380 },
  { month: "Apr", revenue: 63000, users: 1820 },
  { month: "May", revenue: 71000, users: 2100 },
  { month: "Jun", revenue: 68000, users: 2050 },
  { month: "Jul", revenue: 84000, users: 2480 },
  { month: "Aug", revenue: 92000, users: 2760 },
];

const trafficData = [
  { day: "Mon", organic: 3200, paid: 1400 },
  { day: "Tue", organic: 4100, paid: 1800 },
  { day: "Wed", organic: 3800, paid: 2100 },
  { day: "Thu", organic: 5200, paid: 2400 },
  { day: "Fri", organic: 4700, paid: 1900 },
  { day: "Sat", organic: 3100, paid: 1200 },
  { day: "Sun", organic: 2800, paid: 900 },
];

const pieData = [
  { name: "Enterprise", value: 42 },
  { name: "Pro", value: 31 },
  { name: "Starter", value: 27 },
];

const PIE_COLORS = ["#6366F1", "#22D3EE", "#818CF8"];

const kpis = [
  { label: "Monthly Revenue", value: "$92,400", change: "+18.4%", positive: true, icon: TrendingUp },
  { label: "Active Users", value: "24,780", change: "+12.1%", positive: true, icon: Users },
  { label: "Avg. Session", value: "4m 32s", change: "+6.3%", positive: true, icon: Clock },
  { label: "Churn Rate", value: "1.8%", change: "-0.4%", positive: true, icon: Activity },
];

const features = [
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    description:
      "Watch your metrics update live. No refresh needed. Every event, conversion, and session tracked the moment it happens.",
  },
  {
    icon: GitBranch,
    title: "Funnel Intelligence",
    description:
      "Pinpoint exactly where users drop off. Build custom funnels in minutes and surface the leaks costing you revenue.",
  },
  {
    icon: Globe,
    title: "Geo Segmentation",
    description:
      "Break down performance by country, region, or city. Understand which markets drive growth and which need attention.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Set thresholds and get notified via Slack, email, or webhook the moment a KPI moves outside your defined range.",
  },
  {
    icon: Lock,
    title: "SOC 2 Compliant",
    description:
      "Enterprise-grade security baked in. Data encrypted at rest and in transit. Role-based access for every team member.",
  },
  {
    icon: Zap,
    title: "One-Click Integrations",
    description:
      "Connect Stripe, Segment, HubSpot, and 40+ tools in seconds. Your data stack, unified in a single pane of glass.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth, Luma",
    avatar: "/images/sarah-chen-growth-lead.jpg",
    quote:
      "Pulse replaced four separate tools for us. The funnel view alone saved us 20 hours a month and uncovered a drop-off we had missed for six months.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "CTO, Fieldstack",
    avatar: "/images/marcus-webb-cto-tech.jpg",
    quote:
      "The real-time dashboard is genuinely impressive. We caught a payment processing bug within three minutes of it starting because Pulse flagged the conversion dip.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Product Lead, Orbit",
    avatar: "/images/priya-nair-product-manager.jpg",
    quote:
      "Setup took under ten minutes. The geo segmentation helped us decide which region to expand into next. Data-driven decisions have never felt this fast.",
    stars: 5,
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "For indie hackers and early-stage products.",
    features: [
      "Up to 50k events/mo",
      "5 dashboards",
      "7-day data retention",
      "Email alerts",
      "Community support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$89",
    period: "/mo",
    description: "For growing teams that need depth and speed.",
    features: [
      "Up to 2M events/mo",
      "Unlimited dashboards",
      "90-day data retention",
      "Slack + webhook alerts",
      "Funnel intelligence",
      "Geo segmentation",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams with compliance and scale needs.",
    features: [
      "Unlimited events",
      "Unlimited dashboards",
      "Unlimited retention",
      "SSO + SAML",
      "SOC 2 audit logs",
      "Dedicated CSM",
      "SLA guarantee",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

const integrations = [
  "Stripe",
  "Segment",
  "HubSpot",
  "Salesforce",
  "Intercom",
  "Mixpanel",
  "Amplitude",
  "Slack",
  "Zapier",
  "Notion",
  "Linear",
  "Figma",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KPIStrip() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10"
    >
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.label}
            variants={scaleIn}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">{kpi.label}</span>
              <Icon className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <p className="text-xl font-bold text-white tracking-tight">{kpi.value}</p>
            <p className={`text-xs mt-1 font-medium ${kpi.positive ? "text-emerald-400" : "text-rose-400"}`}>
              {kpi.change} vs last month
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function MiniDashboardPreview() {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative mt-12 rounded-2xl border border-white/10 bg-[#0F172A]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_32px_80px_-16px_rgba(0,0,0,0.7)] overflow-hidden"
    >
      {/* Fake browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="w-3 h-3 rounded-full bg-rose-500/70" />
        <span className="w-3 h-3 rounded-full bg-amber-400/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-white/5 border border-white/10 flex items-center px-3 gap-2">
          <Lock className="w-3 h-3 text-slate-500" />
          <span className="text-xs text-slate-500">app.pulseanalytics.io/dashboard</span>
        </div>
        <Search className="w-4 h-4 text-slate-600" />
      </div>

      {/* Dashboard body */}
      <div className="flex h-[340px] md:h-[420px]">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-48 border-r border-white/10 bg-white/[0.02] p-3 gap-1">
          {[
            { icon: Layout, label: "Overview", active: true },
            { icon: BarChart2, label: "Revenue" },
            { icon: Users, label: "Users" },
            { icon: Globe, label: "Geo" },
            { icon: GitBranch, label: "Funnels" },
            { icon: Bell, label: "Alerts" },
            { icon: Settings, label: "Settings" },
          ].map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                active
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/20"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-slate-500">Good morning</p>
              <p className="text-sm font-semibold text-white">Overview — August 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">Last 30 days</div>
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/20 flex items-center justify-center">
                <Bell className="w-3.5 h-3.5 text-rose-400" />
              </div>
            </div>
          </div>

          {/* Mini chart */}
          <div className="h-40 md:h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                  labelStyle={{ color: "#94a3b8" }}
                  itemStyle={{ color: "#818CF8" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#heroGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: object) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="min-h-screen bg-[#0F172A] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-rose-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Now with AI-powered anomaly detection
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.08]"
          >
            Analytics that{" "}
            <span className="bg-gradient-to-r from-rose-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              move as fast
            </span>{" "}
            as your product
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto text-pretty"
          >
            {APP_NAME} gives SaaS teams a unified view of revenue, retention, and user behavior. Live data, zero lag, one dashboard.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.32 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.45)] hover:shadow-[0_0_36px_rgba(99,102,241,0.65)] hover:from-rose-400 hover:to-rose-500 transition-all duration-300"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <Eye className="w-4 h-4" />
              View sample report
            </Link>
          </motion.div>

          <KPIStrip />
          <MiniDashboardPreview />
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="max-w-2xl mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Platform</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Everything your team needs to make faster decisions
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Built for product, growth, and engineering teams who need answers in seconds, not spreadsheets.
            </p>
          </motion.div>

          {/* Bento-style asymmetric grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Large feature card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="md:col-span-2 relative rounded-2xl border border-white/10 bg-white/5 p-8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/20 flex items-center justify-center mb-5">
                <BarChart2 className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Analytics</h3>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                Watch your metrics update live. No refresh needed. Every event, conversion, and session tracked the moment it happens across all your connected sources.
              </p>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                    <defs>
                      <linearGradient id="featGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                      labelStyle={{ color: "#94a3b8" }}
                      itemStyle={{ color: "#818CF8" }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#featGrad)" dot={false} />
                    <Area type="monotone" dataKey="users" stroke="#22D3EE" strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Tall card */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-transparent pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center mb-5">
                <GitBranch className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Funnel Intelligence</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Pinpoint exactly where users drop off. Build custom funnels in minutes and surface the leaks costing you revenue.
              </p>
              <div className="space-y-2">
                {[
                  { label: "Visited pricing", pct: 100, color: "bg-rose-500" },
                  { label: "Started trial", pct: 68, color: "bg-rose-400" },
                  { label: "Added card", pct: 41, color: "bg-violet-400" },
                  { label: "Converted", pct: 24, color: "bg-cyan-400" },
                ].map((step) => (
                  <div key={step.label}>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{step.label}</span>
                      <span className="text-white font-medium">{step.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${step.color}`}
                        style={{ width: `${step.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Three smaller cards */}
            {features.slice(2).map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeInUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)]"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/15 flex items-center justify-center mb-4">
                    <Icon className="w-4.5 h-4.5 text-rose-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CHARTS SHOWCASE ──────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Insights</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Charts that tell the whole story
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              From traffic sources to plan distribution, every dimension of your business visualized in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Traffic bar chart */}
            <motion.div
              {...motionProps(slideInLeft)}
              className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-white">Traffic Sources</p>
                  <p className="text-xs text-slate-500 mt-0.5">Organic vs Paid — last 7 days</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
                    Organic
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" />
                    Paid
                  </span>
                </div>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                      labelStyle={{ color: "#94a3b8" }}
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    />
                    <Bar dataKey="organic" fill="#6366F1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="paid" fill="#22D3EE" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              {...motionProps(slideInRight)}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)]"
            >
              <div className="mb-6">
                <p className="text-sm font-semibold text-white">Plan Distribution</p>
                <p className="text-xs text-slate-500 mt-0.5">Active subscriptions by tier</p>
              </div>
              <div className="h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={76}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                      formatter={(value: number) => [`${value}%`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {pieData.map((entry, i) => (
                  <div key={entry.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: PIE_COLORS[i] }} />
                      {entry.name}
                    </span>
                    <span className="text-white font-medium">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Social proof</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Trusted by teams shipping fast
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl border border-white/10 bg-white/5 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)] ${
                  i === 1 ? "md:mt-6" : ""
                }`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Integrations strip */}
          <motion.div {...motionProps(fadeIn)} className="mt-20 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
              Connects with your existing stack
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {integrations.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 font-medium"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...motionProps(fadeInUp)} className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
              Simple pricing, no surprises
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Start free for 14 days. No credit card required. Cancel any time.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl p-7 border shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.4)] ${
                  plan.highlighted
                    ? "border-rose-500/40 bg-gradient-to-b from-rose-500/15 to-rose-500/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-[0_0_16px_rgba(99,102,241,0.5)]">
                      Most popular
                    </span>
                  </div>
                )}
                <p className="text-sm font-semibold text-slate-300 mb-1">{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 text-sm mb-1">{plan.period}</span>}
                </div>
                <p className="text-xs text-slate-500 mb-6">{plan.description}</p>
                <Link
                  href="/dashboard"
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 mb-7 ${
                    plan.highlighted
                      ? "bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_16px_rgba(99,102,241,0.4)] hover:shadow-[0_0_24px_rgba(99,102,241,0.6)]"
                      : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...motionProps(scaleIn)}
            className="relative rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-500/15 via-violet-500/10 to-cyan-500/10 p-12 md:p-16 text-center overflow-hidden shadow-[0_0_0_1px_rgba(99,102,241,0.1),0_32px_80px_-16px_rgba(99,102,241,0.25)]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-600/20 rounded-full blur-[80px]" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-medium mb-6">
                <Zap className="w-3.5 h-3.5" />
                14-day free trial, no card required
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance mb-4">
                Ready to see your data clearly?
              </h2>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto mb-8">
                Join over 3,400 SaaS teams using {APP_NAME} to make faster, smarter decisions every day.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold text-sm shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] hover:from-rose-400 hover:to-rose-500 transition-all duration-300"
                >
                  Start free trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <a
                  href="mailto:hello@pulseanalytics.io"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  Talk to sales
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}