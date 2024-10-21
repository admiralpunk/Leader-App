const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "leaderboard-app-api.vercel.app",
    methods: ["GET,POST,PUT,DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server);

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/users", userRoutes);
app.use("/claim", claimRoutes);

// Socket.io real-time leaderboard update
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("claim-points", (user) => {
    io.emit("leaderboard-updated", user);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
