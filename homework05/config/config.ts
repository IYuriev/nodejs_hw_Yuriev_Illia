import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000,
  HOSTNAME: process.env.APP_HOSTNAME || "localhost",
  DB_URL: String(process.env.DATABASE_URL),
};

export default config;
