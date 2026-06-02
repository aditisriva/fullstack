import React from 'react';
import { Award, CheckCircle2, Milestone, ShieldAlert, Sparkles } from 'lucide-react';

export default function GreenHero() {
  const levels = [
    {
      badge: "Green Starter",
      level: "Level 01",
      milestone: "1st Doorstep Pickup",
      perks: [
        "Starter Eco-Kit (Jute Bags)",
        "Organic Vegetable Seed Packet",
        "Digital Certificate of Joining"
      ],
      color: "bronze",
      glowColor: "rgba(205, 127, 50, 0.15)"
    },
    {
      badge: "Eco Champion",
      level: "Level 02",
      milestone: "5 Doorstep Pickups",
      perks: [
        "Certificate of Civic Appreciation",
        "Compost Kit Discount Voucher",
        "Feature on Green Heroes Portal"
      ],
      color: "silver",
      glowColor: "rgba(192, 192, 192, 0.25)"
    },
    {
      badge: "Green Hero",
      level: "Level 03",
      milestone: "15+ Doorstep Pickups",
      perks: [
        "Official Metallic Green Hero Badge",
        "Gandhinagar Civic Board Invitation",
        "A Dedicated Tree Planted in Your Name"
      ],
      color: "gold",
      glowColor: "rgba(255, 215, 0, 0.25)"
    }
  ];

  return (
    <section id="badges" className="section section-badges section-bg-soft">
      <div className="bg-glow-orb orb-1"></div>
      <div className="container">
        <span className="badge-label">Gamification</span>
        <h2 className="section-title">Rise Through The Ranks</h2>
        <p className="section-subtitle">
          Recycling is a civic responsibility, but that doesn't mean it can't be exciting! Earn recognized milestones and unlock awards.
        </p>

        <div className="grid-3 badges-grid">
          {levels.map((level, i) => (
            <div key={i} className={`badge-card badge-${level.color} card-hover-effect`}>
              <div className="badge-ribbon">{level.level}</div>
              <div className="badge-graphic-wrapper">
                <Award size={48} className="badge-icon-illustrative" />
                <Sparkles size={20} className="badge-star-sparkle" />
              </div>
              <h3 className="badge-card-name">{level.badge}</h3>
              <div className="badge-requirement">
                <Milestone size={14} />
                <span>{level.milestone}</span>
              </div>
              
              <div className="divider"></div>
              
              <ul className="perks-list">
                {level.perks.map((perk, pIdx) => (
                  <li key={pIdx} className="perk-item">
                    <CheckCircle2 size={16} className="perk-check" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .section-badges {
          border-bottom: 1px solid var(--border-color);
          overflow: hidden;
        }

        .badges-grid {
          margin-top: 20px;
        }

        .badge-card {
          background-color: var(--bg-card);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 48px 36px 36px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-shadow: var(--shadow-sm);
        }

        .badge-ribbon {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 12px;
          background-color: var(--secondary);
          color: white;
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 0.75rem;
          border-radius: 50px;
          letter-spacing: 0.5px;
        }

        .badge-graphic-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .badge-star-sparkle {
          position: absolute;
          top: 10px;
          right: 10px;
          animation: float 3s ease-in-out infinite;
        }

        /* Bronze Badge Styling */
        .badge-bronze {
          border-color: rgba(205, 127, 50, 0.2);
        }
        .badge-bronze .badge-graphic-wrapper {
          background: linear-gradient(135deg, #df8d4f 0%, #a05a2c 100%);
          color: white;
        }
        .badge-bronze .badge-star-sparkle {
          color: #ffb884;
        }

        /* Silver Badge Styling */
        .badge-silver {
          border-color: rgba(160, 174, 192, 0.3);
          box-shadow: var(--shadow-md);
        }
        .badge-silver .badge-graphic-wrapper {
          background: linear-gradient(135deg, #cbd5e1 0%, #64748b 100%);
          color: white;
        }
        .badge-silver .badge-star-sparkle {
          color: white;
        }

        /* Gold Badge Styling */
        .badge-gold {
          border-color: rgba(250, 204, 21, 0.4);
          transform: scale(1.03);
          box-shadow: 0 10px 30px rgba(250, 204, 21, 0.12);
        }
        .badge-gold:hover {
          transform: translateY(-8px) scale(1.05) !important;
        }
        .badge-gold .badge-graphic-wrapper {
          background: linear-gradient(135deg, #fde047 0%, #d97706 100%);
          color: white;
        }
        .badge-gold .badge-star-sparkle {
          color: #fef08a;
        }
        .badge-gold .badge-ribbon {
          background-color: var(--primary);
        }

        .badge-card-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 6px;
        }

        .badge-requirement {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 24px;
        }

        .divider {
          width: 100%;
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 24px;
        }

        .perks-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          text-align: left;
        }

        .perk-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .perk-check {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        @media (max-width: 1024px) {
          .badge-gold {
            transform: scale(1);
          }
          .badge-gold:hover {
            transform: translateY(-8px) scale(1.02) !important;
          }
        }

        @media (max-width: 768px) {
          .badge-card {
            padding: 40px 24px 28px 24px;
          }
        }
      `}} />
    </section>
  );
}
