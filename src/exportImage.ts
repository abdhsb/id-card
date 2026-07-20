import { toPng } from 'html-to-image';

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
