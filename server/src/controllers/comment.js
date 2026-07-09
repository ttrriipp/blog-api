import { prisma } from "../lib/prisma.js";

const index = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
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
    const createdComment = await prisma.comment.create({
      data: {
        postId,
        commenterId,
        ...validatedComment,
      },
    });
    console.log(createdComment);
    res.json("created successfully");
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const validatedComment = res.locals.validatedComment;
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(req.params.commentId) },
      data: {
        ...validatedComment,
      },
    });
    console.log(updatedComment);
    res.send("updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(req.params.commentId) },
    });
    if (!comment) res.sendStatus(404);
    const deletedComment = await prisma.comment.delete({
      where: { id: parseInt(req.params.commentId) },
    });
    console.log(deletedComment);
    res.send("successfully deleted");
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
