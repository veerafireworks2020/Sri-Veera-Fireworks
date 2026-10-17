import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { buildPageHTML, ITEMS_PER_PAGE } from './orderPdfTemplate';

async function renderToCanvas(htmlString) {
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
  return canvas;
}

async function buildPDF(data, fileName) {
  const { name, phone, state, address, items, total, estimateNo } = data;

  // Split items into pages
  const chunks = [];
  for (let i = 0; i < items.length; i += ITEMS_PER_PAGE) {
    chunks.push(items.slice(i, i + ITEMS_PER_PAGE));
  }
  if (chunks.length === 0) chunks.push([]);

  const pdf = new jsPDF('p', 'mm', 'a5');
  const pageW = 148;
  const pageH = 210;

  for (let idx = 0; idx < chunks.length; idx++) {
    const pageItems   = chunks[idx];
    const isLastPage  = idx === chunks.length - 1;
    const startIdx    = idx * ITEMS_PER_PAGE;

    const html = buildPageHTML({
      name, phone, state, address,
      pageItems, startIdx,
      pageNum: idx + 1,
      isLastPage,
      allTotal: total,
      allCount: items.length,
      estimateNo,
    });

    const canvas  = await renderToCanvas(html);
    const imgData = canvas.toDataURL('image/jpeg', 0.85);

    if (idx > 0) {
      pdf.addPage();
      pdf.setFillColor(255, 255, 255);
    }

    // Force exactly A5 size per page
    pdf.addImage(imgData, 'JPEG', 0, 0, pageW, pageH);
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
      code:  product.product_code || '',
      name:  product.name,
      unit:  product.order_unit || '',
      qty,
      price: parseFloat(product.price || 0),
    })),
    total: cartTotal,
  };

  const cleanName  = (form.name  || 'Customer').replace(/\s+/g, '_');
  const cleanPhone = (form.phone || 'NoPhone').replace(/\s+/g, '_');
  await buildPDF(data, `SriVeera_Order_${cleanName}_${cleanPhone}.pdf`);
}

/** Called from Admin.jsx — pass the raw order row from Supabase */
export async function downloadAdminOrderPDF(order) {
  let items = [];
  try { items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []); } catch {}

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
    items:   items.map(i => ({
      code:  i.product_code || '',
      name:  i.name,
      unit:  i.unit || '',
      qty:   i.quantity,
      price: i.price,
    })),
    total,
  };

  const cleanName  = (order.customer_name || 'Customer').replace(/\s+/g, '_');
  const cleanPhone = (order.phone || 'NoPhone').replace(/\s+/g, '_');
  await buildPDF(data, `SriVeera_Order_${cleanName}_${cleanPhone}.pdf`);
}
