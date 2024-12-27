import { Db, ObjectId, WithId } from "mongodb";
import { db } from "./databaseService";

interface IPost {
  authorId: ObjectId;
  title: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PostService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getAllPosts(filters: Record<string, any> = {}) {
    return this.db.collection("posts").find(filters).toArray();
  }

  async getPostById(id: string) {
    return this.db.collection("posts").findOne({ _id: new ObjectId(id) });
  }

  async createPost(data: IPost) {
    const result = await this.db.collection("posts").insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async updatePost(id: string, data: Partial<IPost>) {
    const result = await this.db
      .collection("posts")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
      );
    return result?.value;
  }

  async deletePost(id: string) {
    const result = await this.db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export const postService = new PostService(db);
