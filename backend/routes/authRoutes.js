const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const adjectives = [
  "Silent",
  "Blue",
  "Crimson",
  "Cosmic",
  "Golden",
  "Shadow",
  "Swift",
  "Mystic"
];

const animals = [
  "Fox",
  "Wolf",
  "Panda",
  "Owl",
  "Tiger",
  "Falcon",
  "Raven",
  "Lynx"
];

async function generateUsername() {
  while (true) {
    const username = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}${Math.floor(1000 + Math.random() * 9000)}`;

    const exists = await User.findOne({ username });
    if (!exists) return username;
  }
}

router.post("/register", async (req, res) => {
  try {
    const { email, password, bio, interests } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await generateUsername();

    const user = new User({
      username,
      email,
      password: hashedPassword,
      bio: bio || "",
      interests: interests || [],
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      interests: user.interests,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No account found with that email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      _id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      interests: user.interests,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const {bio, interests } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.userId,
      { bio, interests },
      { new: true, select: "-password" }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
