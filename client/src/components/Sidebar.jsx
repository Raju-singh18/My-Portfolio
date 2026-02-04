import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    quickStats: false,
    navigation: false,
    features: false,
    settings: false
  });

  // Auto-collapse sections on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpandedSections(prev => ({
          ...prev,
          quickStats: false,
          features: false,
          settings: false
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchQuickAnalytics();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.PROFILE_ADMIN, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchQuickAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_ENDPOINTS.ANALYTICS_DASHBOARD}?period=7`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data.summary);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    
    // Smooth scroll to section when expanding
    setTimeout(() => {
      const sectionElement = document.querySelector(`[data-section="${section}"]`);
      if (sectionElement && !expandedSections[section]) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const toggleAllSections = () => {
    const allExpanded = Object.values(expandedSections).every(val => val);
    const newState = allExpanded ? false : true;
    
    setExpandedSections({
      quickStats: newState,
      navigation: newState,
      features: newState,
      settings: newState
    });
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
      label: 'Dashboard',
      badge: null
    },
    {
      path: '/admin/dashboard/profile',
      icon: 'fas fa-user-edit',
      label: 'Profile Settings',
      badge: null
    },
    {
      path: '/admin/dashboard/projects',
      icon: 'fas fa-rocket',
      label: 'Projects',
      badge: analytics?.totalProjects || null
    },
    {
      path: '/admin/dashboard/projects/add',
      icon: 'fas fa-plus-circle',
      label: 'Add Project',
      badge: null
    },
    {
      path: '/admin/dashboard/skills',
      icon: 'fas fa-cogs',
      label: 'Skills',
      badge: null
    },
    {
      path: '/admin/dashboard/experience',
      icon: 'fas fa-briefcase',
      label: 'Experience',
      badge: null
    },
    {
      path: '/admin/dashboard/blog',
      icon: 'fas fa-blog',
      label: 'Blog Posts',
      badge: analytics?.totalBlogs || null
    },
    {
      path: '/admin/dashboard/messages',
      icon: 'fas fa-envelope',
      label: 'Messages',
      badge: analytics?.totalMessages || null
    }
  ];

  const featureItems = [
    {
      path: '/admin/dashboard/analytics',
      icon: 'fas fa-chart-line',
      label: 'Analytics',
      badge: null
    },
  ];

  
  return (
    <div 
      className="admin-sidebar d-flex flex-column" 
      style={{ 
        width: '280px', 
        minHeight: '100vh',
        maxHeight: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div className="sidebar-header p-4 border-bottom border-light border-opacity-25" style={{ background: 'transparent' }}>
        <Link to="/admin/dashboard" className="text-decoration-none">
          <div className="d-flex align-items-center">
            <div className="me-3">
              <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ width: '45px', height: '45px' }}>
                <i className="fas fa-crown fa-lg"></i>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-0 fw-bold">Admin Panel</h4>
              <small className="text-white-50">Portfolio Management</small>
            </div>
          </div>
        </Link>
        
        {/* Collapse/Expand All Button */}
        <div className="mt-3" style={{ background: 'transparent' }}>
          <button
            className="btn btn-outline-warning btn-sm w-100"
            onClick={toggleAllSections}
            title={Object.values(expandedSections).every(val => val) ? 'Collapse All' : 'Expand All'}
            style={{ 
              background: 'transparent !important',
              borderColor: '#ffc107',
              color: '#ffc107'
            }}
          >
            <i className={`fas fa-${Object.values(expandedSections).every(val => val) ? 'compress' : 'expand'}-alt me-2`}></i>
            {Object.values(expandedSections).every(val => val) ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Quick Stats - Collapsible */}
      <div className="border-bottom border-light border-opacity-25" data-section="quickStats" style={{ background: 'transparent' }}>
        <button
          className="btn btn-link text-white text-decoration-none w-100 p-4 text-start d-flex align-items-center justify-content-between"
          onClick={() => toggleSection('quickStats')}
          style={{ 
            background: 'transparent !important',
            border: 'none !important',
            borderRadius: '0'
          }}
        >
          <h6 className="mb-0 fw-semibold">
            <i className="fas fa-chart-bar me-2 text-warning"></i>Quick Stats
          </h6>
          <i className={`fas fa-chevron-${expandedSections.quickStats ? 'up' : 'down'} text-warning`}></i>
        </button>
        
        <div 
          className={`collapse ${expandedSections.quickStats ? 'show' : ''}`} 
          style={{ background: 'transparent !important' }}
        >
          <div className="px-4 pb-4" style={{ background: 'transparent !important' }}>
            {!loading && analytics ? (
              <div className="row g-2" style={{ background: 'transparent' }}>
                <div className="col-6" style={{ background: 'transparent' }}>
                  <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1) !important' }}>
                    <div className="text-warning fw-bold fs-5">{analytics.pageViews || 0}</div>
                    <small className="text-white-50">Page Views</small>
                  </div>
                </div>
                <div className="col-6" style={{ background: 'transparent' }}>
                  <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1) !important' }}>
                    <div className="text-warning fw-bold fs-5">{analytics.totalProjects || 0}</div>
                    <small className="text-white-50">Projects</small>
                  </div>
                </div>
                <div className="col-6" style={{ background: 'transparent' }}>
                  <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1) !important' }}>
                    <div className="text-warning fw-bold fs-5">{analytics.totalBlogs || 0}</div>
                    <small className="text-white-50">Articles</small>
                  </div>
                </div>
                <div className="col-6" style={{ background: 'transparent' }}>
                  <div className="bg-white bg-opacity-10 rounded-3 p-3 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1) !important' }}>
                    <div className="text-warning fw-bold fs-5">{analytics.totalMessages || 0}</div>
                    <small className="text-white-50">Messages</small>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="spinner-border spinner-border-sm text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu - Collapsible */}
      <div className="border-bottom border-light border-opacity-25" data-section="navigation" style={{ background: 'transparent' }}>
        <button
          className="btn btn-link text-white text-decoration-none w-100 p-4 text-start d-flex align-items-center justify-content-between"
          onClick={() => toggleSection('navigation')}
          style={{ 
            background: 'transparent !important',
            border: 'none !important',
            borderRadius: '0'
          }}
        >
          <h6 className="mb-0 fw-semibold">
            <i className="fas fa-bars me-2 text-warning"></i>Navigation
          </h6>
          <i className={`fas fa-chevron-${expandedSections.navigation ? 'up' : 'down'} text-warning`}></i>
        </button>
        
        <div 
          className={`collapse ${expandedSections.navigation ? 'show' : ''}`} 
          style={{ background: 'transparent !important' }}
        >
          <div className="px-4 pb-4" style={{ background: 'transparent !important' }}>
            <nav className="nav flex-column gap-1" style={{ background: 'transparent !important' }}>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link d-flex align-items-center justify-content-between rounded-3 px-3 py-3 text-decoration-none ${
                    isActive(item.path) 
                      ? 'bg-warning text-dark fw-semibold shadow-sm' 
                      : 'text-white sidebar-nav-link'
                  }`}
                  style={{ 
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className={`${item.icon} me-3`} style={{ width: '20px', fontSize: '16px' }}></i>
                    <span className="fw-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`badge rounded-pill ${
                      isActive(item.path) ? 'bg-dark text-warning' : 'bg-warning text-dark'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Advanced Features - Collapsible */}
      <div className="border-bottom border-light border-opacity-25" data-section="features" style={{ background: 'transparent' }}>
        <button
          className="btn btn-link text-white text-decoration-none w-100 p-4 text-start d-flex align-items-center justify-content-between"
          onClick={() => toggleSection('features')}
          style={{ 
            background: 'transparent !important',
            border: 'none !important',
            borderRadius: '0'
          }}
        >
          <h6 className="mb-0 fw-semibold">
            <i className="fas fa-rocket me-2 text-warning"></i>Advanced Features
          </h6>
          <i className={`fas fa-chevron-${expandedSections.features ? 'up' : 'down'} text-warning`}></i>
        </button>
        
        <div 
          className={`collapse ${expandedSections.features ? 'show' : ''}`} 
          style={{ background: 'transparent !important' }}
        >
          <div className="px-4 pb-4" style={{ background: 'transparent !important' }}>
            <nav className="nav flex-column gap-1" style={{ background: 'transparent !important' }}>
              {featureItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link d-flex align-items-center justify-content-between rounded-3 px-3 py-3 text-decoration-none ${
                    isActive(item.path) 
                      ? 'bg-warning text-dark fw-semibold shadow-sm' 
                      : 'text-white sidebar-nav-link'
                  }`}
                  style={{ 
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className={`${item.icon} me-3`} style={{ width: '20px', fontSize: '16px' }}></i>
                    <span className="fw-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`badge rounded-pill ${
                      isActive(item.path) ? 'bg-dark text-warning' : 'bg-warning text-dark'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-top border-light border-opacity-25" style={{ marginTop: 'auto', background: 'transparent' }}>
        <div className="dropdown">
          <button
            className="btn btn-link text-white text-decoration-none dropdown-toggle d-flex align-items-center w-100 p-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={profile?.profileImage || "/RajuKumarSingh.webp"}
              alt={profile?.fullName || "Admin"}
              width={45}
              height={45}
              className="rounded-circle me-3 border border-warning border-2"
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                console.log('Sidebar image error:', e.target.src);
                e.target.src = "/RajuKumarSingh.jpg";
              }}
              onLoad={() => {
                console.log('Sidebar image loaded:', profile?.profileImage);
              }}
              key={profile?.profileImage} // Force re-render when URL changes
            />
            <div className="flex-grow-1 text-start">
              <div className="fw-semibold text-white">{profile?.fullName || 'Admin User'}</div>
              <small className="text-white-50">{user?.email}</small>
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg border-0 mt-2">
            <li>
              <Link to="/admin/dashboard/profile" className="dropdown-item">
                <i className="fas fa-edit me-2"></i>Edit Profile
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" className="dropdown-item">
                <i className="fas fa-chart-bar me-2"></i>View Analytics
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <a href="/" className="dropdown-item" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-home me-2"></i>View Portfolio
              </a>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={logout}>
                <i className="fas fa-sign-out-alt me-2"></i>Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
