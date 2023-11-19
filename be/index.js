const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const logger = require("morgan");
const DBConnection = require("./Config/DB");
const port = process.env.PORT;
DBConnection();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use("/api/user", require("./Routes/User.Route"));

app.listen(port, () => {
  console.log(`APP LISTEN ON PORT : ${port}`);
});
