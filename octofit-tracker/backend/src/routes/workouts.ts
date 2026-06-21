import express from 'express';
import Workout from '../models/Workout.js';

const router = express.Router();

// Get all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().populate('user');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Get workouts by user
router.get('/user/:userId', async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.params.userId }).populate('user');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Create workout
router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    await workout.populate('user');
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid workout data' });
  }
});

// Update workout
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user');
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid workout data' });
  }
});

// Delete workout
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

export default router;
