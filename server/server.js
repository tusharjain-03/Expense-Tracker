const express = require("express");
const dbConnect = require('./dbConnect.js');
const app = express();
app.use(express.json());
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const port = process.env.PORT || 5000;

app.use("/api/users/", usersRoute);
app.use("/api/transactions/", transactionsRoute);

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
    console.log(`Node/Express Server started on port ${port}`);
});