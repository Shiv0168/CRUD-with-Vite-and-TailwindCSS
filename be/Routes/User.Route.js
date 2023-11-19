const express = require("express");
const {
  createUser,
  getAllUser,
  getById,
  editUser,
  deleteUser,
} = require("../Controllers/User.Controller");

const router = express.Router();

router.route("/").post(createUser).get(getAllUser);
router.route("/:id").get(getById).put(editUser).delete(deleteUser);

module.exports = router;
