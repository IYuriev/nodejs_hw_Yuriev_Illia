import { Router, Request, Response } from "express";
import { userService } from "../services/userService";

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  try {
    const user = await userService.createUser({ name, email, age });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await userService.updateUser(id, { name, email, age });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await userService.deleteUser(id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/:user_id/posts", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  console.log("Received user_id:", user_id);
  try {
    const posts = await userService.getUserPosts(user_id);
    if (!posts.length) {
      console.log("No posts found for user_id:", user_id);
      throw new Error("No posts found for this user");
    }
    res.json(posts);
  } catch (err) {
    if (err.message === "No posts found for this user") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

export default userRouter;
