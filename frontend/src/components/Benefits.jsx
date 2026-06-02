import React from 'react';
import { Truck, Sparkles, Clock, Compass } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: <Truck size={32} />,
      title: "Free Doorstep Pickup",
      desc: "No hidden charges, no convenience fees. Our dedicated green collection electric vehicles will retrieve waste directly from your home."
    },
    {
      icon: <Sparkles size={32} />,
      title: "Cleaner Gandhinagar",
      desc: "By recycling dry waste immediately, you help reduce the load on landfills, keeping our civic sectors pristine and green."
    },
    {
      icon: <Clock size={32} />,
      title: "Save Time & Effort",
      desc: "Skip long queues or waiting around. Just register online and choose your preferred weekend pickup slot in seconds."
    },
    {
      icon: <Compass size={32} />,
      title: "Become a Green Citizen",
      desc: "Gain recognized civic badges and show off your contribution as a registered environmental driver in your community."
    }
  ];

  return (
    <section id="benefits" className="section section-benefits section-bg-soft">
      <div className="container">
        <span className="badge-label">The Perks</span>
        <h2 className="section-title">Direct Benefits for Green Heroes</h2>
        <p className="section-subtitle">
          Making local recycling simple, rewarding, and completely hassle-free for everyone in Gandhinagar.
        </p>

        <div className="grid-4 benefits-grid">
          {benefits.map((benefit, i) => (
            <div key={i} className="benefit-card card-hover-effect">
              <div className="benefit-icon-wrapper">
                {benefit.icon}
              </div>
              <h3 className="benefit-card-title">{benefit.title}</h3>
              <p className="benefit-card-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .section-benefits {
          border-bottom: 1px solid var(--border-color);
        }

        .benefit-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 36px 28px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .benefit-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--primary);
          margin-bottom: 24px;
          transition: var(--transition-smooth);
        }

        .benefit-card:hover .benefit-icon-wrapper {
          background-color: var(--primary);
          color: white;
          transform: scale(1.1);
        }

        .benefit-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 12px;
        }

        .benefit-card-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .benefit-card {
            padding: 30px 20px;
          }
        }
      `}} />
    </section>
  );
}
