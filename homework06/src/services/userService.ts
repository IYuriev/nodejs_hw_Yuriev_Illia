import { IUser } from "../interfaces/userInterface";
import Post from "../models/Post";
import { Repository } from "typeorm";
import { appDataSource } from "./appDataSource";
import User from "../models/User";

export class UserService {
  private repository: Repository<User>;
  private postRepository: Repository<Post>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
    this.postRepository = appDataSource.getRepository(Post);
  }
  async getAllUsers(filters: Record<string, any> = {}) {
    return this.repository.find(filters);
  }

  async getUserById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async createUser(data: IUser) {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  async updateUser(id: number, data: Partial<IUser>) {
    const result = await this.repository.update(id, data);
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found!`);
    }
    return this.repository.findOneBy({ id });
  }

  async deleteUser(id: number) {
    return this.repository.delete(id);
  }

  async getUserPosts(user_id: number) {
    try {
      const posts = await this.postRepository.find({
        where: { authorId: user_id },
      });
      return posts;
    } catch (error) {
      throw new Error("Error fetching posts");
    }
  }
}

export const userService = new UserService();
