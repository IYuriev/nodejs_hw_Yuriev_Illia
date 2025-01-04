import { IPost } from "../interfaces/postInterface";
import { Post } from "../models/Post";

export class PostService {
  async getAllPosts(filters: Record<string, any> = {}) {
    return await Post.find(filters);
  }

  async getPostById(id: string) {
    return await Post.findById(id);
  }

  async createPost(data: IPost) {
    const post = new Post(data);
    await post.save();
  }

  async updatePost(id: string, data: Partial<IPost>) {
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    if (!post) {
      throw new Error(`Post with id ${id} not found!`);
    }
    post.save();
  }

  async deletePost(id: string) {
    return Post.findByIdAndDelete(id);
  }
}

export const postService = new PostService();
