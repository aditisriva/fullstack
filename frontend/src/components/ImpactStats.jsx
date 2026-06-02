import React from 'react';
import { Users, Scale, MapPin, Building2 } from 'lucide-react';

export default function ImpactStats() {
  const stats = [
    {
      icon: <Users size={28} />,
      number: "10,000+",
      label: "Active Citizens Joined",
      desc: "Local families and young students driving civic change."
    },
    {
      icon: <Scale size={28} />,
      number: "50+ Tons",
      label: "Waste Recycled",
      desc: "Dry resource segregated and saved from city landfills."
    },
    {
      icon: <MapPin size={28} />,
      number: "100+ Sectors",
      label: "Sectors Covered",
      desc: "Full coverage across Gandhinagar's planned layout."
    }
  ];

  return (
    <section className="section section-stats">
      <div className="container stats-container grid-3">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon-glow">
              {stat.icon}
            </div>
            <h3 className="stat-number">{stat.number}</h3>
            <h4 className="stat-label">{stat.label}</h4>
            <p className="stat-desc">{stat.desc}</p>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .section-stats {
          background: linear-gradient(135deg, var(--secondary) 0%, #022c22 100%);
          padding: 80px 0;
          color: white;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stats-container {
          gap: 40px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
        }

        .stat-icon-glow {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background-color: rgba(16, 185, 129, 0.15);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
        }

        .stat-number {
          font-family: var(--font-headings);
          font-size: 3rem;
          font-weight: 800;
          color: white;
          line-height: 1;
          margin-bottom: 8px;
          background: linear-gradient(135deg, white 60%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f0fdf4;
          margin-bottom: 8px;
        }

        .stat-desc {
          font-size: 0.9rem;
          color: #a7f3d0;
          max-width: 250px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .section-stats {
            padding: 60px 0;
          }
          .stat-number {
            font-size: 2.5rem;
          }
        }
      `}} />
    </section>
  );
}
