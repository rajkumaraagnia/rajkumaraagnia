const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var express = require("express");
var user = require("./routes/user");
var ticket = require("./routes/ticket");

var app = express();
const port = 3000;
require("dotenv").config();
var mongoose = require("mongoose");
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
    // middleware routes
    app.use("/pots", user);
    app.use("/pots", ticket);
  }
);
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

// app.get('/home', (req, res) => {
//     res.send('home page')
//   })
