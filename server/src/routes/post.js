import { Router } from "express";
import controller from "../controllers/post.js";
import validate from "../middlewares/validate.js";
import { isAdmin } from "../middlewares/admin.js";

const router = Router();

router.get("/", controller.index);
router.post("/create", isAdmin, validate.post, controller.create);

export default router;
