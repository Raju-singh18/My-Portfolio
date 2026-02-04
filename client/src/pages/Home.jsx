// import { useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import Hero from "../components/Hero";
// import Footer from "../components/Footer";
// import { trackPageView } from '../utils/analytics';

// const Home = () => {
//   useEffect(() => {
//     trackPageView('/');
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main>
//         <Hero />
//         {/* Quick Overview Section */}
//         <section className="py-5 bg-light">
//           <div className="container">
//             <div className="row text-center">
//               <div className="col-lg-3 col-md-6 mb-4">
//                 <div className="card border-0 shadow-sm h-100">
//                   <div className="card-body">
//                     <div className="text-primary mb-3">
//                       <i className="fas fa-user fa-3x"></i>
//                     </div>
//                     <h5 className="card-title">About Me</h5>
//                     <p className="card-text">Learn about my background, passion, and journey in development.</p>
//                     <a href="/about" className="btn btn-outline-primary">Learn More</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-md-6 mb-4">
//                 <div className="card border-0 shadow-sm h-100">
//                   <div className="card-body">
//                     <div className="text-primary mb-3">
//                       <i className="fas fa-cogs fa-3x"></i>
//                     </div>
//                     <h5 className="card-title">Skills</h5>
//                     <p className="card-text">Explore my technical skills and proficiency levels.</p>
//                     <a href="/skills" className="btn btn-outline-primary">View Skills</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-md-6 mb-4">
//                 <div className="card border-0 shadow-sm h-100">
//                   <div className="card-body">
//                     <div className="text-primary mb-3">
//                       <i className="fas fa-rocket fa-3x"></i>
//                     </div>
//                     <h5 className="card-title">Projects</h5>
//                     <p className="card-text">Check out my latest projects and technical achievements.</p>
//                     <a href="/projects" className="btn btn-outline-primary">View Projects</a>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-md-6 mb-4">
//                 <div className="card border-0 shadow-sm h-100">
//                   <div className="card-body">
//                     <div className="text-primary mb-3">
//                       <i className="fas fa-blog fa-3x"></i>
//                     </div>
//                     <h5 className="card-title">Blog</h5>
//                     <p className="card-text">Read my thoughts and tutorials on web development.</p>
//                     <a href="/blog" className="btn btn-outline-primary">Read Blog</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export default Home


import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { trackPageView } from '../utils/analytics';

const Home = () => {
  useEffect(() => {
    trackPageView('/');
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Quick Overview */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row text-center mb-4">
              <h2 className="fw-bold">Explore My Profile</h2>
              <p className="text-muted">
                A quick overview of my skills, projects, and journey
              </p>
            </div>

            <div className="row g-4">
              {[
                { icon: 'fa-user', title: 'About Me', link: '/about', text: 'Know my background and passion' },
                { icon: 'fa-cogs', title: 'Skills', link: '/skills', text: 'Technologies I work with' },
                { icon: 'fa-rocket', title: 'Projects', link: '/projects', text: 'Hands-on real-world projects' },
                { icon: 'fa-graduation-cap', title: 'Experience', link: '/experience', text: 'Education & learning journey' },
              ].map((item, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="card h-100 border-0 shadow-sm text-center">
                    <div className="card-body">
                      <i className={`fas ${item.icon} fa-3x text-primary mb-3`}></i>
                      <h5 className="fw-semibold">{item.title}</h5>
                      <p className="text-muted">{item.text}</p>
                      <a href={item.link} className="btn btn-outline-primary">
                        Explore
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
