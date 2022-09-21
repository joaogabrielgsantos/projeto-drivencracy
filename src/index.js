import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import joi from 'joi';


dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());


//conexão com o mongodb

//modelos ou schema (JOI)

//Rotas

//alteração do status 

//verificação do status



app.listen(5000, ()=> console.log("Listening on port 5000"));