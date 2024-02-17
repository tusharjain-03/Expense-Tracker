const express = require("express");
require("dotenv").config();
const dbConnect = require('./dbConnect.js');
const app = express();
app.use(express.json());
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const port = 5000;

app.use("/api/users/", usersRoute);
app.use("/api/transactions/", transactionsRoute);

app.listen(port, () => {
    console.log(`Node/Express Server started on port ${port}`);
});