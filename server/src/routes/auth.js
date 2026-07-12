import { Router } from "express";
import controller from "../controllers/auth.js";
import validate from "../middlewares/validate.js";
const router = Router();
import { isAuthenticated, isGuest } from "../middlewares/auth.js";

router.post("/login", validate.login, isGuest, controller.login);

router.post("/register", isGuest, validate.register, controller.register);
router.get("/me", isAuthenticated, (req, res) => {
  const { password, ...user } = req.user;
  res.json(user);
});

export default router;
