const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connect } = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/test', require("./routes/testRoutes"));
app.use('/api/v1/auth', require("./routes/authRoutes"));
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/resturant', require("./routes/resturantRoutes"));
app.use('/api/v1/catagory', require("./routes/categoryRoutes"));
app.use('/api/v1/food', require("./routes/foodRoutes"));


//main-rotes
app.get("/", (req, res) => {
    return res
        .status(200)
        .send("it's runining");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);
