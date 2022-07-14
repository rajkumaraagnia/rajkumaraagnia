const express = require("express");
const router = express.Router();

var {
  createUser,
  listOfUser,
  updateOfUser,
  removeOfUser,
  loginOfUser,
} = require("../controller/user");
const { tokenValidator } = require("../tokenHelper/token");
const upload   =require ('../middleware/upload')

router.post("/user_login",upload.single('avatar'), tokenValidator, createUser);
router.get("/user_list", tokenValidator, listOfUser);
router.put("/user_update", tokenValidator, updateOfUser);
router.delete("/user_delete", tokenValidator, removeOfUser);
router.get("/user_login", loginOfUser);
module.exports = router;
