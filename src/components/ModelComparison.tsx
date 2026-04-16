"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell,
} from "recharts";

import { modelMetrics } from "@/data/mockData";

export default function ModelComparisonGod() {
  const [active, setActive] = useState<string | null>(null);

  // 🔥 BEST MODEL DETECTION
  const sorted = [...modelMetrics].sort((a, b) => a.rmse - b.rmse);
  const best = sorted[0];

  const radarData = modelMetrics.map((m) => ({
    model: m.model,
    R2: m.r2 * 100,
    NSE: m.nse * 100,
    Score: (1 - m.rmse / 2) * 100,
  }));

  return (
    <section className="py-28 relative">
      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.08),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-white">
            Model Intelligence
          </h2>
          <p className="text-gray-400 mt-3">
            Comparative evaluation across accuracy, error, and stability
          </p>
        </motion.div>

        {/* 🔥 INSIGHT PANEL */}
        <div className="mb-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
            <p className="text-xs text-gray-400">Best Model</p>
            <h3 className="text-xl font-bold text-cyan-400">
              {best.model}
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              RMSE: {best.rmse} (lowest error)
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400">Highest Accuracy</p>
            <h3 className="text-xl font-bold text-green-400">
              {sorted.sort((a, b) => b.r2 - a.r2)[0].model}
            </h3>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400">Most Stable</p>
            <h3 className="text-xl font-bold text-purple-400">
              {sorted.sort((a, b) => b.nse - a.nse)[0].model}
            </h3>
          </div>
        </div>

        {/* 🔥 TABLE WITH HIGHLIGHT */}
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10 mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3">Model</th>
                <th className="text-center">RMSE</th>
                <th className="text-center">MAE</th>
                <th className="text-center">R²</th>
                <th className="text-center">Rank</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m, i) => (
                <tr
                  key={m.model}
                  onMouseEnter={() => setActive(m.model)}
                  onMouseLeave={() => setActive(null)}
                  className={`transition ${
                    m.model === best.model
                      ? "bg-cyan-500/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <td className="py-3">{m.model}</td>
                  <td className="text-center">{m.rmse}</td>
                  <td className="text-center">{m.mae}</td>
                  <td className="text-center">{m.r2}</td>
                  <td className="text-center font-bold">
                    #{i + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔥 CHARTS */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* BAR */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white mb-4">Error Comparison</h3>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={modelMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="model" type="category" width={120} stroke="#6b7280" />
                <Tooltip />

                <Bar dataKey="rmse">
                  {modelMetrics.map((m) => (
                    <Cell
                      key={m.model}
                      fill={
                        m.model === best.model
                          ? "#22d3ee"
                          : "#64748b"
                      }
                      opacity={
                        active && active !== m.model ? 0.2 : 1
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* RADAR */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-white mb-4">Performance Radar</h3>

            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="model" />
                <PolarRadiusAxis domain={[0, 100]} />

                <Radar
                  dataKey="R2"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.2}
                />

                <Radar
                  dataKey="Score"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}