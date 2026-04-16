"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  Treemap, PieChart, Pie, RadialBarChart, RadialBar, PolarAngleAxis, PolarGrid, PolarRadiusAxis, LineChart, Line, Legend, AreaChart, Area
} from "recharts";

import { featureImportance, correlationMatrix } from "@/data/mockData";

const categoryColors: Record<string, string> = {
  Physical: "#22d3ee",
  Chemical: "#34d399",
  Biological: "#4edccc",
  Nutrient: "#4ade80",
  Pollutant: "#4ade80",
  Turbidity: "#4ade80",
  Microbial: "#4ade80",
  Organic: "#4ade80",
  Inorganic: "#4ade80",
  HeavyMetal: "#4ade80",
  Pesticide: "#4ade80",
  Herbicide: "#4ade80",
  Fungicide: "#4ade80",
  Insecticide: "#4ade80",
  Other: "#4ade80",
  Pathogen: "#4ade80",
  Atmospheric: "#f59e0b",
};

export default function FeatureAnalysisGod() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const topFeature = [...featureImportance].sort((a, b) => b.importance - a.importance)[0];

  const strongestCorr = [...correlationMatrix].sort(
    (a, b) => Math.abs(b.value) - Math.abs(a.value)
  )[0];

  const treemapData = featureImportance.map((f) => ({
    name: f.feature,
    size: f.importance * 1000,
    importance: f.importance,
  }));

  return (
    <section className="py-28 relative">
      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.08),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold">
            <span className="text-white">Feature </span>
            <span className="text-cyan-400">Intelligence</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Explainability + correlation + AI-driven insights
          </p>
        </motion.div>

        {/* 🔥 INSIGHTS PANEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mb-10 grid md:grid-cols-2 gap-6"
        >
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-xs text-gray-400">Top Driver</p>
            <h3 className="text-xl font-bold text-cyan-400">
              {topFeature.feature}
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Importance: {(topFeature.importance * 100).toFixed(2)}%
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <p className="text-xs text-gray-400">Strongest Correlation</p>
            <h3 className="text-xl font-bold text-pink-400">
              {strongestCorr.x} ↔ {strongestCorr.y}
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Value: {strongestCorr.value.toFixed(2)}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* 🔥 SHAP BAR CHART */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-2xl p-6 bg-white/5 border border-white/10"
          >
            <h3 className="text-white mb-4 font-semibold">
              SHAP Importance
            </h3>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={featureImportance}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="feature" type="category" width={120} stroke="#6b7280" />

                <Tooltip />

                <Bar dataKey="importance">
                  {featureImportance.map((entry) => (
                    <Cell
                      key={entry.feature}
                      fill={categoryColors[entry.category]}
                      opacity={activeFeature && activeFeature !== entry.feature ? 0.2 : 1}
                      onMouseEnter={() => setActiveFeature(entry.feature)}
                      onMouseLeave={() => setActiveFeature(null)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* 🔥 TREEMAP */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-2xl p-6 bg-white/5 border border-white/10"
          >
            <h3 className="text-white mb-4 font-semibold">
              Feature Space
            </h3>

            <ResponsiveContainer width="100%" height={400}>
              <Treemap
                data={treemapData}
                dataKey="size"
                stroke="#111827"
                content={({ x, y, width, height, name }: { x: number; y: number; width: number; height: number; name: string }) => {
                  const isActive = activeFeature === name;

                  return (
                    <g>
                      <motion.rect
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={8}
                        fill="#22d3ee"
                        opacity={isActive ? 1 : 0.4}
                      />
                      <text
                        x={x + width / 2}
                        y={y + height / 2}
                        textAnchor="middle"
                        fill="white"
                        fontSize={12}
                      >
                        {name}
                      </text>
                    </g>
                  );
                }}
              />
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* 🔥 HEATMAP (UPGRADED INTERACTIVE) */}
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <h3 className="text-white mb-4 font-semibold">
            Correlation Matrix
          </h3>

          <div className="grid grid-cols-10 gap-1">
            {correlationMatrix.map((c, i) => {
              const intensity = Math.abs(c.value);

              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  className="aspect-square rounded-md flex items-center justify-center text-xs cursor-pointer"
                  style={{
                    background: c.value > 0
                      ? `rgba(34,211,238,${intensity})`
                      : `rgba(239,68,68,${intensity})`,
                  }}
                  title={`${c.x} × ${c.y}`}
                >
                  {c.value.toFixed(1)}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}