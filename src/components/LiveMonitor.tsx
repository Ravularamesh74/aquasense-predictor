import { useState, useEffect } from "react";
import { Thermometer, Droplets, Wind, CloudRain, Activity, Gauge, TestTubes, Waves } from "lucide-react";
import { realtimeMetrics } from "@/data/mockData";

const GaugeCard = ({
  icon: Icon,
  title,
  value,
  unit,
  min,
  max,
  status,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: "good" | "warning" | "danger";
  delay: number;
}) => {
  const [animValue, setAnimValue] = useState(0);
  const pct = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setAnimValue(pct), delay);
    return () => clearTimeout(timer);
  }, [pct, delay]);

  const statusColor = status === "good" ? "bg-success" : status === "warning" ? "bg-warning" : "bg-destructive";

  return (
    <div className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-500 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold font-mono text-foreground">{value}<span className="text-sm text-muted-foreground ml-1">{unit}</span></p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${statusColor} animate-pulse-glow`} />
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-glow rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animValue}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-muted-foreground font-mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

const LiveMonitor = () => {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative" id="monitor">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <span className={`w-2 h-2 rounded-full bg-primary ${pulse ? "opacity-100" : "opacity-40"} transition-opacity`} />
            Live Monitoring
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Real-Time </span>
            <span className="text-gradient-ocean">Sensor Data</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Continuous IoT sensor feeds processed through our prediction pipeline with sub-second latency
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <GaugeCard icon={Droplets} title="Dissolved Oxygen" value={realtimeMetrics.currentDO} unit="mg/L" min={0} max={14} status="good" delay={200} />
          <GaugeCard icon={Thermometer} title="Water Temperature" value={realtimeMetrics.waterTemp} unit="°C" min={0} max={35} status="good" delay={400} />
          <GaugeCard icon={Gauge} title="pH Level" value={realtimeMetrics.pH} unit="" min={0} max={14} status="good" delay={600} />
          <GaugeCard icon={Activity} title="Turbidity" value={realtimeMetrics.turbidity} unit="NTU" min={0} max={50} status="good" delay={800} />
          <GaugeCard icon={TestTubes} title="BOD" value={realtimeMetrics.bod} unit="mg/L" min={0} max={10} status="warning" delay={1000} />
          <GaugeCard icon={Waves} title="Flow Rate" value={realtimeMetrics.flowRate} unit="m³/s" min={0} max={150} status="good" delay={1200} />
          <GaugeCard icon={Wind} title="Wind Speed" value={8.5} unit="m/s" min={0} max={30} status="good" delay={1400} />
          <GaugeCard icon={CloudRain} title="Rainfall" value={4.2} unit="mm" min={0} max={50} status="good" delay={1600} />
        </div>
      </div>
    </section>
  );
};

export default LiveMonitor;
