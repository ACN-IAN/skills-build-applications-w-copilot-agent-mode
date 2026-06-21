# OctoFit Tracker Project

This is a comprehensive guide for the OctoFit Tracker multi-tier application.

## Project Structure

```
octofit-tracker/
├── backend/           # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── models/    # Mongoose schemas
│   │   ├── routes/    # API endpoints
│   │   └── index.ts   # Express server
│   ├── package.json
│   └── tsconfig.json
└── frontend/          # React 19 + Vite
    ├── src/
    │   ├── components/
    │   ├── services/   # API client
    │   └── App.jsx
    └── package.json
```

## Features

- **User Profiles**: Create accounts and manage user profiles
- **Activity Tracking**: Log running, cycling, swimming, and more
- **Team Management**: Create teams and invite friends
- **Leaderboard**: Compete with other users globally
- **Workout Plans**: Get personalized workout suggestions

## Getting Started

### Prerequisites
- Node.js (LTS)
- MongoDB running locally on port 27017

### Setup

1. **Start MongoDB**
   ```bash
   mongod --dbpath /path/to/data
   ```

2. **Backend Setup**
   ```bash
   npm install --prefix octofit-tracker/backend
   npm run dev --prefix octofit-tracker/backend
   ```

3. **Frontend Setup**
   ```bash
   npm install --prefix octofit-tracker/frontend
   npm run dev --prefix octofit-tracker/frontend
   ```

### Ports
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- MongoDB: localhost:27017

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/user/:userId` - Get user activities
- `POST /api/activities` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Teams
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/team/:teamId` - Get team leaderboard
- `GET /api/leaderboard/user/:userId` - Get user ranking

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/user/:userId` - Get user workouts
- `POST /api/workouts` - Create workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Development

### Backend Development
```bash
npm run dev --prefix octofit-tracker/backend  # Start with auto-reload
npm run build --prefix octofit-tracker/backend # Build TypeScript
npm start --prefix octofit-tracker/backend     # Run production build
```

### Frontend Development
```bash
npm run dev --prefix octofit-tracker/frontend  # Start dev server
npm run build --prefix octofit-tracker/frontend # Build for production
npm run preview --prefix octofit-tracker/frontend # Preview production build
```

## Database Models

- **User**: User profiles with fitness stats
- **Team**: Team management with leader and members
- **Activity**: Individual workout logs
- **Leaderboard**: Ranked user fitness statistics
- **Workout**: Pre-made or suggested workout plans

## Testing API Endpoints

```bash
# Health check
curl http://localhost:8000/api/health

# Create a user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "octouser",
    "email": "octo@example.com",
    "password": "password123",
    "firstName": "Octo",
    "lastName": "Fit"
  }'

# Get all users
curl http://localhost:8000/api/users

# Get leaderboard
curl http://localhost:8000/api/leaderboard
```

## Deployment

This application is configured for GitHub Codespaces with forwarded ports:
- Port 5173 (frontend) - public
- Port 8000 (backend) - public
- Port 27017 (MongoDB) - private

For production deployment, ensure proper environment variables are set and CORS is configured appropriately.
