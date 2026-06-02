import React from 'react';
import { Sparkles, FormInput, Truck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      stepNum: "01",
      icon: <Sparkles size={24} />,
      title: "Segregate Dry Waste",
      desc: "Separate plastic bottles, paper, cardboard, metal cans, and glass containers from standard organic kitchen waste."
    },
    {
      stepNum: "02",
      icon: <FormInput size={24} />,
      title: "Schedule Free Pickup",
      desc: "Fill our simple 3-field online form on this landing page. Specify your sector, block, or building address."
    },
    {
      stepNum: "03",
      icon: <Truck size={24} />,
      title: "Doorstep Handover",
      desc: "Our verified waste collection team will visit your location during the designated sector slot. Hand over and enjoy!"
    }
  ];

  return (
    <section id="how-it-works" className="section section-how-it-works">
      <div className="container">
        <span className="badge-label">The Process</span>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Recycling with Gandhinagar Green Heroes is simplified into three easy, seamless actions.
        </p>

        <div className="steps-container">
          <div className="steps-line"></div>
          {steps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-badge">{step.stepNum}</div>
              <div className="step-card card-hover-effect">
                <div className="step-icon-circle">
                  {step.icon}
                </div>
                <h3 className="step-card-title">{step.title}</h3>
                <p className="step-card-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .section-how-it-works {
          background-color: var(--bg-main);
          border-bottom: 1px solid var(--border-color);
        }

        .steps-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 40px;
          margin-top: 40px;
        }

        .steps-line {
          position: absolute;
          top: 30px;
          left: 50px;
          right: 50px;
          height: 3px;
          background: linear-gradient(90deg, var(--primary-light) 0%, var(--primary) 50%, var(--primary-light) 100%);
          z-index: 0;
        }

        .step-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .step-badge {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--secondary);
          color: white;
          font-family: var(--font-headings);
          font-weight: 800;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          border: 4px solid white;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
        }

        .step-item:hover .step-badge {
          background-color: var(--primary);
          transform: scale(1.1);
        }

        .step-card {
          background-color: var(--bg-soft);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 36px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .step-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: white;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: var(--shadow-sm);
        }

        .step-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 12px;
        }

        .step-card-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .steps-container {
            flex-direction: column;
            gap: 40px;
          }
          .steps-line {
            display: none;
          }
          .step-item {
            flex-direction: row;
            align-items: flex-start;
            gap: 20px;
          }
          .step-badge {
            margin-bottom: 0;
            flex-shrink: 0;
          }
          .step-card {
            text-align: left;
            align-items: flex-start;
            padding: 24px;
          }
          .step-icon-circle {
            margin-bottom: 12px;
          }
        }
      `}} />
    </section>
  );
}
