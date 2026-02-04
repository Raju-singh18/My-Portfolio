import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    tags: '',
    category: '',
    isPublished: false,
    seoTitle: '',
    seoDescription: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_ENDPOINTS.BLOG_ADMIN, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      publishedAt: formData.isPublished ? new Date() : null
    };

    try {
      if (editingBlog) {
        await axios.put(`${API_ENDPOINTS.BLOG}/${editingBlog._id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API_ENDPOINTS.BLOG, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage || '',
      tags: blog.tags?.join(', ') || '',
      category: blog.category || '',
      isPublished: blog.isPublished,
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_ENDPOINTS.BLOG}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      tags: '',
      category: '',
      isPublished: false,
      seoTitle: '',
      seoDescription: ''
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;
    
    // Auto-generate slug from title
    if (name === 'title' && !editingBlog) {
      const slug = value.toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: slug
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Blog Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Write New Article'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>{editingBlog ? 'Edit Article' : 'Write New Article'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Slug (URL)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Excerpt</label>
                <textarea
                  className="form-control"
                  name="excerpt"
                  rows="3"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief description of the article..."
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control"
                  name="content"
                  rows="12"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your article content here..."
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Featured Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, Tutorial"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="react, javascript, tutorial, web development"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">SEO Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    placeholder="SEO optimized title"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">SEO Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    placeholder="SEO meta description"
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Publish immediately</label>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {editingBlog ? 'Update Article' : 'Create Article'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h5>All Articles ({blogs.length})</h5>
        </div>
        <div className="card-body">
          {blogs.length === 0 ? (
            <p className="text-muted">No articles found. Write your first article!</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Published</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map(blog => (
                    <tr key={blog._id}>
                      <td>
                        <div>
                          <h6 className="mb-1">{blog.title}</h6>
                          <small className="text-muted">{blog.excerpt?.substring(0, 100)}...</small>
                        </div>
                      </td>
                      <td>
                        {blog.category && (
                          <span className="badge bg-secondary">{blog.category}</span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${blog.isPublished ? 'bg-success' : 'bg-warning'}`}>
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted">
                          <i className="fas fa-eye me-1"></i>
                          {blog.views || 0}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          {formatDate(blog.publishedAt)}
                        </small>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          {blog.isPublished && (
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-info"
                              title="View Article"
                            >
                              <i className="fas fa-eye"></i>
                            </a>
                          )}
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(blog)}
                            title="Edit Article"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(blog._id)}
                            title="Delete Article"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;