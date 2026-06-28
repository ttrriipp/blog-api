import { Router } from "express";
import controller from "../controllers/post.js";
import validate from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get("/", controller.index);
router.get("/:postId", controller.show);
router.post(
  "/create",
  isAuthenticated,
  isAdmin,
  validate.post,
  controller.create,
);
router.patch(
  "/:postId",
  isAuthenticated,
  isAdmin,
  validate.post,
  controller.update,
);
router.delete("/:postId", isAuthenticated, isAdmin, controller.deletePost);

export default router;
