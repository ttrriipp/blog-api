import express from "express";
import routes from "./routes/index.js";
import passport from "./config/passport.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_PUBLIC_URL, process.env.FRONTEND_ADMIN_URL],
  }),
);

app.use(passport.initialize());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/api/auth", routes.auth);
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
    return next(err);
  }

  res.status(statusCode).json({ success: false, message });
});

export default app;
