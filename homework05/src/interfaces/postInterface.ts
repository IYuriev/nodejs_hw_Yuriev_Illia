import { ObjectId } from "mongodb";

export interface IPost {
  authorId: ObjectId;
  title: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
