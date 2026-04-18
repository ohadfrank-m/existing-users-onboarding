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

const activeFilter = 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(1800%) hue-rotate(196deg) brightness(97%) contrast(101%)';

/* Sidekick icon — gradient when active, monochrome when inactive */
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

interface NavDef { id: string; src?: string; label: string; dividerAfter?: boolean; custom?: boolean }
const NAV_ITEMS: NavDef[] = [
  { id: 'workspace', src: iconWorkspace, label: 'Work\nSpace' },
  { id: 'sidekick', label: 'Sidekick', custom: true },
  { id: 'favorites', src: iconFavorite, label: 'Favorites', dividerAfter: true },
  { id: 'agents', src: iconAgents, label: 'Agents' },
  { id: 'apps', src: iconApps, label: 'Apps' },
  { id: 'notetaker', src: iconNotetaker, label: 'Notetaker' },
];

/* ═══ ICON RAIL — all values from tokens ═══ */
interface IconRailProps { animate?: boolean; activeItem?: string; onNavClick?: (id: string) => void }

export function AICentricIconRail({ animate = false, activeItem = 'workspace', onNavClick }: IconRailProps) {
  return (
    <div style={{
      width: 'var(--nav-rail-width)' as any,
      display: 'flex',
      padding: 'var(--nav-rail-padding)' as any,
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--nav-rail-gap)' as any,
      flexShrink: 0,
      alignSelf: 'stretch',
      background: 'var(--surface-chrome)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 'var(--space-2)' as any }}>
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
                  width: 'var(--nav-rail-item-size)' as any,
                  borderRadius: 'var(--nav-rail-item-radius)' as any,
                  border: 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: 1,
                  cursor: 'pointer', position: 'relative',
                  padding: '6px 0 4px',
                  background: isActive ? 'var(--nav-rail-item-active-bg)' : 'transparent',
                }}>
                {isActive && (
                  <div style={{
                    position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)',
                    width: 'var(--nav-rail-indicator-width)' as any,
                    height: 20, borderRadius: '0 2px 2px 0',
                    background: 'var(--nav-rail-indicator-color)',
                  }} />
                )}
                {item.custom ? (
                  <SidekickPinwheel size={18} active={isActive} />
                ) : (
                  <img src={item.src} width={18} height={18} alt="" style={{ filter: isActive ? activeFilter : 'none' }} />
                )}
                <span style={{
                  fontSize: 'var(--font-size-xs)' as any,
                  fontFamily: 'var(--font-body)',
                  lineHeight: 'var(--line-height-tight)' as any,
                  color: isActive ? 'var(--text-brand)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 'var(--font-weight-semibold)' as any : 'var(--font-weight-regular)' as any,
                  textAlign: 'center', whiteSpace: 'pre-line',
                }}>
                  {item.label}
                </span>
              </button>
              {item.dividerAfter && <div style={{ width: 24, height: 1, background: 'var(--border-light)', margin: '6px 0' }} />}
            </W>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button aria-label="More" onClick={() => onNavClick?.('more')}
          style={{ width: 36, height: 32, borderRadius: 'var(--radius-sm)' as any, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', padding: 0 }}>
          <img src={iconMore} width={18} height={18} alt="" />
        </button>
        <span style={{ fontSize: 'var(--font-size-xs)' as any, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', marginTop: 1 }}>More</span>
      </div>
    </div>
  );
}

/* ═══ SECONDARY SIDEBAR ═══ */
interface BoardItem { name: string; active?: boolean; indent?: boolean; color?: string }
interface SidebarProps { agents?: { name: string; emoji: string; color: string }[]; boards?: BoardItem[]; workspaceName?: string; animate?: boolean }

export function AICentricSidebar({ agents = [], boards = [], workspaceName = 'Novella', animate = false }: SidebarProps) {
  return (
    <div style={{
      display: 'flex',
      width: 'var(--inner-sidebar-width)' as any,
      padding: 'var(--inner-sidebar-padding)' as any,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 'var(--inner-sidebar-gap)' as any,
      alignSelf: 'stretch',
      borderRadius: 'var(--inner-sidebar-radius)' as any,
      borderRight: 'var(--inner-sidebar-border)' as any,
      background: 'var(--inner-sidebar-bg)',
      overflow: 'hidden',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ padding: '0 var(--space-12)' as any, marginBottom: 'var(--space-10)' as any, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' as any }}>
          <span style={{ fontSize: 'var(--font-size-sm)' as any, fontWeight: 'var(--font-weight-semibold)' as any, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workspace</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' as any }}>
            <ChevronRight size={12} color="var(--text-secondary)" style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} />
            <MoreHorizontal size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' as any, padding: '5px 8px', background: 'var(--surface-card-muted)', borderRadius: 'var(--radius-sm)' as any, cursor: 'pointer' }}>
          <div style={{ width: 'var(--avatar-size-sm)' as any, height: 'var(--avatar-size-sm)' as any, borderRadius: 'var(--radius-sm)' as any, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--font-size-xs)' as any, fontWeight: 'var(--font-weight-bold)' as any, color: 'var(--text-inverse)' }}>{workspaceName[0]}</div>
          <span style={{ fontSize: 'var(--font-size-base)' as any, fontWeight: 'var(--font-weight-medium)' as any, color: 'var(--text-primary)', flex: 1 }}>{workspaceName}</span>
          <ChevronDown size={12} color="var(--text-secondary)" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--space-6)' as any, width: '100%' }}>
        {agents.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' as any }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' as any, padding: '4px 6px', marginBottom: 'var(--space-2)' as any }}>
              <ChevronDown size={10} color="var(--text-secondary)" />
              <img src={iconAgents} width={13} height={13} alt="" />
              <span style={{ fontSize: 'var(--font-size-sm)' as any, fontWeight: 'var(--font-weight-semibold)' as any, color: 'var(--text-primary)' }}>Agents</span>
            </div>
            {agents.map((a, i) => {
              const W = animate ? motion.div : ('div' as any);
              const anim = animate ? { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 + i * 0.06 } } : {};
              return (<W key={a.name} {...anim}><div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' as any, padding: '4px 6px 4px 22px', borderRadius: 'var(--radius-sm)' as any, cursor: 'pointer' }}><span style={{ fontSize: 'var(--font-size-base)' as any, lineHeight: 1 }}>{a.emoji}</span><span style={{ fontSize: 'var(--font-size-sm)' as any, color: 'var(--text-primary)', flex: 1 }}>{a.name}</span><span style={{ fontSize: 'var(--font-size-xs)' as any, color: a.color }}>Ready</span></div></W>);
            })}
          </div>
        )}
        {boards.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-6)' as any }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' as any, padding: '4px 6px', marginBottom: 'var(--space-2)' as any }}>
              <ChevronDown size={10} color="var(--text-secondary)" />
              <span style={{ fontSize: 'var(--font-size-sm)' as any, fontWeight: 'var(--font-weight-semibold)' as any, color: 'var(--text-primary)' }}>HR Department</span>
            </div>
            {boards.map((b) => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: `4px 6px 4px ${b.indent ? 32 : 22}px`, borderRadius: 'var(--radius-sm)' as any, marginBottom: 1, cursor: 'pointer', background: b.active ? 'var(--surface-selected)' : 'transparent' }}>
                {b.color && !b.indent && <div style={{ width: 6, height: 6, borderRadius: 'var(--radius-full)' as any, background: b.color, flexShrink: 0 }} />}
                {b.indent && <FileText size={13} color={b.active ? 'var(--text-brand)' : 'var(--text-secondary)'} />}
                <span style={{ fontSize: 'var(--font-size-base)' as any, color: b.active ? 'var(--text-brand)' : 'var(--text-primary)', fontWeight: b.active ? 'var(--font-weight-semibold)' as any : 'var(--font-weight-regular)' as any }}>{b.name}</span>
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
    <div style={{
      display: 'flex',
      padding: 'var(--topbar-padding)' as any,
      alignItems: 'center',
      gap: 'var(--topbar-gap)' as any,
      alignSelf: 'stretch',
      background: 'var(--topbar-bg)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', width: 100 }}>
        <img src={iconMondayLogo} width={24} height={24} alt="monday" />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          width: 'var(--searchbar-width)' as any,
          height: 'var(--searchbar-height)' as any,
          padding: 'var(--space-4) var(--space-4) var(--space-4) var(--space-16)' as any,
          alignItems: 'center',
          gap: 'var(--space-8)' as any,
          borderRadius: 'var(--searchbar-radius)' as any,
          background: 'var(--searchbar-bg)',
        }}>
          <img src={iconSearch} width={14} height={14} alt="" />
          <span style={{ fontSize: 'var(--font-size-base)' as any, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>Search or ask anything...</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-10)' as any, flexShrink: 0 }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img src={iconNotifications} width={16} height={16} alt="" />
          <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderRadius: 'var(--radius-full)' as any, background: 'var(--color-error)', border: '1.5px solid var(--surface-chrome)' }} />
        </div>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <img src={iconInbox} width={16} height={16} alt="" />
          <div style={{ position: 'absolute', top: -1, right: -1, width: 6, height: 6, borderRadius: 'var(--radius-full)' as any, background: 'var(--color-error)', border: '1.5px solid var(--surface-chrome)' }} />
        </div>
        <img src={iconInvite} width={16} height={16} alt="" style={{ cursor: 'pointer' }} />
        <img src={iconHelp} width={16} height={16} alt="" style={{ cursor: 'pointer' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' as any, marginLeft: 'var(--space-2)' as any }}>
          <div style={{ width: 16, height: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 3px)', gap: '2px', alignContent: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {[...Array(9)].map((_, i) => <div key={i} style={{ width: 3, height: 3, borderRadius: 'var(--radius-xs)' as any, background: 'var(--text-secondary)' }} />)}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 'var(--avatar-size-md)' as any, height: 'var(--avatar-size-md)' as any, borderRadius: 'var(--radius-full)' as any, overflow: 'hidden' }}>
              <img src={imgAvatar} width={28} height={28} style={{ objectFit: 'cover', display: 'block' }} alt="" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: 'var(--radius-full)' as any, background: 'var(--color-success)', border: '2px solid var(--surface-chrome)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
