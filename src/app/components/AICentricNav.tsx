import { motion } from 'motion/react';
import { ChevronDown, ChevronRight, MoreHorizontal, Bot, FileText } from 'lucide-react';

import iconWorkspace from '../../assets/icons/workspace.svg';
import iconSidekick from '../../assets/icons/sidekick.svg';
import iconFavorite from '../../assets/icons/favorite.svg';
import iconAgents from '../../assets/icons/agents.svg';
import iconApps from '../../assets/icons/apps.svg';
import iconNotetaker from '../../assets/icons/notetaker.svg';
import iconMore from '../../assets/icons/more.svg';
import iconLogo from '../../assets/icons/monday-logo.svg';
import iconSearch from '../../assets/icons/search.svg';
import iconNotifications from '../../assets/icons/notifications.svg';
import iconInbox from '../../assets/icons/inbox.svg';
import iconHelp from '../../assets/icons/help.svg';
import iconInvite from '../../assets/icons/invite.svg';

const ff = 'Figtree, sans-serif';

/* Icon with optional active tint via CSS filter */
function NavIcon({ src, size = 20, active = false }: { src: string; size?: number; active?: boolean }) {
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      style={{
        filter: active ? 'brightness(0) saturate(100%) invert(30%) sepia(98%) saturate(1800%) hue-rotate(196deg) brightness(97%) contrast(101%)' : 'none',
        opacity: active ? 1 : 0.7,
      }}
    />
  );
}

/* ═══ NAV ITEMS ═══ */
interface NavDef { id: string; src: string; label: string; dividerAfter?: boolean; noFilter?: boolean }

const NAV_ITEMS: NavDef[] = [
  { id: 'workspace', src: iconWorkspace, label: 'Work\nSpace' },
  { id: 'sidekick', src: iconSidekick, label: 'Sidekick', dividerAfter: true, noFilter: true },
  { id: 'favorites', src: iconFavorite, label: 'Favorites' },
  { id: 'agents', src: iconAgents, label: 'Agents' },
  { id: 'apps', src: iconApps, label: 'Apps' },
  { id: 'notetaker', src: iconNotetaker, label: 'Notetaker', dividerAfter: true },
];

/* ═══ ICON RAIL ═══ */
interface IconRailProps { animate?: boolean; activeItem?: string }

export function AICentricIconRail({ animate = false, activeItem = 'workspace' }: IconRailProps) {
  return (
    <div style={{
      width: 56, height: '100%', background: '#fff',
      borderRight: '1px solid var(--ui-background-color)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 6, paddingBottom: 14, flexShrink: 0,
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Monday logo */}
        <div style={{ width: '100%', height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
          <img src={iconLogo} width={28} height={28} alt="monday" />
        </div>

        {NAV_ITEMS.map((item, i) => {
          const isActive = item.id === activeItem;
          const W = animate ? motion.div : ('div' as any);
          const anim = animate ? { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.04 + i * 0.04, duration: 0.2 } } : {};

          return (
            <W key={item.id} {...anim} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 44, height: 36, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative',
                background: isActive ? 'var(--nav-active-bg)' : 'transparent',
              }}>
                {isActive && (
                  <div style={{
                    position: 'absolute', left: -6, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: 18, borderRadius: '0 2px 2px 0',
                    background: 'var(--primary-color)',
                  }} />
                )}
                {item.noFilter ? (
                  <img src={item.src} width={20} height={20} alt="" />
                ) : (
                  <NavIcon src={item.src} size={20} active={isActive} />
                )}
              </div>
              <span style={{
                fontSize: 9, fontFamily: ff, lineHeight: '11px',
                color: isActive ? 'var(--primary-color)' : 'var(--secondary-text-color)',
                fontWeight: isActive ? 600 : 400,
                textAlign: 'center', whiteSpace: 'pre-line',
                marginTop: 1, marginBottom: 2,
              }}>
                {item.label}
              </span>
              {item.dividerAfter && <div style={{ width: 28, height: 1, background: 'var(--ui-background-color)', margin: '4px 0' }} />}
            </W>
          );
        })}
      </div>

      {/* More */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 44, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <NavIcon src={iconMore} size={20} />
        </div>
        <span style={{ fontSize: 9, fontFamily: ff, color: 'var(--secondary-text-color)', marginTop: 1 }}>More</span>
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
              return (
                <W key={a.name} {...anim}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 6px 5px 24px', borderRadius: 4, cursor: 'pointer' }}>
                    <span style={{ fontSize: 14, lineHeight: 1 }}>{a.emoji}</span>
                    <span style={{ fontSize: 13, flex: 1 }}>{a.name}</span>
                    <span style={{ fontSize: 10, color: a.color }}>Ready</span>
                  </div>
                </W>
              );
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
              <div key={b.name} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: `4px 6px 4px ${b.indent ? 36 : 24}px`, borderRadius: 4, marginBottom: 1, cursor: 'pointer',
                background: b.active ? 'var(--primary-surface-color)' : 'transparent',
              }}>
                {b.color && !b.indent && <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.color, flexShrink: 0 }} />}
                {b.indent && <FileText size={13} color={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} />}
                {!b.color && !b.indent && <NavIcon src={iconWorkspace} size={13} active={b.active} />}
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
    <div style={{ height: 44, background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', borderBottom: '1px solid var(--ui-background-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 80 }}>
        <img src={iconLogo} width={28} height={28} alt="monday" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F6F7FB', borderRadius: 8, padding: '7px 16px', width: 360, justifyContent: 'center' }}>
        <img src={iconSearch} width={14} height={14} alt="" style={{ opacity: 0.5 }} />
        <span style={{ fontSize: 13, color: 'var(--placeholder-color)', fontFamily: ff }}>Search or ask anything...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 80, justifyContent: 'flex-end' }}>
        <img src={iconNotifications} width={18} height={18} alt="" style={{ opacity: 0.6 }} />
        <img src={iconInbox} width={18} height={18} alt="" style={{ opacity: 0.6 }} />
        <img src={iconInvite} width={18} height={18} alt="" style={{ opacity: 0.6 }} />
        <img src={iconHelp} width={18} height={18} alt="" style={{ opacity: 0.6 }} />
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: userColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: ff }}>{userName}</div>
      </div>
    </div>
  );
}
