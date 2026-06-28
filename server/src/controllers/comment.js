import { prisma } from "../lib/prisma.js";

const index = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) return res.sendStatus(404);
    const comments = await prisma.comment.findMany({
      where: { postId },
    });
    if (comments.length === 0) throw new Error("no comments from this post");
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    const commenterId = req.user.id;
    const validatedComment = res.locals.validatedComment;
    const createdPost = await prisma.comment.create({
      data: {
        postId,
        commenterId,
        ...validatedComment,
      },
    });
    console.log(createdPost);
    res.send("created successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  create,
};
