import joi from 'joi';


const voteSchema = joi.object({
    createdAt: joi.string().min(1).required(),
    choiceId: joi.required()
});


export default voteSchema