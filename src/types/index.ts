export interface MinIncome {
  amount: number;
  currency: string;
  basis: 'monthly' | 'annual';
}

export interface VisaScopeRow {
  program_id: string;
  country: string;
  name: string;
  duration_months: number;
  renewable: boolean;
  min_income: MinIncome | null;
  dependents: boolean;
  insurance_req: boolean;
  application_channel: string;
  official_url: string;
  as_of: string;
  notes: string;
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export interface Badge {
  type: 'ended' | 'check_nuance' | 'renewals_limited' | 'pilot_cap' | 'income_variance';
  label: string;
  color: 'red' | 'blue' | 'amber' | 'purple' | 'gray';
  tooltip: string;
}

export interface FilterState {
  search: string;
  status: 'all' | 'active';
  region: 'all' | Region;
  dependents: 'any' | 'allows' | 'solo';
  insurance: 'any' | 'required';
  channel: 'any' | 'online' | 'in-person' | 'hybrid';
}

export interface SortState {
  column: keyof VisaScopeRow | null;
  direction: 'asc' | 'desc';
}

export interface IncomeDisplayState {
  currency: 'native' | 'usd' | 'eur';
  basis: 'monthly' | 'annual';
}
