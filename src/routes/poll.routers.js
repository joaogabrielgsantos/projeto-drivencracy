import express from "express";
import validatePoll  from '../middlewares/poll.middleware.js';
import { postPoll } from '../controllers/poll.controller.js';

const pollRouter = express.Router();


pollRouter.post("/poll", validatePoll, postPoll) ;

export default pollRouter;