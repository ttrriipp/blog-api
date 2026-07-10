import passport from "passport";

export const isAuthenticated = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    try {
      if (!req.user) {
        res.status(401);
        throw new Error("unauthorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];
