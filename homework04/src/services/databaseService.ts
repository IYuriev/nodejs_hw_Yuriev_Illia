import { MongoClient, Db } from "mongodb";
import config from "../config/config";
import "dotenv/config";
import logger from "../utils/logger";
const { log, logError } = logger("db");

export class DatabaseService {
  private uri: string;
  private dbName: string;
  private client: MongoClient;

  constructor(uri: string, dbName: string) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }

  async connect(): Promise<Db> {
    try {
      await this.client.connect();
      log("Connected to MongoDB");
      return this.client.db(this.dbName);
    } catch (error) {
      logError("Failed to connect to MongoDB", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close();
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
