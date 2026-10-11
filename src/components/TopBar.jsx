import { useShop } from '../context/ShopContext'

export default function TopBar() {
  const { siteSettings } = useShop()

  const labelTN    = siteSettings.state_label_tn
  const labelOther = siteSettings.state_label_other
  const minTN      = siteSettings.min_order_tn
  const minOther   = siteSettings.min_order_other

  const minOrderMsg = labelTN && labelOther && minTN && minOther
    ? `Minimum Shopping For ${labelTN} ₹${Number(minTN).toLocaleString('en-IN')}/-  |  ${labelOther} Above ₹${Number(minOther).toLocaleString('en-IN')}/- * Freight Extra`
    : null

  return (
    <div style={{ background: '#222', color: '#ccc', fontSize: 12, padding: '7px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }} className="xl:flex-row xl:justify-between">

        {/* Min order from DB */}
        {minOrderMsg && (
          <div style={{ textAlign: 'center', lineHeight: 1.5, color: '#facc15', fontWeight: 600 }}>
            {minOrderMsg}
          </div>
        )}

        {/* Extra announcement from DB */}
        {siteSettings.announcement && (
          <div style={{ textAlign: 'center', lineHeight: 1.5 }}>
            {siteSettings.announcement}
          </div>
        )}

        {/* Notice */}
        <div style={{ color: '#bbb', textAlign: 'center', lineHeight: 1.5 }}>
          This site for displaying Products in Gallery and Generate Enquiry.{' '}
          <strong style={{ color: '#fff' }}>Not For Sale</strong>
        </div>

      </div>
    </div>
  )
}
