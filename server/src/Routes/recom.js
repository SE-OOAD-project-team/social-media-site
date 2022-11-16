import recomendation from "../controllers/recomendation.js";
import express from "express";
const routes = express.Router();

routes.get("/postRecom",recomendation);

export default routes;