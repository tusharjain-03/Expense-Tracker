const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on('error', err => console.log(err));
connection.on('connected', () => console.log("Mongo DB connection successfully connected"));