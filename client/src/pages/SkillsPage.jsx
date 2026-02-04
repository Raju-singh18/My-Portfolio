
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import { trackPageView } from '../utils/analytics';

const SkillsPage = () => {
  useEffect(() => {
    trackPageView('/skills');
  }, []);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: '90px' }}>
        {/* Hero Section */}
        <section className="bg-light py-5">
          <div className="container">
            <div className="text-center">
              <h1 className="display-5 fw-bold text-primary mb-3">
                Technical Skills
              </h1>
              <p className="lead text-muted mb-4">
                Technologies, frameworks, and tools I use to build scalable applications
              </p>
              <div
                className="mx-auto rounded"
                style={{
                  width: '120px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                }}
              />
            </div>
          </div>
        </section>

        <Skills />
      </main>

      <Footer />
    </>
  );
};

export default SkillsPage;
