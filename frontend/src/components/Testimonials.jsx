import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      quote: "As an IT professional, I barely had time to figure out waste disposal. Having their doorstep collection team stop by every alternate Sunday has made recycling completely effortless. The badges are an awesome motivator!",
      author: "Priya Shah",
      role: "Software Engineer",
      location: "Sector 21, Gandhinagar",
      rating: 5,
      avatarBg: "linear-gradient(135deg, #10b981 0%, #064e3b 100%)"
    },
    {
      quote: "My roommates and I started segregating plastic bottles and paper in our hostel. Registering online took us exactly 30 seconds. We've already reached Eco Champion status and shared our digital certificate on campus!",
      author: "Aarav Mehta",
      role: "Student, IIT Gandhinagar",
      location: "Kudasan, Gandhinagar",
      rating: 5,
      avatarBg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    },
    {
      quote: "Our family used to throw dry and wet waste together. Now, my children happily separate cardboards and metal containers. The doorstep pickup is punctual, friendly, and teaches the kids practical civic responsibility.",
      author: "Sunita Patel",
      role: "Homemaker & Mother of Two",
      location: "Sector 7, Gandhinagar",
      rating: 5,
      avatarBg: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)"
    }
  ];

  return (
    <section id="testimonials" className="section section-testimonials">
      <div className="container">
        <span className="badge-label">Testimonials</span>
        <h2 className="section-title">Word From Our Green Heroes</h2>
        <p className="section-subtitle">
          Discover how students, working professionals, and families across Gandhinagar are experiencing our free pickup.
        </p>

        <div className="grid-3 testimonials-grid">
          {reviews.map((rev, i) => (
            <div key={i} className="testimonial-card card-hover-effect">
              <Quote className="quote-icon" size={32} />
              
              <div className="rating-stars">
                {[...Array(rev.rating)].map((_, rIdx) => (
                  <Star key={rIdx} size={16} fill="var(--accent)" stroke="var(--accent)" />
                ))}
              </div>

              <p className="testimonial-text">"{rev.quote}"</p>

              <div className="divider"></div>

              <div className="author-info">
                <div className="author-avatar" style={{ background: rev.avatarBg }}>
                  {rev.author.charAt(0)}
                </div>
                <div className="author-meta">
                  <h4 className="author-name">{rev.author}</h4>
                  <p className="author-role">{rev.role}</p>
                  <p className="author-loc">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .section-testimonials {
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-color);
        }

        .testimonial-card {
          background-color: var(--bg-soft);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
        }

        .quote-icon {
          color: var(--primary-glow);
          margin-bottom: 16px;
        }

        .rating-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 16px;
        }

        .testimonial-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-main);
          font-style: italic;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: white;
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }

        .author-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--secondary);
          line-height: 1.2;
        }

        .author-role {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .author-loc {
          font-size: 0.75rem;
          color: var(--primary);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 30px 24px;
          }
        }
      `}} />
    </section>
  );
}
