const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tusharjain03:tusharjain1093@cluster0.jtgmybt.mongodb.net/sheymoney");

const connection = mongoose.connection;

connection.on('error', err => console.log(err));
connection.on('connected', () => console.log("Mongo DB connection successfully connected"));