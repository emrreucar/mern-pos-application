const express = require("express");
const User = require("../models/User.js");

const router = express.Router();

//! get all User
router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! get a User
router.get("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update User
router.put("/update-user", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body.userId }, req.body);
    res.status(200).json({
      message: "User item updated successfully.",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//! delete User
router.delete("/delete-user", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.userId });
    res.status(200).json({
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
