import type { VisaScopeRow, IncomeDisplayState } from '../types/index';
import './DetailModal.css';

interface DetailModalProps {
  program: VisaScopeRow;
  onClose: () => void;
  unlocked: boolean;
  incomeDisplay: IncomeDisplayState;
}

function DetailModal({ program, onClose, unlocked, incomeDisplay }: DetailModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopySummary = () => {
    const summary = `${program.country} - ${program.name}\nDuration: ${program.duration_months} months\nRenewable: ${program.renewable ? 'Yes' : 'No'}\nMin Income: ${program.min_income ? `${program.min_income.amount} ${program.min_income.currency}/${program.min_income.basis}` : 'N/A'}\nDependents: ${program.dependents ? 'Yes' : 'No'}\nInsurance: ${program.insurance_req ? 'Required' : 'Not required'}\nChannel: ${program.application_channel}\nOfficial: ${program.official_url}\nAs of: ${program.as_of}`;
    
    navigator.clipboard.writeText(summary);
    alert('Summary copied to clipboard!');
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <h2>{program.country} — {program.name}</h2>
            <p className="modal-subtitle">As of {new Date(program.as_of).toLocaleDateString()}</p>
          </div>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-columns">
            <div className="modal-column">
              <h3>Overview</h3>
              <dl>
                <dt>Duration</dt>
                <dd>{program.duration_months} months</dd>
                
                <dt>Renewable</dt>
                <dd>{program.renewable ? 'Yes' : 'No'}</dd>
                
                <dt>Application Channel</dt>
                <dd>{program.application_channel}</dd>
                
                <dt>Dependents Allowed</dt>
                <dd>{program.dependents ? 'Yes' : 'No'}</dd>
                
                <dt>Insurance Required</dt>
                <dd>{program.insurance_req ? 'Yes' : 'No'}</dd>
              </dl>
            </div>

            <div className="modal-column">
              <h3>Minimum Income</h3>
              {program.min_income ? (
                <div className="income-info">
                  <div className="income-primary">
                    <strong>Native:</strong> {program.min_income.amount} {program.min_income.currency} / {program.min_income.basis}
                  </div>
                  {incomeDisplay.currency !== 'native' && (
                    <div className="income-normalized">
                      <em>Currency normalization: Feature coming soon</em>
                    </div>
                  )}
                </div>
              ) : (
                <p>No fixed minimum income requirement.</p>
              )}

              <div className="notes-section">
                <h3>Notes</h3>
                <p>{program.notes || 'No additional notes.'}</p>
              </div>
            </div>
          </div>

          <div className="metadata-section">
            <p><strong>Program ID:</strong> {program.program_id}</p>
            <p><strong>Last Verified:</strong> {new Date(program.as_of).toLocaleDateString()}</p>
            <p className="disclaimer">
              <em>Disclaimer: Requirements may change. Always verify with official sources.</em>
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <a
            href={program.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="official-link-btn"
          >
            Official Source
          </a>
          <button onClick={handleCopySummary} className="secondary-btn">
            Copy Summary
          </button>
          {!unlocked && (
            <button disabled className="disabled-btn" title="Unlock to export">
              Add to CSV (Locked)
            </button>
          )}
          <button onClick={onClose} className="primary-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
