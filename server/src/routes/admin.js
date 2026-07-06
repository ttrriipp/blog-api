import { Router } from "express";
import postController from "../controllers/post.js";
import validate from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get("/posts", isAuthenticated, isAdmin, postController.adminIndex);
router.post(
  "/posts/create",
  isAuthenticated,
  isAdmin,
  validate.post,
  postController.create,
);
router.patch(
  "/posts/:postId",
  isAuthenticated,
  isAdmin,
  validate.post,
  postController.update,
);
router.delete(
  "/posts/:postId",
  isAuthenticated,
  isAdmin,
  postController.deletePost,
);

export default router;
