import express from "express";
import validatePoll  from '../middlewares/poll.middleware.js';
import { postPoll, getPolls } from '../controllers/poll.controller.js';

const pollRouter = express.Router();


pollRouter.post("/poll", validatePoll, postPoll) ;
pollRouter.get("/poll", validatePoll, getPolls) ;

export default pollRouter;