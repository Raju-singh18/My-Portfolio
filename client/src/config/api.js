export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  USER: `${API_BASE_URL}/api/auth/user`,
  
  // Projects
  PROJECTS: `${API_BASE_URL}/api/projects`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/api/contact`,
  
  // Skills
  SKILLS: `${API_BASE_URL}/api/skills`,
  SKILLS_GROUPED: `${API_BASE_URL}/api/skills/grouped`,
  SKILLS_ADMIN: `${API_BASE_URL}/api/skills/admin`,
  
  // Experience
  EXPERIENCE: `${API_BASE_URL}/api/experience`,
  EXPERIENCE_GROUPED: `${API_BASE_URL}/api/experience/grouped`,
  EXPERIENCE_ADMIN: `${API_BASE_URL}/api/experience/admin`,
  
  // Blog
  BLOG: `${API_BASE_URL}/api/blog`,
  BLOG_ADMIN: `${API_BASE_URL}/api/blog/admin`,
  BLOG_CATEGORIES: `${API_BASE_URL}/api/blog/categories/list`,
  BLOG_TAGS: `${API_BASE_URL}/api/blog/tags/list`,
  
  // Profile
  PROFILE: `${API_BASE_URL}/api/profile`,
  PROFILE_ADMIN: `${API_BASE_URL}/api/profile/admin`,
  RESUME_DOWNLOAD: `${API_BASE_URL}/api/profile/resume/download`,
  
  // Analytics
  ANALYTICS_TRACK: `${API_BASE_URL}/api/analytics/track`,
  ANALYTICS_DASHBOARD: `${API_BASE_URL}/api/analytics/dashboard`,
  
  // Upload
  UPLOAD_SINGLE: `${API_BASE_URL}/api/upload/single`,
  UPLOAD_MULTIPLE: `${API_BASE_URL}/api/upload/multiple`,
};

export default API_BASE_URL;
