import { Router } from "express";
import controller from "../controllers/auth.js";
import validate from "../middlewares/validate.js";
import passport from "passport";
const router = Router();
import { isAuthenticated } from "../middlewares/auth.js";

router.post(
  "/login",
  validate.login,
  passport.authenticate("local", {
    failureMessage: true,
  }),
  controller.login,
);

router.post("/register", validate.register, controller.register);
router.post("/logout", controller.logout);
router.get("/me", isAuthenticated, (req, res) => {
  const { password, ...user } = req.user;
  res.json(user);
});

export default router;
