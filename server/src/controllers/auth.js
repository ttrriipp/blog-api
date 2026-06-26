import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

const login = (req, res) => res.send("login successfully");

const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name: req.body.name,
        username: req.body.username,
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
