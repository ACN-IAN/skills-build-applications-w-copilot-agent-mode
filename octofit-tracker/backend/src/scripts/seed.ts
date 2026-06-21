import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

dotenv.config();

/**
 * Seed the octofit_db database with test data
 * 
 * This script initializes the MongoDB database with sample users, teams,
 * activities, leaderboard entries, and workout plans for testing and development.
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    console.log('\n🌱 Starting OctoFit Database Seed...\n');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data\n');

    // Seed Users
    console.log('👥 Seeding Users...');
    const users = await User.insertMany([
      {
        username: 'marathoner_max',
        email: 'max@example.com',
        password: 'hashed_password_1',
        firstName: 'Max',
        lastName: 'Runner',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
        bio: 'Long distance runner and fitness enthusiast',
        totalActivities: 15,
        totalDistance: 125.5,
        totalDuration: 1850,
      },
      {
        username: 'cyclist_claire',
        email: 'claire@example.com',
        password: 'hashed_password_2',
        firstName: 'Claire',
        lastName: 'Cyclist',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claire',
        bio: 'Cycling and outdoor adventures',
        totalActivities: 12,
        totalDistance: 342.0,
        totalDuration: 2100,
      },
      {
        username: 'swimmer_sam',
        email: 'sam@example.com',
        password: 'hashed_password_3',
        firstName: 'Sam',
        lastName: 'Swimmer',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
        bio: 'Triathlon trainer',
        totalActivities: 20,
        totalDistance: 45.8,
        totalDuration: 1240,
      },
      {
        username: 'hiker_henry',
        email: 'henry@example.com',
        password: 'hashed_password_4',
        firstName: 'Henry',
        lastName: 'Hiker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
        bio: 'Mountain explorer',
        totalActivities: 8,
        totalDistance: 85.3,
        totalDuration: 960,
      },
      {
        username: 'fitness_fiona',
        email: 'fiona@example.com',
        password: 'hashed_password_5',
        firstName: 'Fiona',
        lastName: 'Fitness',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona',
        bio: 'All-around fitness coach',
        totalActivities: 18,
        totalDistance: 98.2,
        totalDuration: 1520,
      },
    ]);
    console.log(`✅ Created ${users.length} users\n`);

    // Seed Teams
    console.log('👫 Seeding Teams...');
    const teams = await Team.insertMany([
      {
        name: 'Morning Runners',
        description: 'Early birds who run at sunrise',
        leader: users[0]._id,
        members: [users[0]._id, users[3]._id, users[4]._id],
        totalActivities: 35,
        totalDistance: 309.0,
      },
      {
        name: 'Weekend Warriors',
        description: 'Casual fitness enthusiasts',
        leader: users[1]._id,
        members: [users[1]._id, users[2]._id, users[3]._id],
        totalActivities: 40,
        totalDistance: 473.1,
      },
      {
        name: 'Triathlon Squad',
        description: 'Aspiring triathletes',
        leader: users[2]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
        totalActivities: 47,
        totalDistance: 553.0,
      },
    ]);
    console.log(`✅ Created ${teams.length} teams\n`);

    // Seed Activities
    console.log('🏃 Seeding Activities...');
    const now = new Date();
    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'running',
        distance: 10.5,
        duration: 65,
        calories: 825,
        startTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 65 * 60 * 1000),
        location: 'Central Park, NYC',
        notes: 'Great morning run!',
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'running',
        distance: 8.2,
        duration: 52,
        calories: 650,
        startTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 52 * 60 * 1000),
        location: 'Brooklyn Bridge',
        notes: 'Scenic run',
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'cycling',
        distance: 45.3,
        duration: 125,
        calories: 1200,
        startTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 125 * 60 * 1000),
        location: 'Hudson Valley',
        notes: 'Amazing bike trail',
      },
      {
        user: users[1]._id,
        team: teams[2]._id,
        type: 'cycling',
        distance: 32.1,
        duration: 95,
        calories: 900,
        startTime: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000 + 95 * 60 * 1000),
        location: 'Riverside Park',
        notes: 'Easy pace',
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'swimming',
        distance: 2.5,
        duration: 45,
        calories: 480,
        startTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
        location: 'YMCA Pool',
        notes: 'Freestyle and backstroke',
      },
      {
        user: users[3]._id,
        team: teams[0]._id,
        type: 'hiking',
        distance: 12.8,
        duration: 180,
        calories: 1100,
        startTime: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 180 * 60 * 1000),
        location: 'Bear Mountain',
        notes: 'Beautiful trail',
      },
      {
        user: users[4]._id,
        team: teams[0]._id,
        type: 'walking',
        distance: 5.2,
        duration: 75,
        calories: 380,
        startTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 75 * 60 * 1000),
        location: 'Local neighborhood',
        notes: 'Leisurely walk',
      },
    ]);
    console.log(`✅ Created ${activities.length} activities\n`);

    // Seed Leaderboard
    console.log('🏆 Seeding Leaderboard...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        user: users[1]._id,
        team: teams[1]._id,
        totalDistance: 77.4,
        totalDuration: 220,
        totalActivities: 2,
        rank: 1,
      },
      {
        user: users[0]._id,
        team: teams[0]._id,
        totalDistance: 18.7,
        totalDuration: 117,
        totalActivities: 2,
        rank: 2,
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        totalDistance: 2.5,
        totalDuration: 45,
        totalActivities: 1,
        rank: 3,
      },
      {
        user: users[3]._id,
        team: teams[0]._id,
        totalDistance: 12.8,
        totalDuration: 180,
        totalActivities: 1,
        rank: 4,
      },
      {
        user: users[4]._id,
        team: teams[0]._id,
        totalDistance: 5.2,
        totalDuration: 75,
        totalActivities: 1,
        rank: 5,
      },
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries\n`);

    // Seed Workouts
    console.log('💪 Seeding Workouts...');
    const workouts = await Workout.insertMany([
      {
        user: users[0]._id,
        title: 'Beginner 5K Training',
        description: 'Start with a 1 mile warm-up, then 5K run at steady pace',
        type: 'cardio',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 1000, weight: 'N/A' },
          { name: '5K run', sets: 1, reps: 5000, weight: 'N/A' },
          { name: 'Cool-down walk', sets: 1, reps: 500, weight: 'N/A' },
        ],
        completed: true,
      },
      {
        user: users[1]._id,
        title: 'Hill Climbs',
        description: 'Challenging uphill cycling intervals',
        type: 'cardio',
        difficulty: 'advanced',
        duration: 45,
        exercises: [
          { name: 'Warm-up', sets: 1, reps: 5, weight: 'N/A' },
          { name: 'Hill repeats', sets: 5, reps: 3, weight: 'N/A' },
        ],
        completed: true,
      },
      {
        user: users[2]._id,
        title: 'Core Strength Builder',
        description: 'Bodyweight core exercises for swimmers',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 25,
        exercises: [
          { name: 'Planks', sets: 3, reps: 60, weight: 'bodyweight' },
          { name: 'Russian twists', sets: 3, reps: 20, weight: '8kg' },
          { name: 'Leg raises', sets: 3, reps: 15, weight: 'bodyweight' },
        ],
        completed: false,
      },
      {
        user: users[3]._id,
        title: 'Flexibility & Mobility',
        description: 'Post-hike stretching routine',
        type: 'flexibility',
        difficulty: 'beginner',
        duration: 20,
        exercises: [
          { name: 'Quad stretch', sets: 1, reps: 30, weight: 'N/A' },
          { name: 'Hamstring stretch', sets: 1, reps: 30, weight: 'N/A' },
          { name: 'Hip opener', sets: 1, reps: 30, weight: 'N/A' },
        ],
        completed: true,
      },
      {
        user: users[4]._id,
        title: 'HIIT Endurance',
        description: 'High-intensity interval training for all levels',
        type: 'endurance',
        difficulty: 'intermediate',
        duration: 30,
        exercises: [
          { name: '30s sprints', sets: 8, reps: 30, weight: 'N/A' },
          { name: 'Rest intervals', sets: 8, reps: 30, weight: 'N/A' },
        ],
        completed: false,
      },
    ]);
    console.log(`✅ Created ${workouts.length} workouts\n`);

    console.log('✅ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - ${users.length} users`);
    console.log(`   - ${teams.length} teams`);
    console.log(`   - ${activities.length} activities`);
    console.log(`   - ${leaderboardEntries.length} leaderboard entries`);
    console.log(`   - ${workouts.length} workouts\n`);
    console.log('🎯 API Routes Ready:');
    console.log('   - GET  /api/users');
    console.log('   - GET  /api/teams');
    console.log('   - GET  /api/activities');
    console.log('   - GET  /api/leaderboard');
    console.log('   - GET  /api/workouts\n');

    await mongoose.connection.close();
    console.log('✅ Database connection closed\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
