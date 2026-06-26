import { Router } from "express";
const router = Router();
import controller from "../controllers/auth.js";

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
