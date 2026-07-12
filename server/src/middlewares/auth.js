import passport from "passport";

export const isAuthenticated = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        res.status(401);
        console.log(req.user);
        throw new Error("unauthorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];

export const isGuest = [
  (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        res.status(403);
        throw new Error("Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];
