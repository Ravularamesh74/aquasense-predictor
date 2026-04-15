import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line, Bar, Scatter, ScatterChart, ZAxis,
} from "recharts";
import { timeSeriesData } from "@/data/mockData";
import dissolvedOxygenImg from "@/assets/dissolved-oxygen.jpg";

type TimeRange = "30d" | "90d" | "180d" | "365d";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl p-4 text-sm shadow-glow">
      <p className="text-muted-foreground mb-2 font-mono">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-bold font-mono text-foreground">{entry.value?.toFixed(2)} mg/L</span>
        </div>
      ))}
    </div>
  );
};

const PredictionChart = () => {
  const [range, setRange] = useState<TimeRange>("90d");
  const rangeMap: Record<TimeRange, number> = { "30d": 30, "90d": 90, "180d": 180, "365d": 365 };
  const data = timeSeriesData.slice(0, rangeMap[range]);
  const ranges: TimeRange[] = ["30d", "90d", "180d", "365d"];

  // Error distribution
  const errorData = data.map((d) => ({
    date: d.date,
    error: +(d.doActual - d.doTransformer).toFixed(3),
    absError: +Math.abs(d.doActual - d.doTransformer).toFixed(3),
  }));

  // Scatter: Actual vs Predicted
  const scatterData = data.map((d) => ({
    actual: d.doActual,
    predicted: d.doTransformer,
    temp: d.waterTemp,
  }));

  return (
    <section className="py-24 relative" id="predictions">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8 items-center mb-16">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm mb-4">
              Time-Series Forecasting
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-foreground">Predictive </span>
              <span className="text-gradient-ocean">Analytics</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Multi-model ensemble predictions with confidence intervals. Our Transformer architecture achieves RMSE of 0.38 mg/L.
            </p>
          </div>
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-glow">
            <img src={dissolvedOxygenImg} alt="Dissolved oxygen in water" className="w-full h-48 object-cover" loading="lazy" width={1024} height={768} />
          </div>
        </div>

        {/* Range selector */}
        <div className="flex gap-2 mb-8">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                range === r ? "bg-primary text-primary-foreground shadow-glow" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Main prediction chart */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">DO Actual vs Model Predictions</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190, 90%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(190, 90%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTransformer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(45, 95%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 15%)" />
              <XAxis dataKey="date" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 11 }} domain={[4, 12]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="doActual" name="Actual DO" stroke="hsl(190, 90%, 50%)" fill="url(#gradActual)" strokeWidth={2} />
              <Area type="monotone" dataKey="doLSTM" name="LSTM" stroke="hsl(170, 80%, 45%)" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" />
              <Area type="monotone" dataKey="doTransformer" name="Transformer" stroke="hsl(45, 95%, 55%)" fill="url(#gradTransformer)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom row: Error + Scatter */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Prediction Error Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={errorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 15%)" />
                <XAxis dataKey="date" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} />
                <YAxis stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="absError" name="Abs Error" fill="hsl(190, 90%, 50%)" fillOpacity={0.3} radius={[2, 2, 0, 0]} />
                <Line type="monotone" dataKey="error" name="Error" stroke="hsl(0, 72%, 51%)" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Actual vs Predicted (Scatter)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 15%)" />
                <XAxis dataKey="actual" name="Actual" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} domain={[4, 12]} />
                <YAxis dataKey="predicted" name="Predicted" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} domain={[4, 12]} />
                <ZAxis dataKey="temp" range={[30, 120]} name="Temp" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={scatterData} fill="hsl(190, 90%, 50%)" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionChart;
