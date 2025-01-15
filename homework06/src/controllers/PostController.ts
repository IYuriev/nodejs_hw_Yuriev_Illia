import { postService } from "./../services/postService";
import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";

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
      handleError(err, res);
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await postService.getAllPosts(req.query);
      res.json(posts);
    } catch (err) {
      handleError(err, res);
    }
  }

  async getPostById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post = await postService.getPostById(+id);
      if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json(post);
    } catch (err) {
      handleError(err, res);
    }
  }

  async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const { authorId, title, content, status } = req.body;

    try {
      const post = await postService.getPostById(+id);
      if (!post) {
        throw new Error("Post not found");
      }
      const createdAt = post.createdAt;

      const updatedPost = await postService.updatePost(+id, {
        authorId,
        title,
        content,
        status,
        createdAt,
        updatedAt: new Date(),
      });
      res.json(updatedPost);
    } catch (err) {
      handleError(err, res);
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const message = await postService.deletePost(+id);
      res.json(message);
    } catch (err) {
      handleError(err, res);
    }
  }
}

export const postController = new PostController();
