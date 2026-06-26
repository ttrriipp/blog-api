import { Router } from "express";
import controller from "../controllers/post.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.get("/", controller.index);
router.post("/create", validate.post, controller.create);

export default router;
