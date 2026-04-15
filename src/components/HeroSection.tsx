import { Droplets, Activity, Brain, Waves } from "lucide-react";
import heroImage from "@/assets/hero-water.jpg";
import { realtimeMetrics } from "@/data/mockData";

const StatusBadge = () => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
    </span>
    <span className="text-accent font-medium">System Online — Real-time Monitoring Active</span>
  </div>
);

const MetricPill = ({ icon: Icon, label, value, unit }: { icon: React.ElementType; label: string; value: string | number; unit: string }) => (
  <div className="glass rounded-2xl p-5 flex flex-col items-center gap-2 min-w-[140px] hover:shadow-glow transition-all duration-500 group">
    <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
    <span className="text-2xl font-bold text-foreground font-mono">{value}</span>
    <span className="text-xs text-muted-foreground uppercase tracking-wider">{unit}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Water monitoring" className="w-full h-full object-cover" width={1920} height={1024} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-slide-up">
          <StatusBadge />
        </div>

        <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] animate-slide-up delay-200 opacity-0">
          <span className="text-foreground">Dissolved Oxygen</span>
          <br />
          <span className="text-gradient-ocean">Prediction Engine</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up delay-300 opacity-0">
          AI-powered water quality forecasting using LSTM, Transformer, and hybrid deep learning architectures.
          Real-time monitoring with 97.8% R² accuracy across all seasons.
        </p>

        {/* Live Metrics Strip */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 animate-slide-up delay-500 opacity-0">
          <MetricPill icon={Droplets} label="Current DO" value={realtimeMetrics.currentDO} unit="mg/L" />
          <MetricPill icon={Activity} label="24h Predicted" value={realtimeMetrics.predicted24h} unit="mg/L" />
          <MetricPill icon={Brain} label="Model R²" value="0.978" unit="score" />
          <MetricPill icon={Waves} label="Water Temp" value={realtimeMetrics.waterTemp} unit="°C" />
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 mx-auto flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
