import { userController } from "./../controllers/UserContoller";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.get("/:user_id/posts", userController.getUserPosts);

export default userRouter;
