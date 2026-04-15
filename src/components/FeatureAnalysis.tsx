import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  Treemap,
} from "recharts";
import { featureImportance, correlationMatrix } from "@/data/mockData";
import dataVizImg from "@/assets/data-viz.jpg";

const categoryColors: Record<string, string> = {
  Physical: "hsl(190, 90%, 50%)",
  Chemical: "hsl(170, 80%, 45%)",
  Biological: "hsl(150, 80%, 45%)",
  Atmospheric: "hsl(38, 92%, 50%)",
};

const TreemapContent = ({ x, y, width, height, name, importance }: any) => {
  if (width < 40 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill="hsl(190, 90%, 50%)" fillOpacity={0.1 + importance * 2} stroke="hsl(210, 20%, 18%)" />
      <text x={x + width / 2} y={y + height / 2 - 6} textAnchor="middle" fill="hsl(200, 20%, 90%)" fontSize={width > 80 ? 11 : 9} fontWeight={600}>
        {name?.length > 12 ? name.slice(0, 12) + "…" : name}
      </text>
      <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="hsl(190, 90%, 50%)" fontSize={10} fontFamily="JetBrains Mono">
        {(importance * 100).toFixed(1)}%
      </text>
    </g>
  );
};

const CorrelationHeatmap = () => {
  const variables = ["Temp", "BOD", "COD", "Flow", "pH", "Turb", "TDS", "NH3", "Chl-a", "DO"];
  const getCorr = (x: string, y: string) => {
    if (x === y) return 1;
    const found = correlationMatrix.find((c) => (c.x === x && c.y === y) || (c.x === y && c.y === x));
    return found?.value ?? 0;
  };
  const getColor = (v: number) => {
    if (v > 0) return `rgba(45, 212, 191, ${Math.abs(v) * 0.8})`;
    return `rgba(239, 68, 68, ${Math.abs(v) * 0.8})`;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        <div className="grid" style={{ gridTemplateColumns: `80px repeat(${variables.length}, 1fr)` }}>
          <div />
          {variables.map((v) => (
            <div key={v} className="text-center text-xs text-muted-foreground py-2 font-mono">{v}</div>
          ))}
          {variables.map((row) => (
            <>
              <div key={`label-${row}`} className="text-xs text-muted-foreground py-2 pr-2 text-right font-mono flex items-center justify-end">{row}</div>
              {variables.map((col) => {
                const val = getCorr(row, col);
                return (
                  <div
                    key={`${row}-${col}`}
                    className="aspect-square m-0.5 rounded-md flex items-center justify-center text-xs font-mono"
                    style={{ backgroundColor: getColor(val) }}
                    title={`${row} × ${col}: ${val.toFixed(2)}`}
                  >
                    {val !== 0 && <span className="text-foreground text-[10px]">{val.toFixed(1)}</span>}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureAnalysis = () => {
  const treemapData = featureImportance.map((f) => ({
    name: f.feature,
    importance: f.importance,
    size: f.importance * 1000,
  }));

  return (
    <section className="py-24 relative" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm mb-4">
            SHAP & Permutation Importance
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Feature </span>
            <span className="text-gradient-ocean">Importance</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Model explainability through SHAP values, permutation importance, and correlation analysis
          </p>
        </div>

        {/* Image banner */}
        <div className="rounded-2xl overflow-hidden shadow-glow mb-12 relative">
          <img src={dataVizImg} alt="Data visualization" className="w-full h-48 object-cover" loading="lazy" width={1024} height={768} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex items-center pl-8">
            <div>
              <p className="text-3xl font-bold text-foreground">12 Features</p>
              <p className="text-muted-foreground">analyzed across 4 categories</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* SHAP Bar Chart */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">SHAP Feature Importance</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 15%)" />
                <XAxis type="number" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} />
                <YAxis dataKey="feature" type="category" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} width={130} />
                <Tooltip contentStyle={{ background: "hsl(210, 25%, 9%)", border: "1px solid hsl(210, 20%, 18%)", borderRadius: 12 }} />
                <Bar dataKey="importance" name="Importance" radius={[0, 6, 6, 0]}>
                  {featureImportance.map((entry) => (
                    <Cell key={entry.feature} fill={categoryColors[entry.category]} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-4">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Treemap */}
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Feature Importance Treemap</h3>
            <ResponsiveContainer width="100%" height={400}>
              <Treemap
                data={treemapData}
                dataKey="size"
                stroke="hsl(210, 20%, 18%)"
                content={<TreemapContent />}
              />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Correlation Heatmap */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Correlation Heatmap</h3>
          <CorrelationHeatmap />
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-8 h-3 rounded" style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.8), transparent)" }} />
              Negative
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-8 h-3 rounded" style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.8))" }} />
              Positive
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureAnalysis;
