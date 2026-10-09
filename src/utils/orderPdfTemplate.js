/**
 * Generates the HTML string for the order enquiry PDF.
 * Accepts a normalised data object — same shape for both cart and admin.
 *
 * @param {object} data
 *   name      {string}
 *   phone     {string}
 *   state     {string}  e.g. "Tamil Nadu" | "Other State"
 *   address   {string}
 *   items     {Array<{ name, unit, qty, price }>}
 *   total     {number}
 */
export function buildOrderHTML({ name, phone, state, address, items, total }) {
  const INR = (n) => `Rs.\u00a0${parseFloat(n || 0).toLocaleString('en-IN')}`;
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const rows = items.map((item, i) => {
    const sub = parseFloat(item.price || 0) * parseInt(item.qty || 0);
    const bg  = i % 2 === 0 ? '#ffffff' : '#fffbf5';
    return `
      <tr style="background:${bg}">
        <td class="tc">${i + 1}</td>
        <td class="tl nm">${item.name || '—'}</td>
        <td class="tl un">${item.unit || '—'}</td>
        <td class="tc qt">${item.qty}</td>
        <td class="tr pr">${INR(item.price)}</td>
        <td class="tr sb">${INR(sub)}</td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; background: #fff; }
  .wrap { width: 780px; background: #fff; }

  /* ── Header ── */
  .hdr { background: #e87316; padding: 20px 26px; display: flex; justify-content: space-between; align-items: center; }
  .hdr-l .brand { font-size: 22px; font-weight: 900; color: #fff; letter-spacing: 0.5px; }
  .hdr-l .addr  { font-size: 11px; color: rgba(255,255,255,.88); margin-top: 3px; }
  .hdr-r        { text-align: right; }
  .hdr-r .phone { font-size: 14px; font-weight: 800; color: #fff; }
  .hdr-r .lbl   { font-size: 11px; color: rgba(255,255,255,.88); margin-top: 3px; }

  /* ── Body ── */
  .body { padding: 22px 26px; }
  .title { font-size: 16px; font-weight: 900; color: #0f172a; border-bottom: 2.5px solid #e87316; padding-bottom: 7px; margin-bottom: 16px; }

  /* ── Customer box ── */
  .cust { background: #fffbf5; border: 1.5px solid #f5d87a; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px; }
  .cust-lbl { font-size: 9.5px; font-weight: 900; color: #b45309; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 9px; }
  .cust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 20px; font-size: 12.5px; color: #0f172a; }
  .cust-grid strong { font-weight: 700; }
  .cust-addr { font-size: 12.5px; color: #0f172a; margin-top: 6px; }
  .cust-addr strong { font-weight: 700; }

  /* ── Table ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
  thead tr { background: #1a1a1a; }
  th { padding: 9px 10px; color: #fff; font-size: 11.5px; font-weight: 800; }
  td { padding: 8px 10px; font-size: 12.5px; color: #0f172a; border-bottom: 1px solid #f1e8d8; }
  .tc { text-align: center; }
  .tl { text-align: left; }
  .tr { text-align: right; }
  .nm { font-weight: 700; }
  .un { color: #555; font-size: 11.5px; }
  .qt { font-weight: 800; }
  .sb { font-weight: 800; color: #e87316; }

  /* column widths */
  .col-no   { width: 36px; }
  .col-name { }
  .col-unit { width: 130px; }
  .col-qty  { width: 44px; }
  .col-price{ width: 90px; }
  .col-sub  { width: 100px; }

  /* ── Total ── */
  .total-wrap { display: flex; justify-content: flex-end; margin-bottom: 18px; }
  .total-box  { background: #e87316; border-radius: 8px; padding: 11px 22px; display: flex; gap: 24px; align-items: center; }
  .total-box .lbl { font-size: 14px; font-weight: 800; color: #fff; }
  .total-box .val { font-size: 17px; font-weight: 900; color: #fff; }

  /* ── Disclaimer ── */
  .disc { background: #fff8f0; border: 1px solid #fed7aa; border-radius: 6px; padding: 9px 12px; margin-bottom: 14px; font-size: 10px; color: #92400e; line-height: 1.6; }

  /* ── Footer ── */
  .ftr { border-top: 1.5px solid #e2e8f0; padding-top: 9px; display: flex; justify-content: space-between; font-size: 10.5px; color: #64748b; }
  .ftr strong { font-weight: 700; }
</style>
</head>
<body>
<div class="wrap">

  <div class="hdr">
    <div class="hdr-l">
      <div class="brand">SRI VEERA FIREWORKS</div>
      <div class="addr">NH-07, Vachakkarapatti RR Nagar, Virudhunagar District, Tamil Nadu</div>
    </div>
    <div class="hdr-r">
      <div class="phone">83000 57711 / 83000 57722</div>
      <div class="lbl">Order Enquiry Sheet</div>
    </div>
  </div>

  <div class="body">

    <div class="title">ORDER ENQUIRY DETAILS</div>

    <div class="cust">
      <div class="cust-lbl">Customer Information</div>
      <div class="cust-grid">
        <div><strong>Name:</strong> ${name || '—'}</div>
        <div><strong>Date:</strong> ${date}</div>
        <div><strong>Phone:</strong> ${phone || '—'}</div>
        <div><strong>State:</strong> ${state || '—'}</div>
      </div>
      ${address ? `<div class="cust-addr"><strong>Address:</strong> ${address}</div>` : ''}
    </div>

    <table>
      <colgroup>
        <col class="col-no"/>
        <col class="col-name"/>
        <col class="col-unit"/>
        <col class="col-qty"/>
        <col class="col-price"/>
        <col class="col-sub"/>
      </colgroup>
      <thead>
        <tr>
          <th class="tc">#</th>
          <th class="tl">Product Name</th>
          <th class="tl">Unit</th>
          <th class="tc">Qty</th>
          <th class="tr">Price</th>
          <th class="tr">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <div class="total-wrap">
      <div class="total-box">
        <span class="lbl">Total Payable:</span>
        <span class="val">${INR(total)}</span>
      </div>
    </div>

    <div class="disc">
      As per 2018 Supreme Court order, online sale of firecrackers are not permitted. This is an order enquiry sheet only.
      Our team will confirm your order via WhatsApp or phone call within 24 hrs.
    </div>

    <div class="ftr">
      <strong>Sri Veera Fireworks — sriveerafireworks.com</strong>
      <span>Generated: ${new Date().toLocaleString('en-IN')}</span>
    </div>

  </div>
</div>
</body>
</html>`;
}
