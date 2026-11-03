import { prisma } from "../lib/prisma.js";

export const postExists = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) return res.sendStatus(404);
    next();
  } catch (error) {
    next(error);
  }
};
