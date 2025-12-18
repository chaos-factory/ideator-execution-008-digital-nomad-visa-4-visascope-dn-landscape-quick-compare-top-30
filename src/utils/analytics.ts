type EventType =
  | 'sort_click'
  | 'filter_apply'
  | 'search_submit'
  | 'toggle_currency'
  | 'toggle_basis'
  | 'row_open'
  | 'export_attempt'
  | 'export_success'
  | 'paywall_view'
  | 'purchase_start'
  | 'purchase_success';

export function logEvent(eventType: EventType, data?: Record<string, unknown>) {
  console.log(`[Analytics] ${eventType}`, data || {});
}
