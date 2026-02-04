
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import { trackPageView } from "../utils/analytics";

const ExperiencePage = () => {
  useEffect(() => {
    trackPageView("/experience");
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: "80px" }}>
        {/* Header */}
        <section className="container py-5 text-center">
          <h1 className="display-5 fw-bold mb-3">
            Experience & Education
          </h1>

          <p className="lead text-muted mx-auto" style={{ maxWidth: 720 }}>
            A snapshot of my professional journey, academic background,
            certifications, and hands-on learning.
          </p>

          <div
            className="mx-auto mt-4"
            style={{
              width: "90px",
              height: "4px",
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, #667eea, #764ba2)",
            }}
          />
        </section>

        <Experience />
      </main>

      <Footer />
    </>
  );
};

export default ExperiencePage;
