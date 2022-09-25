import express from "express";
import { postChoice, getPollChoices, postVote } from "../controllers/choice.controller.js";
import validateChoice from "../middlewares/choice.middleware.js";


const choiceRouter = express.Router();


choiceRouter.post("/choice", validateChoice, postChoice) ;
choiceRouter.get("/:pollId/choice", getPollChoices) ;
choiceRouter.post("/choice/:choiceId/vote", postVote)

export default choiceRouter;