"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Palette, Camera, Save, Check, Mail, Smartphone, Calendar, Shield, ChevronRight } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

// ---------------------------------------------------------------------------
// Types & static data
// ---------------------------------------------------------------------------

type SettingsTab = "profile" | "notifications" | "billing" | "appearance";

interface NavItem {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    description: "Personal info & avatar",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Alerts & digests",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    description: "Plan & invoices",
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    description: "Theme & density",
  },
];

const ACCENT_COLORS = [
  { name: "Indigo", value: "#6366F1", tw: "bg-rose-500" },
  { name: "Violet", value: "#8B5CF6", tw: "bg-violet-500" },
  { name: "Cyan", value: "#22D3EE", tw: "bg-cyan-400" },
  { name: "Emerald", value: "#10B981", tw: "bg-emerald-500" },
  { name: "Rose", value: "#F43F5E", tw: "bg-rose-500" },
  { name: "Amber", value: "#F59E0B", tw: "bg-amber-500" },
];

type Density = "compact" | "comfortable" | "spacious";
type ThemeMode = "dark" | "light" | "system";

// ---------------------------------------------------------------------------
// Sub-section components (defined inline)
// ---------------------------------------------------------------------------

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-white/8 my-6" />;
}

function ToggleSwitch({
  enabled,
  onChange,
  label,
  description,
  icon: Icon,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 ${
          enabled ? "bg-rose-500" : "bg-white/10"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Profile Panel
// ---------------------------------------------------------------------------

function ProfilePanel() {
  const [name, setName] = useState("Alexandra Chen");
  const [email, setEmail] = useState("alex.chen@pulseanalytics.io");
  const [role, setRole] = useState("Product Manager");
  const [company, setCompany] = useState("Pulse Analytics");
  const [bio, setBio] = useState(
    "Building data-driven products that help teams move faster and smarter."
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30 transition-all duration-200";

  return (
    <motion.div
      key="profile"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <SectionHeading
        title="Profile"
        subtitle="Manage your personal information and public presence."
      />

      {/* Avatar */}
      <motion.div variants={fadeInUp} className="flex items-center gap-5 mb-8">
        <div className="relative group">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_24px_rgba(99,102,241,0.4)]">
            AC
          </div>
          <button className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium text-white mb-1">Profile photo</p>
          <p className="text-xs text-slate-500 mb-3">
            JPG, PNG or GIF. Max 2 MB.
          </p>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200">
            Upload photo
          </button>
        </div>
      </motion.div>

      <Divider />

      {/* Fields */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        {[
          {
            label: "Full name",
            value: name,
            setter: setName,
            placeholder: "Your full name",
          },
          {
            label: "Email address",
            value: email,
            setter: setEmail,
            placeholder: "you@example.com",
          },
          {
            label: "Job title",
            value: role,
            setter: setRole,
            placeholder: "e.g. Product Manager",
          },
          {
            label: "Company",
            value: company,
            setter: setCompany,
            placeholder: "Your company",
          },
        ].map((field) => (
          <motion.div key={field.label} variants={fadeInUp}>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              {field.label}
            </label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              placeholder={field.placeholder}
              className={inputClass}
            />
          </motion.div>
        ))}

        <motion.div variants={fadeInUp} className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="A short bio about yourself"
            className={`${inputClass} resize-none`}
          />
        </motion.div>
      </motion.div>

      <Divider />

      {/* Password */}
      <motion.div variants={fadeInUp} className="mb-8">
        <p className="text-sm font-medium text-white mb-1">Password</p>
        <p className="text-xs text-slate-500 mb-3">
          Last changed 3 months ago. Use a strong, unique password.
        </p>
        <button className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Change password
        </button>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
            saved
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.35)] hover:shadow-[0_0_24px_rgba(99,102,241,0.55)]"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save changes
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Notifications Panel
// ---------------------------------------------------------------------------

function NotificationsPanel() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(true);
  const [teamMentions, setTeamMentions] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <motion.div
      key="notifications"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <SectionHeading
        title="Notifications"
        subtitle="Choose how and when Pulse Analytics reaches you."
      />

      <motion.div
        variants={fadeInUp}
        className="bg-white/3 border border-white/8 rounded-2xl px-5 divide-y divide-white/8"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 py-3">
          Delivery channels
        </p>
        <ToggleSwitch
          enabled={emailAlerts}
          onChange={setEmailAlerts}
          label="Email notifications"
          description="Receive alerts and summaries via email"
          icon={Mail}
        />
        <ToggleSwitch
          enabled={pushAlerts}
          onChange={setPushAlerts}
          label="Push notifications"
          description="Browser and mobile push alerts"
          icon={Smartphone}
        />
        <ToggleSwitch
          enabled={weeklyDigest}
          onChange={setWeeklyDigest}
          label="Weekly digest"
          description="A curated summary every Monday morning"
          icon={Calendar}
        />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="bg-white/3 border border-white/8 rounded-2xl px-5 divide-y divide-white/8 mt-5"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 py-3">
          Activity triggers
        </p>
        <ToggleSwitch
          enabled={anomalyAlerts}
          onChange={setAnomalyAlerts}
          label="Anomaly detection"
          description="Alert me when a metric spikes or drops unexpectedly"
          icon={Bell}
        />
        <ToggleSwitch
          enabled={teamMentions}
          onChange={setTeamMentions}
          label="Team mentions"
          description="Notify me when a teammate mentions me in a comment"
          icon={User}
        />
        <ToggleSwitch
          enabled={marketingEmails}
          onChange={setMarketingEmails}
          label="Product updates"
          description="News about new features and improvements"
          icon={Mail}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
            saved
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.35)] hover:shadow-[0_0_24px_rgba(99,102,241,0.55)]"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save preferences
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Billing Panel
// ---------------------------------------------------------------------------

function BillingPanel() {
  const invoices = [
    { id: "INV-2024-012", date: "Dec 1, 2024", amount: "$149.00", status: "Paid" },
    { id: "INV-2024-011", date: "Nov 1, 2024", amount: "$149.00", status: "Paid" },
    { id: "INV-2024-010", date: "Oct 1, 2024", amount: "$149.00", status: "Paid" },
    { id: "INV-2024-009", date: "Sep 1, 2024", amount: "$99.00", status: "Paid" },
  ];

  return (
    <motion.div
      key="billing"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <SectionHeading
        title="Billing"
        subtitle="Manage your subscription plan and payment details."
      />

      {/* Current plan */}
      <motion.div
        variants={scaleIn}
        className="relative rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-cyan-500/5 p-6 mb-6 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-xs font-semibold text-rose-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Active
            </span>
            <h3 className="text-lg font-semibold text-white">Pro Plan</h3>
            <p className="text-sm text-slate-400 mt-1">
              Up to 10 seats, unlimited reports, priority support.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">$149</p>
            <p className="text-xs text-slate-500">per month</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 relative z-10">
          <button className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-400 rounded-xl transition-colors duration-200">
            Upgrade to Enterprise
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200">
            Cancel plan
          </button>
        </div>
      </motion.div>

      {/* Payment method */}
      <motion.div
        variants={fadeInUp}
        className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-white">Payment method</p>
          <button className="text-xs text-rose-400 hover:text-rose-300 transition-colors">
            Update
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white text-xs font-bold">VISA</span>
          </div>
          <div>
            <p className="text-sm text-white">Visa ending in 4242</p>
            <p className="text-xs text-slate-500">Expires 08 / 2026</p>
          </div>
        </div>
      </motion.div>

      {/* Invoices */}
      <motion.div variants={fadeInUp}>
        <p className="text-sm font-medium text-white mb-3">Invoice history</p>
        <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
          {invoices.map((inv, i) => (
            <div
              key={inv.id}
              className={`flex items-center justify-between px-5 py-3.5 ${
                i < invoices.length - 1 ? "border-b border-white/8" : ""
              }`}
            >
              <div>
                <p className="text-sm text-white font-medium">{inv.id}</p>
                <p className="text-xs text-slate-500">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-300">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium">
                  {inv.status}
                </span>
                <button className="text-xs text-rose-400 hover:text-rose-300 transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Appearance Panel
// ---------------------------------------------------------------------------

function AppearancePanel() {
  const [accentColor, setAccentColor] = useState("#6366F1");
  const [density, setDensity] = useState<Density>("comfortable");
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const [saved, setSaved] = useState(false);

  const densityOptions: { value: Density; label: string; description: string }[] = [
    { value: "compact", label: "Compact", description: "More data, less space" },
    { value: "comfortable", label: "Comfortable", description: "Balanced layout" },
    { value: "spacious", label: "Spacious", description: "Airy, relaxed spacing" },
  ];

  const themeModes: { value: ThemeMode; label: string }[] = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "system", label: "System" },
  ];

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <motion.div
      key="appearance"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <SectionHeading
        title="Appearance"
        subtitle="Customize how Pulse Analytics looks and feels for you."
      />

      {/* Theme mode */}
      <motion.div variants={fadeInUp} className="mb-8">
        <p className="text-sm font-medium text-white mb-3">Theme mode</p>
        <div className="flex gap-3">
          {themeModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setThemeMode(mode.value)}
              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                themeMode === mode.value
                  ? "border-rose-500/60 bg-rose-500/15 text-rose-300"
                  : "border-white/10 bg-white/3 text-slate-400 hover:text-white hover:bg-white/8"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </motion.div>

      <Divider />

      {/* Accent color */}
      <motion.div variants={fadeInUp} className="mb-8">
        <p className="text-sm font-medium text-white mb-1">Accent color</p>
        <p className="text-xs text-slate-500 mb-4">
          Used for buttons, highlights, and active states.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          {ACCENT_COLORS.map((color) => (
            <motion.button
              key={color.value}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAccentColor(color.value)}
              title={color.name}
              className={`w-9 h-9 rounded-full ${color.tw} transition-all duration-200 ${
                accentColor === color.value
                  ? "ring-2 ring-white ring-offset-2 ring-offset-[#0F172A] scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">
          Selected:{" "}
          <span className="text-slate-400">
            {ACCENT_COLORS.find((c) => c.value === accentColor)?.name ?? "Custom"}
          </span>
        </p>
      </motion.div>

      <Divider />

      {/* Density */}
      <motion.div variants={fadeInUp} className="mb-8">
        <p className="text-sm font-medium text-white mb-1">Interface density</p>
        <p className="text-xs text-slate-500 mb-4">
          Controls padding and spacing throughout the dashboard.
        </p>
        <div className="space-y-2.5">
          {densityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDensity(opt.value)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                density === opt.value
                  ? "border-rose-500/50 bg-rose-500/10"
                  : "border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-medium ${
                    density === opt.value ? "text-rose-300" : "text-white"
                  }`}
                >
                  {opt.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{opt.description}</p>
              </div>
              {density === opt.value && (
                <Check className="w-4 h-4 text-rose-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
            saved
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_0_16px_rgba(99,102,241,0.35)] hover:shadow-[0_0_24px_rgba(99,102,241,0.55)]"
          }`}
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Apply appearance
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const panelMap: Record<SettingsTab, React.ReactNode> = {
    profile: <ProfilePanel />,
    notifications: <NotificationsPanel />,
    billing: <BillingPanel />,
    appearance: <AppearancePanel />,
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-20">
      {/* Page header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-slate-400 mt-1.5 text-sm">
          Manage your account, preferences, and workspace configuration.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-64 flex-shrink-0"
          >
            <nav className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
              {NAV_ITEMS.map((item, i) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    variants={fadeInUp}
                    whileHover={{ x: 2 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200 ${
                      i < NAV_ITEMS.length - 1 ? "border-b border-white/6" : ""
                    } ${
                      active
                        ? "bg-rose-500/15 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        active
                          ? "bg-rose-500/30 text-rose-300"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.label}</p>
                      <p className="text-xs text-slate-600 truncate">
                        {item.description}
                      </p>
                    </div>
                    {active && (
                      <ChevronRight className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Danger zone */}
            <motion.div
              variants={fadeInUp}
              className="mt-4 bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-500/70 mb-2">
                Danger zone
              </p>
              <p className="text-xs text-slate-500 mb-3">
                Permanently delete your account and all associated data.
              </p>
              <button className="w-full px-3 py-2 text-xs font-medium text-rose-400 border border-rose-500/30 rounded-lg hover:bg-rose-500/10 transition-all duration-200">
                Delete account
              </button>
            </motion.div>
          </motion.aside>

          {/* Content panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="flex-1 min-w-0 bg-white/3 border border-white/8 rounded-2xl p-6 md:p-8"
          >
            {panelMap[activeTab]}
          </motion.div>
        </div>
      </div>
    </main>
  );
}