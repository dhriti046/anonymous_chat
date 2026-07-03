const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

const adjectives = [
  "Happy",
  "Cozy",
  "Sunny",
  "Cheerful",
  "Lucky",
  "Gentle",
  "Brave",
  "Tiny",
  "Bright",
  "Jolly",
  "Sweetie",
  "Cutie"
];

const animals = [
  "Panda",
  "Koala",
  "Otter",
  "Fox",
  "Penguin",
  "Bear",
  "Rabbit",
  "Duck",
  "Cat",
  "Dog",
  "Chick",
  "Hamster"
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

    //The second argument (10) is the bcrypt cost factor or salt rounds. It determines how computationally expensive the hashing process is. A higher value makes hashing slower, increasing resistance to brute-force attacks
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await generateUsername();

    const user = new User({
      username,
      email,
      password: hashedPassword,
      bio: bio || "",
      interests: interests || [],
    });

    //save user to database
    await user.save();

    //create jwt token using payload {userId : user._id} and secret key from .env file and set expiry time to 7 days
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send jwt token to client along with user data
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

    //compare password with hashed password in database using bcrypt.compare() method
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    //create jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send jwt to client
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

//authMiddleware checks authentication, if authenticated it extracts the userId from the token and attaches it to req.userId
//then update the user profile
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
