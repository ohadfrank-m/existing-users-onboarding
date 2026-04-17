import { motion } from 'motion/react';
import {
  Bot, Star, MoreHorizontal,
  FileText, ChevronDown, ChevronRight,
} from 'lucide-react';

const ff = 'Figtree, sans-serif';

/* ═══ ICONS — pixel-perfect from AIWorkPlatform_Design ═══ */

const MondayLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="16" r="2.5" fill="#FB275D" />
    <circle cx="12" cy="16" r="2.5" fill="#FFCC00" />
    <circle cx="19" cy="16" r="2.5" fill="#00CA72" />
    <ellipse cx="5" cy="8" rx="2" ry="4.5" fill="#FB275D" transform="rotate(-8 5 8)" />
    <ellipse cx="12" cy="8" rx="2" ry="4.5" fill="#FFCC00" />
    <ellipse cx="19" cy="8" rx="2" ry="4.5" fill="#00CA72" transform="rotate(8 19 8)" />
  </svg>
);

/* Workspace — 4 rounded squares */
const WorkSpaceIcon = ({ active = false }: { active?: boolean }) => {
  const c = active ? 'var(--primary-color)' : 'var(--secondary-text-color)';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="2" stroke={c} strokeWidth="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="2" stroke={c} strokeWidth="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="2" stroke={c} strokeWidth="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="2" stroke={c} strokeWidth="1.5" />
    </svg>
  );
};

/* Sidekick — gradient star (from SidekickHome.png — has special bg when active) */
const SidekickIcon = ({ active = false }: { active?: boolean }) => (
  <div style={{
    width: 22, height: 22, borderRadius: 6,
    background: active ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' : 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z"
        fill={active ? '#fff' : 'url(#skNav)'} />
      <defs>
        <linearGradient id="skNav" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" />
          <stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/* Favorites — outlined star */
const FavoritesIcon = ({ active = false }: { active?: boolean }) => (
  <Star size={20} color={active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} strokeWidth={1.5} />
);

/* Agents — robot/bot */
const AgentsNavIcon = ({ active = false }: { active?: boolean }) => {
  const c = active ? 'var(--primary-color)' : 'var(--secondary-text-color)';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="9" cy="16" r="1" fill={c} stroke="none" />
      <circle cx="15" cy="16" r="1" fill={c} stroke="none" />
    </svg>
  );
};

/* Apps / Vibe — diamond shape */
const AppsIcon = ({ active = false }: { active?: boolean }) => {
  const c = active ? 'var(--primary-color)' : 'var(--secondary-text-color)';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 8-8 8-8-8z" />
    </svg>
  );
};

/* Notetaker — pen/microphone */
const NotetakerIcon = ({ active = false }: { active?: boolean }) => {
  const c = active ? 'var(--primary-color)' : 'var(--secondary-text-color)';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
};

/* ═══ NAV ITEMS — exact order from Figma ═══ */
interface NavDef {
  id: string;
  label: string;
  dividerAfter?: boolean;
}

const NAV_ITEMS: NavDef[] = [
  { id: 'workspace', label: 'Work\nSpace' },
  { id: 'sidekick', label: 'Sidekick', dividerAfter: true },
  { id: 'favorites', label: 'Favorites' },
  { id: 'agents', label: 'Agents' },
  { id: 'apps', label: 'Apps' },
  { id: 'notetaker', label: 'Notetaker', dividerAfter: true },
];

function renderIcon(id: string, active: boolean) {
  switch (id) {
    case 'workspace': return <WorkSpaceIcon active={active} />;
    case 'sidekick': return <SidekickIcon active={active} />;
    case 'favorites': return <FavoritesIcon active={active} />;
    case 'agents': return <AgentsNavIcon active={active} />;
    case 'apps': return <AppsIcon active={active} />;
    case 'notetaker': return <NotetakerIcon active={active} />;
    default: return null;
  }
}

/* ═══ ICON RAIL ═══ */
interface IconRailProps {
  animate?: boolean;
  activeItem?: string;
}

export function AICentricIconRail({ animate = false, activeItem = 'workspace' }: IconRailProps) {
  return (
    <div style={{
      width: 56, height: '100%', background: '#fff',
      borderRight: '1px solid var(--ui-background-color)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 6, paddingBottom: 12, flexShrink: 0,
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Monday logo */}
        <div style={{ width: '100%', height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
          <MondayLogo />
        </div>

        {/* Nav items */}
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
                {/* Blue left indicator */}
                {isActive && (
                  <div style={{
                    position: 'absolute', left: -6, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: 18, borderRadius: '0 2px 2px 0',
                    background: 'var(--primary-color)',
                  }} />
                )}
                {renderIcon(item.id, isActive)}
              </div>
              {/* Label */}
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

      {/* More — bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 44, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <MoreHorizontal size={20} color="var(--secondary-text-color)" />
        </div>
        <span style={{ fontSize: 9, fontFamily: ff, color: 'var(--secondary-text-color)', marginTop: 1 }}>More</span>
      </div>
    </div>
  );
}

/* ═══ SECONDARY SIDEBAR ═══ */

interface BoardItem {
  name: string;
  active?: boolean;
  indent?: boolean;
  color?: string;
}

interface SidebarProps {
  agents?: { name: string; emoji: string; color: string }[];
  boards?: BoardItem[];
  workspaceName?: string;
  animate?: boolean;
}

export function AICentricSidebar({
  agents = [],
  boards = [],
  workspaceName = 'Novella',
  animate = false,
}: SidebarProps) {
  return (
    <div style={{
      width: 230, height: '100%', background: '#fff',
      borderRight: '1px solid var(--layout-border-color)',
      padding: '10px 0', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      fontFamily: ff,
    }}>
      {/* Header */}
      <div style={{ padding: '0 14px', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Workspace
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChevronRight size={13} color="var(--secondary-text-color)" style={{ cursor: 'pointer' }} />
            <MoreHorizontal size={14} color="var(--secondary-text-color)" style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Workspace selector */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 8px', background: '#F6F7FB', borderRadius: 6, cursor: 'pointer',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 5, background: '#7B68EE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: '#fff',
          }}>
            {workspaceName[0]}
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--primary-text-color)', flex: 1 }}>{workspaceName}</span>
          <ChevronDown size={13} color="var(--secondary-text-color)" />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
        {/* Agents section */}
        {agents.length > 0 && (
          <div style={{ marginBottom: 6 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 6px', marginBottom: 1,
            }}>
              <ChevronDown size={11} color="var(--secondary-text-color)" />
              <Bot size={14} color="var(--agent-green)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-text-color)' }}>Agents</span>
            </div>
            {agents.map((a, i) => {
              const W = animate ? motion.div : ('div' as any);
              const anim = animate ? { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.12 + i * 0.07 } } : {};
              return (
                <W key={a.name} {...anim}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '5px 6px 5px 24px', borderRadius: 4, cursor: 'pointer',
                  }}>
                    <span style={{ fontSize: 14, lineHeight: 1 }}>{a.emoji}</span>
                    <span style={{ fontSize: 13, color: 'var(--primary-text-color)', flex: 1 }}>{a.name}</span>
                    <span style={{ fontSize: 10, color: a.color }}>Ready</span>
                  </div>
                </W>
              );
            })}
          </div>
        )}

        {/* Boards */}
        {boards.length > 0 && (
          <div style={{ borderTop: '1px solid var(--layout-border-color)', paddingTop: 6 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 6px', marginBottom: 1,
            }}>
              <ChevronDown size={11} color="var(--secondary-text-color)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-text-color)' }}>HR Department</span>
            </div>

            {boards.map((b) => (
              <div key={b.name} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: `4px 6px 4px ${b.indent ? 36 : 24}px`,
                borderRadius: 4, marginBottom: 1, cursor: 'pointer',
                background: b.active ? 'var(--primary-surface-color)' : 'transparent',
              }}>
                {b.color && !b.indent && (
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.color, flexShrink: 0 }} />
                )}
                {b.indent && (
                  <FileText size={13} color={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} />
                )}
                {!b.color && !b.indent && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" />
                  </svg>
                )}
                <span style={{
                  fontSize: 13,
                  color: b.active ? 'var(--primary-color)' : 'var(--primary-text-color)',
                  fontWeight: b.active ? 600 : 400,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ TOP BAR — light, matching all designs ═══ */
export function AICentricTopBar({ userName = 'RC', userColor = '#9D50DD' }: { userName?: string; userColor?: string }) {
  return (
    <div style={{
      height: 44, background: '#fff', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 16px', borderBottom: '1px solid var(--ui-background-color)',
    }}>
      {/* Left — monday logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 100 }}>
        <MondayLogo />
      </div>

      {/* Center — search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#F6F7FB', borderRadius: 8, padding: '7px 16px',
        width: 360, justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <span style={{ fontSize: 13, color: 'var(--placeholder-color)', fontFamily: ff }}>Search or ask anything...</span>
      </div>

      {/* Right — icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 100, justifyContent: 'flex-end' }}>
        {/* Notification bell */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {/* Inbox */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
        </svg>
        {/* User */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
        {/* Help */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        {/* Grid / apps */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
        {/* Avatar */}
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: userColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: ff,
        }}>
          {userName}
        </div>
      </div>
    </div>
  );
}
