import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import API_BASE_URL from '../config/api';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    profileImage: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      youtube: '',
      portfolio: ''
    },
    yearsOfExperience: '',
    currentPosition: '',
    currentCompany: '',
    availability: 'available',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    isVisible: true,
    allowContact: true,
    showEmail: false,
    showPhone: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.PROFILE_ADMIN, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data) {
        setProfile(prevProfile => ({
          ...prevProfile,
          ...response.data,
          socialLinks: {
            ...prevProfile.socialLinks,
            ...response.data.socialLinks
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('socialLinks.')) {
      const socialKey = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleKeywordsChange = (e) => {
    const keywords = e.target.value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);
    setProfile(prev => ({
      ...prev,
      seoKeywords: keywords
    }));
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(API_ENDPOINTS.UPLOAD_SINGLE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data); // Debug log

      // Use the serverUrl for immediate display
      const imageUrl = response.data.serverUrl || response.data.fullUrl || `${API_BASE_URL}${response.data.url}`;
      
      if (type === 'profile') {
        // Add timestamp to force cache refresh
        const timestampedUrl = imageUrl + '?t=' + Date.now();
        setProfile(prev => ({ ...prev, profileImage: timestampedUrl }));
        setMessage('Profile image uploaded successfully!');
        
        // Also update the sidebar image if it exists
        setTimeout(() => {
          const sidebarImg = document.querySelector('.admin-sidebar img[alt*="Admin"]');
          if (sidebarImg) {
            sidebarImg.src = timestampedUrl;
          }
        }, 100);
        
      } else if (type === 'resume') {
        setProfile(prev => ({ ...prev, resumeUrl: imageUrl }));
        setMessage('Resume uploaded successfully!');
      }

    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`Failed to upload ${type === 'profile' ? 'profile image' : 'resume'}: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(API_ENDPOINTS.PROFILE, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
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
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Profile Management</h2>
            {message && (
              <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mb-0`}>
                {message}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Basic Information */}
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>Basic Information</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={profile.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Professional Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          value={profile.title}
                          onChange={handleInputChange}
                          placeholder="e.g., Full Stack Developer"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        name="bio"
                        rows="4"
                        value={profile.bio}
                        onChange={handleInputChange}
                        placeholder="Tell visitors about yourself..."
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
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
                          value={profile.location}
                          onChange={handleInputChange}
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Website</label>
                        <input
                          type="url"
                          className="form-control"
                          name="website"
                          value={profile.website}
                          onChange={handleInputChange}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>Professional Information</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Years of Experience</label>
                        <input
                          type="number"
                          className="form-control"
                          name="yearsOfExperience"
                          value={profile.yearsOfExperience}
                          onChange={handleInputChange}
                          min="0"
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Current Position</label>
                        <input
                          type="text"
                          className="form-control"
                          name="currentPosition"
                          value={profile.currentPosition}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Current Company</label>
                        <input
                          type="text"
                          className="form-control"
                          name="currentCompany"
                          value={profile.currentCompany}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Availability Status</label>
                      <select
                        className="form-select"
                        name="availability"
                        value={profile.availability}
                        onChange={handleInputChange}
                      >
                        <option value="available">Available for Work</option>
                        <option value="busy">Currently Busy</option>
                        <option value="not-available">Not Available</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>Social Media Links</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fab fa-github me-2"></i>GitHub
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          name="socialLinks.github"
                          value={profile.socialLinks.github}
                          onChange={handleInputChange}
                          placeholder="https://github.com/username"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fab fa-linkedin me-2"></i>LinkedIn
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          name="socialLinks.linkedin"
                          value={profile.socialLinks.linkedin}
                          onChange={handleInputChange}
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fab fa-twitter me-2"></i>Twitter
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          name="socialLinks.twitter"
                          value={profile.socialLinks.twitter}
                          onChange={handleInputChange}
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          <i className="fab fa-youtube me-2"></i>YouTube
                        </label>
                        <input
                          type="url"
                          className="form-control"
                          name="socialLinks.youtube"
                          value={profile.socialLinks.youtube}
                          onChange={handleInputChange}
                          placeholder="https://youtube.com/channel/..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>SEO Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">SEO Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="seoTitle"
                        value={profile.seoTitle}
                        onChange={handleInputChange}
                        placeholder="Professional Portfolio - Your Name"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">SEO Description</label>
                      <textarea
                        className="form-control"
                        name="seoDescription"
                        rows="3"
                        value={profile.seoDescription}
                        onChange={handleInputChange}
                        placeholder="Brief description for search engines..."
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">SEO Keywords (comma separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profile.seoKeywords.join(', ')}
                        onChange={handleKeywordsChange}
                        placeholder="web developer, react, node.js, portfolio"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                {/* Profile Image */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>Profile Image</h5>
                  </div>
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <img
                        src={profile.profileImage || "/ankit.webp"}
                        alt="Profile"
                        className="img-fluid rounded-circle border border-3 border-primary"
                        style={{ maxWidth: '200px', width: '200px', height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                          console.log('Image load error:', e.target.src);
                          e.target.src = "/ankit.webp";
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', profile.profileImage);
                        }}
                        key={profile.profileImage} // Force re-render when URL changes
                      />
                      {profile.profileImage && (
                        <div className="mt-2">
                          <small className="text-muted d-block">Current image URL:</small>
                          <small className="text-break">{profile.profileImage}</small>
                          <div className="mt-1">
                            <a 
                              href={profile.profileImage} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              Test URL
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        className="form-control mb-2"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'profile')}
                        disabled={uploading}
                      />
                      {uploading && (
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="spinner-border spinner-border-sm me-2"></div>
                          <span>Uploading...</span>
                        </div>
                      )}
                      <small className="text-muted d-block">
                        Recommended: Square image, max 5MB
                      </small>
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>Resume/CV</h5>
                  </div>
                  <div className="card-body">
                    {profile.resumeUrl && (
                      <div className="mb-3 p-3 bg-light rounded">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-file-pdf text-danger fa-2x me-3"></i>
                            <div>
                              <div className="fw-semibold">Current Resume</div>
                              <small className="text-muted">PDF Document</small>
                            </div>
                          </div>
                          <a
                            href={profile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary btn-sm"
                          >
                            <i className="fas fa-eye me-1"></i>View
                          </a>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      className="form-control mb-2"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'resume')}
                      disabled={uploading}
                    />
                    {uploading && (
                      <div className="d-flex align-items-center">
                        <div className="spinner-border spinner-border-sm me-2"></div>
                        <span>Uploading...</span>
                      </div>
                    )}
                    <small className="text-muted">PDF files only, max 5MB</small>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5>Privacy Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="isVisible"
                        checked={profile.isVisible}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Profile visible to public</label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="allowContact"
                        checked={profile.allowContact}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Allow contact form</label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="showEmail"
                        checked={profile.showEmail}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Show email publicly</label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="showPhone"
                        checked={profile.showPhone}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label">Show phone publicly</label>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="card">
                  <div className="card-body">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
