import { Router } from "express";
const router = Router();
import passport from "passport";

router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (req, res) => res.send("login successfully"),
);

export default router;
