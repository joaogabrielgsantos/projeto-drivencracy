import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pollRouter from '../src/routes/poll.routers.js'
import choiceRouter from './routes/choice.routers.js';


dotenv.config();
const app = express()

app.use(cors());
app.use(express.json());
app.use(pollRouter);
app.use(choiceRouter);





app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));