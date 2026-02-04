
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const Experience = () => {
  const [experienceData, setExperienceData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.EXPERIENCE_GROUPED);
      setExperienceData(res.data || {});

      const tabs = Object.keys(res.data || {});
      if (tabs.length) setActiveTab(tabs[0]);
    } catch (err) {
      setError("Unable to load experience data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getTabMeta = (type) => {
    const map = {
      work: { label: "Work Experience", icon: "fas fa-briefcase" },
      education: { label: "Education", icon: "fas fa-graduation-cap" },
      volunteer: { label: "Volunteer", icon: "fas fa-heart" },
      certification: { label: "Certifications", icon: "fas fa-certificate" },
    };
    return map[type] || { label: type, icon: "fas fa-circle" };
  };

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border" role="status" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-5 text-center">
        <p className="text-danger">{error}</p>
      </section>
    );
  }

  return (
    <section className="container pb-5">
      {Object.keys(experienceData).length > 0 ? (
        <>
          {/* Tabs */}
          <div className="d-flex justify-content-center mb-5 flex-wrap gap-2">
            {Object.keys(experienceData).map((type) => {
              const { label, icon } = getTabMeta(type);
              return (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`btn ${
                    activeTab === type
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                >
                  <i className={`${icon} me-2`} />
                  {label}
                  <span className="badge bg-light text-dark ms-2">
                    {experienceData[type].length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Timeline */}
          {experienceData[activeTab]?.map((exp) => (
            <div key={exp._id} className="row mb-4">
              <div className="col-md-3 text-md-end mb-2">
                <span className="badge bg-primary">
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </span>
                {exp.isCurrent && (
                  <div className="mt-1">
                    <span className="badge bg-success">Current</span>
                  </div>
                )}
              </div>

              <div className="col-md-9">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold text-primary mb-1">
                      {exp.title}
                    </h5>

                    <p className="text-muted mb-2">
                      {exp.company}
                      {exp.location && (
                        <span className="ms-2">
                          • <i className="fas fa-map-marker-alt me-1"></i>
                          {exp.location}
                        </span>
                      )}
                    </p>

                    <p className="mb-3">{exp.description}</p>

                    {exp.achievements?.length > 0 && (
                      <>
                        <h6 className="fw-semibold">Key Achievements</h6>
                        <ul className="ps-3">
                          {exp.achievements.map((item, idx) => (
                            <li key={idx} className="mb-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {exp.technologies?.length > 0 && (
                      <div className="mt-3">
                        <h6 className="fw-semibold mb-2">
                          Technologies Used
                        </h6>
                        <div className="d-flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="badge bg-light text-dark border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center text-muted py-5">
          <i className="fas fa-info-circle fa-2x mb-3" />
          <p>No experience data available yet.</p>
        </div>
      )}
    </section>
  );
};

export default Experience;
