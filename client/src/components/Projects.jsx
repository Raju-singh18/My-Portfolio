 
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { trackProjectView } from "../utils/analytics";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [allTechnologies, setAllTechnologies] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.PROJECTS);
      setProjects(res.data);

      const techs = new Set();
      res.data.forEach((p) =>
        p.technologies?.forEach((t) => techs.add(t))
      );
      setAllTechnologies([...techs].sort());
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId, url) => {
    trackProjectView(projectId);
    if (url) window.open(url, "_blank");
  };

  const filteredProjects = projects.filter((project) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search);

    const matchesTech =
      !selectedTech || project.technologies?.includes(selectedTech);

    return matchesSearch && matchesTech;
  });

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border" role="status" />
      </section>
    );
  }

  return (
    <section className="container pb-5">
      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <select
            className="form-select shadow-sm"
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
          >
            <option value="">All Technologies</option>
            {allTechnologies.map((tech) => (
              <option key={tech}>{tech}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {filteredProjects.map((project) => (
          <div className="col" key={project._id}>
            <div className="card h-100 border-0 shadow-sm project-card">
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleProjectClick(project._id, project.liveUrl)
                  }
                />
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="fw-semibold">{project.title}</h5>

                <p className="text-muted small flex-grow-1">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="mb-3 d-flex flex-wrap gap-2">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="badge rounded-pill text-bg-light border"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedTech(tech)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="d-flex gap-2 mt-auto">
                  {project.liveUrl && (
                    <button
                      className="btn btn-sm btn-outline-primary w-100"
                      onClick={() =>
                        handleProjectClick(
                          project._id,
                          project.liveUrl
                        )
                      }
                    >
                      <i className="fas fa-external-link-alt me-1" />
                      Live
                    </button>
                  )}

                  {project.githubUrl && (
                    <button
                      className="btn btn-sm btn-outline-dark w-100"
                      onClick={() =>
                        handleProjectClick(
                          project._id,
                          project.githubUrl
                        )
                      }
                    >
                      <i className="fab fa-github me-1" />
                      Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No projects found</h4>
          <p className="text-muted">
            Try changing search keywords or technology filter
          </p>
        </div>
      )}
    </section>
  );
};

export default Projects;
