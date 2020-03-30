const Joi = require('@hapi/joi');

//Register Validation Coordinator
const registerValidationCoordinator = data =>{
    const schema = Joi.object({
        name :Joi.string()
                .min(6)
                .required(),
        email:Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(6)
                .required(),
        company: Joi.string()
    });
    return schema.validate(data);
}
//Login Validation
const loginValidation = data =>{
    const schema = Joi.object({
        email:Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(6)
                .required()
    });
    return schema.validate(data);
}
//Register Validation Participant
const registerValidationParticipant = data =>{
        const schema = Joi.object({
            name :Joi.string()
                    .min(6)
                    .required(),
            email:Joi.string()
                    .min(6)
                    .required()
                    .email(),
            company: Joi.string().allow(''),
            eventid:Joi.string().optional(),
        });
        return schema.validate(data);
    }
module.exports.registerValidationCoordinator = registerValidationCoordinator;
module.exports.registerValidationParticipant = registerValidationParticipant;
module.exports.loginValidation = loginValidation;