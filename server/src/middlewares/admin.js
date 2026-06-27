import { prisma } from "../lib/prisma.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (user.role !== "ADMIN") {
      res.status(403);
      throw new Error("Forbidden");
    }
    next();
  } catch (error) {
    next(error);
  }
};
