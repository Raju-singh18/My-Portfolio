import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AdminAnalytics = () => {
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

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-chart-line me-2 text-primary"></i>
          Advanced Analytics
        </h2>
        <select
          className="form-select w-auto"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Enhanced Analytics Cards */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                    <i className="fas fa-users text-primary fa-2x"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">Unique Visitors</h6>
                  <h3 className="mb-0">{analytics?.summary?.uniqueVisitors || 0}</h3>
                  <small className="text-success">
                    <i className="fas fa-arrow-up me-1"></i>+12% from last period
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-success bg-opacity-10 rounded-3 p-3">
                    <i className="fas fa-eye text-success fa-2x"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">Page Views</h6>
                  <h3 className="mb-0">{analytics?.summary?.pageViews || 0}</h3>
                  <small className="text-success">
                    <i className="fas fa-arrow-up me-1"></i>+8% from last period
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-info bg-opacity-10 rounded-3 p-3">
                    <i className="fas fa-clock text-info fa-2x"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">Avg. Session</h6>
                  <h3 className="mb-0">2m 34s</h3>
                  <small className="text-danger">
                    <i className="fas fa-arrow-down me-1"></i>-3% from last period
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                    <i className="fas fa-percentage text-warning fa-2x"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="text-muted mb-1">Bounce Rate</h6>
                  <h3 className="mb-0">34.2%</h3>
                  <small className="text-success">
                    <i className="fas fa-arrow-down me-1"></i>-5% from last period
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Traffic Overview</h5>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <i className="fas fa-chart-area fa-3x text-muted mb-3"></i>
                <p className="text-muted">Chart visualization would be implemented here</p>
                <small className="text-muted">Integration with Chart.js or similar library</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Top Referrers</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fab fa-google me-2 text-primary"></i>
                    Google Search
                  </div>
                  <span className="badge bg-primary rounded-pill">45%</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fab fa-linkedin me-2 text-info"></i>
                    LinkedIn
                  </div>
                  <span className="badge bg-info rounded-pill">23%</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fab fa-github me-2 text-dark"></i>
                    GitHub
                  </div>
                  <span className="badge bg-dark rounded-pill">18%</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fas fa-link me-2 text-secondary"></i>
                    Direct
                  </div>
                  <span className="badge bg-secondary rounded-pill">14%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Sections */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Device Analytics</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <i className="fas fa-desktop fa-2x text-primary mb-2"></i>
                  <h6>Desktop</h6>
                  <span className="badge bg-primary">65%</span>
                </div>
                <div className="col-4">
                  <i className="fas fa-mobile-alt fa-2x text-success mb-2"></i>
                  <h6>Mobile</h6>
                  <span className="badge bg-success">30%</span>
                </div>
                <div className="col-4">
                  <i className="fas fa-tablet-alt fa-2x text-info mb-2"></i>
                  <h6>Tablet</h6>
                  <span className="badge bg-info">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Geographic Distribution</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fas fa-flag-usa me-2"></i>
                    United States
                  </div>
                  <span className="badge bg-primary rounded-pill">35%</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fas fa-flag me-2"></i>
                    India
                  </div>
                  <span className="badge bg-success rounded-pill">25%</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fas fa-flag me-2"></i>
                    United Kingdom
                  </div>
                  <span className="badge bg-info rounded-pill">15%</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <div>
                    <i className="fas fa-globe me-2"></i>
                    Others
                  </div>
                  <span className="badge bg-secondary rounded-pill">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
