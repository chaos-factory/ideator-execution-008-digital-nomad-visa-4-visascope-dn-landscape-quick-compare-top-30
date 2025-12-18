import type { VisaScopeRow } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToCSV(
  programs: VisaScopeRow[],
  filename: string
): void {
  const headers = [
    'Country',
    'Program',
    'Duration (months)',
    'Renewable',
    'Min Income',
    'Currency',
    'Basis',
    'Dependents',
    'Insurance Req',
    'Application Channel',
    'Official URL',
    'As of',
    'Notes',
  ];

  const rows = programs.map((p) => [
    p.country,
    p.name,
    p.duration_months,
    p.renewable ? 'Yes' : 'No',
    p.min_income?.amount || 'N/A',
    p.min_income?.currency || 'N/A',
    p.min_income?.basis || 'N/A',
    p.dependents ? 'Yes' : 'No',
    p.insurance_req ? 'Yes' : 'No',
    p.application_channel,
    p.official_url,
    p.as_of,
    p.notes,
  ]);

  const csvContent = [
    '\ufeff', // UTF-8 BOM
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((cell) =>
          typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))
            ? `"${cell.replace(/"/g, '""')}"`
            : cell
        )
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export function exportToPDF(
  programs: VisaScopeRow[],
  filename: string
): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const headers = [
    ['Country', 'Program', 'Duration', 'Renewable', 'Min Income', 'Dependents', 'Insurance', 'Channel', 'As of'],
  ];

  const rows = programs.map((p) => [
    p.country,
    p.name,
    `${p.duration_months}m`,
    p.renewable ? 'Yes' : 'No',
    p.min_income
      ? `${p.min_income.amount} ${p.min_income.currency}/${p.min_income.basis === 'monthly' ? 'mo' : 'yr'}`
      : 'N/A',
    p.dependents ? 'Yes' : 'No',
    p.insurance_req ? 'Yes' : 'No',
    p.application_channel,
    p.as_of,
  ]);

  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 20,
    margin: { top: 15 },
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [41, 98, 255] },
    didDrawPage: (data) => {
      // Header
      doc.setFontSize(14);
      doc.text('VisaScope – DN Landscape Quick Compare', 14, 10);
      
      // Footer
      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(8);
      doc.text(
        `Page ${data.pageNumber} of ${pageCount} | Generated ${new Date().toLocaleDateString()}`,
        14,
        doc.internal.pageSize.height - 10
      );
    },
  });

  doc.save(filename);
}
