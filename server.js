const express = require("express");
require("dotenv").config();
const dbConnect = require('./dbConnect.js');
const app = express();
app.use(express.json());
const path = require("path");
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const port = process.env.PORT || 5000;

app.use("/api/users/", usersRoute);
app.use("/api/transactions/", transactionsRoute);

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client/build/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Node/Express Server started on port ${port}`);
});