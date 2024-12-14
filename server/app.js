const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const path = require("path");
const Router = require("./routes/Meeting.js");
const { connectDB } = require("./mongoDb.js");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
// const io = new Server({ cors: true });
try {
  // connectDB();
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "")));
  app.use(cors());
  app.use(Router);
} catch (e) {
  console.log(e);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));