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

app.get("/status/:id", (req, res) => {
    console.log(req.params.id);
})




app.listen(process.env.PORT_API, () => console.log(`Listening on port ${process.env.PORT_API}`));