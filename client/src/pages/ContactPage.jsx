
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { trackPageView } from "../utils/analytics";

const ContactPage = () => {
  useEffect(() => {
    trackPageView("/contact");
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: "80px" }}>
        {/* Page Header */}
        <section className="container py-5">
          <div className="text-center">
            <h1 className="display-5 fw-bold mb-3">Get In Touch</h1>

            <p className="lead text-muted mx-auto" style={{ maxWidth: 720 }}>
              Whether you’re hiring, collaborating, or building something new —
              I’d love to hear from you.
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
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;
