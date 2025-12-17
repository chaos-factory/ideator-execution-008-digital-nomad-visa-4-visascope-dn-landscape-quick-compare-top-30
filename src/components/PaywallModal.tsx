import { logEvent } from '../utils/analytics';
import './PaywallModal.css';

interface PaywallModalProps {
  onClose: () => void;
  onUnlock: () => void;
}

function PaywallModal({ onClose, onUnlock }: PaywallModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUnlockClick = () => {
    logEvent('purchase_start', { simulated: true });
    // Simulate payment flow
    setTimeout(() => {
      onUnlock();
    }, 500);
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content paywall-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>🔓 Unlock Full Access</h2>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="paywall-content">
            <h3>Get access to:</h3>
            <ul className="benefits-list">
              <li>✓ All 30 visa programs (rows 11-30 currently locked)</li>
              <li>✓ Full CSV export with all columns</li>
              <li>✓ PDF export for offline reference</li>
              <li>✓ Detailed notes and requirements for all programs</li>
              <li>✓ Lifetime access to updates</li>
            </ul>

            <div className="pricing">
              <div className="price">
                <span className="price-amount">$10</span>
                <span className="price-label">One-time payment</span>
              </div>
            </div>

            <p className="paywall-note">
              <em>This is a simulated paywall for MVP demonstration. 
              Click "Unlock Now" to simulate a successful purchase.</em>
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleUnlockClick} className="unlock-primary-btn">
            Unlock Now (Simulated)
          </button>
          <button onClick={onClose} className="secondary-btn">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaywallModal;
