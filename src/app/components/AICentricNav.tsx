import { motion } from 'motion/react';
import { ChevronDown, ChevronRight, MoreHorizontal, Bot, FileText } from 'lucide-react';

import iconWorkspace from '../../assets/icons/workspace.svg';
import iconFavorite from '../../assets/icons/favorite.svg';
import iconAgents from '../../assets/icons/agents.svg';
import iconApps from '../../assets/icons/apps.svg';
import iconNotetaker from '../../assets/icons/notetaker.svg';
import iconMore from '../../assets/icons/more.svg';
import iconMondayLogo from '../../assets/icons/monday-logo.svg';
import iconMondayOutline from '../../assets/icons/monday-outline.svg';
import iconSearch from '../../assets/icons/search.svg';
import iconNotifications from '../../assets/icons/notifications.svg';
import iconInbox from '../../assets/icons/inbox.svg';
import iconHelp from '../../assets/icons/help.svg';
import iconInvite from '../../assets/icons/invite.svg';

const ff = 'Figtree, sans-serif';

/* Sidekick gradient pinwheel — inline since the Figma SVG uses foreignObject which won't render as <img> */
const SidekickPinwheel = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M8.5 18C9.0 18.3 9.6 18.4 10.1 18.2C10.7 18.1 11.1 17.8 11.5 17.3C11.8 16.8 12.0 16.2 12.0 15.7C12.0 15.5 12.0 15.3 12.0 15.1C12.0 14.7 11.9 14.3 11.9 13.8C11.7 12.2 10.9 10.5 9.8 9.3C8.6 8.1 7.0 7.2 5.4 7.0C4.9 6.9 4.3 6.9 3.8 6.8C3.6 6.8 3.4 6.8 3.2 6.8C2.6 6.8 2.0 6.9 1.5 7.2C1.0 7.5 0.7 8.0 0.5 8.6C0.4 9.1 0.5 9.7 0.8 10.2C1.7 12.3 4.7 11.5 5.9 13.0C7.2 14.6 6.9 17.2 8.5 18.0Z" fill="#FAD239"/>
    <path d="M10.7 0.3C10.2 0.0 9.6 -0.1 9.1 0.1C8.5 0.2 8.1 0.5 7.7 1.0C7.4 1.5 7.2 2.0 7.2 2.6C7.2 2.8 7.2 3.0 7.2 3.2C7.2 3.6 7.3 4.0 7.3 4.5C7.5 6.1 8.2 7.8 9.4 9.0C10.6 10.2 12.1 11.0 13.8 11.3C14.3 11.4 14.9 11.4 15.4 11.5C15.6 11.5 15.8 11.5 16.0 11.5C16.6 11.5 17.2 11.4 17.6 11.1C18.1 10.8 18.5 10.3 18.6 9.7C18.7 9.2 18.7 8.6 18.4 8.1C17.4 6.0 14.5 6.8 13.2 5.3C12.0 3.7 12.3 1.1 10.7 0.3Z" fill="#03FAFA"/>
    <path d="M18.5 10.2C18.8 9.7 18.9 9.2 18.7 8.6C18.6 8.1 18.3 7.6 17.8 7.3C17.3 6.9 16.7 6.8 16.2 6.8C16.0 6.8 15.8 6.8 15.6 6.8C15.2 6.8 14.8 6.8 14.4 6.8C12.7 7.0 11.1 7.7 9.9 8.9C8.6 10.1 7.8 11.7 7.5 13.4C7.5 13.9 7.4 14.5 7.4 15.0C7.4 15.2 7.4 15.4 7.4 15.6C7.4 16.1 7.5 16.7 7.8 17.2C8.1 17.7 8.6 18.1 9.1 18.2C9.7 18.4 10.3 18.3 10.8 18.0C12.8 17.0 12.0 14.0 13.5 12.8C15.1 11.6 17.7 11.8 18.5 10.2Z" fill="#FF6B10"/>
    <path d="M0.8 8.1C0.5 8.6 0.4 9.1 0.6 9.7C0.7 10.2 1.0 10.7 1.5 11.0C2.0 11.4 2.5 11.5 3.1 11.5C3.3 11.5 3.5 11.5 3.7 11.5C4.1 11.5 4.5 11.5 4.9 11.5C6.6 11.3 8.2 10.5 9.4 9.4C10.7 8.2 11.5 6.6 11.7 4.9C11.8 4.4 11.9 3.8 11.9 3.3C11.9 3.1 11.9 2.9 11.9 2.7C12.0 2.1 11.8 1.6 11.5 1.1C11.2 0.6 10.7 0.2 10.2 0.1C9.6 -0.1 9.0 0.0 8.5 0.3C6.5 1.2 7.3 4.3 5.8 5.5C4.2 6.7 1.6 6.5 0.8 8.1Z" fill="#6161FF"/>
  </svg>
);

/* Active state CSS filter for icons: turns #323338 / #676879 into #0073EA (primary blue) */
const activeFilter = 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(1800%) hue-rotate(196deg) brightness(97%) contrast(101%)';

/* ═══ NAV ITEMS ═══ */
interface NavDef { id: string; src?: string; label: string; dividerAfter?: boolean; custom?: boolean }

const NAV_ITEMS: NavDef[] = [
  { id: 'workspace', src: iconWorkspace, label: 'Work\nSpace' },
  { id: 'sidekick', label: 'Sidekick', dividerAfter: true, custom: true },
  { id: 'favorites', src: iconFavorite, label: 'Favorites' },
  { id: 'agents', src: iconAgents, label: 'Agents' },
  { id: 'apps', src: iconApps, label: 'Apps' },
  { id: 'notetaker', src: iconNotetaker, label: 'Notetaker', dividerAfter: true },
];

/* ═══ ICON RAIL ═══ */
interface IconRailProps { animate?: boolean; activeItem?: string; onNavClick?: (id: string) => void }

export function AICentricIconRail({ animate = false, activeItem = 'workspace', onNavClick }: IconRailProps) {
  return (
    <div style={{
      width: 56, height: '100%', background: '#fff',
      borderRight: '1px solid var(--ui-background-color)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 6, paddingBottom: 14, flexShrink: 0,
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Colored monday logo */}
        <div style={{ width: '100%', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
          <img src={iconMondayLogo} width={32} height={32} alt="monday" />
        </div>

        {NAV_ITEMS.map((item, i) => {
          const isActive = item.id === activeItem;
          const W = animate ? motion.div : ('div' as any);
          const anim = animate ? { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.04 + i * 0.04, duration: 0.2 } } : {};

          return (
            <W key={item.id} {...anim} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button aria-label={item.label.replace('\n', ' ')} onClick={() => onNavClick?.(item.id)} style={{
                width: 44, height: 36, borderRadius: 8, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative',
                background: isActive ? 'var(--nav-active-bg)' : 'transparent',
              }}>
                {isActive && <div style={{ position: 'absolute', left: -6, top: '50%', transform: 'translateY(-50%)', width: 3, height: 18, borderRadius: '0 2px 2px 0', background: 'var(--primary-color)' }} />}
                {item.custom ? (
                  <SidekickPinwheel size={20} />
                ) : (
                  <img src={item.src} width={20} height={20} alt="" style={{ filter: isActive ? activeFilter : 'none', opacity: isActive ? 1 : 0.75 }} />
                )}
              </button>
              <span style={{ fontSize: 9, fontFamily: ff, lineHeight: '11px', color: isActive ? 'var(--primary-color)' : 'var(--secondary-text-color)', fontWeight: isActive ? 600 : 400, textAlign: 'center', whiteSpace: 'pre-line', marginTop: 1, marginBottom: 2 }}>{item.label}</span>
              {item.dividerAfter && <div style={{ width: 28, height: 1, background: 'var(--ui-background-color)', margin: '4px 0' }} />}
            </W>
          );
        })}
      </div>

      {/* More — bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button aria-label="More" onClick={() => onNavClick?.('more')} style={{ width: 44, height: 36, borderRadius: 8, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent' }}>
          <img src={iconMore} width={20} height={20} alt="" style={{ opacity: 0.75 }} />
        </button>
        <span data-nav-id="more" style={{ fontSize: 9, fontFamily: ff, color: 'var(--secondary-text-color)', marginTop: 1, cursor: 'pointer' }}>More</span>
      </div>
    </div>
  );
}

/* ═══ SECONDARY SIDEBAR ═══ */
interface BoardItem { name: string; active?: boolean; indent?: boolean; color?: string }
interface SidebarProps { agents?: { name: string; emoji: string; color: string }[]; boards?: BoardItem[]; workspaceName?: string; animate?: boolean }

export function AICentricSidebar({ agents = [], boards = [], workspaceName = 'Novella', animate = false }: SidebarProps) {
  return (
    <div style={{ width: 230, height: '100%', background: '#fff', borderRight: '1px solid var(--layout-border-color)', padding: '10px 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: ff }}>
      <div style={{ padding: '0 14px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Workspace</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChevronRight size={13} color="var(--secondary-text-color)" style={{ cursor: 'pointer' }} />
            <MoreHorizontal size={14} color="var(--secondary-text-color)" style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#F6F7FB', borderRadius: 6, cursor: 'pointer' }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{workspaceName[0]}</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary-text-color)', flex: 1 }}>{workspaceName}</span>
          <ChevronDown size={13} color="var(--secondary-text-color)" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
        {agents.length > 0 && (
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 6px', marginBottom: 1 }}>
              <ChevronDown size={11} color="var(--secondary-text-color)" />
              <img src={iconAgents} width={14} height={14} alt="" style={{ opacity: 0.6 }} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>Agents</span>
            </div>
            {agents.map((a, i) => {
              const W = animate ? motion.div : ('div' as any);
              const anim = animate ? { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.12 + i * 0.07 } } : {};
              return (<W key={a.name} {...anim}><div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 6px 5px 24px', borderRadius: 4, cursor: 'pointer' }}><span style={{ fontSize: 14, lineHeight: 1 }}>{a.emoji}</span><span style={{ fontSize: 13, flex: 1 }}>{a.name}</span><span style={{ fontSize: 10, color: a.color }}>Ready</span></div></W>);
            })}
          </div>
        )}
        {boards.length > 0 && (
          <div style={{ borderTop: '1px solid var(--layout-border-color)', paddingTop: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 6px', marginBottom: 1 }}>
              <ChevronDown size={11} color="var(--secondary-text-color)" />
              <span style={{ fontSize: 12, fontWeight: 600 }}>HR Department</span>
            </div>
            {boards.map((b) => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: `4px 6px 4px ${b.indent ? 36 : 24}px`, borderRadius: 4, marginBottom: 1, cursor: 'pointer', background: b.active ? 'var(--primary-surface-color)' : 'transparent' }}>
                {b.color && !b.indent && <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.color, flexShrink: 0 }} />}
                {b.indent && <FileText size={13} color={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} />}
                {!b.color && !b.indent && <img src={iconWorkspace} width={13} height={13} alt="" style={{ filter: b.active ? activeFilter : 'none', opacity: b.active ? 1 : 0.6 }} />}
                <span style={{ fontSize: 13, color: b.active ? 'var(--primary-color)' : 'var(--primary-text-color)', fontWeight: b.active ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ TOP BAR ═══ */
export function AICentricTopBar({ userName = 'RC', userColor = '#9D50DD' }: { userName?: string; userColor?: string }) {
  return (
    <div style={{ height: 48, background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--ui-background-color)' }}>
      {/* Left — colored monday logo */}
      <div style={{ display: 'flex', alignItems: 'center', width: 100 }}>
        <img src={iconMondayLogo} width={32} height={32} alt="monday" />
      </div>
      {/* Center — search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F6F7FB', borderRadius: 8, padding: '8px 20px', width: 380, justifyContent: 'center' }}>
        <img src={iconSearch} width={16} height={16} alt="" style={{ opacity: 0.5 }} />
        <span style={{ fontSize: 14, color: 'var(--placeholder-color)', fontFamily: ff }}>Search or ask anything...</span>
      </div>
      {/* Right — icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: 160, justifyContent: 'flex-end' }}>
        <img src={iconNotifications} width={20} height={20} alt="" style={{ opacity: 0.6, cursor: 'pointer' }} />
        <img src={iconInbox} width={20} height={20} alt="" style={{ opacity: 0.6, cursor: 'pointer' }} />
        <img src={iconInvite} width={20} height={20} alt="" style={{ opacity: 0.6, cursor: 'pointer' }} />
        <img src={iconHelp} width={20} height={20} alt="" style={{ opacity: 0.6, cursor: 'pointer' }} />
        {/* Apps grid */}
        <div style={{ width: 20, height: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 5px)', gap: 2, alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {[...Array(9)].map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: 1, background: 'var(--secondary-text-color)', opacity: 0.5 }} />)}
        </div>
        {/* User avatar */}
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: userColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: ff }}>{userName}</div>
      </div>
    </div>
  );
}
