import { ChevronDown, ChevronRight, MoreHorizontal, Star } from 'lucide-react';
import { WorkSpacePage } from './WorkSpacePage';

const ff = 'Figtree, sans-serif';

const FAVORITES = [
  { name: 'Recruitment Pipeline', color: '#579BFC' },
  { name: 'Employee Onboarding', color: '#00C875' },
  { name: 'Q2 Hiring Strategy', color: '#FDAB3D' },
  { name: 'Benefits & Compensation', color: '#784BD1' },
  { name: 'Team Directory', color: '#E2445C' },
];

export function FavoritesPage() {
  return (
    <>
      {/* Sidebar */}
      <div style={{ width: 230, height: '100%', background: '#fff', borderRight: '1px solid var(--layout-border-color)', padding: '10px 0', display: 'flex', flexDirection: 'column', fontFamily: ff, flexShrink: 0 }}>
        <div style={{ padding: '0 14px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Favorites</span>
            <ChevronRight size={14} color="var(--secondary-text-color)" style={{ cursor: 'pointer', transform: 'rotate(180deg)' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
          {FAVORITES.map((fav, i) => (
            <div key={fav.name} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px', borderRadius: 6, cursor: 'pointer',
              background: i === 0 ? 'var(--primary-surface-color)' : 'transparent',
              marginBottom: 2,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: fav.color, flexShrink: 0 }} />
              <span style={{
                fontSize: 13,
                color: i === 0 ? 'var(--primary-color)' : 'var(--primary-text-color)',
                fontWeight: i === 0 ? 600 : 400,
              }}>{fav.name}</span>
            </div>
          ))}

          {/* Recently visited */}
          <div style={{ borderTop: '1px solid var(--layout-border-color)', marginTop: 12, paddingTop: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.4px', padding: '0 8px', display: 'block', marginBottom: 6 }}>Recently</span>
            {['Interview tracker', 'Candidate feedback', 'Team Directory'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 4, cursor: 'pointer' }}>
                <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Bottom message */}
          <div style={{ marginTop: 'auto', padding: '16px 8px', borderTop: '1px solid var(--layout-border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Star size={14} color="var(--secondary-text-color)" style={{ marginTop: 2 }} />
              <div>
                <span style={{ fontSize: 11, color: 'var(--secondary-text-color)', lineHeight: '16px', display: 'block' }}>
                  No favorited yet? Hit the star on any board you want to access fast.
                </span>
                <span style={{ fontSize: 11, color: 'var(--primary-color)', cursor: 'pointer', marginTop: 4, display: 'block' }}>Browse your boards</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content — reuse the board from WorkSpacePage but without its sidebar */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', boxShadow: '0 4px 32px rgba(0,19,85,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Simplified board header */}
        <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--layout-border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 600, fontFamily: ff }}>Recruitment Pipeline</span>
            <ChevronDown size={14} color="var(--secondary-text-color)" />
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14, color: 'var(--secondary-text-color)' }}>Board content loads here</span>
        </div>
      </div>
    </>
  );
}
