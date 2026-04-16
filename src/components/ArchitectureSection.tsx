"use client";

import { motion, Variants } from "framer-motion";
import {
  Database,
  Cpu,
  BarChart3,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Data Ingestion",
    desc: "IoT sensors stream water quality data via MQTT/HTTP with fault-tolerant pipelines",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Zap,
    title: "Preprocessing",
    desc: "Imputation, anomaly detection, temporal encoding, feature normalization",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Cpu,
    title: "Feature Engineering",
    desc: "Lag features, rolling windows, Fourier transforms, seasonal decomposition",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Model Ensemble",
    desc: "Transformer + CNN-LSTM + XGBoost stacked ensemble with meta-learning",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Validation",
    desc: "TimeSeriesSplit CV, NSE > 0.97, drift detection, uncertainty quantification",
    color: "from-indigo-400 to-violet-500",
  },
  {
    icon: Globe,
    title: "Deployment",
    desc: "FastAPI + ONNX + Docker with autoscaling, <100ms latency",
    color: "from-blue-400 to-cyan-500",
  },
];

const techStack = [
  "Python 3.11",
  "PyTorch",
  "XGBoost",
  "LightGBM",
  "Scikit-learn",
  "FastAPI",
  "ONNX Runtime",
  "Docker",
  "Grafana",
  "InfluxDB",
  "Apache Kafka",
  "SHAP",
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ArchitectureSection() {
  return (
    <section className="relative py-28 overflow-hidden" id="architecture">
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,0,255,0.08),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs tracking-wider uppercase mb-6">
            Production Pipeline
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-white">System </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
              Architecture
            </span>
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
            End-to-end intelligent pipeline engineered for real-time water quality prediction at scale
          </p>
        </motion.div>

        {/* PIPELINE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          className="relative mb-24"
        >
          {/* CONNECTOR LINE */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent -translate-y-1/2 blur-sm" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.04,
                  }}
                  className="relative group"
                >
                  {/* GLOW */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 blur-xl transition duration-500`} />

                  {/* CARD */}
                  <div className="relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500">
                    {/* ICON */}
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center group-hover:rotate-6 transition">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {step.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>

                    {/* STEP NUMBER */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-xs font-bold text-white">
                      {i + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* TECH STACK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <h3 className="text-center text-2xl font-semibold text-white mb-8">
            Technology Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.08,
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 text-sm text-white shadow-md hover:shadow-cyan-500/20 transition-all"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}