"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Activity,
  Gauge,
  TestTubes,
  Waves,
} from "lucide-react";

import { realtimeMetrics } from "@/data/mockData";

// 🔥 STATUS ENGINE
const getStatus = (value: number, min: number, max: number) => {
  const pct = (value - min) / (max - min);
  if (pct > 0.8 || pct < 0.2) return "danger";
  if (pct > 0.65 || pct < 0.35) return "warning";
  return "good";
};

// 🔥 RADIAL GAUGE
const RadialGauge = ({ value, min, max }: { value: number; min: number; max: number }) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <svg className="w-20 h-20">
      <circle
        cx="40"
        cy="40"
        r="30"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="6"
        fill="none"
      />
      <motion.circle
        cx="40"
        cy="40"
        r="30"
        stroke="cyan"
        strokeWidth="6"
        fill="none"
        strokeDasharray={188}
        strokeDashoffset={188 - (pct / 100) * 188}
        strokeLinecap="round"
        initial={{ strokeDashoffset: 188 }}
        animate={{ strokeDashoffset: 188 - (pct / 100) * 188 }}
        transition={{ duration: 1 }}
      />
    </svg>
  );
};

// 🔥 CARD
const SensorCard = ({
  icon: Icon,
  title,
  value,
  unit,
  min,
  max,
  image,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  image: string;
}) => {
  const status = getStatus(value, min, max);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -6 }}
      className={`relative overflow-hidden rounded-2xl p-5 backdrop-blur-xl border transition-all
        ${
          status === "danger"
            ? "bg-red-500/10 border-red-500/40 shadow-red-500/20"
            : status === "warning"
            ? "bg-yellow-500/10 border-yellow-500/40 shadow-yellow-500/20"
            : "bg-white/5 border-white/10"
        }`}
    >
      {/* 🔥 Background Image Overlay */}
      <img 
        src={image} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover opacity-10 blur-[2px] grayscale" 
      />
      
      {/* 🔥 Glow */}
      <div className="absolute inset-0 blur-xl opacity-20 bg-cyan-400" />

      <div className="relative flex flex-col items-center text-center gap-3 z-10">
        <Icon className="w-5 h-5 text-cyan-400" />

        <RadialGauge value={value} min={min} max={max} />

        <div className="text-2xl font-bold text-white font-mono">
          {value} <span className="text-xs text-gray-400">{unit}</span>
        </div>

        <div className="text-xs text-gray-400">{title}</div>

        {/* STATUS */}
        <div
          className={`w-2 h-2 rounded-full ${
            status === "danger"
              ? "bg-red-400 animate-pulse"
              : status === "warning"
              ? "bg-yellow-400"
              : "bg-green-400"
          }`}
        />
      </div>
    </motion.div>
  );
};

export default function LiveMonitorGod() {
  const [data, setData] = useState(realtimeMetrics);

  // 🔥 LIVE STREAM SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        currentDO: +(prev.currentDO + (Math.random() - 0.5) * 0.2).toFixed(2),
        waterTemp: +(prev.waterTemp + (Math.random() - 0.5) * 0.1).toFixed(2),
        pH: +(prev.pH + (Math.random() - 0.5) * 0.05).toFixed(2),
        turbidity: +(prev.turbidity + (Math.random() - 0.5) * 0.3).toFixed(2),
        bod: +(prev.bod + (Math.random() - 0.5) * 0.2).toFixed(2),
        flowRate: +(prev.flowRate + (Math.random() - 0.5) * 1).toFixed(2),
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 relative">
      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.08),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-white">
            Live Sensor Intelligence
          </h2>
          <p className="text-gray-400 mt-3">
            Real-time IoT monitoring with anomaly detection
          </p>
        </motion.div>

        {/* 🔥 VISUAL CONTEXT & GRID */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: SYSTEM OVERLOOK IMAGE */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
              alt="Live Sensor"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            
            <div className="absolute bottom-6 left-6 z-20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">Live Node Feed</span>
              </div>
              <h3 className="text-xl font-bold text-white">Sensor Terminal 04</h3>
              <p className="text-xs text-gray-400 mt-1">Deepwater monitoring station — Sector B</p>
            </div>
            
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
              <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-white font-mono">
                LAT: 45.4215
              </div>
              <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] text-white font-mono">
                LNG: -75.6972
              </div>
            </div>
          </motion.div>

          {/* RIGHT: SENSOR GRID */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
            <SensorCard 
              icon={Droplets} title="Dissolved Oxygen" value={data.currentDO} unit="mg/L" min={0} max={14} 
              image="https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=300" 
            />
            <SensorCard 
              icon={Thermometer} title="Temperature" value={data.waterTemp} unit="°C" min={0} max={35} 
              image="https://images.unsplash.com/photo-1532187863486-abf9d39d998e?auto=format&fit=crop&q=80&w=300"
            />
            <SensorCard 
              icon={Gauge} title="pH Level" value={data.pH} unit="" min={0} max={14} 
              image="https://images.unsplash.com/photo-1576086213369-97a306dca664?auto=format&fit=crop&q=80&w=300"
            />
            <SensorCard 
              icon={Activity} title="Turbidity" value={data.turbidity} unit="NTU" min={0} max={50} 
              image="https://images.unsplash.com/photo-1544605051-93e104d48508?auto=format&fit=crop&q=80&w=300"
            />
            <SensorCard 
              icon={TestTubes} title="BOD" value={data.bod} unit="mg/L" min={0} max={10} 
              image="https://images.unsplash.com/photo-1576086476234-1103be98f096?auto=format&fit=crop&q=80&w=300"
            />
            <SensorCard 
              icon={Waves} title="Flow Rate" value={data.flowRate} unit="m³/s" min={0} max={150} 
              image="https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?auto=format&fit=crop&q=80&w=300"
            />
          </div>
        </div>

        {/* BOTTOM DECORATIVE GALLERY */}
        <div className="grid grid-cols-3 gap-6 mt-12 opacity-50 hover:opacity-100 transition-opacity">
          <div className="h-32 rounded-2xl overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1548266652-99cf27701ced?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
          </div>
          <div className="h-32 rounded-2xl overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
          </div>
          <div className="h-32 rounded-2xl overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}