import React, { useState, useEffect } from 'react';
import { activityAPI } from '../services/api';
import './ActivityLog.css';

interface Activity {
  _id: string;
  user: { username: string };
  type: string;
  distance: number;
  duration: number;
  calories?: number;
  startTime: string;
  location?: string;
}

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: 'running',
    distance: '',
    duration: '',
    startTime: new Date().toISOString().split('T')[0],
    location: '',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const data = await activityAPI.getAll();
      setActivities(data);
      setError(null);
    } catch (err) {
      setError('Failed to load activities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newActivity = {
        ...formData,
        distance: parseFloat(formData.distance),
        duration: parseInt(formData.duration),
        user: 'USER_ID_HERE', // Would come from auth context
        startTime: new Date(formData.startTime),
        endTime: new Date(new Date(formData.startTime).getTime() + parseInt(formData.duration) * 60000),
      };
      await activityAPI.create(newActivity);
      await fetchActivities();
      setFormData({
        type: 'running',
        distance: '',
        duration: '',
        startTime: new Date().toISOString().split('T')[0],
        location: '',
      });
    } catch (err) {
      console.error('Failed to create activity:', err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading activities...</div>;

  return (
    <div className="container mt-4">
      <h1>📊 Activity Log</h1>
      
      <div className="card mb-4">
        <div className="card-header">
          <h5>Log New Activity</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Activity Type</label>
                <select
                  className="form-select"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="running">Running</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                  <option value="walking">Walking</option>
                  <option value="hiking">Hiking</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Distance (km)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  placeholder="0.0"
                  step="0.1"
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Duration (min)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="form-label">Location (optional)</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Where did you exercise?"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Log Activity</button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Recent Activities</h5>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <p className="text-muted">No activities logged yet</p>
          ) : (
            <div className="list-group">
              {activities.map((activity) => (
                <div key={activity._id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</h5>
                    <small>{new Date(activity.startTime).toLocaleDateString()}</small>
                  </div>
                  <p className="mb-1">Distance: {activity.distance} km | Duration: {activity.duration} min</p>
                  {activity.location && <small className="text-muted">📍 {activity.location}</small>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
