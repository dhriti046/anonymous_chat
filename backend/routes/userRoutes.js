const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

//get all users from data base
//GET /users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//get my profile using jwt token
//GET/users/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//get user by id
//GET /users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
