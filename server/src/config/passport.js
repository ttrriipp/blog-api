import "dotenv/config";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import JwtStrategy from "passport-jwt/lib/strategy.js";
import { ExtractJwt } from "passport-jwt";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    async (payload, done) => {
      try {
        if (!payload.id) {
          return done(null, false, {
            message: "invalid token",
          });
        }

        const user = await prisma.user.findUnique({
          where: { id: payload.id },
        });
        if (!user) {
          return done(null, false, {
            message: "invalid token",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;
