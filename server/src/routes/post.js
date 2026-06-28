import { Router } from "express";
import controller from "../controllers/post.js";
import validate from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get("/", isAuthenticated, controller.index);
router.get("/:postId", isAuthenticated, controller.show);
router.post(
  "/create",
  isAuthenticated,
  isAdmin,
  validate.post,
  controller.create,
);
router.post(
  "/:postId",
  isAuthenticated,
  isAdmin,
  validate.post,
  controller.update,
);
router.delete("/:postId", isAuthenticated, isAdmin, controller.deletePost);

export default router;
