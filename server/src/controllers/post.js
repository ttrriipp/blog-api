import { prisma } from "../lib/prisma.js";

const index = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
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
    res.send("created post successfully");
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.postId) },
    });
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

export default {
  index,
  create,
  show,
  update,
};
