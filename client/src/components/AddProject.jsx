import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map(tech => tech.trim())
    };

    try {
      await axios.post(`${API_BASE_URL}/api/projects`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStatus("Project added successfully!");
      setFormData({
        title: "",
        description: "",
        technologies: "",
        imageUrl: "",
        liveUrl: "",
        githubUrl: ""
      });
    } catch (error) {
      console.error(error);
      setStatus("Failed to add project.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Project Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Technologies (comma separated)</label>
          <input
            type="text"
            className="form-control"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Live URL</label>
          <input
            type="text"
            className="form-control"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">GitHub URL</label>
          <input
            type="text"
            className="form-control"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Add Project"}
        </button>

        {status && (
          <div className="mt-3 text-success">{status}</div>
        )}
      </form>
    </div>
  );
};

export default AddProject;
