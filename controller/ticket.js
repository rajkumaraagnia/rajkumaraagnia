// const ticket = require("../models/ticket");
const { closeDelimiter } = require("ejs");
const Ticket = require("../models/ticket");
// const user = require("../models/user");
const User = require("../models/user");

const createTicket = (req, res) => {
  var date = new Date();
  var da = date.getUTCFullYear();
  var gg = date.getUTCDate();
  var mm = date.getUTCMonth();
  var hours = date.getUTCHours();
  var minutes = date.getUTCMinutes();
  var seconds = date.getUTCSeconds();

  const ticket = new Ticket({
    ticketname: req.body.ticketname,
    customerID: req.body.customerID,
    status: req.body.status,
    type: req.body.type,
    description: req.body.description,
    date:
      da + "-" + mm + "_" + gg + "T" + hours + ":" + minutes + ":" + seconds,
  });
  ticket
    .save()
    .then((data) => {
      res.status(200).send({
        status: true,
        statuscode: 200,
        message: "ticket successfully created ",
        ticket: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// const show=(req,res)=>{
//     console.log(req.body.customerID)

//     ticket.find({customerID:req.body.customerID}).then((data)=>{
//         res.send(data)
//     })
// }

// To retrive ticket data from db
const listOfTickets = (req, res) => {
  if (req.query.status) {
    Ticket.find({ status: req.query.status }).then((data) => {
      // User.find({ _id: req.body.customerID }).then((ds) => {

      res.status(200).send({
        status: true,
        statuscode: 200,
        message: " ticket successfully listed",
        ticket: data,
        // user: ds,
      });
    });
    // });
  }
  let open;
  if (!req.query.status) {
    Ticket.aggregate([
      {
        $match: {
          ticketname: req.query.ticketname,
        },
      },
    ]).then((data) => {
      // User.find({}).then((ds) => {

      console.log(data);
      res.status(200).send({
        status: true,
        statuscode: 200,
        message: "successully listed all tickets",
        ticket: data,
        // user: ds,
        // });
      });
    });
  }
};
const updateOfTickets = (req, res) => {
  if (req.query.role === "Admin") {
    Ticket.findByIdAndUpdate(
      { _id: req.query.id },
      { status: req.query.status }
    ).then((data) => {
      res.status(200).send({
        status: true,
        statuscode: 200,
        message: "ticket successfully updated",
        ticket: data,
      });
    });
  }
  if (req.query.role === "customer") {
    res.send("customer cannot change status");
    console.log("customer cannot change status");
  }
};

// remove list
const removeOfTickets = (req, res) => {
  Ticket.findByIdAndRemove({ _id: req.query.id }).then((data) => {
    res.status(200).send({
      status: true,
      statuscode: 200,
      message: "ticket successfully deleted",
      ticket: data,
    });
  });
};

module.exports = {
  createTicket,
  listOfTickets,
  removeOfTickets,
  updateOfTickets,
};
