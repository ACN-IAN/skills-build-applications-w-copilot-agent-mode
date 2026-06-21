import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    totalDistance: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 },
    totalActivities: { type: Number, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Leaderboard', LeaderboardSchema);
