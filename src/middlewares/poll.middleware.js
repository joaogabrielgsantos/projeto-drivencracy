import pollSchema from "../schemas/poll.schema.js";



function validatePoll (req, res, next){
    //middleware
    const { title, expireAt } = req.body
    const poll = { title, expireAt }

    const validation = pollSchema.validate(poll, {
        abortEarly: false,
    });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }
    next()
}




export default validatePoll