import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin components
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminMessages = lazy(() => import('./components/AdminMessages'));
const AdminProjects = lazy(() => import('./components/AdminProjects'));
const AddProject = lazy(() => import('./components/AddProject'));
const EditProject = lazy(() => import('./components/EditProject'));
const AdminSkills = lazy(() => import('./components/AdminSkills'));
const AdminProfile = lazy(() => import('./components/AdminProfile'));
const AdminExperience = lazy(() => import('./components/AdminExperience'));
const AdminBlog = lazy(() => import('./components/AdminBlog'));
const AdminAnalytics = lazy(() => import('./components/AdminAnalytics'));
const ImageTest = lazy(() => import('./components/ImageTest'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
import BlogDetails from "./components/BlogDetails";

import ProtectedRoute from "./components/ProtectedRoute"
import Loading from "./components/Loading";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading/>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/add" element={<AddProject />} />
              <Route path="projects/edit/:id" element={<EditProject />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="blog" element={<AdminBlog />} />           
              <Route path="test-images" element={<ImageTest />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}




export default App;
