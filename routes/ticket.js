const express = require("express");
const router = express.Router();
var {
  createTicket,
  listOfTickets,
  removeOfTickets,
  updateOfTickets,
} = require("../controller/ticket");
const { tokenValidator } = require("../tokenHelper/token");

router.post("/tickets_signin", tokenValidator, createTicket);
router.get("/tickets_list", tokenValidator, listOfTickets);
router.delete("/tickets_delete", tokenValidator, removeOfTickets);
router.patch("/tickets_update", tokenValidator, updateOfTickets);

module.exports = router;