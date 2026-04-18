import { motion } from 'motion/react';
import { ChevronDown, ChevronRight, MoreHorizontal, FileText } from 'lucide-react';

import iconWorkspace from '../../assets/icons/workspace.svg';
import iconFavorite from '../../assets/icons/favorite.svg';
import iconAgents from '../../assets/icons/agents.svg';
import iconApps from '../../assets/icons/apps.svg';
import iconNotetaker from '../../assets/icons/notetaker.svg';
import iconMore from '../../assets/icons/more.svg';
import iconMondayLogo from '../../assets/icons/monday-logo.svg';
import iconSearch from '../../assets/icons/search.svg';
import iconNotifications from '../../assets/icons/notifications.svg';
import iconInbox from '../../assets/icons/inbox.svg';
import iconInvite from '../../assets/icons/invite.svg';
import iconHelp from '../../assets/icons/help.svg';
import imgAvatar from '../../assets/agent-avatar-1.png';

const ff = 'Figtree, sans-serif';
const activeFilter = 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(1800%) hue-rotate(196deg) brightness(97%) contrast(101%)';

/* Sidekick icon — gradient when active, monochrome gray when inactive */
const SidekickPinwheel = ({ size = 20, active = false }: { size?: number; active?: boolean }) => {
  const c1 = active ? '#FAD239' : '#9A9BB0';
  const c2 = active ? '#6161FF' : '#B0B1C3';
  const c3 = active ? '#FF6B10' : '#A8A9BC';
  const c4 = active ? '#00C875' : '#C0C1D0';
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M8 18C8.5 18.3 9.1 18.4 9.6 18.2C10.2 18.1 10.6 17.8 11 17.3C11.3 16.8 11.5 16.2 11.5 15.7V15.1C11.5 14.7 11.4 14.3 11.4 13.8C11.2 12.2 10.5 10.5 9.3 9.3C8.1 8.1 6.5 7.2 4.9 7.0C4.4 6.9 3.8 6.9 3.3 6.8H2.7C2.1 6.8 1.6 6.9 1.1 7.2C0.6 7.5 0.2 8.0 0.1 8.6C-0.1 9.1 0.0 9.7 0.3 10.2C1.2 12.3 4.2 11.5 5.5 13.0C6.7 14.6 6.4 17.2 8 18Z" fill={c1}/>
      <path d="M10.2 0.3C9.7 0.0 9.1-0.1 8.6 0.1C8.1 0.2 7.6 0.5 7.2 1.0C6.9 1.5 6.8 2.0 6.7 2.6V3.2C6.8 3.6 6.8 4.0 6.8 4.5C7.0 6.1 7.7 7.8 8.9 9.0C10.1 10.2 11.7 11.0 13.3 11.3C13.9 11.4 14.4 11.4 14.9 11.5H15.5C16.1 11.5 16.7 11.4 17.2 11.1C17.6 10.8 18.0 10.3 18.1 9.7C18.3 9.2 18.2 8.6 17.9 8.1C17.0 6.0 14.0 6.8 12.7 5.3C11.5 3.7 11.8 1.1 10.2 0.3Z" fill={c2}/>
      <path d="M18 10.2C18.3 9.7 18.4 9.2 18.2 8.6C18.1 8.1 17.8 7.6 17.3 7.3C16.8 6.9 16.3 6.8 15.7 6.8H15.1C14.7 6.8 14.3 6.8 13.9 6.8C12.2 7.0 10.6 7.7 9.4 8.9C8.1 10.1 7.3 11.7 7.0 13.4C7.0 13.9 6.9 14.5 6.9 15.0V15.6C6.8 16.1 7.0 16.7 7.3 17.2C7.6 17.7 8.1 18.1 8.6 18.2C9.2 18.4 9.7 18.3 10.2 18.0C12.3 17.0 11.5 14.0 13.0 12.8C14.6 11.6 17.2 11.8 18 10.2Z" fill={c3}/>
      <path d="M0.3 8.1C0.0 8.6-0.1 9.1 0.1 9.7C0.2 10.2 0.5 10.7 1.0 11.0C1.5 11.4 2.0 11.5 2.6 11.5H3.2C3.6 11.5 4.0 11.5 4.4 11.5C6.1 11.3 7.7 10.5 8.9 9.4C10.2 8.2 11.0 6.6 11.2 4.9C11.3 4.4 11.4 3.8 11.4 3.3V2.7C11.4 2.1 11.3 1.6 11.0 1.1C10.7 0.6 10.2 0.2 9.7 0.1C9.1-0.1 8.5 0.0 8.0 0.3C6.0 1.2 6.8 4.3 5.3 5.5C3.7 6.7 1.1 6.5 0.3 8.1Z" fill={c4}/>
    </svg>
  );
};

/* Nav items — NO monday logo in the rail, just the nav icons */
interface NavDef { id: string; src?: string; label: string; dividerAfter?: boolean; custom?: boolean }
const NAV_ITEMS: NavDef[] = [
  { id: 'workspace', src: iconWorkspace, label: 'Work\nSpace' },
  { id: 'sidekick', label: 'Sidekick', custom: true },
  { id: 'favorites', src: iconFavorite, label: 'Favorites', dividerAfter: true },
  { id: 'agents', src: iconAgents, label: 'Agents' },
  { id: 'apps', src: iconApps, label: 'Apps' },
  { id: 'notetaker', src: iconNotetaker, label: 'Notetaker' },
];

/* ═══ ICON RAIL ═══ */
interface IconRailProps { animate?: boolean; activeItem?: string; onNavClick?: (id: string) => void }

export function AICentricIconRail({ animate = false, activeItem = 'workspace', onNavClick }: IconRailProps) {
  return (
    <div style={{
      width: 80, display: 'flex', padding: '16px 12px 2px 12px',
      flexDirection: 'column', alignItems: 'center',
      gap: 12, flexShrink: 0, alignSelf: 'stretch',
      background: 'var(--chrome-surface-color)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2 }}>
        {NAV_ITEMS.map((item, i) => {
          const isActive = item.id === activeItem;
          const W = animate ? motion.div : ('div' as any);
          const anim = animate ? { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.04 + i * 0.04, duration: 0.2 } } : {};

          return (
            <W key={item.id} {...anim} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                aria-label={item.label.replace('\n', ' ')}
                onClick={() => onNavClick?.(item.id)}
                style={{
                  width: 40, borderRadius: 8, border: 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: 1,
                  cursor: 'pointer', position: 'relative',
                  padding: '6px 0 4px',
                  background: isActive ? '#DCE9FC' : 'transparent',
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: 20, borderRadius: '0 2px 2px 0',
                    background: '#0073EA',
                  }} />
                )}
                {item.custom ? (
                  <SidekickPinwheel size={18} active={isActive} />
                ) : (
                  <img src={item.src} width={18} height={18} alt="" style={{ filter: isActive ? activeFilter : 'none', opacity: 1 }} />
                )}
                <span style={{
                  fontSize: 9, fontFamily: ff, lineHeight: '11px',
                  color: isActive ? '#0073EA' : '#676879',
                  fontWeight: isActive ? 600 : 400,
                  textAlign: 'center', whiteSpace: 'pre-line',
                }}>
                  {item.label}
                </span>
              </button>
              {item.dividerAfter && <div style={{ width: 24, height: 1, background: '#E7E9EF', margin: '6px 0' }} />}
            </W>
          );
        })}
      </div>

      {/* More — pinned bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          aria-label="More"
          onClick={() => onNavClick?.('more')}
          style={{ width: 36, height: 32, borderRadius: 6, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', padding: 0 }}
        >
          <img src={iconMore} width={18} height={18} alt="" style={{ opacity: 1 }} />
        </button>
        <span style={{ fontSize: 9, fontFamily: ff, color: '#676879', marginTop: 1 }}>More</span>
      </div>
    </div>
  );
}

/* ═══ SECONDARY SIDEBAR ═══ */
interface BoardItem { name: string; active?: boolean; indent?: boolean; color?: string }
interface SidebarProps { agents?: { name: string; emoji: string; color: string }[]; boards?: BoardItem[]; workspaceName?: string; animate?: boolean }

export function AICentricSidebar({ agents = [], boards = [], workspaceName = 'Novella', animate = false }: SidebarProps) {
  return (
    <div style={{ width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 24, alignSelf: 'stretch', borderRadius: '16px 0 0 0', background: '#fff', overflow: 'hidden', fontFamily: ff }}>
      {/* Header */}
      <div style={{ padding: '0 12px', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workspace</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <ChevronRight size={12} color="#676879" style={{ cursor: 'pointer', transform: 'rotate(180deg)' }} />
            <MoreHorizontal size={14} color="#676879" style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', background: '#F5F6F8', borderRadius: 4, cursor: 'pointer' }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>{workspaceName[0]}</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#323338', flex: 1 }}>{workspaceName}</span>
          <ChevronDown size={12} color="#676879" />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 6px' }}>
        {agents.length > 0 && (
          <div style={{ marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginBottom: 2 }}>
              <ChevronDown size={10} color="#676879" />
              <img src={iconAgents} width={13} height={13} alt="" style={{ opacity: 1 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>Agents</span>
            </div>
            {agents.map((a, i) => {
              const W = animate ? motion.div : ('div' as any);
              const anim = animate ? { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + i * 0.06 } } : {};
              return (<W key={a.name} {...anim}><div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px 4px 22px', borderRadius: 4, cursor: 'pointer' }}><span style={{ fontSize: 13, lineHeight: 1 }}>{a.emoji}</span><span style={{ fontSize: 12, color: '#323338', flex: 1 }}>{a.name}</span><span style={{ fontSize: 10, color: a.color }}>Ready</span></div></W>);
            })}
          </div>
        )}

        {boards.length > 0 && (
          <div style={{ borderTop: '1px solid #E7E9EF', paddingTop: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginBottom: 2 }}>
              <ChevronDown size={10} color="#676879" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>HR Department</span>
            </div>
            {boards.map((b) => (
              <div key={b.name} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: `3px 6px 3px ${b.indent ? 32 : 22}px`, borderRadius: 4, marginBottom: 1, cursor: 'pointer',
                background: b.active ? '#D0E4FF' : 'transparent',
              }}>
                {b.color && !b.indent && <div style={{ width: 6, height: 6, borderRadius: '50%', background: b.color, flexShrink: 0 }} />}
                {b.indent && <FileText size={12} color={b.active ? '#0073EA' : '#676879'} />}
                <span style={{ fontSize: 12, color: b.active ? '#0073EA' : '#323338', fontWeight: b.active ? 600 : 400 }}>{b.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ TOP BAR ═══ */
export function AICentricTopBar({ userName, userColor = '#9D50DD' }: { userName?: string; userColor?: string }) {
  return (
    <div style={{ height: 40, background: 'var(--chrome-surface-color)', flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
      {/* Left — monday colored logo */}
      <div style={{ width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img src={iconMondayLogo} width={24} height={24} alt="monday" />
      </div>

      {/* Center — search bar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', width: 400, height: 32, padding: '4px 4px 4px 16px', alignItems: 'center', gap: 8, borderRadius: 100, background: 'var(--primary-background-hover-color)' }}>
          <img src={iconSearch} width={14} height={14} alt="" style={{ opacity: 1 }} />
          <span style={{ fontSize: 13, color: '#676879', fontFamily: ff }}>Search or ask anything...</span>
        </div>
      </div>

      {/* Right — icons (thinner stroke, 16px) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Notification bell with badge dot */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img src={iconNotifications} width={16} height={16} alt="" style={{ opacity: 1 }} />
          <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderRadius: '50%', background: '#E2445C', border: '1.5px solid #fff' }} />
        </div>
        {/* Inbox with badge dot */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img src={iconInbox} width={16} height={16} alt="" style={{ opacity: 1 }} />
          <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderRadius: '50%', background: '#E2445C', border: '1.5px solid #fff' }} />
        </div>
        <img src={iconInvite} width={16} height={16} alt="" style={{ opacity: 0.5, cursor: 'pointer' }} />
        <img src={iconHelp} width={16} height={16} alt="" style={{ opacity: 0.5, cursor: 'pointer' }} />
        {/* Tighter group: grid + avatar pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 2 }}>
          {/* 3x3 grid */}
          <div style={{ width: 16, height: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 3px)', gap: '2px', alignContent: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {[...Array(9)].map((_, i) => <div key={i} style={{ width: 3, height: 3, borderRadius: 0.5, background: '#676879', opacity: 1 }} />)}
          </div>
          {/* User avatar — plain circle, no border/ring */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden' }}>
              <img src={imgAvatar} width={28} height={28} style={{ objectFit: 'cover', display: 'block' }} alt="" />
            </div>
            {/* Green online status dot */}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: '#00CA72', border: '2px solid #fff' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
