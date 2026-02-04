
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import { trackResumeDownload, trackSocialClick } from '../utils/analytics';

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PROFILE);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeDownload = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.RESUME_DOWNLOAD);
      if (response.data.downloadUrl) {
        trackResumeDownload();
        window.open(response.data.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const handleSocialClick = (platform, url) => {
    trackSocialClick(platform);
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary"></div>
      </section>
    );
  }

  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        color: '#ffffff',
      }}
    >
      {/* subtle overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent)',
        }}
      ></div>

      <div className="container position-relative">
        <div className="row align-items-center min-vh-100 py-5">
          {/* TEXT */}
          <div className="col-lg-6 order-2 order-lg-1">
            <span className="badge bg-success mb-3 px-3 py-2">
              <i className="fas fa-circle me-2" style={{ fontSize: 8 }}></i>
              Open to Opportunities
            </span>

            <h1 className="display-4 fw-bold mb-3">
              Hi, I'm{' '}
              <span className="text-info">
                {profile?.fullName || 'Raju Kumar Singh'}
              </span>
            </h1>

            <h2 className="h4 text-light mb-3">
              {profile?.title || 'Computer Science Student | MERN Stack Developer'}
            </h2>

            <p className="lead text-light mb-4" style={{ maxWidth: 520 }}>
              {profile?.bio ||
                'A passionate Computer Science student at Madan Mohan Malaviya University of Technology, focused on building scalable and user-friendly web applications using modern technologies.'}
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link to="/projects" className="btn btn-info btn-lg px-4">
                <i className="fas fa-code me-2"></i>
                Projects
              </Link>

              <button
                onClick={handleResumeDownload}
                className="btn btn-outline-light btn-lg px-4"
              >
                <i className="fas fa-download me-2"></i>
                Resume
              </button>

              <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                <i className="fas fa-envelope me-2"></i>
                Contact
              </Link>
            </div>

            {/* Social Links */}
            {profile?.socialLinks && (
              <div className="mt-4 d-flex gap-3">
                {profile.socialLinks.github && (
                  <button
                    onClick={() =>
                      handleSocialClick('github', profile.socialLinks.github)
                    }
                    className="btn btn-outline-light rounded-circle"
                  >
                    <i className="fab fa-github"></i>
                  </button>
                )}
                {profile.socialLinks.linkedin && (
                  <button
                    onClick={() =>
                      handleSocialClick('linkedin', profile.socialLinks.linkedin)
                    }
                    className="btn btn-outline-light rounded-circle"
                  >
                    <i className="fab fa-linkedin"></i>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* IMAGE */}
          <div className="col-lg-6 order-1 order-lg-2 text-center mb-5 mb-lg-0">
            <img
              src={
                profile?.profileImage ||
                'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
              }
              alt="profile"
              className="img-fluid rounded-circle shadow-lg"
              style={{
                maxWidth: 340,
                border: '6px solid rgba(255,255,255,0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
