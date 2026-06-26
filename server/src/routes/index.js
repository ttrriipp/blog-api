import { Router } from "express";
const index = Router();

index.get("/", (req, res) => res.json({ hello: "world" }));

export default { index };
