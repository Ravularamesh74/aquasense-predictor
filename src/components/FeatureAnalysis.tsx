"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ================================
   🔥 SIMULATION INPUTS
================================ */

export default function GodDashboardAdvanced() {
  const [inputs, setInputs] = useState({
    temperature: 25,
    ph: 7.2,
    turbidity: 3,
  });

  const [prediction, setPrediction] = useState(7.5);
  const [confidence, setConfidence] = useState(97);

  const [history, setHistory] = useState<any[]>([]);

  /* ================================
     🧠 SIMULATION ENGINE
  ================================= */

  const calculatePrediction = (t: number, ph: number, turb: number) => {
    let base = 8;

    base -= t * 0.05;        // higher temp lowers oxygen
    base += (ph - 7) * 0.3;  // pH influence
    base -= turb * 0.2;      // turbidity reduces oxygen

    return Math.max(4, Math.min(10, base));
  };

  /* ================================
     ⚡ UPDATE SYSTEM
  ================================= */

  useEffect(() => {
    const newPrediction = calculatePrediction(
      inputs.temperature,
      inputs.ph,
      inputs.turbidity
    );

    setPrediction(+newPrediction.toFixed(2));
    setConfidence(+(95 + Math.random() * 3).toFixed(2));

    // update time series
    setHistory((prev) => [
      ...prev.slice(-20),
      {
        time: new Date().toLocaleTimeString(),
        value: newPrediction,
      },
    ]);
  }, [inputs]);

  /* ================================
     🧠 AI REASONING ENGINE
  ================================= */

  const reasoning = [];

  if (inputs.temperature > 28)
    reasoning.push("High temperature reduces dissolved oxygen");

  if (inputs.turbidity > 5)
    reasoning.push("High turbidity negatively impacts oxygen levels");

  if (inputs.ph > 7)
    reasoning.push("Slightly alkaline pH increases oxygen stability");

  if (reasoning.length === 0)
    reasoning.push("All parameters are within optimal range");

  /* ================================
     🎯 UI
  ================================= */

  return (
    <section className="py-32 px-6">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold">
          AI Simulation <span className="text-cyan-400">Engine</span>
        </h2>
        <p className="text-gray-400 mt-2">
          Interactive prediction + reasoning + time-series intelligence
        </p>
      </div>

      {/* ================= INPUT CONTROLS ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">

        {[
          { key: "temperature", label: "Temperature (°C)", min: 10, max: 40 },
          { key: "ph", label: "pH Level", min: 5, max: 9 },
          { key: "turbidity", label: "Turbidity", min: 0, max: 10 },
        ].map((item) => (
          <div key={item.key} className="p-6 bg-white/5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-400">{item.label}</p>

            <input
              type="range"
              min={item.min}
              max={item.max}
              step="0.1"
              value={(inputs as any)[item.key]}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  [item.key]: parseFloat(e.target.value),
                })
              }
              className="w-full mt-4"
            />

            <p className="text-cyan-400 mt-2 font-bold">
              {(inputs as any)[item.key]}
            </p>
          </div>
        ))}
      </div>

      {/* ================= OUTPUT ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">

        <div className="p-6 bg-black/40 rounded-xl border border-cyan-400/20">
          <p className="text-gray-400 text-sm">Prediction</p>
          <h3 className="text-3xl text-green-400 font-bold">
            {prediction} mg/L
          </h3>
        </div>

        <div className="p-6 bg-black/40 rounded-xl border border-cyan-400/20">
          <p className="text-gray-400 text-sm">Confidence</p>
          <h3 className="text-3xl text-cyan-400 font-bold">
            {confidence}%
          </h3>
        </div>

        <div className="p-6 bg-black/40 rounded-xl border border-cyan-400/20">
          <p className="text-gray-400 text-sm">Status</p>
          <h3 className="text-3xl text-blue-400 font-bold">
            {prediction > 6 ? "Optimal" : "Risk"}
          </h3>
        </div>

      </div>

      {/* ================= REASONING ================= */}
      <div className="mb-16 p-6 bg-white/5 rounded-xl border border-white/10">
        <h3 className="text-white font-semibold mb-4">
          AI Reasoning Engine
        </h3>

        <div className="space-y-2 text-sm text-gray-300">
          {reasoning.map((r, i) => (
            <p key={i}>• {r}</p>
          ))}
        </div>
      </div>

      {/* ================= TIME SERIES ================= */}
      <div className="p-6 bg-white/5 rounded-xl border border-white/10">
        <h3 className="text-white mb-4 font-semibold">
          Prediction Trend (Live)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="time" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}