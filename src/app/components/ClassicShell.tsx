import type { ReactNode } from 'react';
import { Search, Bell, HelpCircle, LayoutGrid } from 'lucide-react';
import { PERSONA, SIDEBAR_BOARDS } from '../data';

const ff = 'Figtree, sans-serif';

function Avatar({ initials, color, size = 28 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: ff, fontSize: size * 0.4, fontWeight: 700, color: '#fff',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

const MondayLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="17" r="3" fill="#FB275D" />
      <circle cx="12" cy="17" r="3" fill="#FFCC00" />
      <circle cx="19" cy="17" r="3" fill="#00CA72" />
      <ellipse cx="5" cy="7" rx="2.5" ry="5" fill="#FB275D" transform="rotate(-10 5 7)" />
      <ellipse cx="12" cy="7" rx="2.5" ry="5" fill="#FFCC00" />
      <ellipse cx="19" cy="7" rx="2.5" ry="5" fill="#00CA72" transform="rotate(10 19 7)" />
    </svg>
    <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 16, color: 'var(--primary-text-color)' }}>
      monday
    </span>
    <span style={{ fontFamily: ff, fontSize: 12, color: 'var(--secondary-text-color)', marginLeft: -2 }}>
      work management
    </span>
  </div>
);

interface ClassicShellProps {
  children: ReactNode;
  banner?: ReactNode;
}

export function ClassicShell({ children, banner }: ClassicShellProps) {
  return (
    <div style={{
      width: '100vw', height: '100vh', background: '#F6F7FB',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: ff,
    }}>
      {/* Top bar */}
      <div style={{
        height: 48, flexShrink: 0, background: '#292F4C',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="16" r="2.5" fill="#FB275D" />
            <circle cx="12" cy="16" r="2.5" fill="#FFCC00" />
            <circle cx="19" cy="16" r="2.5" fill="#00CA72" />
            <ellipse cx="5" cy="8" rx="2" ry="4.5" fill="#FB275D" transform="rotate(-8 5 8)" />
            <ellipse cx="12" cy="8" rx="2" ry="4.5" fill="#FFCC00" />
            <ellipse cx="19" cy="8" rx="2" ry="4.5" fill="#00CA72" transform="rotate(8 19 8)" />
          </svg>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.1)', borderRadius: 6,
          padding: '6px 12px', width: 400,
        }}>
          <Search size={14} color="rgba(255,255,255,0.5)" />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Search everything</span>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Bell size={18} color="rgba(255,255,255,0.7)" style={{ cursor: 'pointer' }} />
          <HelpCircle size={18} color="rgba(255,255,255,0.7)" style={{ cursor: 'pointer' }} />
          <LayoutGrid size={18} color="rgba(255,255,255,0.7)" style={{ cursor: 'pointer' }} />
          <Avatar initials={PERSONA.teamMembers[0].initials} color={PERSONA.teamMembers[0].color} size={30} />
        </div>
      </div>

      {/* Banner slot */}
      {banner}

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Classic sidebar */}
        <div style={{
          width: 240, background: '#fff',
          borderRight: '1px solid var(--layout-border-color)',
          display: 'flex', flexDirection: 'column',
          padding: '16px 0', flexShrink: 0,
        }}>
          {/* Workspace */}
          <div style={{ padding: '0 16px 12px', borderBottom: '1px solid var(--layout-border-color)', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6, background: '#7B68EE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: '#fff',
              }}>
                N
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)' }}>
                {PERSONA.company}
              </span>
            </div>
          </div>

          {/* Favorites */}
          <div style={{ padding: '0 8px' }}>
            <div style={{ padding: '4px 8px', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Favorites
              </span>
            </div>

            {SIDEBAR_BOARDS.map((board) => (
              <div
                key={board.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 8px', borderRadius: 4,
                  background: board.active ? 'var(--primary-surface-color)' : 'transparent',
                  cursor: 'pointer', marginBottom: 2,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={board.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} strokeWidth="2">
                  {board.icon === 'board' ? (
                    <>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="9" x2="9" y2="21" />
                    </>
                  ) : (
                    <>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </>
                  )}
                </svg>
                <span style={{
                  fontSize: 14,
                  color: board.active ? 'var(--primary-color)' : 'var(--primary-text-color)',
                  fontWeight: board.active ? 600 : 400,
                }}>
                  {board.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{
          flex: 1, overflow: 'auto', background: '#fff',
          display: 'flex', flexDirection: 'column',
        }}>
          {children}
        </div>
      </div>

      <style>{`::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
