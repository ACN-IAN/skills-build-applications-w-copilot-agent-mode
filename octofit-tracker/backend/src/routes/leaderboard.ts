import express from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = express.Router();

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ totalDistance: -1 })
      .populate('user')
      .populate('team');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Get leaderboard for a team
router.get('/team/:teamId', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ team: req.params.teamId })
      .sort({ totalDistance: -1 })
      .populate('user');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Get user ranking
router.get('/user/:userId', async (req, res) => {
  try {
    const entry = await Leaderboard.findOne({ user: req.params.userId }).populate('user');
    if (!entry) return res.status(404).json({ message: 'User not found in leaderboard' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

export default router;
