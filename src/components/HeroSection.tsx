"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Activity, Brain, Waves } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";
import { realtimeMetrics } from "@/data/mockData";

// 🔥 Animated Counter Hook
const useAnimatedNumber = (value: number, duration = 800) => {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(parseFloat(start.toFixed(2)));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value, duration]);

  return display;
};

// 🔥 Status Badge (animated)
const StatusBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-sm"
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
    </span>
    <span className="text-emerald-400 font-medium">
      System Online — Real-time Monitoring
    </span>
  </motion.div>
);

// 🔥 Metric Card (interactive + animated)
const MetricCard = ({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit: string;
}) => {
  const animated = useAnimatedNumber(Number(value));

  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -6 }}
      className="relative group"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 blur-xl transition" />

      <div className="relative rounded-2xl px-6 py-5 bg-white/5 border border-white/10 backdrop-blur-xl text-center min-w-[150px]">
        <Icon className="w-5 h-5 mx-auto mb-2 text-cyan-400 group-hover:rotate-6 transition" />

        <div className="text-3xl font-bold text-white font-mono">
          {animated}
        </div>

        <div className="text-xs text-gray-400 uppercase tracking-wider">
          {unit}
        </div>

        <div className="text-xs text-gray-500 mt-1">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default function HeroSectionGod() {
  const [metrics, setMetrics] = useState(realtimeMetrics);

  // 🔥 Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        currentDO: Number((prev.currentDO + (Math.random() - 0.5) * 0.2).toFixed(2)),
        predicted24h: Number((prev.predicted24h + (Math.random() - 0.5) * 0.2).toFixed(2)),
        waterTemp: Number((prev.waterTemp + (Math.random() - 0.5) * 0.1).toFixed(2)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🔥 PARALLAX BACKGROUND */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Water system"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </motion.div>

      {/* 🔥 FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -200, opacity: [0, 1, 0] }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 container mx-auto px-6 text-center">

        <StatusBadge />

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-6xl md:text-8xl font-black leading-[0.9]"
        >
          <span className="text-white">Dissolved Oxygen</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            Prediction Engine
          </span>
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto"
        >
          Hybrid AI models (Transformer + LSTM) delivering real-time dissolved oxygen forecasts with industry-leading precision.
        </motion.p>

        {/* 🔥 LIVE METRICS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          <MetricCard icon={Droplets} label="Current DO" value={metrics.currentDO} unit="mg/L" />
          <MetricCard icon={Activity} label="24h Forecast" value={metrics.predicted24h} unit="mg/L" />
          <MetricCard icon={Brain} label="Model R²" value={0.978} unit="score" />
          <MetricCard icon={Waves} label="Water Temp" value={metrics.waterTemp} unit="°C" />
        </motion.div>

        {/* 🔥 SCROLL INDICATOR */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-16"
        >
          <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2 mx-auto">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}