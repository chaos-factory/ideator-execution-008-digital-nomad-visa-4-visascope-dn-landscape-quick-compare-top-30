import { useState, useEffect, useMemo } from 'react';
import type { VisaScopeRow, FilterState, SortState, IncomeDisplayState } from '../types/index';
import { getRegion } from '../utils/regions';
import { deriveBadges } from '../utils/badges';
import { logEvent } from '../utils/analytics';
import { exportToCSV, exportToPDF } from '../utils/export';
import DetailModal from '../components/DetailModal';
import PaywallModal from '../components/PaywallModal';
import './ComparePage.css';

function ComparePage() {
  const [programs, setPrograms] = useState<VisaScopeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<VisaScopeRow | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    region: 'all',
    dependents: 'any',
    insurance: 'any',
    channel: 'any',
  });

  const [sortState, setSortState] = useState<SortState>({
    column: 'country',
    direction: 'asc',
  });

  const [incomeDisplay, setIncomeDisplay] = useState<IncomeDisplayState>({
    currency: 'native',
    basis: 'monthly',
  });

  // Load programs data
  useEffect(() => {
    fetch('/ideator-execution-008-digital-nomad-visa-4-visascope-dn-landscape-quick-compare-top-30/data/visascope/programs.json')
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load programs:', err);
        setLoading(false);
      });
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      if (searchTerm) {
        logEvent('search_submit', { query: searchTerm });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter and sort programs
  const filteredPrograms = useMemo(() => {
    let result = [...programs];

    // Search
    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.country.toLowerCase().includes(search) ||
          p.name.toLowerCase().includes(search)
      );
    }

    // Region filter
    if (filters.region !== 'all') {
      result = result.filter((p) => getRegion(p.country) === filters.region);
    }

    // Dependents filter
    if (filters.dependents === 'allows') {
      result = result.filter((p) => p.dependents);
    } else if (filters.dependents === 'solo') {
      result = result.filter((p) => !p.dependents);
    }

    // Insurance filter
    if (filters.insurance === 'required') {
      result = result.filter((p) => p.insurance_req);
    }

    // Channel filter
    if (filters.channel !== 'any') {
      result = result.filter(
        (p) => p.application_channel.toLowerCase() === filters.channel.toLowerCase()
      );
    }

    // Sort
    if (sortState.column) {
      result.sort((a, b) => {
        const aVal = a[sortState.column as keyof VisaScopeRow];
        const bVal = b[sortState.column as keyof VisaScopeRow];
        
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortState.direction === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortState.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
    }

    return result;
  }, [programs, debouncedSearch, filters, sortState]);

  const handleSort = (column: keyof VisaScopeRow) => {
    logEvent('sort_click', { column });
    setSortState((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    logEvent('filter_apply', { [key]: value });
  };

  const handleRowClick = (program: VisaScopeRow, index: number) => {
    if (index >= 10 && !unlocked) {
      setShowPaywall(true);
      logEvent('paywall_view', { trigger: 'row_click' });
      return;
    }
    setSelectedProgram(program);
    logEvent('row_open', { program_id: program.program_id });
  };

  const handleExport = (format: 'csv' | 'pdf', scope: 'all' | 'filtered') => {
    if (!unlocked) {
      setShowPaywall(true);
      logEvent('export_attempt', { format, scope, unlocked: false });
      return;
    }

    const dataToExport = scope === 'all' ? programs : filteredPrograms;
    const date = new Date().toISOString().split('T')[0];
    const filename = `visascope_dn_compare_${date}_${scope}.${format}`;

    if (format === 'csv') {
      exportToCSV(dataToExport, filename);
    } else {
      exportToPDF(dataToExport, filename);
    }

    logEvent('export_success', { format, scope, count: dataToExport.length });
  };

  const handleUnlock = () => {
    setUnlocked(true);
    setShowPaywall(false);
    logEvent('purchase_success', { simulated: true });
  };

  const toggleCurrency = () => {
    const currencies: Array<'native' | 'usd' | 'eur'> = ['native', 'usd', 'eur'];
    const currentIndex = currencies.indexOf(incomeDisplay.currency);
    const nextCurrency = currencies[(currentIndex + 1) % currencies.length];
    setIncomeDisplay((prev) => ({ ...prev, currency: nextCurrency }));
    logEvent('toggle_currency', { to: nextCurrency });
  };

  const toggleBasis = () => {
    const newBasis = incomeDisplay.basis === 'monthly' ? 'annual' : 'monthly';
    setIncomeDisplay((prev) => ({ ...prev, basis: newBasis }));
    logEvent('toggle_basis', { to: newBasis });
  };

  if (loading) {
    return <div className="loading">Loading visa programs...</div>;
  }

  return (
    <div className="compare-page">
      <div className="page-header">
        <h1>DN Landscape Quick Compare (Top 30)</h1>
        <p>Compare digital nomad visa programs by duration, income, and requirements</p>
      </div>

      <div className="controls-panel">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by country or program name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          <select
            value={filters.dependents}
            onChange={(e) => handleFilterChange('dependents', e.target.value)}
          >
            <option value="any">Any (Dependents)</option>
            <option value="allows">Allows dependents</option>
            <option value="solo">Solo only</option>
          </select>

          <select
            value={filters.insurance}
            onChange={(e) => handleFilterChange('insurance', e.target.value)}
          >
            <option value="any">Any (Insurance)</option>
            <option value="required">Insurance required</option>
          </select>

          <select
            value={filters.channel}
            onChange={(e) => handleFilterChange('channel', e.target.value)}
          >
            <option value="any">Any (Channel)</option>
            <option value="online">Online</option>
            <option value="in person">In person</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="income-toggles">
          <button onClick={toggleCurrency} className="toggle-btn">
            Currency: {incomeDisplay.currency.toUpperCase()}
          </button>
          <button onClick={toggleBasis} className="toggle-btn">
            Basis: {incomeDisplay.basis === 'monthly' ? 'Monthly' : 'Annual'}
          </button>
        </div>

        <div className="export-buttons">
          <button onClick={() => handleExport('csv', 'all')} className="export-btn">
            Export CSV (All)
          </button>
          <button onClick={() => handleExport('csv', 'filtered')} className="export-btn">
            Export CSV (Filtered)
          </button>
          <button onClick={() => handleExport('pdf', 'all')} className="export-btn">
            Export PDF (All)
          </button>
          <button onClick={() => handleExport('pdf', 'filtered')} className="export-btn">
            Export PDF (Filtered)
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="programs-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('country')} className="sortable">
                Country {sortState.column === 'country' && (sortState.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Program {sortState.column === 'name' && (sortState.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('duration_months')} className="sortable">
                Duration (mo) {sortState.column === 'duration_months' && (sortState.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('renewable')} className="sortable">
                Renewable {sortState.column === 'renewable' && (sortState.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Min Income</th>
              <th>Dependents</th>
              <th>Insurance</th>
              <th>Channel</th>
              <th>As of</th>
              <th>Badges</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((program, index) => {
              const badges = deriveBadges(program);
              const isLocked = index >= 10 && !unlocked;

              return (
                <tr
                  key={program.program_id}
                  className={`${isLocked ? 'locked' : ''} ${index % 2 === 0 ? 'even' : 'odd'}`}
                  onClick={() => handleRowClick(program, index)}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleRowClick(program, index)}
                >
                  <td>{program.country}</td>
                  <td className="program-cell">
                    {program.name}
                    <a
                      href={program.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      🔗
                    </a>
                  </td>
                  <td>{program.duration_months}</td>
                  <td>{program.renewable ? 'Yes' : 'No'}</td>
                  <td>
                    {program.min_income
                      ? `${program.min_income.amount} ${program.min_income.currency}`
                      : 'N/A'}
                  </td>
                  <td>{program.dependents ? 'Yes' : 'No'}</td>
                  <td>{program.insurance_req ? 'Yes' : 'No'}</td>
                  <td>{program.application_channel}</td>
                  <td>{new Date(program.as_of).toLocaleDateString()}</td>
                  <td className="badges-cell">
                    {badges.map((badge, i) => (
                      <span
                        key={i}
                        className={`badge badge-${badge.color}`}
                        title={badge.tooltip}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredPrograms.length >= 10 && !unlocked && (
          <div className="gating-panel">
            <h3>🔒 Unlock the top 30</h3>
            <p>See all rows and export CSV/PDF for a one-time $10</p>
            <button onClick={() => setShowPaywall(true)} className="unlock-btn">
              Unlock full table ($10)
            </button>
            <a href="#access" className="secondary-link">
              Already purchased? Access your table
            </a>
          </div>
        )}
      </div>

      {selectedProgram && (
        <DetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          unlocked={unlocked}
          incomeDisplay={incomeDisplay}
        />
      )}

      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onUnlock={handleUnlock}
        />
      )}
    </div>
  );
}

export default ComparePage;
