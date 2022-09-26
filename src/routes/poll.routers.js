import express from "express";
import validatePoll  from '../middlewares/poll.middleware.js';
import { postPoll, getPolls, getResults } from '../controllers/poll.controller.js';

const pollRouter = express.Router();


pollRouter.post("/poll", validatePoll, postPoll) ;
pollRouter.get("/poll", validatePoll, getPolls) ;
pollRouter.get("/poll/:pollId/result", getResults);

export default pollRouter;