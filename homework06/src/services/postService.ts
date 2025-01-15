import { Repository } from "typeorm";
import { IPost } from "../interfaces/postInterface";
import Post from "../models/Post";
import { appDataSource } from "./appDataSource";

export class PostService {
  private repository: Repository<Post>;

  constructor() {
    this.repository = appDataSource.getRepository(Post);
  }

  async getAllPosts(filters: Record<string, any> = {}) {
    return this.repository.find(filters);
  }

  async getPostById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async createPost(data: IPost) {
    const post = this.repository.create(data);
    return this.repository.save(post);
  }

  async updatePost(id: number, data: Partial<IPost>) {
    const result = await this.repository.update(id, data);
    if (result.affected === 0) {
      throw new Error(`Post with id ${id} not found!`);
    }
    return this.repository.findOneBy({ id });
  }

  async deletePost(id: number) {
    return this.repository.delete(id);
  }
}

export const postService = new PostService();
