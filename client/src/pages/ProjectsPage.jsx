
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import { trackPageView } from "../utils/analytics";

const ProjectsPage = () => {
  useEffect(() => {
    trackPageView("/projects");
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: "80px" }}>
        {/* Page Header */}
        <section className="container py-5">
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-3">
              Projects & Case Studies
            </h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: 700 }}>
              A curated collection of real-world applications showcasing my
              skills in full-stack development, problem-solving, and clean UI
              design.
            </p>

            <div
              className="mx-auto mt-4"
              style={{
                width: "80px",
                height: "4px",
                borderRadius: "2px",
                background:
                  "linear-gradient(90deg, #667eea, #764ba2)",
              }}
            />
          </div>
        </section>

        <Projects />
      </main>

      <Footer />
    </>
  );
};

export default ProjectsPage;
