"use client";

import { useState, useEffect } from "react";
import { Droplets, Mail,  Activity, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FooterAdvanced() {
  const [status, setStatus] = useState("Initializing...");
  const [email, setEmail] = useState("");

  /* ================================
     🧠 SYSTEM STATUS SIMULATION
  ================================= */
  useEffect(() => {
    const states = [
      "Streaming sensor data...",
      "Running AI inference...",
      "System stable",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setStatus(states[i % states.length]);
      i++;
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  /* ================================
     📩 HANDLE SUBMIT
  ================================= */
  const handleSubscribe = () => {
    if (!email) return;
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  /* ================================
     🎯 LINKS
  ================================= */
  const links = {
    Product: ["Architecture", "Features", "API", "Docs"],
    Company: ["About", "Careers", "Contact"],
    Resources: ["Blog", "Case Studies", "Whitepaper"],
  };

  return (
    <footer className="relative pt-24 pb-10 border-t border-white/10 overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.08),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* ================= CTA ================= */}
        <div className="mb-16 p-10 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 text-center">
          <h3 className="text-3xl font-bold text-white mb-3">
            Build Intelligent Water Systems
          </h3>
          <p className="text-gray-400 mb-6">
            Real-time prediction • Explainable AI • Scalable monitoring
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold shadow-lg hover:shadow-cyan-500/30 transition"
          >
            Get Started
          </motion.button>
        </div>

        {/* ================= LIVE STATUS ================= */}
        <div className="flex justify-center items-center gap-2 text-xs text-cyan-400 mb-12">
          <Activity className="w-4 h-4 animate-pulse" />
          {status}
        </div>

        {/* ================= NEWSLETTER ================= */}
        <div className="max-w-xl mx-auto mb-16">
          <p className="text-center text-sm text-gray-400 mb-4">
            Stay updated with AI water intelligence insights
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400 transition"
            />
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-cyan-500 rounded-xl text-black font-semibold hover:bg-cyan-400 transition"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* ================= GRID ================= */}
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
              Autonomous AI-powered environmental intelligence platform delivering
              real-time insights for water quality monitoring systems.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">
              {[ Mail].map((Icon, i) => (
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

          {/* SYSTEM INFO */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              System Intelligence
            </h4>

            <div className="space-y-2 text-sm text-gray-400">
              <p>• Real-time AI inference</p>
              <p>• Explainable ML models</p>
              <p>• Scalable cloud deployment</p>
              <p>• Continuous monitoring</p>
            </div>
          </div>
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