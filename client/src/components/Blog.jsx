 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { trackBlogView } from "../utils/analytics";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [selectedCategory, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchTerm) params.append("search", searchTerm);

      const res = await axios.get(`${API_ENDPOINTS.BLOG}?${params}`);
      setBlogs(res.data.blogs || []);
    } catch (err) {
      setError("Unable to load blog posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_ENDPOINTS.BLOG_CATEGORIES);
      setCategories(res.data || []);
    } catch (err) {
      console.error("Category fetch failed");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const truncate = (text, length = 140) =>
    text?.length > length ? text.slice(0, length) + "…" : text;

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border" />
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
              className="form-control border-start-0"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <select
            className="form-select shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {/* Blog Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="col">
              <article className="card h-100 border-0 shadow-sm blog-card">
                {blog.featuredImage && (
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <div className="mb-2 small text-muted d-flex justify-content-between">
                    <span className="badge bg-primary">
                      {blog.category}
                    </span>
                    <span>
                      <i className="fas fa-calendar me-1"></i>
                      {formatDate(blog.publishedAt)}
                    </span>
                  </div>

                  <h5 className="fw-semibold">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-decoration-none text-dark"
                      onClick={() => trackBlogView(blog._id)}
                    >
                      {blog.title}
                    </Link>
                  </h5>

                  <p className="text-muted small flex-grow-1">
                    {truncate(blog.excerpt)}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <small className="text-muted">
                      <i className="fas fa-clock me-1"></i>
                      {blog.readTime} min read
                      <span className="ms-3">
                        <i className="fas fa-eye me-1"></i>
                        {blog.views}
                      </span>
                    </small>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => trackBlogView(blog._id)}
                    >
                      Read →
                    </Link>
                  </div>

                  {blog.tags?.length > 0 && (
                    <div className="mt-3 d-flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="badge rounded-pill bg-light text-dark border"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <i className="fas fa-blog fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">No articles found</h4>
            <p className="text-muted">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
