import React, { useState } from 'react';
import axios from 'axios';
import { User, Phone, MapPin, Loader2, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export default function RegistrationForm({ onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);

  // Client-side real-time validation
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    // Phone validation
    const cleanPhone = formData.phone.trim().replace(/[\s-()]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!/^\+?[0-9]{10,12}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian phone number (e.g. 9876543210).";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Pickup Address is required.";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please provide a complete address (minimum 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    // Clear global error
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // Validate inputs
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // POST registration data to Express backend
      const response = await axios.post('http://localhost:5000/api/register', {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim()
      });

      if (response.data && response.data.success) {
        setSuccessDetails(response.data.data);
        setShowSuccessModal(true);
        
        // Reset Form Fields
        setFormData({ name: '', phone: '', address: '' });
        
        // Notify parent component to refresh dashboard listing
        if (onRegistrationSuccess) {
          onRegistrationSuccess();
        }
      }
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Failed to connect to the backend server. Please make sure the backend Express server is running on port 5000.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="section section-register">
      <div className="bg-glow-orb orb-2"></div>
      <div className="container register-container grid-2">
        
        <div className="register-info animate-slide-up">
          <span className="badge-label">Enrollment</span>
          <h2 className="register-title">Register Your Free Doorstep Pickup</h2>
          <p className="register-desc">
            Make the pledge today! Join thousands of civic-minded citizens in Gandhinagar who have committed to smart resource conservation. 
          </p>
          
          <div className="perks-checklist">
            <div className="perk-check-item">
              <CheckCircle2 className="check-icon" />
              <div>
                <h4>Zero-Cost Forever</h4>
                <p>Absolutely no convenience fees or service charges will ever be billed to citizens.</p>
              </div>
            </div>
            <div className="perk-check-item">
              <CheckCircle2 className="check-icon" />
              <div>
                <h4>Contactless & Safe Handover</h4>
                <p>Verified, background-checked coordinators with smart electric mini-trucks handle all collections.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="register-form-card animate-slide-up">
          <h3 className="form-card-title">Schedule Doorstep Pickup</h3>
          <p className="form-card-subtitle">Choose a smart path. Provide pickup details below.</p>
          
          {serverError && (
            <div className="server-error-banner">
              <ShieldAlert className="error-banner-icon" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <div className="input-with-icon">
                <Phone className="input-icon" size={18} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address" className="form-label">Doorstep Address</label>
              <div className="input-with-icon">
                <MapPin className="input-icon-textarea" size={18} />
                <textarea
                  id="address"
                  name="address"
                  className={`form-input form-textarea ${errors.address ? 'error' : ''}`}
                  placeholder="Enter complete address (Building, Block, Sector number)"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                ></textarea>
              </div>
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="spinner" size={20} />
                  <span>Scheduling Pickup...</span>
                </>
              ) : (
                <span>Schedule My Free Pickup</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-card animate-slide-up">
            <button className="modal-close" onClick={() => setShowSuccessModal(false)} aria-label="Close Modal">
              <X size={20} />
            </button>
            <div className="modal-header">
              <div className="success-icon-wrapper">
                <CheckCircle2 size={54} />
              </div>
              <h3 className="modal-title">You are now a Green Hero!</h3>
              <p className="modal-subtitle">Your doorstep recycling pickup has been scheduled successfully.</p>
            </div>
            
            <div className="modal-details">
              <h4 className="details-heading">Pickup Schedule Invoice</h4>
              <div className="details-row">
                <span className="details-label">Hero ID:</span>
                <span className="details-val">#GH-00{successDetails?.id}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Name:</span>
                <span className="details-val">{successDetails?.name}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Phone:</span>
                <span className="details-val">{successDetails?.phone}</span>
              </div>
              <div className="details-row text-address">
                <span className="details-label">Address:</span>
                <span className="details-val">{successDetails?.address}</span>
              </div>
            </div>

            <div className="modal-gamification-tip">
              <div className="tip-badge">Level 1 Pending</div>
              <p>Keep your dry recyclables clean and sorted! Prepare plastic, glass, and metal cans. You will receive your <strong>Green Starter</strong> badge upon collection.</p>
            </div>

            <button onClick={() => setShowSuccessModal(false)} className="btn btn-primary btn-modal-dismiss">
              Awesome, Got It!
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .section-register {
          background-color: var(--bg-soft);
          border-bottom: 1px solid var(--border-color);
          overflow: hidden;
        }

        .register-container {
          align-items: center;
        }

        .register-title {
          font-size: 2.8rem;
          line-height: 1.15;
          margin-bottom: 20px;
          text-align: left;
        }

        .register-desc {
          font-size: 1.1rem;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .perks-checklist {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .perk-check-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .check-icon {
          color: var(--primary);
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          margin-top: 2px;
        }

        .perk-check-item h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 4px;
        }

        .perk-check-item p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Form Card */
        .register-form-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 48px;
          box-shadow: var(--shadow-lg);
        }

        .form-card-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--secondary);
          margin-bottom: 6px;
        }

        .form-card-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 30px;
        }

        .server-error-banner {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background-color: #fef2f2;
          border: 1px solid #fee2e2;
          color: #b91c1c;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          font-size: 0.85rem;
          font-weight: 500;
          line-height: 1.4;
        }

        .error-banner-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .input-icon-textarea {
          position: absolute;
          left: 16px;
          top: 16px;
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-input {
          padding-left: 48px;
        }

        .form-textarea {
          resize: none;
          min-height: 100px;
        }

        .btn-submit {
          width: 100%;
          padding: 16px;
          font-size: 1.05rem;
          margin-top: 10px;
        }

        .btn-submit:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Success Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(2, 44, 34, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .modal-card {
          background-color: white;
          border-radius: var(--radius-lg);
          max-width: 520px;
          width: 100%;
          padding: 40px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          text-align: center;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .modal-close:hover {
          color: var(--text-main);
          transform: scale(1.1);
        }

        .success-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .modal-title {
          font-size: 1.6rem;
          color: var(--secondary);
          margin-bottom: 8px;
        }

        .modal-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .modal-details {
          background-color: var(--bg-soft);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          text-align: left;
          margin-bottom: 24px;
        }

        .details-heading {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--secondary);
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .details-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .details-row:last-child {
          margin-bottom: 0;
        }

        .text-address {
          flex-direction: column;
          gap: 4px;
        }

        .details-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .details-val {
          color: var(--text-main);
          font-weight: 600;
        }

        .modal-gamification-tip {
          background-color: #fef8e7;
          border: 1px solid #fef08a;
          border-radius: var(--radius-md);
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 30px;
          text-align: center;
        }

        .tip-badge {
          background-color: var(--accent);
          color: var(--secondary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .modal-gamification-tip p {
          font-size: 0.85rem;
          color: #78350f;
          line-height: 1.5;
        }

        .btn-modal-dismiss {
          width: 100%;
          padding: 14px;
        }

        @media (max-width: 768px) {
          .register-title { font-size: 2.2rem; }
          .register-form-card { padding: 30px 24px; }
          .modal-card { padding: 30px 20px; }
        }
      `}} />
    </section>
  );
}
