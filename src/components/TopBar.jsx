import { useShop } from '../context/ShopContext'

export default function TopBar() {
  const { siteSettings } = useShop()

  return (
    <div style={{ background: '#222', color: '#ccc', fontSize: 12, padding: '7px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }} className="xl:flex-row xl:justify-between">

        {/* Announcement from DB only */}
        {siteSettings.announcement && (
          <div style={{ textAlign: 'center', lineHeight: 1.5 }}>
            {siteSettings.announcement}
          </div>
        )}

        {/* Notice — all screens */}
        <div style={{ color: '#bbb', textAlign: 'center', lineHeight: 1.5 }}>
          This site for displaying Products in Gallery and Generate Enquiry.{' '}
          <strong style={{ color: '#fff' }}>Not For Sale</strong>
        </div>

      </div>
    </div>
  )
}
