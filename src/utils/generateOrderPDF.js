import { buildPrintHTML } from './orderPdfTemplate';

/**
 * Opens the order HTML in a hidden iframe and triggers the browser's
 * native print dialog. User selects "Save as PDF" → perfect A5 output
 * with no screenshot scaling artifacts.
 */
function printViaIframe(html) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;border:0;';
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    iframe.contentWindow.onafterprint = () => {
      document.body.removeChild(iframe);
      resolve();
    };

    // Small delay so the browser fully renders before printing
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }, 600);
  });
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
      qty,
      price: parseFloat(product.price || 0),
    })),
    total: cartTotal,
  };

  const html = buildPrintHTML(data);
  await printViaIframe(html);
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
      qty:   i.quantity,
      price: i.price,
    })),
    total,
  };

  const html = buildPrintHTML(data);
  await printViaIframe(html);
}
