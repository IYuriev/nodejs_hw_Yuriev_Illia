import mongoose from "mongoose";
import { Mongoose } from "mongoose";

import "dotenv/config";
import logger from "../utils/logger";
import config from "../../config/config";
const { log, logError } = logger("db");

export class DatabaseService {
  private uri: string;
  private dbName: string;
  private client: Mongoose;

  constructor(uri: string, dbName: string) {
    this.uri = uri;
    this.dbName = dbName;
  }

  async connect(): Promise<Mongoose> {
    try {
      this.client = await mongoose.connect(this.uri, { dbName: this.dbName });
      log("Connected to MongoDB");
      return this.client;
    } catch (error) {
      logError("Failed to connect to MongoDB", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
      log("Disconnected from MongoDB");
    } catch (error) {
      logError("Failed to disconnect from MongoDB", error);
    }
  }
}
const { DB_URL } = config;

const databaseService = new DatabaseService(DB_URL, "mydatabase");
export default databaseService;
export const db = await databaseService.connect();
