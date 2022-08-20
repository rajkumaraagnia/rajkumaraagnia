const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var express = require("express");
var user = require("./routes/user");
var ticket = require("./routes/ticket");
var userv2 = require("./version2/routes/user");
var ticketv2 = require("./version2/routes/ticket");
var multer = require("multer");
// const { Translate } = require("@google-cloud/translate").v2;
const translate = require("google-translate-api");

var app = express();
const port = 3000;
var fs = require("fs");
var path = require("path");
require("dotenv").config();
var mongoose = require("mongoose");
const router = require("./routes/user");

// models not import
// const ticket = require("./models/ticket");
// const user = require("./models/user");
// var url = "mongodb://localhost:27017/home";

mongoose.connect(
  process.env.DATABASE,
  { useUnifiedTopology: true },
  function (err, db) {
    if (err) throw err;
    if (!err) {
      console.log("mongodb connected");
    }
    //   midddleware -predifined
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());
    // upload files
    app.use("/uploads", express.static("uploads"));

    // middleware routes
    app.use("/api", user);
    app.use("/api", ticket);
    // Next version
    app.use("/api/v2", userv2);
    app.use("/api/v2", ticketv2);
  }
);
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

// app.get('/home', (req, res) => {
//     res.send('home page')
//   })
