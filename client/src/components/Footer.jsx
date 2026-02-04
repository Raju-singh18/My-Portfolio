
// import {
//   Facebook,
//   Instagram,
//   Twitter,
//   Github
// } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer
//       className="py-4 px-3"
//       style={{
//         background: "linear-gradient(135deg, #0f172a, #020617)",
//         borderTop: "1px solid rgba(255,255,255,0.08)"
//       }}
//     >
//       <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

//         {/* Left Section */}
//         <div className="text-center text-md-start">
//           <span className="text-light fw-semibold">
//             © {new Date().getFullYear()} MyPortfolio
//           </span>
//           <p className="mb-0 small text-secondary">
//             Built with passion & consistency
//           </p>
//         </div>

//         {/* Social Icons */}
//         <ul className="list-unstyled d-flex mb-0 gap-3">
//           <li>
//             <a
//               href="https://www.instagram.com"
//               target="_blank"
//               rel="noreferrer"
//               className="footer-icon"
//             >
//               <Instagram size={20} />
//             </a>
//           </li>

//           <li>
//             <a
//               href="https://www.facebook.com"
//               target="_blank"
//               rel="noreferrer"
//               className="footer-icon"
//             >
//               <Facebook size={20} />
//             </a>
//           </li>

//           <li>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noreferrer"
//               className="footer-icon"
//             >
//               <Twitter size={20} />
//             </a>
//           </li>

//           <li>
//             <a
//               href="https://github.com"
//               target="_blank"
//               rel="noreferrer"
//               className="footer-icon"
//             >
//               <Github size={20} />
//             </a>
//           </li>
//         </ul>
//       </div>

//       {/* Inline styles for hover effects */}
//       <style>
//         {`
//           .footer-icon {
//             color: #cbd5f5;
//             background: rgba(255, 255, 255, 0.08);
//             padding: 10px;
//             border-radius: 50%;
//             display: inline-flex;
//             align-items: center;
//             justify-content: center;
//             transition: all 0.3s ease;
//           }

//           .footer-icon:hover {
//             background: #38bdf8;
//             color: #020617;
//             transform: translateY(-4px);
//           }
//         `}
//       </style>
//     </footer>
//   );
// };

// export default Footer;


import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { trackSocialClick } from "../utils/analytics";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PROFILE);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching footer profile:", error);
    }
  };

  const handleSocialClick = (platform, url) => {
    trackSocialClick(platform);
    window.open(url, "_blank");
  };

  return (
    <footer
      className="mt-auto border-top"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#ffffff",
      }}
    >
      <div className="container py-4">
        <div className="row align-items-center gy-3">
          {/* LEFT */}
          <div className="col-md-6 text-center text-md-start">
            <h6 className="mb-1 fw-semibold">
              © {new Date().getFullYear()}{" "}
              {profile?.fullName || "Raju Kumar Singh"}
            </h6>
            <small className="text-light opacity-75">
              Full Stack Web Developer | MERN Stack
            </small>
          </div>

          {/* RIGHT - SOCIAL LINKS */}
          <div className="col-md-6">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              {profile?.socialLinks?.github && (
                <button
                  onClick={() =>
                    handleSocialClick(
                      "github",
                      profile.socialLinks.github
                    )
                  }
                  className="btn btn-outline-light rounded-circle"
                >
                  <Github size={20} />
                </button>
              )}

              {profile?.socialLinks?.linkedin && (
                <button
                  onClick={() =>
                    handleSocialClick(
                      "linkedin",
                      profile.socialLinks.linkedin
                    )
                  }
                  className="btn btn-outline-light rounded-circle"
                >
                  <Linkedin size={20} />
                </button>
              )}

              {profile?.socialLinks?.twitter && (
                <button
                  onClick={() =>
                    handleSocialClick(
                      "twitter",
                      profile.socialLinks.twitter
                    )
                  }
                  className="btn btn-outline-light rounded-circle"
                >
                  <Twitter size={20} />
                </button>
              )}

              {profile?.socialLinks?.instagram && (
                <button
                  onClick={() =>
                    handleSocialClick(
                      "instagram",
                      profile.socialLinks.instagram
                    )
                  }
                  className="btn btn-outline-light rounded-circle"
                >
                  <Instagram size={20} />
                </button>
              )}

              {profile?.socialLinks?.facebook && (
                <button
                  onClick={() =>
                    handleSocialClick(
                      "facebook",
                      profile.socialLinks.facebook
                    )
                  }
                  className="btn btn-outline-light rounded-circle"
                >
                  <Facebook size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
