import { ObjectId } from 'mongodb';
import db from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js'




async function postPoll(req, res) {

    const { title, expireAt } = req.body

    try {
        db.collection(COLLECTIONS.POLLS).insertOne({
            title,
            expireAt
        })
        return res.send(STATUS_CODE.CREATED);

    } catch (error) {
        res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }


}

async function getPolls(req, res) {
    try {
        const polls = await db.collection(COLLECTIONS.POLLS).find().toArray();
        return res.status(STATUS_CODE.OK).send(polls);
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}


async function getResults(req, res) {
    const pollId = req.params.pollId;
    let maisVotos = 0;
    let nameVoted = "";
    let result = {};

    try {
        const opcoes = await db
            .collection(COLLECTIONS.CHOICES)
            .find({ pollId })
            .toArray();

        maisVotos = opcoes[0].votes;
        nameVoted = opcoes[0].title;
        for (let index = 1; index < opcoes.length; index++) {
            if (maisVotos < opcoes[index].votes) {
                maisVotos = opcoes[index].votes;
                nameVoted = opcoes[index].title;
            }
        }

        result = {
            votes: maisVotos,
            title: nameVoted,
        };
        const polls = await db
            .collection(COLLECTIONS.POLLS)
            .findOne({ _id: ObjectId(pollId) });

        console.log(result);
        return res.status(STATUS_CODE.OK).send({ ...polls, result });
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}




export { postPoll, getPolls, getResults }