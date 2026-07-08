"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Search, ChevronUp, ChevronDown, ArrowUpDown, Calendar, TrendingUp, Clock, Target, CheckCircle, AlertCircle, XCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ── Types ──────────────────────────────────────────────────────────────────────

type Status = "paid" | "pending" | "failed";
type Channel = "organic" | "paid" | "referral" | "direct" | "email";
type SortKey = "id" | "user" | "amount" | "status" | "channel" | "date";
type SortDir = "asc" | "desc";

interface TxRow {
  id: string;
  user: string;
  email: string;
  amount: number;
  status: Status;
  channel: Channel;
  plan: string;
  date: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const ALL_TRANSACTIONS: TxRow[] = [
  { id: "TXN-0001", user: "Sophia Hartwell", email: "sophia@hartwell.io", amount: 299, status: "paid", channel: "organic", plan: "Pro", date: "2024-06-01" },
  { id: "TXN-0002", user: "Marcus Chen", email: "m.chen@devloop.co", amount: 99, status: "paid", channel: "paid", plan: "Starter", date: "2024-06-01" },
  { id: "TXN-0003", user: "Priya Nair", email: "priya@nairtech.in", amount: 599, status: "pending", channel: "referral", plan: "Enterprise", date: "2024-06-02" },
  { id: "TXN-0004", user: "James Okafor", email: "james@okafor.ng", amount: 299, status: "paid", channel: "direct", plan: "Pro", date: "2024-06-02" },
  { id: "TXN-0005", user: "Elena Vasquez", email: "elena@vasquez.mx", amount: 99, status: "failed", channel: "email", plan: "Starter", date: "2024-06-03" },
  { id: "TXN-0006", user: "Liam Thornton", email: "liam@thornton.uk", amount: 599, status: "paid", channel: "organic", plan: "Enterprise", date: "2024-06-03" },
  { id: "TXN-0007", user: "Aisha Kamara", email: "aisha@kamara.sl", amount: 299, status: "paid", channel: "paid", plan: "Pro", date: "2024-06-04" },
  { id: "TXN-0008", user: "Noah Bergström", email: "noah@bergstrom.se", amount: 99, status: "pending", channel: "referral", plan: "Starter", date: "2024-06-04" },
  { id: "TXN-0009", user: "Chloe Dupont", email: "chloe@dupont.fr", amount: 599, status: "paid", channel: "direct", plan: "Enterprise", date: "2024-06-05" },
  { id: "TXN-0010", user: "Ravi Sharma", email: "ravi@sharma.in", amount: 299, status: "failed", channel: "email", plan: "Pro", date: "2024-06-05" },
  { id: "TXN-0011", user: "Isabella Rossi", email: "isabella@rossi.it", amount: 99, status: "paid", channel: "organic", plan: "Starter", date: "2024-06-06" },
  { id: "TXN-0012", user: "Ethan Müller", email: "ethan@muller.de", amount: 599, status: "paid", channel: "paid", plan: "Enterprise", date: "2024-06-06" },
  { id: "TXN-0013", user: "Yuki Tanaka", email: "yuki@tanaka.jp", amount: 299, status: "pending", channel: "referral", plan: "Pro", date: "2024-06-07" },
  { id: "TXN-0014", user: "Amara Diallo", email: "amara@diallo.sn", amount: 99, status: "paid", channel: "direct", plan: "Starter", date: "2024-06-07" },
  { id: "TXN-0015", user: "Oliver Patel", email: "oliver@patel.ca", amount: 599, status: "paid", channel: "email", plan: "Enterprise", date: "2024-06-08" },
  { id: "TXN-0016", user: "Fatima Al-Hassan", email: "fatima@alhassan.ae", amount: 299, status: "failed", channel: "organic", plan: "Pro", date: "2024-06-08" },
  { id: "TXN-0017", user: "Lucas Ferreira", email: "lucas@ferreira.br", amount: 99, status: "paid", channel: "paid", plan: "Starter", date: "2024-06-09" },
  { id: "TXN-0018", user: "Mei Lin", email: "mei@lin.cn", amount: 599, status: "paid", channel: "referral", plan: "Enterprise", date: "2024-06-09" },
  { id: "TXN-0019", user: "Samuel Osei", email: "samuel@osei.gh", amount: 299, status: "pending", channel: "direct", plan: "Pro", date: "2024-06-10" },
  { id: "TXN-0020", user: "Valentina Cruz", email: "valentina@cruz.ar", amount: 99, status: "paid", channel: "email", plan: "Starter", date: "2024-06-10" },
  { id: "TXN-0021", user: "Finn Larsen", email: "finn@larsen.dk", amount: 599, status: "paid", channel: "organic", plan: "Enterprise", date: "2024-06-11" },
  { id: "TXN-0022", user: "Zara Ahmed", email: "zara@ahmed.pk", amount: 299, status: "paid", channel: "paid", plan: "Pro", date: "2024-06-11" },
  { id: "TXN-0023", user: "Diego Morales", email: "diego@morales.co", amount: 99, status: "failed", channel: "referral", plan: "Starter", date: "2024-06-12" },
  { id: "TXN-0024", user: "Hana Kobayashi", email: "hana@kobayashi.jp", amount: 599, status: "paid", channel: "direct", plan: "Enterprise", date: "2024-06-12" },
  { id: "TXN-0025", user: "Kwame Asante", email: "kwame@asante.gh", amount: 299, status: "paid", channel: "email", plan: "Pro", date: "2024-06-13" },
  { id: "TXN-0026", user: "Nadia Petrov", email: "nadia@petrov.ru", amount: 99, status: "pending", channel: "organic", plan: "Starter", date: "2024-06-13" },
  { id: "TXN-0027", user: "Caleb Okonkwo", email: "caleb@okonkwo.ng", amount: 599, status: "paid", channel: "paid", plan: "Enterprise", date: "2024-06-14" },
  { id: "TXN-0028", user: "Leila Mansouri", email: "leila@mansouri.ir", amount: 299, status: "paid", channel: "referral", plan: "Pro", date: "2024-06-14" },
  { id: "TXN-0029", user: "Tom Eriksson", email: "tom@eriksson.se", amount: 99, status: "paid", channel: "direct", plan: "Starter", date: "2024-06-15" },
  { id: "TXN-0030", user: "Nia Williams", email: "nia@williams.us", amount: 599, status: "failed", channel: "email", plan: "Enterprise", date: "2024-06-15" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function formatDate(d: string): string {
  const parts = d.split("-");
  if (parts.length !== 3) return d;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = months[parseInt(parts[1] ?? "1", 10) - 1] ?? "";
  return `${month} ${parseInt(parts[2] ?? "1", 10)}, ${parts[0]}`;
}

function exportCSV(rows: TxRow[]) {
  const headers = ["ID", "User", "Email", "Amount", "Status", "Channel", "Plan", "Date"];
  const lines = rows.map((r) =>
    [r.id, r.user, r.email, `$${r.amount}`, r.status, r.channel, r.plan, r.date].join(",")
  );
  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string; Icon: React.ElementType }> = {
    paid: { label: "Paid", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", Icon: CheckCircle },
    pending: { label: "Pending", cls: "bg-amber-500/15 text-amber-400 border-amber-500/25", Icon: AlertCircle },
    failed: { label: "Failed", cls: "bg-red-500/15 text-red-400 border-red-500/25", Icon: XCircle },
  };
  const { label, cls, Icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function ChannelPill({ channel }: { channel: Channel }) {
  const map: Record<Channel, string> = {
    organic: "bg-rose-500/15 text-rose-400 border-rose-500/20",
    paid: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    referral: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    direct: "bg-slate-500/15 text-slate-400 border-slate-500/20",
    email: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${map[channel]}`}>
      {channel}
    </span>
  );
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />;
  return sortDir === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 text-rose-400" />
    : <ChevronDown className="w-3.5 h-3.5 text-rose-400" />;
}

// ── Main page ──────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

export default function ReportsPage() {
  const t = useTranslations();

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [channelFilter, setChannelFilter] = useState<"all" | Channel>("all");
  const [dateFrom, setDateFrom] = useState("2024-06-01");
  const [dateTo, setDateTo] = useState("2024-06-15");

  // Sort
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Pagination
  const [page, setPage] = useState(1);

  const handleSort = useCallback((col: SortKey) => {
    setSortKey((prev) => {
      if (prev === col) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return col;
      }
      setSortDir("desc");
      return col;
    });
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    let rows = ALL_TRANSACTIONS;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter(
        (r) =>
          r.user.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      rows = rows.filter((r) => r.status === statusFilter);
    }
    if (channelFilter !== "all") {
      rows = rows.filter((r) => r.channel === channelFilter);
    }
    rows = rows.filter((r) => r.date >= dateFrom && r.date <= dateTo);

    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "amount") cmp = a.amount - b.amount;
      else if (sortKey === "date") cmp = a.date.localeCompare(b.date);
      else if (sortKey === "id") cmp = a.id.localeCompare(b.id);
      else if (sortKey === "user") cmp = a.user.localeCompare(b.user);
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      else if (sortKey === "channel") cmp = a.channel.localeCompare(b.channel);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return rows;
  }, [search, statusFilter, channelFilter, dateFrom, dateTo, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Summary metrics
  const totalRevenue = useMemo(
    () => filtered.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0),
    [filtered]
  );
  const conversionRate = useMemo(() => {
    if (filtered.length === 0) return 0;
    return Math.round((filtered.filter((r) => r.status === "paid").length / filtered.length) * 100);
  }, [filtered]);
  const avgAmount = useMemo(() => {
    if (filtered.length === 0) return 0;
    return Math.round(filtered.reduce((s, r) => s + r.amount, 0) / filtered.length);
  }, [filtered]);

  const columns: { key: SortKey; label: string }[] = [
    { key: "id", label: t("reports.col.id") },
    { key: "user", label: t("reports.col.user") },
    { key: "amount", label: t("reports.col.amount") },
    { key: "status", label: t("reports.col.status") },
    { key: "channel", label: t("reports.col.channel") },
    { key: "date", label: t("reports.col.date") },
  ];

  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-10"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
            {t("reports.eyebrow")}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance"
          >
            {t("reports.heading")}
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-2 text-slate-400 text-sm leading-relaxed max-w-xl">
            {t("reports.subheading")}
          </motion.p>
        </motion.div>

        {/* ── Summary strip ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {[
            {
              icon: TrendingUp,
              label: t("reports.metric.revenue"),
              value: formatCurrency(totalRevenue),
              accent: "text-emerald-400",
              glow: "shadow-[0_0_16px_rgba(52,211,153,0.12)]",
            },
            {
              icon: Clock,
              label: t("reports.metric.avgAmount"),
              value: formatCurrency(avgAmount),
              accent: "text-cyan-400",
              glow: "shadow-[0_0_16px_rgba(34,211,238,0.12)]",
            },
            {
              icon: Target,
              label: t("reports.metric.conversion"),
              value: `${conversionRate}%`,
              accent: "text-rose-400",
              glow: "shadow-[0_0_16px_rgba(99,102,241,0.12)]",
            },
          ].map(({ icon: Icon, label, value, accent, glow }) => (
            <motion.div
              key={label}
              variants={scaleIn}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className={`flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10 ${glow} transition-all duration-300`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className={`w-5 h-5 ${accent}`} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className={`text-xl font-bold tracking-tight ${accent}`}>{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Filter toolbar ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col gap-3 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10"
        >
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={t("reports.filter.search")}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30 transition-all"
              />
            </div>

            {/* Status filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value as "all" | Status); setPage(1); }}
                className="pl-8 pr-8 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300 focus:outline-none focus:border-rose-500/60 appearance-none cursor-pointer transition-all"
              >
                <option value="all">{t("reports.filter.allStatus")}</option>
                <option value="paid">{t("reports.filter.paid")}</option>
                <option value="pending">{t("reports.filter.pending")}</option>
                <option value="failed">{t("reports.filter.failed")}</option>
              </select>
            </div>

            {/* Channel filter */}
            <div className="relative">
              <select
                value={channelFilter}
                onChange={(e) => { setChannelFilter(e.target.value as "all" | Channel); setPage(1); }}
                className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300 focus:outline-none focus:border-rose-500/60 appearance-none cursor-pointer transition-all"
              >
                <option value="all">{t("reports.filter.allChannels")}</option>
                <option value="organic">{t("reports.filter.organic")}</option>
                <option value="paid">{t("reports.filter.paid_channel")}</option>
                <option value="referral">{t("reports.filter.referral")}</option>
                <option value="direct">{t("reports.filter.direct")}</option>
                <option value="email">{t("reports.filter.email")}</option>
              </select>
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
                className="px-2 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300 focus:outline-none focus:border-rose-500/60 transition-all [color-scheme:dark]"
              />
              <span className="text-slate-600 text-xs">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
                className="px-2 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-slate-300 focus:outline-none focus:border-rose-500/60 transition-all [color-scheme:dark]"
              />
            </div>

            {/* Export */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => exportCSV(filtered)}
              className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 shadow-[0_0_16px_rgba(99,102,241,0.3)] hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] transition-all duration-300 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              {t("reports.export")}
            </motion.button>
          </div>

          {/* Result count */}
          <p className="text-xs text-slate-500">
            {t("reports.resultCount", { count: filtered.length })}
          </p>
        </motion.div>

        {/* ── Table ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03]">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 cursor-pointer select-none hover:text-slate-300 transition-colors group"
                    >
                      <span className="flex items-center gap-1.5">
                        {col.label}
                        <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("reports.col.plan")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-slate-500 text-sm">
                      {t("reports.noResults")}
                    </td>
                  </tr>
                ) : (
                  paginated.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3, ease: "easeOut" }}
                      className="border-b border-white/5 hover:bg-white/[0.04] transition-colors duration-150 group"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                        {row.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white text-sm leading-tight">{row.user}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{row.email}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-white tabular-nums">
                        {formatCurrency(row.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-3">
                        <ChannelPill channel={row.channel} />
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs tabular-nums whitespace-nowrap">
                        {formatDate(row.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-400 font-medium">{row.plan}</span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-white/[0.02]">
            <p className="text-xs text-slate-500">
              {t("reports.pagination.showing", {
                from: filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1,
                to: Math.min(page * PAGE_SIZE, filtered.length),
                total: filtered.length,
              })}
            </p>
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-slate-600 text-xs">…</span>
                  ) : (
                    <motion.button
                      key={item}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setPage(item as number)}
                      className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                        page === item
                          ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                          : "text-slate-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item}
                    </motion.button>
                  )
                )}

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}