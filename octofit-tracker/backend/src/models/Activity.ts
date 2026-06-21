import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, enum: ['running', 'cycling', 'swimming', 'walking', 'hiking'], required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model('Activity', ActivitySchema);
