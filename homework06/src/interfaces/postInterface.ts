import { PostStatus } from "../models/Post";

export interface IPost {
  authorId: number;
  title: string;
  content: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
}
