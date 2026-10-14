/**
 * Generates the HTML string for the order enquiry PDF.
 * Designed for A5 (560px wide). Font sizes and padding are compact
 * so that even large orders scale gracefully to a single A5 page.
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
  const INR  = (n) => `Rs.\u00a0${parseFloat(n || 0).toLocaleString('en-IN')}`;
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const rows = items.map((item, i) => {
    const sub = parseFloat(item.price || 0) * parseInt(item.qty || 0);
    const bg  = i % 2 === 0 ? '#ffffff' : '#f5f5f5';
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
  .wrap { width: 560px; background: #fff; }

  /* ── Header ── */
  .hdr { background: #fff; padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000; }
  .hdr-l .brand { font-size: 15px; font-weight: 900; color: #000; letter-spacing: 0.4px; }
  .hdr-l .tagline { font-size: 9px; font-weight: 700; color: #333; margin-top: 2px; letter-spacing: 0.5px; }
  .hdr-l .addr  { font-size: 8px; color: #555; margin-top: 2px; }
  .hdr-r        { text-align: right; }
  .hdr-r .phone { font-size: 11px; font-weight: 800; color: #000; }
  .hdr-r .lbl   { font-size: 8px; color: #555; margin-top: 2px; }

  /* ── Body ── */
  .body { padding: 10px 14px; }
  .title { font-size: 11px; font-weight: 900; color: #000; border-bottom: 2px solid #000; padding-bottom: 4px; margin-bottom: 9px; }

  /* ── Customer box ── */
  .cust { background: #f5f5f5; border: 1.5px solid #ccc; border-radius: 6px; padding: 8px 10px; margin-bottom: 9px; }
  .cust-lbl { font-size: 7.5px; font-weight: 900; color: #000; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 5px; }
  .cust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 14px; font-size: 9px; color: #000; }
  .cust-grid strong { font-weight: 700; }
  .cust-addr { font-size: 9px; color: #000; margin-top: 4px; }
  .cust-addr strong { font-weight: 700; }

  /* ── Table ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 9px; }
  thead tr { background: #000; }
  th { padding: 5px 6px; color: #fff; font-size: 8.5px; font-weight: 800; }
  td { padding: 3.5px 6px; font-size: 9px; color: #000; border-bottom: 1px solid #ddd; }
  .tc { text-align: center; }
  .tl { text-align: left; }
  .tr { text-align: right; }
  .nm { font-weight: 700; }
  .un { color: #555; font-size: 8px; }
  .qt { font-weight: 800; }
  .sb { font-weight: 800; color: #000; }

  /* column widths */
  .col-no   { width: 24px; }
  .col-name { }
  .col-unit { width: 90px; }
  .col-qty  { width: 30px; }
  .col-price{ width: 62px; }
  .col-sub  { width: 70px; }

  /* ── Total ── */
  .total-wrap { display: flex; justify-content: flex-end; margin-bottom: 9px; }
  .total-box .lbl { font-size: 11px; font-weight: 800; color: #000; }
  .total-box .val { font-size: 13px; font-weight: 900; color: #000; margin-left: 10px; }

  /* ── Footer ── */
  .ftr { border-top: 1px solid #ccc; padding-top: 5px; display: flex; justify-content: space-between; font-size: 7.5px; color: #555; }
  .ftr strong { font-weight: 700; }
</style>
</head>
<body>
<div class="wrap">

  <div class="hdr">
    <div class="hdr-l">
      <div class="brand">SRI VEERA FIREWORKS</div>
      <div class="tagline">Treats on Fire</div>
      <div class="addr">1/204-6, NH-07, Chatram Road, Vachakkarapatti, RR Nagar, Virudhunagar District - 626204</div>
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

    <div class="ftr">
      <strong>https://www.sriveerafireworks.com</strong>
      <span>Generated: ${new Date().toLocaleString('en-IN')}</span>
    </div>

  </div>
</div>
</body>
</html>`;
}
