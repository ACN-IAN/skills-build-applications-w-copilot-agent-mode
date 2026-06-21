import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    totalActivities: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Team', TeamSchema);
