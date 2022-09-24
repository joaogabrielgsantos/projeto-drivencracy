import joi from 'joi';

//schema
const pollSchema = joi.object({
    title: joi.string().min(1).required(),
    expireAt: joi.string()
});

export default pollSchema