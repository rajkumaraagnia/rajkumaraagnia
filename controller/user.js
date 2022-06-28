const { Admin } = require("mongodb");
const User = require("../models/user");
const messageJs = require("../Utils/message");
const successMessage = messageJs.SuccessMessage;
const responsejs = require("../Utils/response");
const SuccessResponse = responsejs.successResponse;

// create user
const createUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    emailid: req.body.emailid,
    password: req.body.password,
    role: req.body.role,
    date: new Date(),
  });
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
  console.log(user);
  if (user.role === "Admin") {
    User.find({}).then((data) => {
      res.status(200).send({
        status: true,
        statuscode: 200,
        message: " ticket successfully listed",
        ticket: data,
      });
    });
  }
  if (user.role === "customer") {
    User.find({ _id: user._id }).then((data) => {
      res.status(200).send({
        status: true,
        statuscode: 200,
        message: "successfully listed all tickets",
        ticket: data,
      });
    });
  }
};

// update user
const updateOfUser = (req, res) => {
  console.log(req.body.username);
  User.updateOne({ username: req.body.username }).then((data) => {
    res.send(data);
  });
};
// delete user
const removeOfUser = (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }).then((data) => {
    res.status(200).send({
      status: true,
      statuscode: 200,
      message: "successfully deleted customer datail",
      User: data,
    });
  });
};
module.exports = { createUser, listOfUser, updateOfUser, removeOfUser };
