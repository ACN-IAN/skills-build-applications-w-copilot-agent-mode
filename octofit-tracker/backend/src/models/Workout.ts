import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['cardio', 'strength', 'flexibility', 'endurance'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
    duration: { type: Number, required: true },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: String,
      },
    ],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Workout', WorkoutSchema);
