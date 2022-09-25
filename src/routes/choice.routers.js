import express from "express";
import { postChoice } from "../controllers/choice.controller.js";
import validateChoice from "../middlewares/choice.middleware.js";


const choiceRouter = express.Router();


choiceRouter.post("/choice", validateChoice, postChoice) ;

export default choiceRouter;