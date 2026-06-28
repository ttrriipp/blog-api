import { Router } from "express";
import controller from "../controllers/comment.js";
import validate from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/admin.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = Router({ mergeParams: true });

router.get("/", controller.index);
router.post("/create", isAuthenticated, validate.comment, controller.create);

export default router;
