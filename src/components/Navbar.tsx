"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Menu, X } from "lucide-react";

const links = [
  { href: "#monitor", label: "Monitor" },
  { href: "#predictions", label: "Predictions" },
  { href: "#models", label: "Models" },
  { href: "#features", label: "Features" },
  { href: "#architecture", label: "Architecture" },
];

export default function NavbarGod() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // 🔥 Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🔥 Active section detection
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => sec && observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* 🔥 LOGO */}
        <a href="#" className="flex items-center gap-2 group">
          <Droplets className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition" />
          <span className="font-bold text-white tracking-tight">
            AquaPredict<span className="text-cyan-400">.AI</span>
          </span>
        </a>

        {/* 🔥 DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 relative">

          {links.map((l) => (
            <div key={l.href} className="relative">
              <a
                href={l.href}
                className={`text-sm transition ${
                  active === l.href
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {l.label}
              </a>

              {/* 🔥 ACTIVE INDICATOR */}
              {active === l.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-cyan-400 rounded-full"
                />
              )}
            </div>
          ))}

          {/* 🔥 CTA */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#monitor"
            className="ml-4 px-4 py-2 rounded-xl bg-cyan-400 text-black text-sm font-semibold shadow-lg"
          >
            Live Demo
          </motion.a>
        </div>

        {/* 🔥 MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* 🔥 MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg text-gray-300 hover:text-cyan-400 transition"
              >
                {l.label}
              </a>
            ))}

            <a
              href="#monitor"
              className="mt-4 px-4 py-2 rounded-xl bg-cyan-400 text-black text-center font-semibold"
            >
              Launch Live Monitor
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}