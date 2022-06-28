const express = require("express");
const router = express.Router();
var {
  createUser,
  listOfUser,
  updateOfUser,
  removeOfUser,
} = require("../controller/user");

router.post("/login", createUser);
router.get("/list", listOfUser);
router.put("/update", updateOfUser);
router.delete("/delete/:id", removeOfUser);
module.exports = router;
