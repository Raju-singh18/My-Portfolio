 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const categoryIcons = {
  'Frontend': 'fas fa-laptop-code',
  'Backend': 'fas fa-server',
  'Database': 'fas fa-database',
  'Tools': 'fas fa-tools',
  'DevOps': 'fas fa-cloud',
  'Other': 'fas fa-layer-group',
};

const Skills = () => {
  const [skillsData, setSkillsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.SKILLS_GROUPED);
      setSkillsData(response.data);
    } catch (error) {
      setError('Failed to load skills');
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {Object.entries(skillsData).map(([category, skills]) => (
        <div key={category} className="mb-5">
          {/* Category Header */}
          <div className="d-flex align-items-center mb-4">
            <div className="me-3 text-primary fs-3">
              <i className={categoryIcons[category] || 'fas fa-code'}></i>
            </div>
            <h3 className="fw-bold mb-0">{category}</h3>
          </div>

          <div className="row">
            {skills.map((skill) => (
              <div key={skill._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card skill-card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        {skill.icon && (
                          <i className={`${skill.icon} fa-lg text-primary me-2`}></i>
                        )}
                        <h6 className="fw-semibold mb-0">{skill.name}</h6>
                      </div>
                      <span className="badge bg-primary-subtle text-primary">
                        {skill.proficiency}%
                      </span>
                    </div>

                    <div className="progress" style={{ height: '8px' }}>
                      <div
                        className="progress-bar bg-primary progress-animated"
                        role="progressbar"
                        style={{ width: `${skill.proficiency}%` }}
                        aria-valuenow={skill.proficiency}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(skillsData).length === 0 && (
        <div className="text-center text-muted">
          No skills data available
        </div>
      )}
    </div>
  );
};

export default Skills;
