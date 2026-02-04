
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import {
  trackResumeDownload,
  trackSocialClick,
} from "../utils/analytics";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.PROFILE);
      setProfile(res.data);
    } catch (err) {
      setError("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeDownload = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.RESUME_DOWNLOAD);
      if (res.data?.downloadUrl) {
        trackResumeDownload();
        window.open(res.data.downloadUrl, "_blank");
      }
    } catch (err) {
      console.error("Resume download failed", err);
    }
  };

  const handleSocialClick = (platform, url) => {
    trackSocialClick(platform);
    window.open(url, "_blank");
  };

  const availabilityBadge = (status) => {
    const map = {
      available: "success",
      busy: "warning",
      "not-available": "danger",
    };
    return status ? (
      <span className={`badge bg-${map[status]} px-3 py-2`}>
        {status.replace("-", " ")}
      </span>
    ) : null;
  };

  /* -------------------- LOADING -------------------- */
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  /* -------------------- FALLBACK -------------------- */
  if (error || !profile) {
    return (
      <section className="container py-5">
        <div className="text-center">
          <h3 className="fw-bold">About Me</h3>
          <p className="text-muted">
            Profile information is currently unavailable.
          </p>
        </div>
      </section>
    );
  }

  /* -------------------- MAIN UI -------------------- */
  return (
    <section id="about">
      <div className="row align-items-center">
        {/* IMAGE */}
        <div className="col-lg-5 mb-4 mb-lg-0 text-center">
          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/300x300"
            }
            alt={profile.fullName}
            className="img-fluid rounded-3 shadow-sm"
            style={{ maxWidth: "280px" }}
          />
        </div>

        {/* CONTENT */}
        <div className="col-lg-7">

          <div className="text-muted mb-3">
            {profile.currentPosition && (
              <div>
                <i className="fas fa-briefcase me-2" />
                {profile.currentPosition}
                {profile.currentCompany && ` at ${profile.currentCompany}`}
              </div>
            )}

            {profile.location && (
              <div>
                <i className="fas fa-map-marker-alt me-2" />
                {profile.location}
              </div>
            )}

            {profile.yearsOfExperience && (
              <div>
                <i className="fas fa-calendar me-2" />
                {profile.yearsOfExperience}+ years experience
              </div>
            )}
          </div>

          <p className="lead">
            {profile.bio ||
              "I am a Full Stack Web Developer with hands-on experience building scalable MERN stack applications, authentication systems, dashboards, and REST APIs."}
          </p>

          {/* ACTIONS */}
          <div className="d-flex flex-wrap gap-3 my-4">
            {profile.resumeUrl && (
              <button
                onClick={handleResumeDownload}
                className="btn btn-primary"
              >
                <i className="fas fa-download me-2" />
                Download Resume
              </button>
            )}

            {profile.allowContact && (
              <a href="/contact" className="btn btn-outline-secondary">
                <i className="fas fa-envelope me-2" />
                Contact Me
              </a>
            )}
          </div>

          {/* SOCIALS */}
          <div className="d-flex flex-wrap gap-2">
            {profile.socialLinks?.github && (
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() =>
                  handleSocialClick(
                    "github",
                    profile.socialLinks.github
                  )
                }
              >
                <i className="fab fa-github me-2" />
                GitHub
              </button>
            )}

            {profile.socialLinks?.linkedin && (
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() =>
                  handleSocialClick(
                    "linkedin",
                    profile.socialLinks.linkedin
                  )
                }
              >
                <i className="fab fa-linkedin me-2" />
                LinkedIn
              </button>
            )}

            {profile.socialLinks?.twitter && (
              <button
                className="btn btn-outline-info btn-sm"
                onClick={() =>
                  handleSocialClick(
                    "twitter",
                    profile.socialLinks.twitter
                  )
                }
              >
                <i className="fab fa-twitter me-2" />
                Twitter
              </button>
            )}

            {profile.socialLinks?.youtube && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() =>
                  handleSocialClick(
                    "youtube",
                    profile.socialLinks.youtube
                  )
                }
              >
                <i className="fab fa-youtube me-2" />
                YouTube
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
