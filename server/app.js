//importing needed packages
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

//Import Routes
const usersigninRoute = require("./routes/usersignin");
const coordinatorEventRoute = require("./routes/coordinatorEvents");
const eventsRoute = require("./routes/events");
const participantsRoute = require("./routes/participant");
const activitieRoute = require("./routes/activities");

app.use(
  cors({
    origin: ["http://localhost:4200"],
    exposedHeaders: ["Content-Length", "Token"],
    credentials: true
  })
);

app.use(express.json());

//Adding middleware for routing
app.use("/signin", usersigninRoute);
app.use("/coordinator", coordinatorEventRoute);
app.use("/events", eventsRoute);
app.use("/participants", participantsRoute);
app.use("/activities", activitieRoute);

//Connect to DB
mongoose
  .connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  )
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//Telling Which port to listen to
app.listen(3000, () => console.log("Server Started"));
