import { ObjectId } from 'mongodb';
import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import{STATUS_CODE } from '../enums/statusCode.js'



async function postChoice(req, res) {

    const { title, pollId } = req.body
    const choice = { title, pollId }
    
   

    try {
        
        const pollIsExist = await db
          .collection(COLLECTIONS.POLLS)
          .findOne({ _id: new ObjectId(pollId)});
    
        if (!pollIsExist) {
          res.send(STATUS_CODE.NOT_FOUND);
          return;
        }

        const titleIsExist = await db
          .collection(COLLECTIONS.CHOICES)
          .findOne({ title: title});
    
        if (titleIsExist) {
          res.send(STATUS_CODE.CONFLICT);
          return;
        }
    
        await db.collection(COLLECTIONS.CHOICES).insertOne(choice);
    
        res.send(STATUS_CODE.CREATED);
      } catch (error) {
        res.status(500).send(error.message);
      }


}

export {postChoice}