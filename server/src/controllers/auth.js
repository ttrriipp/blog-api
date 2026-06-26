import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

const login = (req, res) => res.send("login successfully");

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
