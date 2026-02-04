import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    technologies: '',
    achievements: '',
    type: 'work',
    isVisible: true,
    order: 0
  });

  const experienceTypes = ['work', 'education', 'volunteer', 'certification'];

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.EXPERIENCE_ADMIN, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      achievements: formData.achievements.split('\n').map(achievement => achievement.trim()).filter(achievement => achievement),
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : null
    };

    try {
      if (editingExperience) {
        await axios.put(`${API_ENDPOINTS.EXPERIENCE}/${editingExperience._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_ENDPOINTS.EXPERIENCE, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      fetchExperiences();
      resetForm();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location || '',
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
      isCurrent: experience.isCurrent,
      description: experience.description,
      technologies: experience.technologies?.join(', ') || '',
      achievements: experience.achievements?.join('\n') || '',
      type: experience.type,
      isVisible: experience.isVisible,
      order: experience.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_ENDPOINTS.EXPERIENCE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      technologies: '',
      achievements: '',
      type: 'work',
      isVisible: true,
      order: 0
    });
    setEditingExperience(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'work': return 'fas fa-briefcase';
      case 'education': return 'fas fa-graduation-cap';
      case 'volunteer': return 'fas fa-heart';
      case 'certification': return 'fas fa-certificate';
      default: return 'fas fa-circle';
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
        <h2>Experience Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Experience'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title/Position</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Company/Institution</label>
                  <input
                    type="text"
                    className="form-control"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    {experienceTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={formData.isCurrent}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    className="form-control"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Technologies (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Key Achievements (one per line)</label>
                <textarea
                  className="form-control"
                  name="achievements"
                  rows="4"
                  value={formData.achievements}
                  onChange={handleChange}
                  placeholder="Led team of 5 developers&#10;Increased performance by 40%&#10;Implemented new features"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="isCurrent"
                      checked={formData.isCurrent}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Currently working here</label>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="isVisible"
                      checked={formData.isVisible}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Visible on website</label>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {editingExperience ? 'Update' : 'Create'} Experience
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5>All Experiences ({experiences.length})</h5>
        </div>
        <div className="card-body">
          {experiences.length === 0 ? (
            <p className="text-muted">No experiences found. Add your first experience!</p>
          ) : (
            <div className="row">
              {experiences.map(experience => (
                <div key={experience._id} className="col-lg-6 mb-4">
                  <div className="card h-100 border-start border-primary border-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center">
                          <i className={`${getTypeIcon(experience.type)} text-primary me-2`}></i>
                          <span className="badge bg-secondary">{experience.type}</span>
                        </div>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(experience)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(experience._id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      
                      <h6 className="card-title text-primary">{experience.title}</h6>
                      <p className="card-subtitle text-muted mb-2">
                        {experience.company}
                        {experience.location && (
                          <span className="ms-2">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {experience.location}
                          </span>
                        )}
                      </p>
                      
                      <p className="text-muted mb-2">
                        <i className="fas fa-calendar me-1"></i>
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                        {experience.isCurrent && (
                          <span className="badge bg-success ms-2">Current</span>
                        )}
                      </p>
                      
                      <p className="card-text">{experience.description}</p>
                      
                      {experience.technologies && experience.technologies.length > 0 && (
                        <div className="mb-2">
                          <small className="text-muted">Technologies:</small>
                          <div className="d-flex flex-wrap gap-1 mt-1">
                            {experience.technologies.map((tech, idx) => (
                              <span key={idx} className="badge bg-light text-dark">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                          <span className={`badge ${experience.isVisible ? 'bg-success' : 'bg-danger'}`}>
                            {experience.isVisible ? 'Visible' : 'Hidden'}
                          </span>
                          <span className="badge bg-info ms-1">Order: {experience.order}</span>
                        </div>
                        {experience.achievements && experience.achievements.length > 0 && (
                          <small className="text-muted">
                            <i className="fas fa-trophy me-1"></i>
                            {experience.achievements.length} achievements
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminExperience;