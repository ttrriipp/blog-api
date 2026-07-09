import express from "express";
import routes from "./routes/index.js";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./lib/prisma.js";
import passport from "./config/passport.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(
  expressSession({
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/api", routes.auth);
app.use("/api/admin", routes.admin);
app.use("/api/posts", routes.post);
app.use("/api/posts/:postId/comments", routes.comment);

// error handler
app.use((err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    route: req.originalUrl,
    method: req.method,
    time: new Date(),
  };
  console.log(
    "Error details from middleware:",
    JSON.stringify(errorDetails, null, 2),
  );
  console.error(err.stack);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (res.headersSent) {
    return next(err); // Pass to default Express error handler if response already started
  }

  res.status(statusCode).json({ success: false, message });
});

export default app;
