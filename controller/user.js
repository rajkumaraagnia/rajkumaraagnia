const { Admin } = require("mongodb");
const User = require("../models/user");
const messageJs = require("../Utils/message");
const successMessage = messageJs.SuccessMessage;
const responsejs = require("../Utils/response");
const bcrypt = require("bcryptjs");
const user = require("../models/user");
const { tokenGenerate } = require("../tokenHelper/token");
const { tokenValidator } = require("../tokenHelper/token");
var multer = require("multer");
const SuccessResponse = responsejs.successResponse;

// create user
const createUser = async (req, res) => {
  const value = await bcrypt.hash(req.body.password, 10);
  // value=req.body.password
   const user = new User({
    username: req.body.username,
    emailid: req.body.emailid,
    password: value,
    role: req.body.role,
    date: new Date(),

  
  });

  if(req.file){
    user.avatar=req.file.path
  }
  user
    .save()
    .then((data) => {
      res.send(SuccessResponse(successMessage.USER_CREATE));
    })
    .catch((err) => {
      console.log(err);
    });
};
// const listOfUser = (req, res) => {
//   User.find({ _id: req.params.id }).then((data) => {
//     res.status(200).send({
//       status: true,
//       statuscode: 200,
//       message: "successfully listed all customer details",
//       User: data,
//     });
//   });
// };
const listOfUser = (req, res) => {
  let user = req.query;
  const str = user.role;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  const str3 = str.charAt(0).toLowerCase() + str.slice(1);
  console.log(str2);
  if (str2 === "Admin") {
    User.find({}).then((data) => {
      res.status(200).send({
        status: true,
        statuscode: 200,
        message: " ticket successfully listed",
        User: data,
      });
    });
  }
  console.log(str3);
  if (str3 === "customer") {
    User.find({ _id: user._id }).then((data) => {
      res.status(200).send({
        status: true,
        statuscode: 200,
        message: "successfully listed all tickets",
        User: data,
      });
    });
  }
};

// update user
const updateOfUser = async (req, res) => {
  console.log(req.body.username);
  User.findByIdAndUpdate(
    { _id: req.body.id },
    { username: req.body.username }
  ).then((data) => {
    res.status(200).send({
      status: true,
      statuscode: 200,
      message: "successfully update ticket",
      User: data,
    });
  });
};
// delete user
const removeOfUser = async (req, res) => {
  User.findByIdAndRemove({ _id: req.query.id }).then((data) => {
    res.status(200).send({
      status: true,
      statuscode: 200,
      message: "successfully deleted customer detail",
      User: data,
    });
  });
};
// login user
const loginOfUser = async (req, res) => {
  await user.find({ emailid: req.body.emailid }).then(async (data) => {
    // console.log(data.length);
    if (data.length === 0) {
      return res.send({
        status: false,
        statuscode: 510,
        message: "Emailid invalid",
      });
    }
    // console.log(data[0].password);
    const com = await bcrypt.compare(req.body.password, data[0].password);
    // console.log(com)
    if (com === true) {
      // token generate always login only
      const token = await tokenGenerate(user.emailid);
      return res.send({
        status: true,
        statuscode: 200,
        token: token,
        message: "Login succesfully",
      });
    } else if (com === false) {
      return res.send({
        status: false,
        statuscode: 401,
        message: "Incorrect password",
      });
    }
  });
};

module.exports = {
  createUser,
  listOfUser,
  updateOfUser,
  removeOfUser,
  loginOfUser,
};
