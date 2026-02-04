
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";
import { trackPageView } from "../utils/analytics";

const AboutPage = () => {
  useEffect(() => {
    trackPageView("/about");
  }, []);

  return (
    <>
      <Navbar />

      <main className="pt-5 bg-light">
        {/* HERO SECTION */}
        <section className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="fw-bold mb-2">
                Hi, I’m Raju Kumar Singh
              </h1>

              <h2 className="h5 text-primary mb-3">
                Full Stack Web Developer (MERN Stack)
              </h2>

              <p className="text-muted mb-3">
                I build scalable, secure, and user-friendly web
                applications using modern JavaScript technologies.
              </p>

              <span className="badge bg-success px-3 py-2">
                Available for Work
              </span>
            </div>
          </div>
        </section>

        {/* ABOUT CONTENT */}
        <section className="container pb-5">
          <div className="card border-0 shadow-sm p-4">
            <About />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;
