import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { buildOrderHTML } from './orderPdfTemplate';

/**
 * Converts HTML string → canvas → JPEG → jsPDF (A5, always single page).
 * Content is scaled down to fit entirely within one A5 page (148×210mm)
 * no matter how many items the order contains.
 */
async function htmlToPDF(htmlString, fileName) {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:-9999px;top:0;z-index:-1;background:#fff;';
  container.innerHTML = htmlString;
  document.body.appendChild(container);
  const el = container.querySelector('.wrap') || container.firstElementChild;

  await new Promise(r => setTimeout(r, 300));

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 560,
  });

  document.body.removeChild(container);

  // A5 dimensions in mm
  const pageW  = 148;
  const pageH  = 210;
  const margin = 15; // bottom padding so rows never get cut at page edge
  const effectivePageH = pageH - margin;

  const imgW  = pageW;
  const imgH  = (canvas.height * imgW) / canvas.width;
  const imgData = canvas.toDataURL('image/jpeg', 0.85);

  const pdf = new jsPDF('p', 'mm', 'a5');
  pdf.setFillColor(255, 255, 255);

  let heightLeft = imgH;
  let position   = 0;

  pdf.addImage(imgData, 'JPEG', 0, position, imgW, imgH);
  pdf.rect(0, effectivePageH, pageW, pageH, 'F');
  heightLeft -= effectivePageH;

  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgW, imgH);
    pdf.rect(0, effectivePageH, pageW, pageH, 'F');
    heightLeft -= effectivePageH;
  }

  pdf.save(fileName);
}

/** Called from Cart.jsx */
export async function generateOrderPDF({ form, cartItems, cartTotal }) {
  const data = {
    name:    form.name,
    phone:   form.phone,
    state:   form.isTN ? 'Tamil Nadu' : 'Other State',
    address: form.address || '',
    items:   cartItems.map(({ product, qty }) => ({
      name:  product.name,
      unit:  product.order_unit || '—',
      qty,
      price: parseFloat(product.price || 0),
    })),
    total: cartTotal,
  };

  const html     = buildOrderHTML(data);
  const cleanName  = (form.name  || 'Customer').replace(/\s+/g, '_');
  const cleanPhone = (form.phone || 'NoPhone').replace(/\s+/g, '_');
  await htmlToPDF(html, `SriVeera_Order_${cleanName}_${cleanPhone}.pdf`);
}

/** Called from Admin.jsx — pass the raw order row from Supabase */
export async function downloadAdminOrderPDF(order) {
  let items = [];
  try { items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []) } catch {}

  let state   = 'Tamil Nadu';
  let address = order.address || '';
  if (address.startsWith('[Other State]')) { state = 'Other State'; address = address.replace('[Other State]', '').trim(); }
  else if (address.startsWith('[Tamil Nadu]')) { address = address.replace('[Tamil Nadu]', '').trim(); }

  const total = items.reduce((s, i) => s + parseFloat(i.price || 0) * parseInt(i.quantity || 0), 0);

  const data = {
    name:    order.customer_name,
    phone:   order.phone,
    state,
    address,
    items:   items.map(i => ({ name: i.name, unit: i.unit || '—', qty: i.quantity, price: i.price })),
    total,
  };

  const html     = buildOrderHTML(data);
  const cleanName  = (order.customer_name || 'Customer').replace(/\s+/g, '_');
  const cleanPhone = (order.phone || 'NoPhone').replace(/\s+/g, '_');
  await htmlToPDF(html, `SriVeera_Order_${cleanName}_${cleanPhone}.pdf`);
}
