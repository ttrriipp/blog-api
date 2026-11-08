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
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json(posts);
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
    return res.json(posts);
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
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }
    const post = await prisma.post.findUnique({
      where: { id: postId, published: true },
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
    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const adminShow = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
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
    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const validatedPost = res.locals.validatedPost;
    validatedPost.published = validatedPost.published === "true" ? true : false;

    const postId = Number(req.params.postId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: validatedPost.title,
        content: validatedPost.content,
        published: validatedPost.published,
      },
    });
    return res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.postId);
    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return res.sendStatus(400);
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) res.sendStatus(404);
    await prisma.post.delete({
      where: { id: postId },
    });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  publicIndex,
  adminIndex,
  create,
  show,
  adminShow,
  update,
  deletePost,
};
