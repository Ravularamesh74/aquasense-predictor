import { Database, Cpu, BarChart3, Zap, Shield, Globe } from "lucide-react";

const steps = [
  { icon: Database, title: "Data Ingestion", desc: "IoT sensors stream water quality data in real-time via MQTT/HTTP", color: "text-info" },
  { icon: Zap, title: "Preprocessing", desc: "Missing value imputation, outlier detection, cyclical encoding", color: "text-primary" },
  { icon: Cpu, title: "Feature Engineering", desc: "Lag features, rolling stats, interaction terms, seasonal decomposition", color: "text-accent" },
  { icon: BarChart3, title: "Model Ensemble", desc: "Transformer + CNN-LSTM + XGBoost weighted ensemble", color: "text-warning" },
  { icon: Shield, title: "Validation", desc: "TimeSeriesSplit CV, Nash-Sutcliffe Efficiency > 0.97", color: "text-success" },
  { icon: Globe, title: "Deployment", desc: "FastAPI REST endpoint, ONNX runtime, sub-100ms inference", color: "text-primary" },
];

const techStack = [
  { name: "Python 3.11", category: "Runtime" },
  { name: "PyTorch", category: "DL Framework" },
  { name: "XGBoost", category: "ML" },
  { name: "LightGBM", category: "ML" },
  { name: "Scikit-learn", category: "ML" },
  { name: "FastAPI", category: "API" },
  { name: "ONNX", category: "Inference" },
  { name: "Docker", category: "Deploy" },
  { name: "Grafana", category: "Monitoring" },
  { name: "InfluxDB", category: "TimeSeries DB" },
  { name: "Apache Kafka", category: "Streaming" },
  { name: "SHAP", category: "XAI" },
];

const ArchitectureSection = () => (
  <section className="py-24 relative" id="architecture">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-info/10 text-info text-sm mb-4">
          Production Pipeline
        </div>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-foreground">System </span>
          <span className="text-gradient-ocean">Architecture</span>
        </h2>
      </div>

      {/* Pipeline Steps */}
      <div className="relative mb-20">
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center relative group hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <step.icon className={`w-6 h-6 ${step.color}`} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-xs font-bold text-primary font-mono">{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Technology Stack</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <div key={tech.name} className="px-4 py-2 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/50 hover:shadow-glow transition-all duration-300 group">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tech.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ArchitectureSection;
