import React from 'react';
import { ArrowRight, Leaf, ShieldAlert } from 'lucide-react';
import heroImg from '../assets/hero_illustration.png';

export default function Hero() {
  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-section">
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      
      <div className="container hero-container grid-2">
        <div className="hero-content animate-slide-up">
          <div className="gov-campaign-badge">
            <span className="green-dot"></span>
            GANDHINAGAR CIVIC INITIATIVE
          </div>
          
          <h1 className="hero-title">
            Join Gandhinagar's <br />
            <span className="hero-title-gradient">Green Revolution</span>
          </h1>
          
          <p className="hero-desc">
            Become a civic superhero today! Schedule your <strong>free doorstep recycling pickup</strong> and earn exclusive community badges. Together, let's keep Gandhinagar pristine, clean, and smart.
          </p>

          <div className="hero-buttons">
            <button onClick={scrollToRegister} className="btn btn-primary hero-cta-btn">
              <span>Register My Doorstep</span>
              <ArrowRight size={18} />
            </button>
            <a href="#how-it-works" className="btn btn-secondary hero-learn-btn">
              <span>See How it Works</span>
            </a>
          </div>

          <div className="hero-trust-badges">
            <div className="trust-badge">
              <Leaf size={16} className="trust-badge-icon" />
              <span>100% Free Pickup</span>
            </div>
            <div className="trust-badge">
              <ShieldAlert size={16} className="trust-badge-icon" />
              <span>Civic Board Verified</span>
            </div>
          </div>
        </div>

        <div className="hero-image-container animate-float">
          <div className="illustration-wrapper">
            <div className="illustration-backdrop"></div>
            <img src={heroImg} alt="Smart green city and recycling doorstep collection service illustration" className="hero-image" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hero-section {
          padding: 160px 0 100px 0;
          overflow: hidden;
          background: linear-gradient(180deg, var(--primary-light) 0%, var(--bg-main) 100%);
          position: relative;
        }

        .hero-container {
          align-items: center;
        }

        .gov-campaign-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: 50px;
          font-family: var(--font-headings);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--secondary);
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
        }

        .green-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px var(--primary);
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }

        .hero-title-gradient {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          margin-bottom: 40px;
          max-width: 520px;
        }

        .hero-buttons {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .hero-cta-btn {
          font-size: 1.05rem;
          padding: 16px 32px;
        }

        .hero-learn-btn {
          font-size: 1.05rem;
          padding: 16px 32px;
        }

        .hero-trust-badges {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .trust-badge-icon {
          color: var(--primary);
        }

        .hero-image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .illustration-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          z-index: 1;
        }

        .illustration-backdrop {
          position: absolute;
          width: 90%;
          height: 90%;
          top: 5%;
          left: 5%;
          background: linear-gradient(135deg, var(--primary-glow) 0%, rgba(16, 185, 129, 0.03) 100%);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          z-index: -1;
          filter: blur(10px);
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 1024px) {
          .hero-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 0 60px 0;
          }
          .hero-title {
            font-size: 2.4rem;
          }
          .hero-desc {
            font-size: 1.05rem;
            margin-bottom: 30px;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .hero-cta-btn, .hero-learn-btn {
            width: 100%;
          }
          .hero-trust-badges {
            justify-content: center;
            gap: 16px;
          }
        }
      `}} />
    </section>
  );
}
