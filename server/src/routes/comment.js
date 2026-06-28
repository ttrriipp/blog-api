import { Router } from "express";
import controller from "../controllers/comment.js";
import validate from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { postExists } from "../middlewares/comment.js";

const router = Router({ mergeParams: true });

router.get("/", postExists, controller.index);
router.post(
  "/create",
  isAuthenticated,
  postExists,
  validate.comment,
  controller.create,
);
router.patch(
  "/:commentId",
  isAuthenticated,
  postExists,
  validate.comment,
  controller.update,
);
router.delete(
  "/:commentId",
  isAuthenticated,
  postExists,
  controller.deleteComment,
);

export default router;
