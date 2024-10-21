const express = require("express");
const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");
const router = express.Router();

// Claim points for a user
router.post("/claim", async (req, res) => {
  const { userId } = req.body;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  // Update user points
  const user = await User.findById(userId);
  user.totalPoints += randomPoints;
  await user.save();

  // Store claim history
  const claim = new ClaimHistory({ userId, points: randomPoints });
  await claim.save();

  res.json({ user, randomPoints });
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

module.exports = router;
