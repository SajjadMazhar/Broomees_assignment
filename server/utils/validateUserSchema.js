const Joi = require("joi");

const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "org"] },
    }),
    username:Joi.string().min(3).max(30).required(),
    password: Joi.string().regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
    cPassword: Joi.ref("password"),
});

module.exports = schema;
