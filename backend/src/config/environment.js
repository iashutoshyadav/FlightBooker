import dotenv from "dotenv";
dotenv.config();

const toInt = (value, fallback) => {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? fallback : n;
};

const toFloat = (value, fallback) => {
  const n = parseFloat(value);
  return Number.isNaN(n) ? fallback : n;
};

const toArray = (value, fallback) => {
  if (!value) return fallback;
  return value.split(",").map(v => v.trim());
};

const config = {
  port: toInt(process.env.PORT, 5000),
  nodeEnv: process.env.NODE_ENV || "development",

  databaseUrl: process.env.DATABASE_URL,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  walletInitialBalance: toFloat(
    process.env.WALLET_INITIAL_BALANCE,
    50000
  ),

  surgePricingThreshold: toInt(
    process.env.SURGE_PRICING_THRESHOLD,
    3
  ),

  surgePricingPercentage: toInt(
    process.env.SURGE_PRICING_PERCENTAGE,
    10
  ),

  surgeResetMinutes: toInt(
    process.env.SURGE_RESET_MINUTES,
    10
  ),

  corsOrigin: toArray(
    process.env.CORS_ORIGIN,
    ["http://localhost:5173", "http://localhost:3000"]
  ),
};

export default config;
