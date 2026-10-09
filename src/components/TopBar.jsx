import { useShop } from '../context/ShopContext'

export default function TopBar() {
  const { siteSettings } = useShop()

  return (
    <div style={{ background: '#222', color: '#ccc', fontSize: 15, padding: '10px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

        {/* Left — ticker */}
        <div className="ticker-wrap hidden xl:block" style={{ overflow: 'hidden', flex: 1, maxWidth: '60%' }}>
          <span className="ticker-text">
            {siteSettings.announcement ||
              <>Minimum Shopping For Tamil Nadu{' '}
                <span className="highlighter font-bold">₹{parseFloat(siteSettings.min_order_tn || 3000).toLocaleString('en-IN')}/-</span>
                {' '}Other State Above{' '}
                <span className="highlighter font-bold">₹{parseFloat(siteSettings.min_order_other || 5000).toLocaleString('en-IN')}/-</span>
                {' '}<span className="font-bold">* Freight Extra</span>
              </>
            }
          </span>
        </div>

        {/* Right — notice */}
        <div style={{ flexShrink: 0, color: '#ccc', fontSize: 14 }}>
          This site for displaying Products in Gallery and Generate Enquiry.{' '}
          <strong style={{ color: '#fff' }}>Not For Sale</strong>
        </div>

      </div>
    </div>
  )
}
