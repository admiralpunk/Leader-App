const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Fetch all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a new user
router.post("/add", async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.json(newUser);
});

module.exports = router;
