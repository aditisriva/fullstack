import React from 'react';
import { Trash2, HelpCircle, AlertTriangle } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: <Trash2 className="problem-card-icon" size={36} />,
      title: "Inconvenient Disposal System",
      desc: "Working professionals and busy families find it hard to locate recycling centers or wait for municipal sweepers during regular working hours."
    },
    {
      icon: <HelpCircle className="problem-card-icon" size={36} />,
      title: "Sorting Confusion",
      desc: "Without clean guidelines, citizens mix organic waste with plastics, cardboard, and glass, making otherwise recyclable resources completely unusable."
    },
    {
      icon: <AlertTriangle className="problem-card-icon" size={36} />,
      title: "Growing Landfill Crises",
      desc: "Valuable dry recyclables end up sitting in massive local dump yards, polluting Gandhinagar's beautiful green greenbelt and toxicating ground water."
    }
  ];

  return (
    <section id="problem" className="section section-problem">
      <div className="container">
        <span className="badge-label">The Challenge</span>
        <h2 className="section-title">Why Civic Recycling Rates Are Low</h2>
        <p className="section-subtitle">
          Even in India's greenest capital, urban recycling efforts are hindered by three major system breakdowns.
        </p>

        <div className="grid-3 problem-grid">
          {problems.map((prob, i) => (
            <div key={i} className="problem-card card-hover-effect">
              <div className="icon-wrapper">
                {prob.icon}
              </div>
              <h3 className="problem-card-title">{prob.title}</h3>
              <p className="problem-card-desc">{prob.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .section-problem {
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-color);
        }

        .problem-grid {
          margin-top: 20px;
        }

        .problem-card {
          background-color: var(--bg-soft);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: var(--radius-md);
          background-color: white;
          border: 1px solid var(--border-color);
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }

        .problem-card-icon {
          color: #ef4444; /* Alert color for problem */
        }

        .problem-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 12px;
        }

        .problem-card-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .problem-card {
            padding: 30px 24px;
          }
        }
      `}} />
    </section>
  );
}
