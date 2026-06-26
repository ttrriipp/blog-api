import { prisma } from "../lib/prisma.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (user.role !== "admin") {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
