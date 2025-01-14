import config from "../config/config";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import httpLogger from "./middleware/httpLogger";
import logger from "./utils/logger";
import databaseService from "./services/databaseService";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";

const { log, logError } = logger("app");
const app = express();
const { PORT, HOSTNAME } = config;

app.use(express.json());
app.use(httpLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.use(
  (err: { message: any }, req: Request, res: Response, next: NextFunction) => {
    logError("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
);

app.listen(PORT, HOSTNAME, () => {
  log(`Server is running on http://${HOSTNAME}:${PORT}`);
});

process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

async function handleShutdown(signal: string): Promise<void> {
  log(`Received ${signal}. Closing PostgreSQL connection...`);
  await databaseService.disconnect();
  log(`${signal} handled. Exiting process.`);
  process.exit(0);
}
