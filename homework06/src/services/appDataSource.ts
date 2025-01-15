import { DataSource } from "typeorm";
import config from "../../config/config";
import "dotenv/config";
import User from "../models/User";
import Post from "../models/Post";

const { DB_URL } = config;

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  url: DB_URL,
  synchronize: true,
  logging: true,
  entities: [User, Post],
  subscribers: [],
  migrations: [],
});
