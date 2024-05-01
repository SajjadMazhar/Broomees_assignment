const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const userRouter = require("./routes/user.routes");
const { dev } = require("./utils/environments");
const cors = require("cors")

const app = express();

// middleware to parse JSON data coming from http requests
app.use(express.json());

// cors(Cross-Origin resource Sharing) to access resources from different domains
app.use(cors({origin:"*"}))

// middleware to parse url encoded data 
// though it is not needed as we are not using html post form but we will keep it.
app.use(express.urlencoded({ extended: false }));

// middleware for logging requests
app.use(morgan("dev"));

// just a testing route
app.get("/", async (req, res, next) => {
    res.send({ message: "Testing the server..." });
});

// The api router
app.use("/api", userRouter);

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

const PORT = dev.port || 3000;
app.listen(PORT, () => {
    console.log(`server started --> http://localhost:${PORT}`);
});
