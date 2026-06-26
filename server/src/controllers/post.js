import { prisma } from "../lib/prisma.js";

const index = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    return res.json(posts);
  } catch (error) {
    next(error);
  }
};

export default {
  index,
};
