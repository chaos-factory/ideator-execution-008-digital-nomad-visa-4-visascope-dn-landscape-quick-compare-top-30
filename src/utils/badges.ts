import type { Badge, VisaScopeRow } from '../types';

export function deriveBadges(program: VisaScopeRow): Badge[] {
  const badges: Badge[] = [];
  const notes = program.notes.toLowerCase();

  // 1) Program ended/paused (red)
  if (
    notes.includes('ended') ||
    notes.includes('expired') ||
    notes.includes('paused')
  ) {
    badges.push({
      type: 'ended',
      label: 'Ended/Paused',
      color: 'red',
      tooltip: 'Program may have ended or been paused. Check official source for current status.',
    });
  }

  // 2) Check nuance (blue)
  if (program.notes.trim().length > 0) {
    badges.push({
      type: 'check_nuance',
      label: 'Check details',
      color: 'blue',
      tooltip: 'Important details in notes. Open details to learn more.',
    });
  }

  // 3) Renewals limited (amber)
  if (
    program.renewable &&
    (notes.includes('one-time') ||
      notes.includes('max') ||
      notes.includes('cap') ||
      notes.includes('not renewable'))
  ) {
    badges.push({
      type: 'renewals_limited',
      label: 'Renewal limits',
      color: 'amber',
      tooltip: 'Renewal may be limited or capped. Check notes for details.',
    });
  }

  // 4) Pilot/Cap (purple)
  if (
    notes.includes('pilot') ||
    notes.includes('quota') ||
    notes.includes('cap')
  ) {
    badges.push({
      type: 'pilot_cap',
      label: 'Pilot/Cap',
      color: 'purple',
      tooltip: 'Program may be a pilot or have quota/cap limits.',
    });
  }

  // 5) Income variance (gray)
  if (
    !program.min_income ||
    notes.includes('proof of funds') ||
    notes.includes('savings') ||
    notes.includes('local client')
  ) {
    badges.push({
      type: 'income_variance',
      label: 'Income varies',
      color: 'gray',
      tooltip: 'Income requirements may vary or involve savings/funds.',
    });
  }

  // Return max 2 visible badges (prioritize by order)
  return badges.slice(0, 2);
}
