import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { buildOrderHTML } from './orderPdfTemplate';

/**
 * Converts HTML string → canvas → JPEG → jsPDF and triggers download.
 * scale 1.4 + JPEG 0.78 keeps file size under ~300 KB.
 */
async function htmlToPDF(htmlString, fileName) {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:-9999px;top:0;z-index:-1;background:#fff;';
  container.innerHTML = htmlString;
  document.body.appendChild(container);
  const el = container.querySelector('.wrap') || container.firstElementChild;

  await new Promise(r => setTimeout(r, 300));

  const canvas = await html2canvas(el, {
    scale: 1.4,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 780,
  });

  document.body.removeChild(container);

  const imgWidth   = 210;
  const pageHeight = 297;
  const imgHeight  = (canvas.height * imgWidth) / canvas.width;
  const imgData    = canvas.toDataURL('image/jpeg', 0.78);

  const pdf = new jsPDF('p', 'mm', 'a4');
  let heightLeft = imgHeight;
  let position   = 0;

  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
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
