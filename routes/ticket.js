const express = require("express");
const router = express.Router();
var {
  createTicket,
  listOfTickets,
  removeOfTickets,
  updateOfTickets,
} = require("../controller/ticket");

router.post("/signin", createTicket);
router.get("/Show", listOfTickets);
router.delete("/delete/:id", removeOfTickets);
router.patch("/update",updateOfTickets)
// router.get('/Showw',showw);

module.exports = router;
