import PostInteraction from "../controllers/posts.js";
import express from "express";
const router = express.Router();

router.post("/",PostInteraction);

export default router