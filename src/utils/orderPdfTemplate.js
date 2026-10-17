/**
 * Generates the HTML string for the order enquiry PDF.
 * Layout matches the Sri Veera Fireworks reference estimate format.
 */

function numberToWords(amount) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convert(n) {
    if (n === 0) return '';
    if (n < 20) return ones[n] + ' ';
    if (n < 100) return tens[Math.floor(n / 10)] + ' ' + ones[n % 10] + ' ';
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred ' + convert(n % 100);
    if (n < 100000) return convert(Math.floor(n / 1000)) + 'Thousand ' + convert(n % 1000);
    if (n < 10000000) return convert(Math.floor(n / 100000)) + 'Lakh ' + convert(n % 100000);
    return convert(Math.floor(n / 10000000)) + 'Crore ' + convert(n % 10000000);
  }

  return convert(Math.round(parseFloat(amount || 0))).trim() || 'Zero';
}

export function buildOrderHTML({ name, phone, state, address, items, total, estimateNo }) {
  const fmt  = (n) => parseFloat(n || 0).toFixed(2);
  const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
  const estNo = estimateNo || String(Date.now()).slice(-4);
  const words = numberToWords(total);

  const rows = items.map((item, i) => {
    const sub = parseFloat(item.price || 0) * parseInt(item.qty || 0);
    return `
      <tr>
        <td class="tc">${i + 1}</td>
        <td class="tc">${item.code || ''}</td>
        <td class="tl nm">${item.name || '—'}</td>
        <td class="tr">${fmt(item.price)}</td>
        <td class="tc">0%</td>
        <td class="tc">${item.qty}</td>
        <td class="tr">${fmt(item.price)}</td>
        <td class="tr">${fmt(sub)}</td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; background: #fff; }
  .wrap { width: 560px; background: #fff; border: 1.5px solid #000; }

  /* Header */
  .hdr { padding: 6px 12px 5px; border-bottom: 1.5px solid #000; }
  .gstin { text-align: right; font-size: 7px; font-weight: 700; letter-spacing: 0.3px; }
  .brand { text-align: center; font-size: 20px; font-weight: 900; font-style: italic; letter-spacing: 1px; line-height: 1.1; }
  .brand-sub { text-align: center; font-size: 8px; font-style: italic; margin-top: 1px; letter-spacing: 0.3px; }
  .hdr-row { display: flex; justify-content: space-between; align-items: center; margin-top: 5px; }
  .hdr-left { font-size: 7.5px; }
  .hdr-left div { margin-bottom: 1px; }
  .hdr-phones { font-size: 9px; font-weight: 800; text-align: right; }
  .hdr-phones div { margin-bottom: 1px; }

  /* Customer info */
  .cust { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1.5px solid #000; padding: 5px 10px; font-size: 8.5px; }
  .cust-right { text-align: right; }
  .cust div { margin-bottom: 2px; }

  /* Table */
  table { width: 100%; border-collapse: collapse; }
  th { border: 1px solid #000; padding: 4px 4px; font-size: 8.5px; font-weight: 700; text-align: center; }
  td { border: 1px solid #000; padding: 2.5px 4px; font-size: 8.5px; color: #000; }
  .tc { text-align: center; }
  .tl { text-align: left; }
  .tr { text-align: right; }
  .nm { font-weight: 600; }

  /* Subtotal row */
  tr.subtot td { font-weight: 700; border-top: 1.5px solid #000; }

  /* Summary */
  .summary { border-top: 1.5px solid #000; }
  .sum-items { display: flex; justify-content: space-between; padding: 4px 10px; font-size: 8.5px; font-weight: 700; border-bottom: 1px solid #ccc; }
  .bill-total { display: flex; justify-content: flex-end; gap: 30px; padding: 4px 10px; font-size: 9px; font-weight: 700; border-bottom: 1px solid #000; }
  .rupees { padding: 5px 10px; font-size: 8.5px; font-weight: 700; }

  /* Footer */
  .footer { border-top: 1px solid #000; padding: 4px 10px; display: flex; justify-content: space-between; font-size: 7.5px; color: #444; }
</style>
</head>
<body>
<div class="wrap">

  <div class="hdr">
    <div class="gstin">GSTIN:33GWUPS8883M1Z1</div>
    <div class="brand">SRI VEERA FIREWORKS. SIVAKASI.</div>
    <div class="brand-sub">The Fireworks Manufacturer &amp; Factory Outlet Shop</div>
    <div class="hdr-row">
      <div class="hdr-left">
        <div>&#127760; www.sriveerafireworks.com</div>
        <div>&#128100; Sri Veera Fireworks Sivakasi</div>
      </div>
      <div class="hdr-phones">
        <div>&#128222; 83000 577 11</div>
        <div>&#128222; 83000 577 22</div>
        <div>&#128222; 80000 577 33</div>
      </div>
    </div>
  </div>

  <div class="cust">
    <div>
      <div><strong>Name &nbsp;&nbsp;&nbsp;:</strong> ${name || '—'}</div>
      <div><strong>Address :</strong> ${address || '—'}</div>
      <div><strong>Contact &nbsp;:</strong> ${phone || '—'}</div>
    </div>
    <div class="cust-right">
      <div><strong>Estimate No : ${estNo}</strong></div>
      <div><strong>Date : ${date}</strong></div>
      <div><strong>State : ${state || '—'}</strong></div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:26px">SIno</th>
        <th style="width:32px">Code</th>
        <th>Cracker name</th>
        <th style="width:50px">Actual</th>
        <th style="width:36px">Dis %</th>
        <th style="width:26px">Qty</th>
        <th style="width:50px">Rate</th>
        <th style="width:56px">Total</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr class="subtot">
        <td colspan="5"></td>
        <td class="tc">${items.length}</td>
        <td></td>
        <td class="tr">${fmt(total)}</td>
      </tr>
    </tbody>
  </table>

  <div class="summary">
    <div class="sum-items">
      <span>No Of Items : ${items.length}</span>
      <span>${items.length} &nbsp;&nbsp;&nbsp;&nbsp; ${fmt(total)}</span>
    </div>
    <div class="bill-total">
      <span>Bill total</span>
      <span>${fmt(total)}</span>
    </div>
    <div class="rupees">Rupees : ${words} Only</div>
  </div>

  <div class="footer">
    <span>Thank you for business with us!</span>
    <span>www.sriveerafireworks.com</span>
  </div>

</div>
</body>
</html>`;
}
