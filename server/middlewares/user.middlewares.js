const userSchemaValidate = require("../utils/validateUserSchema");

// middleware to validate the incoming request body
const userValidation = (req, res, next) => {
    let { firstName, lastName, email, username, password, cPassword } =
        req.body;

    // validating the body schema
    const validate = userSchemaValidate.validate({
        firstName,
        lastName,
        email,
        username,
        password,
        cPassword,
    });

    if (validate.error) {
        return res
            .status(401)
            .json({ isErr: true, msg: validate.error.message });
    }
    if (password !== cPassword) {
        return res
            .status(401)
            .json({ isErr: true, msg: "enter a valid email or password!" });
    }
    console.log(validate.value)
    req.validUser = validate.value;
    next();
};

module.exports = {
    userValidation,
};
