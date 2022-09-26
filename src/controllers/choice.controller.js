import { ObjectId } from 'mongodb';
import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js'



async function postChoice(req, res) {

  const { title, pollId } = req.body
  const votes = 0
  const choice = { title, pollId, votes }




  try {

    const pollIsExist = await db
      .collection(COLLECTIONS.POLLS)
      .findOne({ _id: new ObjectId(pollId) });

    if (!pollIsExist) {
      res.send(STATUS_CODE.NOT_FOUND);
      return;
    }

    const titleIsExist = await db
      .collection(COLLECTIONS.CHOICES)
      .findOne({ title: title });

    if (titleIsExist) {
      res.send(STATUS_CODE.CONFLICT);
      return;
    }





    await db.collection(COLLECTIONS.CHOICES).insertOne(choice);

   

    res.send(STATUS_CODE.CREATED);
  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
  }


}


async function getPollChoices(req, res) {

  const pollId = req.params.pollId


  try {

    const pollIsExist = await db
      .collection(COLLECTIONS.POLLS)
      .findOne({ _id: new ObjectId(pollId) });

    if (!pollIsExist) {
      res.send(STATUS_CODE.NOT_FOUND);
      return;
    }

    const pollChoices = await db.collection(COLLECTIONS.CHOICES).find({ pollId: pollId }).toArray();
    return res.status(STATUS_CODE.OK).send(pollChoices);

  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

  }

}


async function postVote(req, res) {
  const choiceId = req.params.choiceId

  try {

    const choicesExist = await db
      .collection(COLLECTIONS.CHOICES)
      .findOne({ _id: ObjectId(choiceId) });

    if (!choicesExist) {
      res.send(STATUS_CODE.NOT_FOUND);
      return;
    }

    const voteChoice = await db
      .collection(COLLECTIONS.VOTES)
      .insertOne({
        createdAt: new Date(),
        choiceId: new ObjectId(choiceId)
      });

      const addVote = await db
      .collection(COLLECTIONS.CHOICES)
      .updateOne({ _id: ObjectId(choiceId) }, {$inc:{"votes": 1}})



    return res.sendStatus(STATUS_CODE.OK);

  } catch (error) {
    res.status(STATUS_CODE.SERVER_ERROR).send(error.message);

  }


}




export { postChoice, getPollChoices, postVote }