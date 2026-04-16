"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter,
} from "recharts";

import { timeSeriesData } from "@/data/mockData";

export default function PredictionGod() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = timeSeriesData.slice(0, 90);

  // 🔥 INSIGHTS
  const avgError =
    data.reduce((acc, d) => acc + Math.abs(d.doActual - d.doTransformer), 0) /
    data.length;

  const bias =
    data.reduce((acc, d) => acc + (d.doTransformer - d.doActual), 0) /
    data.length;

  const scatterData = data.map((d) => ({
    actual: d.doActual,
    predicted: d.doTransformer,
  }));

  return (
    <section className="py-28 relative">

      {/* 🔥 HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-white">
          Predictive Intelligence
        </h2>
        <p className="text-gray-400 mt-3">
          Real-time forecasting with model confidence & error analysis
        </p>
      </div>

      {/* 🔥 INSIGHT PANEL */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
          <p className="text-xs text-gray-400">Avg Error</p>
          <h3 className="text-xl font-bold text-cyan-400">
            {avgError.toFixed(3)} mg/L
          </h3>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400">Bias</p>
          <h3 className="text-xl font-bold text-yellow-400">
            {bias.toFixed(3)}
          </h3>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400">Model</p>
          <h3 className="text-xl font-bold text-green-400">
            Transformer (Best)
          </h3>
        </div>
      </div>

      {/* 🔥 MAIN CHART WITH CONFIDENCE */}
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10 mb-10">
        <h3 className="text-white mb-4">Prediction vs Actual</h3>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            onMouseMove={(e) => setActiveIndex(e?.activeTooltipIndex !== undefined ? Number(e?.activeTooltipIndex) : null)}
          >
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="date" />
            <YAxis domain={[4, 12]} />
            <Tooltip />

            {/* 🔥 CONFIDENCE BAND */}
            <Area
              dataKey="doTransformer"
              stroke="transparent"
              fill="rgba(34,211,238,0.1)"
            />

            <Area
              dataKey="doActual"
              stroke="#22d3ee"
              fill="transparent"
              strokeWidth={2}
            />

            <Area
              dataKey="doTransformer"
              stroke="#facc15"
              fill="transparent"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 SCATTER WITH DIAGONAL REFERENCE */}
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <h3 className="text-white mb-4">Actual vs Predicted Accuracy</h3>

        <ResponsiveContainer width="100%" height={320}>
          <ScatterChart>
            <CartesianGrid stroke="#1f2937" />

            <XAxis
              type="number"
              dataKey="actual"
              domain={[4, 12]}
              name="Actual"
            />

            <YAxis
              type="number"
              dataKey="predicted"
              domain={[4, 12]}
              name="Predicted"
            />

            <Tooltip />

            <Scatter
              data={scatterData}
              fill="#22d3ee"
              opacity={0.6}
            />

            {/* 🔥 PERFECT LINE */}
            <Scatter
              data={[
                { actual: 4, predicted: 4 },
                { actual: 12, predicted: 12 },
              ]}
              line
              shape={() => null}
              fill="transparent"
              stroke="#f87171"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}