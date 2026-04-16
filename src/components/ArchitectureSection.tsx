"use client";

import { motion, Variants } from "framer-motion";
import {
  Database,
  Cpu,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Activity,
  Waves,
} from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Data Ingestion",
    desc: "Real-time IoT streams via MQTT/Kafka with fault-tolerant ingestion and edge buffering",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Zap,
    title: "Preprocessing",
    desc: "Outlier rejection, temporal alignment, interpolation, normalization pipelines",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Cpu,
    title: "Feature Engineering",
    desc: "Lag features, rolling stats, FFT transforms, seasonal decomposition",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "AI Ensemble",
    desc: "Transformer + CNN-LSTM + XGBoost stacked ensemble with meta-learning",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Validation",
    desc: "TimeSeriesSplit CV, drift detection, uncertainty quantification",
    color: "from-indigo-400 to-violet-500",
  },
  {
    icon: Globe,
    title: "Deployment",
    desc: "FastAPI + ONNX + Docker autoscaling (<100ms latency)",
    color: "from-blue-400 to-cyan-500",
  },
];

const metrics = [
  { label: "Latency", value: "< 95ms" },
  { label: "Accuracy", value: "97.8%" },
  { label: "Throughput", value: "12K/s" },
  { label: "Uptime", value: "99.99%" },
];

export default function ArchitectureSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* 🔥 Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-24">
          <h2 className="text-6xl font-extrabold">
            System <span className="text-cyan-400">Intelligence</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            AI-powered real-time water quality prediction infrastructure with autonomous decision intelligence
          </p>
        </div>

        {/* 🔥 DATA FLOW LINE */}
        <div className="relative mb-28">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40" />

          {/* FLOW PARTICLE */}
          <motion.div
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee]"
          />

          <div className="grid lg:grid-cols-6 gap-6 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative group"
                >
                  {/* Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 blur-xl transition`} />

                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <Icon className="w-6 h-6 text-white mb-3" />
                    <h3 className="text-white text-sm font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 🔥 LIVE METRICS PANEL */}
        <div className="grid md:grid-cols-4 gap-6 mb-24">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center"
            >
              <p className="text-gray-400 text-xs">{m.label}</p>
              <h3 className="text-2xl font-bold text-cyan-400 mt-2">
                {m.value}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* 🔥 AI OUTPUT PANEL */}
        <div className="rounded-3xl p-10 bg-white/5 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-cyan-400" />
            <h3 className="text-white text-xl font-semibold">
              Real-Time Prediction Engine
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-xl bg-black/30">
              <p className="text-gray-400">Dissolved Oxygen</p>
              <p className="text-green-400 text-xl font-bold">7.8 mg/L</p>
            </div>

            <div className="p-4 rounded-xl bg-black/30">
              <p className="text-gray-400">Model Confidence</p>
              <p className="text-cyan-400 text-xl font-bold">98.2%</p>
            </div>

            <div className="p-4 rounded-xl bg-black/30">
              <p className="text-gray-400">Water Status</p>
              <p className="text-blue-400 text-xl font-bold">Optimal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}