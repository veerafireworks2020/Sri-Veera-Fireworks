import { useShop } from '../context/ShopContext'
import LOGO from '../assets/websitelogo.jpeg'

export default function TopBar() {
  const { siteSettings } = useShop()
  const announcement = siteSettings.announcement

  const marqueeContent = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
      <img src={LOGO} alt="Sri Veera Fireworks" style={{ height: 22, width: 'auto', objectFit: 'contain', verticalAlign: 'middle', borderRadius: 3 }} />
      {announcement && (
        <span style={{ color: '#facc15', fontWeight: 700 }}>{announcement}</span>
      )}
      <span style={{ color: '#bbb' }}>
        This site for displaying Products in Gallery and Generate Enquiry.&nbsp;
        <strong style={{ color: '#fff' }}>Not For Sale</strong>
      </span>
      <span style={{ color: '#555', margin: '0 24px' }}>•</span>
    </span>
  )

  return (
    <div style={{ background: '#222', color: '#ccc', fontSize: 12, padding: '6px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        <div style={{ display: 'inline-flex', animation: 'marquee-scroll 30s linear infinite' }}>
          {marqueeContent}{marqueeContent}{marqueeContent}
        </div>
      </div>
    </div>
  )
}
