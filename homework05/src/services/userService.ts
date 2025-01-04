import { IUser } from "../interfaces/userInterface";
import { User } from "../models/User";
import { Post } from "../models/Post";

export class UserService {
  async getAllUsers(filters: Record<string, any> = {}) {
    return await User.find(filters);
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async createUser(data: IUser) {
    const user = new User(data);
    await user.save();
  }

  async updateUser(id: string, data: Partial<IUser>) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      throw new Error(`User with id ${id} not found!`);
    }
    user.save();
  }

  async deleteUser(id: string) {
    return User.findByIdAndDelete(id);
  }

  async getUserPosts(user_id: string) {
    try {
      const posts = await Post.find({ authorId: user_id }).exec();
      return posts;
    } catch (error) {
      throw new Error("Error fetching posts");
    }
  }
}

export const userService = new UserService();
