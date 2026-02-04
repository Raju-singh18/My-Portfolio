 
import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { trackContactForm } from "../utils/analytics";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({});

    try {
      const res = await axios.post(API_ENDPOINTS.CONTACT, formData);

      if (res.status === 201) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", message: "" });
        trackContactForm();
      } else {
        setStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try later.",
      });
      console.error(error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({}), 4000);
    }
  };

  return (
    <section className="container pb-5">
      <div className="row align-items-center g-5">
        {/* Left Content */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3">Let’s build something great 🚀</h2>
          <p className="text-muted fs-5">
            Have a project idea, collaboration opportunity, or just want to say
            hello? Fill out the form and I’ll get back to you as soon as possible.
          </p>

          <ul className="list-unstyled mt-4 text-muted">
            <li className="mb-2">
              <i className="fas fa-check-circle text-primary me-2"></i>
              Open to freelance & full-time roles
            </li>
            <li className="mb-2">
              <i className="fas fa-check-circle text-primary me-2"></i>
              MERN Stack & Full-Stack projects
            </li>
            <li className="mb-2">
              <i className="fas fa-check-circle text-primary me-2"></i>
              Fast response & clear communication
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h4 className="mb-4 fw-semibold">Send a Message</h4>

              {status.message && (
                <div
                  className={`alert alert-${
                    status.type === "success" ? "success" : "danger"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="nameInput">Your Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="emailInput">Email Address</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    className="form-control"
                    id="messageInput"
                    name="message"
                    placeholder="Your message"
                    style={{ height: "150px" }}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="messageInput">Your Message</label>
                </div>

                <button
                  disabled={loading}
                  className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
