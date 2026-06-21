import React, { useState, useEffect } from 'react';
import { leaderboardAPI } from '../services/api';
import './Leaderboard.css';

interface LeaderboardEntry {
  _id: string;
  user: { _id: string; username: string; firstName: string; lastName: string };
  totalDistance: number;
  totalDuration: number;
  totalActivities: number;
  rank?: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await leaderboardAPI.getAll();
      setLeaderboard(data);
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1>🏆 Leaderboard</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Distance (km)</th>
              <th>Duration (min)</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id}>
                <td className="fw-bold">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                </td>
                <td>{entry.user.firstName} {entry.user.lastName}</td>
                <td>{entry.totalDistance.toFixed(1)}</td>
                <td>{entry.totalDuration}</td>
                <td>{entry.totalActivities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
