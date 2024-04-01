const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/route");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
require("dotenv/config");

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("tiny"));

const api = process.env.API_URL;
app.use(`${api}/v1`, routes);

const dbConfig = require("./config/database.config");
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
