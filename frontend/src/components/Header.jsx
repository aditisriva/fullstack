import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ShieldCheck } from 'lucide-react';

export default function Header({ onAdminToggle, isAdminView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
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
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Leaf className="logo-icon" />
          <span className="logo-text">Green<span className="text-highlight">Heroes</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <a href="#problem" onClick={(e) => { e.preventDefault(); scrollToSection('problem'); }} className="nav-link">The Issue</a>
          <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }} className="nav-link">Benefits</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="nav-link">Process</a>
          <a href="#badges" onClick={(e) => { e.preventDefault(); scrollToSection('badges'); }} className="nav-link">Gamification</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }} className="nav-link">Stories</a>
          
          <button 
            onClick={onAdminToggle} 
            className={`btn-dashboard-toggle ${isAdminView ? 'active' : ''}`}
            title="View Realtime registrations dashboard"
          >
            <ShieldCheck size={18} />
            <span>Dashboard</span>
          </button>

          <button onClick={() => scrollToSection('register')} className="btn btn-primary btn-nav">
            Schedule Pickup
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="mobile-actions">
          <button 
            onClick={onAdminToggle} 
            className={`btn-dashboard-toggle-mobile ${isAdminView ? 'active' : ''}`}
          >
            <ShieldCheck size={18} />
          </button>
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`nav-mobile ${isOpen ? 'open' : ''}`}>
        <a href="#problem" onClick={(e) => { e.preventDefault(); scrollToSection('problem'); }} className="mobile-nav-link">The Issue</a>
        <a href="#benefits" onClick={(e) => { e.preventDefault(); scrollToSection('benefits'); }} className="mobile-nav-link">Benefits</a>
        <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="mobile-nav-link">Process</a>
        <a href="#badges" onClick={(e) => { e.preventDefault(); scrollToSection('badges'); }} className="mobile-nav-link">Gamification</a>
        <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }} className="mobile-nav-link">Stories</a>
        
        <button onClick={() => { setIsOpen(false); scrollToSection('register'); }} className="btn btn-primary mobile-btn">
          Schedule Free Pickup
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000;
          display: flex;
          align-items: center;
          background-color: transparent;
          border-bottom: 1px solid transparent;
          transition: var(--transition-smooth);
        }

        .header.scrolled {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          height: 70px;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-headings);
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--secondary);
        }

        .logo-icon {
          color: var(--primary);
          width: 28px;
          height: 28px;
        }

        .logo-text .text-highlight {
          color: var(--primary);
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-muted);
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--primary);
          transition: var(--transition-smooth);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .btn-nav {
          padding: 10px 20px;
          font-size: 0.9rem;
          border-radius: 12px;
        }

        .btn-dashboard-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid var(--border-color);
          padding: 8px 16px;
          border-radius: 12px;
          cursor: pointer;
          font-family: var(--font-headings);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }

        .btn-dashboard-toggle:hover, .btn-dashboard-toggle.active {
          background-color: var(--primary-light);
          color: var(--primary);
          border-color: var(--primary);
        }

        .mobile-actions {
          display: none;
          align-items: center;
          gap: 12px;
        }

        .btn-dashboard-toggle-mobile {
          background: none;
          border: 1px solid var(--border-color);
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .btn-dashboard-toggle-mobile.active {
          background-color: var(--primary-light);
          color: var(--primary);
          border-color: var(--primary);
        }

        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--secondary);
          display: flex;
          align-items: center;
        }

        .nav-mobile {
          position: fixed;
          top: 0;
          right: -100%;
          width: 280px;
          height: 100vh;
          background-color: white;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.05);
          padding: 100px 30px 40px 30px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 999;
          transition: var(--transition-smooth);
        }

        .nav-mobile.open {
          right: 0;
        }

        .mobile-nav-link {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--secondary);
          padding-bottom: 8px;
          border-bottom: 1px solid var(--bg-soft);
        }

        .mobile-nav-link:hover {
          color: var(--primary);
          padding-left: 8px;
        }

        .mobile-btn {
          margin-top: 20px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }
          .mobile-actions {
            display: flex;
          }
        }
      `}} />
    </header>
  );
}
