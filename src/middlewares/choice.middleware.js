import choiceSchema from "../schemas/choice.schema.js";




function validateChoice(req, res, next) {
    //middleware
    const { title, pollId } = req.body
    const choice = { title, pollId }

    const validation = choiceSchema.validate(choice, {
        abortEarly: false,
    });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }
    



    next()
}




export default validateChoice