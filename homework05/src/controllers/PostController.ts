import { postService } from "./../services/postService";
import { Request, Response } from "express";

class PostController {
  async createPost(req: Request, res: Response) {
    const { authorId, title, content, status } = req.body;
    try {
      const post = await postService.createPost({
        authorId,
        title,
        content,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts(req.query);
      res.json(posts);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getPostById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await postService.getPostById(id);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json(post);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const { authorId, title, content, status } = req.body;
    try {
      const post = await postService.getPostById(id);
      if (!post) {
        throw new Error("Post not found");
      }
      const createdAt = post.createdAt;

      const updatedPost = await postService.updatePost(id, {
        authorId,
        title,
        content,
        status,
        createdAt,
        updatedAt: new Date(),
      });
      res.json(updatedPost);
    } catch (err) {
      if (err.message === "Post not found") {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const message = await postService.deletePost(id);
      res.json(message);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export const postController = new PostController();
