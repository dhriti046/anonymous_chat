const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const app = express();
const server = http.createServer(app);
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const onlineUsers = {};
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    onlineUsers[userId] = socket.id;

    console.log(
      `User ${userId} registered with socket ${socket.id}`
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Backend Working");
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});