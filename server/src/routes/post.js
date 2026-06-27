import { Router } from "express";
import controller from "../controllers/post.js";
import validate from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

router.get("/", isAuthenticated, controller.index);
router.post("/create", isAdmin, validate.post, controller.create);

export default router;
