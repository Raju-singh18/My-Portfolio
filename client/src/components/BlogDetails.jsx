
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { API_ENDPOINTS } from "../config/api";
// import { trackBlogView } from "../utils/analytics";

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBlog();
//   }, [slug]);

//   const fetchBlog = async () => {
//     try {
//       const res = await axios.get(
//         `${API_ENDPOINTS.BLOG}/slug/${slug}`
//       );

//       setBlog(res.data);

//       // Optional frontend analytics
//       trackBlogView(res.data._id);
//     } catch (error) {
//       console.error("Blog not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container py-5 text-center">
//         <div className="spinner-border" />
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="container py-5 text-center">
//         <h4>Article not found</h4>
//       </div>
//     );
//   }

//   return (
//     <section className="container py-5">
//       <article className="mx-auto" style={{ maxWidth: 900 }}>
//         <h1 className="fw-bold mb-3">{blog.title}</h1>

//         <div className="text-muted mb-4 d-flex gap-3 flex-wrap">
//           <span>
//             <i className="fas fa-calendar me-1"></i>
//             {new Date(blog.createdAt).toDateString()}
//           </span>
//           <span>
//             <i className="fas fa-clock me-1"></i>
//             {blog.readTime} min read
//           </span>
//           <span>
//             <i className="fas fa-eye me-1"></i>
//             {blog.views} views
//           </span>
//         </div>

//         {blog.featuredImage && (
//           <img
//             src={blog.featuredImage}
//             alt={blog.title}
//             className="img-fluid rounded shadow-sm mb-4"
//           />
//         )}

//         <div
//           className="fs-5 blog-content"
//           dangerouslySetInnerHTML={{ __html: blog.content }}
//         />

//         {blog.tags?.length > 0 && (
//           <div className="mt-4">
//             {blog.tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="badge bg-light text-dark border me-2"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}
//       </article>
//     </section>
//   );
// };

// export default BlogDetails;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { trackBlogView } from "../utils/analytics";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(
        `${API_ENDPOINTS.BLOG}/slug/${slug}`
      );
      setBlog(res.data);
      trackBlogView(res.data._id);
    } catch (error) {
      console.error("Blog not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <div className="spinner-border text-primary" />
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="container py-5 text-center">
        <h4>Article not found</h4>
      </section>
    );
  }

  return (
    <section className="bg-light py-5">
      <article className="container">
        {/* Back link */}
        <div className="mb-4">
          <Link to="/blog" className="text-decoration-none text-muted">
            ← Back to articles
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge bg-primary mb-3 px-3 py-2">
            {blog.category}
          </span>

          <h1 className="fw-bold display-6 mb-3">
            {blog.title}
          </h1>

          <div className="text-muted d-flex justify-content-center gap-4 flex-wrap">
            <span>
              <i className="fas fa-calendar me-1"></i>
              {new Date(blog.createdAt).toDateString()}
            </span>
            <span>
              <i className="fas fa-clock me-1"></i>
              {blog.readTime} min read
            </span>
            <span>
              <i className="fas fa-eye me-1"></i>
              {blog.views} views
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="text-center mb-5">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="img-fluid rounded-4 shadow-sm"
              style={{ maxHeight: 420, objectFit: "cover", width: "100%" }}
            />
          </div>
        )}

        {/* Content */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div
              className="blog-content fs-5 lh-lg text-dark"
              style={{
                background: "#ffffff",
                padding: "2.5rem",
                borderRadius: "1rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="mt-4 d-flex flex-wrap gap-2">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="badge rounded-pill bg-white text-dark border px-3 py-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};

export default BlogDetails;
