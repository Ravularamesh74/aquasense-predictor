"use client";

import { Droplets, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const links = {
  Product: ["Architecture", "Features", "API", "Docs"],
  Company: ["About", "Careers", "Contact"],
  Resources: ["Blog", "Case Studies", "Whitepaper"],
};

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-white/10 overflow-hidden">
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.08),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-6 h-6 text-cyan-400" />
              <span className="text-lg font-bold text-white">
                AquaPredict<span className="text-cyan-400">.AI</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              AI-powered dissolved oxygen prediction platform designed for real-time environmental intelligence and scalable water monitoring systems.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">
              {[GithubIcon, LinkedinIcon, Mail].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition"
                >
                  <Icon className="w-4 h-4 text-gray-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {title}
              </h4>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group flex items-center gap-1 text-sm text-gray-400 hover:text-cyan-400 transition"
                    >
                      {item}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 AquaPredict.AI — All rights reserved</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}