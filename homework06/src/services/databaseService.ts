import "reflect-metadata";
import { appDataSource } from "./appDataSource";
import logger from "../utils/logger";
import { DataSource } from "typeorm";
const { log, logError } = logger("db");

export class DatabaseService {
  async connect(): Promise<DataSource> {
    try {
      await appDataSource.initialize();
      log("Connected to PostgreSQL");
      return appDataSource;
    } catch (error) {
      logError("Failed to connect to PostgreSQL", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await appDataSource.destroy();
      log("Disconnected from PostgreSQL");
    } catch (error) {
      logError("Failed to disconnect from PostgreSQL", error);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
const db = await databaseService.connect();
