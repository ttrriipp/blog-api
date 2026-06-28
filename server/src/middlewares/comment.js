import { prisma } from "../lib/prisma.js";

export const postExists = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) return res.send("post doesnt exist");
    next();
  } catch (error) {
    next(error);
  }
};
