const express = require("express");
const router = express.Router();
const userSchemaValidate = require("../utils/validateUserSchema");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const {userValidation} = require("../middlewares/user.middlewares")

// initializing prisma client for database communication
const prisma = new PrismaClient();

router.post("/user-signup", userValidation, async (req, res) => {
    
    // validated feilds coming through
    let { firstName, lastName, email, username, password, cPassword } = req.validUser;

    try {
        // checking if user already exist in database
        const [existingUser] = await prisma.user.findMany({
            where: {
                email,
                username
            },
        });

        // responding with error if user exists
        if (existingUser) {
            return res
                .status(401)
                .json({ isErr: true, msg: "duplicate entry" });
        }

        // once the incoming data has validated, we can insert it into database after hashing the password
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
            data: { firstName, lastName, email, username, password: hashedPassword },
        });

        // removing password field from the user object before sending it back to the client
        delete user.password;

        // asigning password and cPassword to null in the end for security reasons
        password = null;
        cPassword = null;

        // sending a json response back to the client with user details
        res.status(201).json({ isErr: false, msg: "user added", user });
    } catch (error) {
        res.status(500).json({ isErr: true, msg: error.message });
    }
});

module.exports = router;
