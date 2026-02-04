
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import { trackPageView } from "../utils/analytics";

const BlogPage = () => {
  useEffect(() => {
    trackPageView("/blog");
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: "80px" }}>
        {/* Page Header */}
        <section className="container py-5">
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-3">
              Blog & Technical Articles
            </h1>

            <p className="lead text-muted mx-auto" style={{ maxWidth: 720 }}>
              Tutorials, best practices, and real-world insights from my journey
              as a Full Stack Web Developer.
            </p>

            <div
              className="mx-auto mt-4"
              style={{
                width: 80,
                height: 4,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, #667eea, #764ba2)",
              }}
            />
          </div>
        </section>

        <Blog />
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
