import { Db, ObjectId, WithId } from "mongodb";
import { db } from "./databaseService";

interface IUser {
  name: string;
  email: string;
  age: number;
}

export class UserService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getAllUsers(filters: Record<string, any> = {}) {
    return this.db.collection("users").find(filters).toArray();
  }

  async getUserById(id: string) {
    return this.db.collection("users").findOne({ _id: new ObjectId(id) });
  }

  async createUser(data: IUser) {
    const result = await this.db.collection("users").insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async updateUser(id: string, data: Partial<IUser>) {
    const result = await this.db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
      );
    return result?.value;
  }

  async deleteUser(id: string) {
    const result = await this.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async getUserPosts(user_id: string) {
    try {
      const posts = await db
        .collection("posts")
        .find({ authorId: user_id })
        .toArray();
      return posts;
    } catch (error) {
      throw new Error("Error fetching posts");
    }
  }
}

export const userService = new UserService(db);
