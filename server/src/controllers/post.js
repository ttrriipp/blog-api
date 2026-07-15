import { prisma } from "../lib/prisma.js";

const adminIndex = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      omit: { authorId: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const publicIndex = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      omit: { published: true, authorId: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const validatedPost = res.locals.validatedPost;
    const createdPost = await prisma.post.create({
      data: {
        authorId: req.user.id,
        title: validatedPost.title,
        content: validatedPost.content,
      },
    });
    res.send("created post successfully");
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.postId) },
      omit: { published: true, authorId: true },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        comments: {
          omit: { commenterId: true, postId: true },
          include: { commenter: { select: { name: true } } },
        },
      },
    });
    if (!post) return res.sendStatus(404);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const validatedPost = res.locals.validatedPost;
    await prisma.post.update({
      where: { id: parseInt(req.params.postId) },
      data: {
        title: validatedPost.title,
        content: validatedPost.content,
      },
    });
    res.send("updated successfully");
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.postId) },
    });
    if (!post) res.sendStatus(404);
    const deletedPost = await prisma.post.delete({
      where: { id: parseInt(req.params.postId) },
    });
    console.log(deletedPost);
    res.send("successfully deleted");
  } catch (error) {
    next(error);
  }
};

export default {
  adminIndex,
  publicIndex,
  create,
  show,
  update,
  deletePost,
};
