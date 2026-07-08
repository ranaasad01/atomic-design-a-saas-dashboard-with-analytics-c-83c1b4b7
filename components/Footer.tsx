"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { Activity, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerLinks = {
  Product: [
    { label: "Dashboard", href: "/dashboard", type: "route" as const },
    { label: "Reports", href: "/reports", type: "route" as const },
    { label: "Settings", href: "/settings", type: "route" as const },
  ],
  Company: [
    { label: "About", href: "#about", type: "anchor" as const },
    { label: "Blog", href: "#blog", type: "anchor" as const },
    { label: "Careers", href: "#careers", type: "anchor" as const },
  ],
  Legal: [
    { label: "Privacy", href: "#privacy", type: "anchor" as const },
    { label: "Terms", href: "#terms", type: "anchor" as const },
    { label: "Security", href: "#security", type: "anchor" as const },
  ],
};

export default function Footer() {
  const pathname = usePathname();

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    type: "route" | "anchor"
  ) {
    if (type === "anchor" && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getHref(href: string, type: "route" | "anchor") {
    if (type === "anchor") {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      className="border-t border-white/10 bg-[#0F172A] mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {APP_TAGLINE}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <motion.div key={section} variants={fadeInUp}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getHref(link.href, link.type)}
                      onClick={(e) => handleLinkClick(e, link.href, link.type)}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-slate-500">
            &copy; 2024 {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built for modern SaaS teams.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}