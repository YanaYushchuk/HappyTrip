const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');
const createError = require('http-errors');
var bodyParser = require('body-parser');
const cors = require('cors');

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://yana_yushchuk:23042003@cluster0.nrv7nib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const tripManagerRouter = require("./src/routes/tripManager");
const destinationManagerRouter = require("./src/routes/destinationManager");
const userManagerRouter = require("./src/routes/userManager");
const commentManagerRouter = require("./src/routes/commentManager");  

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log("Succesfully conected to MongoDB")
}

//Import the express dependency
const app = express();
//Instantiate an express app, the main work horse of this server
const port = 8080;                  //Save the port number where your server will be listening

// Встановлюємо шлях до папки з шаблонами та шаблонізатор Pug

app.use(cors({
    origin: 'http://localhost:5173',
  }));
// parse application/json
app.use(bodyParser.json())

app.use("/tripManager", tripManagerRouter);
app.use("/destinationManager", destinationManagerRouter);
app.use("/userManager", userManagerRouter);
app.use("/commentManager", commentManagerRouter);
//Idiomatic expression in express to route and respond to a client request
// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve trip.html at the /trip route
app.get('/trip', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/trip.html'));
});


app.use(function (req, res, next) {
    next(createError(404));
});


module.exports = app;

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});