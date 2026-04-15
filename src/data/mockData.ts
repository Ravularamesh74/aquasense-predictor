// Simulated 365-day water quality dataset
const generateTimeSeries = () => {
  const data = [];
  const startDate = new Date("2025-01-01");

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dayOfYear = i;
    const seasonalFactor = Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI / 2);

    const waterTemp = 15 + 10 * seasonalFactor + (Math.random() - 0.5) * 3;
    const airTemp = 18 + 12 * seasonalFactor + (Math.random() - 0.5) * 4;
    const pH = 7.2 + (Math.random() - 0.5) * 1.2;
    const turbidity = 8 + Math.random() * 15 + (seasonalFactor > 0 ? 5 : 0);
    const bod = 2 + Math.random() * 4 + (waterTemp > 20 ? 2 : 0);
    const cod = bod * 2.5 + Math.random() * 3;
    const tds = 180 + Math.random() * 120 + (seasonalFactor > 0 ? 30 : 0);
    const conductivity = tds * 1.5 + Math.random() * 50;
    const salinity = 0.5 + Math.random() * 0.8;
    const ammonia = 0.3 + Math.random() * 1.5;
    const nitrate = 2 + Math.random() * 6;
    const phosphate = 0.1 + Math.random() * 0.8;
    const chlorophyll = 5 + Math.random() * 15 + (seasonalFactor > 0 ? 8 : 0);
    const flowRate = 50 + Math.random() * 80 - seasonalFactor * 20;
    const pressure = 1013 + (Math.random() - 0.5) * 20;
    const rainfall = Math.max(0, Math.random() * 25 - 10 + (seasonalFactor > 0.3 ? 10 : 0));
    const windSpeed = 5 + Math.random() * 15;
    const solarRad = 200 + 150 * Math.max(0, seasonalFactor) + Math.random() * 80;

    // DO model: inversely correlated with temp, BOD; positively with flow
    const doActual = Math.max(
      3,
      Math.min(
        14,
        11 - 0.15 * waterTemp - 0.3 * bod + 0.02 * flowRate + 0.5 * seasonalFactor + (Math.random() - 0.5) * 1.2
      )
    );
    const doPredicted = doActual + (Math.random() - 0.5) * 0.6;
    const doLSTM = doActual + (Math.random() - 0.5) * 0.45;
    const doTransformer = doActual + (Math.random() - 0.5) * 0.35;

    data.push({
      date: date.toISOString().split("T")[0],
      timestamp: date.getTime(),
      waterTemp: +waterTemp.toFixed(2),
      airTemp: +airTemp.toFixed(2),
      pH: +pH.toFixed(2),
      turbidity: +turbidity.toFixed(2),
      bod: +bod.toFixed(2),
      cod: +cod.toFixed(2),
      tds: +tds.toFixed(1),
      conductivity: +conductivity.toFixed(1),
      salinity: +salinity.toFixed(3),
      ammonia: +ammonia.toFixed(3),
      nitrate: +nitrate.toFixed(2),
      phosphate: +phosphate.toFixed(3),
      chlorophyll: +chlorophyll.toFixed(2),
      flowRate: +flowRate.toFixed(1),
      pressure: +pressure.toFixed(1),
      rainfall: +rainfall.toFixed(1),
      windSpeed: +windSpeed.toFixed(1),
      solarRad: +solarRad.toFixed(0),
      doActual: +doActual.toFixed(2),
      doPredicted: +doPredicted.toFixed(2),
      doLSTM: +doLSTM.toFixed(2),
      doTransformer: +doTransformer.toFixed(2),
    });
  }
  return data;
};

export const timeSeriesData = generateTimeSeries();

export const modelMetrics = [
  { model: "Linear Regression", rmse: 1.24, mae: 0.98, r2: 0.82, nse: 0.79, color: "hsl(210, 70%, 50%)" },
  { model: "Random Forest", rmse: 0.78, mae: 0.61, r2: 0.91, nse: 0.89, color: "hsl(150, 70%, 45%)" },
  { model: "XGBoost", rmse: 0.65, mae: 0.49, r2: 0.94, nse: 0.93, color: "hsl(38, 92%, 50%)" },
  { model: "LightGBM", rmse: 0.62, mae: 0.47, r2: 0.945, nse: 0.935, color: "hsl(280, 60%, 55%)" },
  { model: "LSTM", rmse: 0.52, mae: 0.39, r2: 0.96, nse: 0.955, color: "hsl(190, 90%, 50%)" },
  { model: "GRU", rmse: 0.55, mae: 0.42, r2: 0.955, nse: 0.948, color: "hsl(320, 70%, 55%)" },
  { model: "CNN-LSTM", rmse: 0.45, mae: 0.34, r2: 0.97, nse: 0.965, color: "hsl(170, 80%, 45%)" },
  { model: "Transformer", rmse: 0.38, mae: 0.28, r2: 0.978, nse: 0.975, color: "hsl(45, 95%, 55%)" },
];

export const featureImportance = [
  { feature: "Water Temperature", importance: 0.28, category: "Physical" },
  { feature: "BOD", importance: 0.18, category: "Chemical" },
  { feature: "Flow Rate", importance: 0.12, category: "Physical" },
  { feature: "COD", importance: 0.09, category: "Chemical" },
  { feature: "Chlorophyll-a", importance: 0.08, category: "Biological" },
  { feature: "Turbidity", importance: 0.06, category: "Physical" },
  { feature: "Air Temperature", importance: 0.05, category: "Atmospheric" },
  { feature: "pH Level", importance: 0.04, category: "Chemical" },
  { feature: "Ammonia", importance: 0.03, category: "Chemical" },
  { feature: "TDS", importance: 0.025, category: "Chemical" },
  { feature: "Solar Radiation", importance: 0.02, category: "Atmospheric" },
  { feature: "Rainfall", importance: 0.015, category: "Atmospheric" },
];

export const correlationMatrix = [
  { x: "Temp", y: "DO", value: -0.85 },
  { x: "BOD", y: "DO", value: -0.72 },
  { x: "COD", y: "DO", value: -0.65 },
  { x: "Flow", y: "DO", value: 0.45 },
  { x: "pH", y: "DO", value: 0.32 },
  { x: "Turb", y: "DO", value: -0.38 },
  { x: "TDS", y: "DO", value: -0.42 },
  { x: "NH3", y: "DO", value: -0.55 },
  { x: "Temp", y: "BOD", value: 0.68 },
  { x: "Temp", y: "COD", value: 0.55 },
  { x: "BOD", y: "COD", value: 0.82 },
  { x: "Temp", y: "Chl-a", value: 0.62 },
];

export const realtimeMetrics = {
  currentDO: 8.42,
  predicted24h: 7.95,
  confidence: 0.94,
  waterTemp: 18.6,
  pH: 7.35,
  turbidity: 12.4,
  bod: 3.8,
  flowRate: 72.3,
  status: "Good" as const,
  trend: "stable" as const,
  alertLevel: "none" as const,
};

export const anomalyData = timeSeriesData.filter((_, i) => i % 30 === 0).map((d, i) => ({
  ...d,
  isAnomaly: i === 3 || i === 7 || i === 10,
  anomalyScore: i === 3 ? 0.92 : i === 7 ? 0.87 : i === 10 ? 0.95 : Math.random() * 0.3,
}));
