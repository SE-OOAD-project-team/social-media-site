import recomendation from "../controllers/recomendation.js";
import express from "express";
const routes = express.Router();

routes.get("/",recomendation);

export default routes;