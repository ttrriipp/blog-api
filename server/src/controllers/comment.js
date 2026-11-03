import { prisma } from "../lib/prisma.js";

const index = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }
    const comments = await prisma.comment.findMany({
      where: { postId },
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }

    const commenterId = req.user.id;
    const validatedComment = res.locals.validatedComment;
    const createdComment = await prisma.comment.create({
      data: {
        postId,
        commenterId,
        ...validatedComment,
      },
    });
    res.json(createdComment);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const commentId = Number(req.params.commentId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }

    const validatedComment = res.locals.validatedComment;
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        ...validatedComment,
      },
    });
    res.send(updatedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = Number(req.params.commentId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  index,
  create,
  update,
  deleteComment,
};
