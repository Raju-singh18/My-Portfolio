import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_ENDPOINTS.ANALYTICS_DASHBOARD}?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">
          Failed to load analytics data.
        </div>
      </div>
    );
  }

  const { summary, topProjects, topBlogs, dailyViews } = analytics;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Analytics Dashboard</h2>
        <select
          className="form-select w-auto"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{summary.pageViews}</h4>
                  <p className="card-text">Page Views</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-eye fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{summary.totalProjects}</h4>
                  <p className="card-text">Total Projects</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-project-diagram fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{summary.totalBlogs}</h4>
                  <p className="card-text">Blog Posts</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-blog fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{summary.totalMessages}</h4>
                  <p className="card-text">Messages</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-envelope fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Project Views</h5>
              <h3 className="text-primary">{summary.projectViews}</h3>
              <small className="text-muted">Last {period} days</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Blog Views</h5>
              <h3 className="text-info">{summary.blogViews}</h3>
              <small className="text-muted">Last {period} days</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Resume Downloads</h5>
              <h3 className="text-success">{summary.resumeDownloads}</h3>
              <small className="text-muted">Last {period} days</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Top Projects */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5>Top Projects by Views</h5>
            </div>
            <div className="card-body">
              {topProjects.length > 0 ? (
                <div className="list-group list-group-flush">
                  {topProjects.map((project, index) => (
                    <div key={project._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-primary me-2">{index + 1}</span>
                        {project.title}
                      </div>
                      <span className="badge bg-secondary">{project.views} views</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No project views in this period</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Blog Posts */}
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5>Top Blog Posts by Views</h5>
            </div>
            <div className="card-body">
              {topBlogs.length > 0 ? (
                <div className="list-group list-group-flush">
                  {topBlogs.map((blog, index) => (
                    <div key={blog._id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-info me-2">{index + 1}</span>
                        {blog.title}
                      </div>
                      <span className="badge bg-secondary">{blog.views} views</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No blog views in this period</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Views Chart */}
      {dailyViews.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Daily Views Trend</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Views</th>
                        <th>Chart</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyViews.map((day) => {
                        const maxViews = Math.max(...dailyViews.map(d => d.views));
                        const percentage = maxViews > 0 ? (day.views / maxViews) * 100 : 0;
                        
                        return (
                          <tr key={day.date}>
                            <td>{new Date(day.date).toLocaleDateString()}</td>
                            <td>{day.views}</td>
                            <td>
                              <div className="progress" style={{ height: '20px' }}>
                                <div
                                  className="progress-bar"
                                  style={{ width: `${percentage}%` }}
                                >
                                  {day.views}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;