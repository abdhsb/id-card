import { toPng } from 'html-to-image';

// Matches the on-screen card ratio (336x540px) at a print-friendly badge size.
const PDF_PAGE_WIDTH_IN = 3.5;
const PDF_PAGE_HEIGHT_IN = 5.625;

export async function exportNodeAsPng(node: HTMLElement, filename: string) {
  const dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true });
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function nodeToPngDataUrl(node: HTMLElement) {
  return toPng(node, { pixelRatio: 3, cacheBust: true });
}

export async function exportCardsAsPdf(nodes: HTMLElement[], filename: string) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    unit: 'in',
    format: [PDF_PAGE_WIDTH_IN, PDF_PAGE_HEIGHT_IN],
  });

  for (let i = 0; i < nodes.length; i++) {
    // Lower pixel ratio than the PNG downloads: ~190 DPI at this page size is
    // already plenty for badge printing, and keeps the PDF file size sane.
    const dataUrl = await toPng(nodes[i], { pixelRatio: 2, cacheBust: true });
    if (i > 0) doc.addPage([PDF_PAGE_WIDTH_IN, PDF_PAGE_HEIGHT_IN], 'portrait');
    doc.addImage(dataUrl, 'PNG', 0, 0, PDF_PAGE_WIDTH_IN, PDF_PAGE_HEIGHT_IN);
  }

  doc.save(filename);
}
