import { prisma } from "../lib/prisma.js";

export const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (user.role !== "admin") {
      res.status(403);
      throw new Error("Forbidden");
    }
  } catch (error) {
    next(error);
  }
};
