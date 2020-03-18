//importing needed packages
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();

//Import Routes
const usersigupRoute = require("./routes/usersignup");
const usersigninRoute = require("./routes/usersignin.js");


app.use(cors({
    origin: [
        "http://localhost:4200"
    ],
    exposedHeaders: ['Content-Length', 'token'],
    credentials: true,
}));


app.use(express.json());


//Adding middleware for routing
app.use('/signup', usersigupRoute);
app.use('/signin', usersigninRoute);



//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



//Telling Which port to listen to
app.listen(3000, () => console.log("Server Started"));