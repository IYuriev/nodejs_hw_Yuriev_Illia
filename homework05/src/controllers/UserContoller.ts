import { Request, Response } from "express";
import { userService } from "../services/userService";

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, age } = req.body;
    try {
      const user = await userService.createUser({ name, email, age });
      res.status(201).json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers(req.query);
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
      const user = await userService.updateUser(id, { name, email, age });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const message = await userService.deleteUser(id);
      res.json(message);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUserPosts(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const posts = await userService.getUserPosts(user_id);
      if (!posts.length) {
        res.status(404).json({ error: "No posts found for this user" });
        return;
      }
      res.json(posts);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export const userController = new UserController();
