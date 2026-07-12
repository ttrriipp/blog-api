import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import passport from "passport";

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    jwt.sign(
      user,
      process.env.SECRET,
      { expiresIn: "1h" },
      function (err, token) {
        if (err) {
          throw new Error(err);
        }
        console.log(token);
        const { password, ...userDetails } = user;
        res.json({ token, user: userDetails });
      },
    );
  })(req, res, next);
};

const register = async (req, res, next) => {
  try {
    const validatedUser = res.locals.validatedUser;
    const hashedPassword = await bcrypt.hash(validatedUser.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name: validatedUser.name,
        username: validatedUser.username,
        password: hashedPassword,
      },
    });
    const { password, ...user } = createdUser;
    jwt.sign(
      user,
      process.env.SECRET,
      { expiresIn: "1h" },
      function (err, token) {
        if (err) {
          throw new Error(err);
        }
        return res.json({ token, user });
      },
    );
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  register,
};
