require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const cookieParser = require("cookie-parser");

const userRoutes = require('./routers/userRoute');
const predRoutes = require('./routers/predRoute');
const feedbackRoutes = require('./routers/feedbackRoute');

const { dbConnect } = require('./db/database');


dbConnect();

const app = express();
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send({
        success: true,
        message: 'server is running successfully'
    });
});


app.use(userRoutes);
app.use(predRoutes);
app.use(feedbackRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running at PORT: ${PORT}`);
});