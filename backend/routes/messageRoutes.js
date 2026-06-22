const express = require("express");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const currentUser = req.userId;
    const otherUser = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUser, receiver: otherUser },
        { sender: otherUser, receiver: currentUser },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
