import { Router } from "express";
import controller from "../controllers/post.js";

const router = Router();

// gives a list of posts
router.get("/", controller.index);

export default router;
