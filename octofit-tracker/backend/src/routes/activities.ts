import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().populate('user').populate('team');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Get activities by user
router.get('/user/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.params.userId }).populate('user').populate('team');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Create activity
router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('user');
    await activity.populate('team');
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid activity data' });
  }
});

// Update activity
router.put('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user').populate('team');
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid activity data' });
  }
});

// Delete activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

export default router;
