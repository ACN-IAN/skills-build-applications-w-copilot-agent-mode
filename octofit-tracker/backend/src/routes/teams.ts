import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('leader').populate('members');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('leader').populate('members');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

// Create team
router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    await team.populate('leader');
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid team data' });
  }
});

// Update team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('leader').populate('members');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid team data' });
  }
});

// Delete team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json({ message: 'Team deleted' });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server error' });
  }
});

export default router;
