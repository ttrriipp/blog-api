import { validationResult, body, matchedData } from "express-validator";
import { prisma } from "../lib/prisma.js";

const login = [
  body("username").trim().notEmpty().withMessage("username is required"),
  body("password").trim().notEmpty().withMessage("password is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }
    const cleanData = matchedData(req);
    req.body = {
      ...req.body,
      ...cleanData,
    };
    next();
  },
];

const register = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .custom(async (username) => {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (user) {
        throw new Error("username already exists");
      }
    }),
  body("password").trim().notEmpty().withMessage("password is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }
    res.locals.validatedUser = matchedData(req);
    next();
  },
];

const post = [
  body("title").trim().notEmpty().withMessage("name is required"),
  body("content").trim().escape(),
  body("published").trim().escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }
    res.locals.validatedPost = matchedData(req);
    next();
  },
];

const comment = [
  body("content").trim().notEmpty().withMessage("content is required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    }
    res.locals.validatedComment = matchedData(req);
    next();
  },
];

export default {
  login,
  register,
  post,
  comment,
};
