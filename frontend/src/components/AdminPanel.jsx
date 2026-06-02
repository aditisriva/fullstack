import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, RefreshCw, Clock, MapPin, Phone, ShieldCheck, X, Users } from 'lucide-react';

export default function AdminPanel({ isOpen, onClose, registrations, onRefresh }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  useEffect(() => {
    if (registrations) {
      const filtered = registrations.filter(reg => 
        reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.phone.includes(searchQuery) ||
        reg.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRegistrations(filtered);
    }
  }, [registrations, searchQuery]);

  const formatDate = (isoStr) => {
    const date = new Date(isoStr);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="admin-overlay">
      <div className="admin-modal">
        
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title-area">
            <ShieldCheck size={28} className="admin-logo-icon" />
            <div>
              <h2 className="admin-title">Green Heroes Initiative Dashboard</h2>
              <p className="admin-subtitle">Live registrations retrieved via GET /api/registrations</p>
            </div>
          </div>
          <button className="admin-close-btn" onClick={onClose} aria-label="Close Dashboard">
            <X size={20} />
          </button>
        </div>

        {/* Info Row */}
        <div className="admin-info-bar">
          <div className="admin-metric">
            <Users size={18} />
            <span><strong>{registrations?.length || 0}</strong> Registered Pickups</span>
          </div>
          <div className="admin-actions">
            <div className="admin-search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, sector, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>
            <button className="btn-refresh" onClick={onRefresh} title="Fetch latest registrations">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="admin-content">
          {filteredRegistrations.length === 0 ? (
            <div className="empty-state">
              <Users size={48} className="empty-icon" />
              <h3>No Registrations Found</h3>
              <p>Either there are no pickups scheduled yet, or your search query doesn't match any active records.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="registrations-table">
                <thead>
                  <tr>
                    <th>Hero ID</th>
                    <th>Citizen Details</th>
                    <th>Doorstep Address</th>
                    <th>Scheduled Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg, idx) => (
                    <tr key={reg.id} className="reg-row">
                      <td className="col-id">
                        <span className="id-tag">#GH-00{reg.id}</span>
                      </td>
                      <td className="col-details">
                        <div className="citizen-name">{reg.name}</div>
                        <div className="citizen-phone">
                          <Phone size={12} />
                          <span>{reg.phone}</span>
                        </div>
                      </td>
                      <td className="col-address">
                        <div className="address-container">
                          <MapPin size={14} className="addr-pin" />
                          <span className="address-text">{reg.address}</span>
                        </div>
                      </td>
                      <td className="col-date">
                        <div className="date-container">
                          <Clock size={12} />
                          <span>{formatDate(reg.registeredAt)}</span>
                        </div>
                      </td>
                      <td className="col-status">
                        <span className="status-badge status-pending">Pending Pickup</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(2, 44, 34, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .admin-modal {
          background-color: white;
          border-radius: var(--radius-lg);
          max-width: 1000px;
          width: 100%;
          height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          overflow: hidden;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .admin-header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-soft);
        }

        .admin-title-area {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .admin-logo-icon {
          color: var(--primary);
        }

        .admin-title {
          font-size: 1.4rem;
          color: var(--secondary);
          line-height: 1.2;
        }

        .admin-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .admin-close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .admin-close-btn:hover {
          color: var(--text-main);
          transform: scale(1.1);
        }

        /* Info & Actions Bar */
        .admin-info-bar {
          padding: 16px 32px;
          background-color: white;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .admin-metric {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: var(--secondary);
          font-weight: 500;
        }

        .admin-metric strong {
          color: var(--primary);
          font-size: 1.1rem;
        }

        .admin-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .admin-search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }

        .admin-search-input {
          padding: 10px 16px 10px 36px;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          font-family: var(--font-body);
          font-size: 0.85rem;
          width: 250px;
          background-color: var(--bg-soft);
          transition: var(--transition-smooth);
        }

        .admin-search-input:focus {
          outline: none;
          border-color: var(--primary);
          background-color: white;
          width: 300px;
        }

        .btn-refresh {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          background-color: var(--primary-light);
          color: var(--primary);
          font-family: var(--font-headings);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-refresh:hover {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .btn-refresh:hover svg {
          transform: rotate(180deg);
        }

        .btn-refresh svg {
          transition: transform 0.5s ease;
        }

        /* Content Area */
        .admin-content {
          flex-grow: 1;
          overflow-y: auto;
          padding: 32px;
          background-color: var(--bg-soft);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
        }

        .empty-icon {
          color: var(--border-color);
          margin-bottom: 16px;
        }

        .empty-state h3 {
          margin-bottom: 8px;
          color: var(--secondary);
        }

        .empty-state p {
          max-width: 400px;
          font-size: 0.9rem;
        }

        .table-responsive {
          width: 100%;
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .registrations-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .registrations-table th {
          background-color: white;
          padding: 16px 20px;
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          border-bottom: 2px solid var(--border-color);
        }

        .registrations-table td {
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .reg-row:last-child td {
          border-bottom: none;
        }

        .reg-row:hover td {
          background-color: rgba(16, 185, 129, 0.02);
        }

        .id-tag {
          display: inline-block;
          padding: 4px 8px;
          background-color: var(--bg-soft);
          color: var(--secondary);
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 0.8rem;
          border-radius: 6px;
          border: 1px solid var(--border-color);
        }

        .citizen-name {
          font-weight: 700;
          color: var(--secondary);
          font-size: 0.95rem;
        }

        .citizen-phone {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .address-container {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          max-width: 320px;
        }

        .addr-pin {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .address-text {
          font-size: 0.9rem;
          color: var(--text-main);
          line-height: 1.4;
        }

        .date-container {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 50px;
        }

        .status-pending {
          background-color: #fef3c7;
          color: #d97706;
          border: 1px solid #fde68a;
        }

        @media (max-width: 900px) {
          .admin-info-bar {
            padding: 16px 20px;
          }
          .admin-content {
            padding: 20px;
          }
          .admin-search-input:focus {
            width: 250px;
          }
        }
      `}} />
    </div>
  );
}
