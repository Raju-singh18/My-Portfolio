import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const ANALYTICS_ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === 'true';

export const trackEvent = async (type, data = {}) => {
  if (!ANALYTICS_ENABLED) return;
  
  try {
    await axios.post(API_ENDPOINTS.ANALYTICS_TRACK, {
      type,
      page: window.location.pathname,
      ...data
    });
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};

export const trackPageView = (page) => {
  trackEvent('page_view', { page });
};

export const trackProjectView = (projectId) => {
  trackEvent('project_view', { projectId });
};

export const trackBlogView = (blogId) => {
  trackEvent('blog_view', { blogId });
};

export const trackContactForm = () => {
  trackEvent('contact_form');
};

export const trackResumeDownload = () => {
  trackEvent('resume_download');
};

export const trackSocialClick = (platform) => {
  trackEvent('social_click', { metadata: { platform } });
};