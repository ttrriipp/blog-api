import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const login = (req, res) => {
  jwt.sign(req.user, process.env.SECRET, { expiresIn: "1h" }, function (err) {
    if (err) {
      throw new Error();
    }
    res.send("successfully login");
  });
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
    req.login(createdUser, (error) => {
      if (error) {
        throw new Error(error);
      }
      return res.send("registered successfully");
    });
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  register,
};
