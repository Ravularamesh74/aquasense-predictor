import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
} from "recharts";
import { modelMetrics } from "@/data/mockData";
import aiModelImg from "@/assets/ai-model.jpg";

const ModelComparison = () => {
  const radarData = modelMetrics.map((m) => ({
    model: m.model.length > 10 ? m.model.slice(0, 10) + "…" : m.model,
    R²: +(m.r2 * 100).toFixed(1),
    NSE: +(m.nse * 100).toFixed(1),
    "1-RMSE": +((1 - m.rmse / 2) * 100).toFixed(1),
    "1-MAE": +((1 - m.mae / 2) * 100).toFixed(1),
  }));

  return (
    <section className="py-24 relative" id="models">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-8 items-center mb-16">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-glow">
            <img src={aiModelImg} alt="AI neural network" className="w-full h-64 object-cover" loading="lazy" width={1024} height={768} />
          </div>
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/10 text-warning text-sm mb-4">
              8 Models Compared
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-foreground">Model </span>
              <span className="text-gradient-ocean">Benchmarks</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              From Linear Regression to Attention-based Transformers — comprehensive evaluation across RMSE, MAE, R², and Nash-Sutcliffe Efficiency.
            </p>
          </div>
        </div>

        {/* Metrics Table */}
        <div className="glass rounded-2xl p-6 mb-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Model</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">RMSE ↓</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">MAE ↓</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">R² ↑</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">NSE ↑</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Rank</th>
              </tr>
            </thead>
            <tbody>
              {[...modelMetrics].sort((a, b) => a.rmse - b.rmse).map((m, i) => (
                <tr key={m.model} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                    {m.model}
                  </td>
                  <td className="text-center py-3 px-4 font-mono text-foreground">{m.rmse}</td>
                  <td className="text-center py-3 px-4 font-mono text-foreground">{m.mae}</td>
                  <td className="text-center py-3 px-4 font-mono text-foreground">{m.r2}</td>
                  <td className="text-center py-3 px-4 font-mono text-foreground">{m.nse}</td>
                  <td className="text-center py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      i === 0 ? "bg-warning/20 text-warning" : i < 3 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      #{i + 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">RMSE & MAE Comparison</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={modelMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 15%)" />
                <XAxis type="number" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} />
                <YAxis dataKey="model" type="category" stroke="hsl(210, 15%, 40%)" tick={{ fontSize: 10 }} width={100} />
                <Tooltip contentStyle={{ background: "hsl(210, 25%, 9%)", border: "1px solid hsl(210, 20%, 18%)", borderRadius: 12 }} />
                <Legend />
                <Bar dataKey="rmse" name="RMSE" fill="hsl(190, 90%, 50%)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="mae" name="MAE" fill="hsl(170, 80%, 45%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Multi-Metric Radar</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(210, 20%, 18%)" />
                <PolarAngleAxis dataKey="model" tick={{ fontSize: 9, fill: "hsl(210, 15%, 55%)" }} />
                <PolarRadiusAxis tick={{ fontSize: 9, fill: "hsl(210, 15%, 40%)" }} domain={[0, 100]} />
                <Radar name="R²" dataKey="R²" stroke="hsl(190, 90%, 50%)" fill="hsl(190, 90%, 50%)" fillOpacity={0.15} />
                <Radar name="NSE" dataKey="NSE" stroke="hsl(170, 80%, 45%)" fill="hsl(170, 80%, 45%)" fillOpacity={0.1} />
                <Radar name="1-RMSE" dataKey="1-RMSE" stroke="hsl(45, 95%, 55%)" fill="hsl(45, 95%, 55%)" fillOpacity={0.1} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelComparison;
