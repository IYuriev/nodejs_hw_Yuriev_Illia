import config from "../src/config/config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpLogger from "./middleware/httpLogger";
import logger from "./utils/logger";
import healthcheck from "./routes/healthcheck";

const { log, warn } = logger("app");
const app = express();
const { PORT, HOSTNAME } = config;

app.use(express.json());
app.use(httpLogger);

app.use(healthcheck);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
