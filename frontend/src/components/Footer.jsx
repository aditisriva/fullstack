import React from 'react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        
        {/* About Initiative */}
        <div className="footer-col footer-about">
          <a href="#" className="footer-logo" onClick={scrollToTop}>
            <Leaf className="footer-logo-icon" />
            <span>Green<span className="logo-color">Heroes</span></span>
          </a>
          <p className="footer-about-text">
            A citizen-driven environment initiative partnered with local recycling cooperatives to provide 100% free doorstep pickup services throughout Gandhinagar.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            <li><a href="#problem">The Problem</a></li>
            <li><a href="#benefits">Direct Benefits</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#badges">Badge System</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>

        {/* What to Recycle */}
        <div className="footer-col">
          <h3 className="footer-title">Acceptable Items</h3>
          <ul className="footer-links">
            <li><span>Plastic Bottles & Containers</span></li>
            <li><span>Cardboards & Paper Waste</span></li>
            <li><span>Metal Cans & Foil Wrappers</span></li>
            <li><span>Glass Containers & Bottles</span></li>
            <li><span>Unusable Electronics</span></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col footer-contact">
          <h3 className="footer-title">Contact Office</h3>
          <ul className="contact-details">
            <li>
              <Phone size={16} className="contact-icon" />
              <span>+91 79 2325 0000</span>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <span>pickup@gandhinagargreenheroes.org</span>
            </li>
            <li>
              <MapPin size={16} className="contact-icon" style={{ marginTop: '4px' }} />
              <span>Civic Composting Complex, Near Sector 10-B Circular, Gandhinagar, Gujarat - 382010</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {currentYear} Gandhinagar Green Heroes. All rights reserved.</p>
          <div className="footer-bottom-badges">
            <span>Gujarat Pollution Board Supporting Campaign</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .footer-section {
          background-color: var(--secondary);
          color: white;
          padding: 80px 0 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr repeat(2, 1fr) 2fr;
          gap: 40px;
          padding-bottom: 60px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-headings);
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
          margin-bottom: 20px;
        }

        .footer-logo-icon {
          color: var(--primary);
        }

        .footer-logo .logo-color {
          color: var(--primary);
        }

        .footer-about-text {
          font-size: 0.9rem;
          color: #a7f3d0;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.08);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .social-icon:hover {
          background-color: var(--primary);
          transform: translateY(-3px);
        }

        .footer-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background-color: var(--primary);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links a, .footer-links span {
          font-size: 0.9rem;
          color: #a7f3d0;
          transition: var(--transition-smooth);
        }

        .footer-links a:hover {
          color: white;
          padding-left: 6px;
        }

        .contact-details {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-details li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9rem;
          color: #a7f3d0;
          line-height: 1.5;
        }

        .contact-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        /* Footer Bottom */
        .footer-bottom {
          background-color: #022c22;
          padding: 24px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.85rem;
          color: #6ee7b7;
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-bottom-badges {
          font-weight: 600;
          color: var(--primary);
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}} />
    </footer>
  );
}
