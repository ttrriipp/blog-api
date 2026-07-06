import { Router } from "express";
import controller from "../controllers/post.js";

const router = Router();

router.get("/", controller.publicIndex);
router.get("/:postId", controller.show);

export default router;
