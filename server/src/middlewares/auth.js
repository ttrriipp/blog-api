import passport from "passport";

export const isAuthenticated = [
  (req, res, next) => {
    if (!req.user) return res.sendStatus(401);
    next();
  },
  passport.authenticate("jwt", { session: false }),
];
