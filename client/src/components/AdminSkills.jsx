import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 50,
    icon: '',
    isVisible: true,
    order: 0
  });

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.SKILLS_ADMIN, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      if (editingSkill) {
        await axios.put(`${API_ENDPOINTS.SKILLS}/${editingSkill._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_ENDPOINTS.SKILLS, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      fetchSkills();
      resetForm();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || '',
      isVisible: skill.isVisible,
      order: skill.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_ENDPOINTS.SKILLS}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 50,
      icon: '',
      isVisible: true,
      order: 0
    });
    setEditingSkill(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
        <h2>Manage Skills</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Skill'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Skill Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Proficiency ({formData.proficiency}%)</label>
                  <input
                    type="range"
                    className="form-range"
                    name="proficiency"
                    min="1"
                    max="100"
                    value={formData.proficiency}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Icon (Font Awesome class)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g., fab fa-react"
                  />
                </div>
              </div>
              
              <div className="row">
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
                <div className="col-md-6 mb-3">
                  <div className="form-check mt-4">
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
                  {editingSkill ? 'Update' : 'Create'} Skill
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
          <h5>All Skills ({skills.length})</h5>
        </div>
        <div className="card-body">
          {skills.length === 0 ? (
            <p className="text-muted">No skills found. Add your first skill!</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Proficiency</th>
                    <th>Icon</th>
                    <th>Visible</th>
                    <th>Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map(skill => (
                    <tr key={skill._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {skill.icon && <i className={`${skill.icon} me-2`}></i>}
                          {skill.name}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{skill.category}</span>
                      </td>
                      <td>
                        <div className="progress" style={{ width: '100px', height: '20px' }}>
                          <div
                            className="progress-bar"
                            style={{ width: `${skill.proficiency}%` }}
                          >
                            {skill.proficiency}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <code>{skill.icon || 'None'}</code>
                      </td>
                      <td>
                        <span className={`badge ${skill.isVisible ? 'bg-success' : 'bg-danger'}`}>
                          {skill.isVisible ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>{skill.order}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(skill)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(skill._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;