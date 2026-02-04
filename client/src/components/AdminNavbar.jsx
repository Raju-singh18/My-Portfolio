import { useAuth } from "../context/AuthContext"
import  {Link} from "react-router-dom"
const AdminNavbar = () => {
  const { logout } = useAuth()
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow sticky-top ">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/admin/dashboard">
          Portfolio Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                <i className="fas fa-chart-bar me-1"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/messages">
                <i className="fas fa-envelope me-1"></i>
                Messages
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-project-diagram me-1"></i>
                Projects
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/admin/dashboard/projects">All Projects</Link></li>
                <li><Link className="dropdown-item" to="/admin/dashboard/projects/add">Add Project</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/skills">
                <i className="fas fa-cogs me-1"></i>
                Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard/profile">
                <i className="fas fa-user me-1"></i>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" target="_blank">
                <i className="fas fa-external-link-alt me-1"></i>
                View Site
              </Link>
            </li>
             <li className="nav-item">
              <button className="btn btn-danger btn-sm" onClick={logout}>
                <i className="fas fa-sign-out-alt me-1"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar