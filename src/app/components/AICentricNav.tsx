import { motion } from 'motion/react';
import {
  Search, Bot, Sparkles, Star, MoreHorizontal,
  FileText, LayoutGrid, ChevronDown,
} from 'lucide-react';

const ff = 'Figtree, sans-serif';

const AiGradientIcon = ({ size = 18, id = 'navAi' }: { size?: number; id?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill={`url(#${id})`} />
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" /><stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" />
      </linearGradient>
    </defs>
  </svg>
);

/* Monday logo dots */
const MondayDots = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="16" r="2.5" fill="#FB275D" />
    <circle cx="12" cy="16" r="2.5" fill="#FFCC00" />
    <circle cx="19" cy="16" r="2.5" fill="#00CA72" />
    <ellipse cx="5" cy="8" rx="2" ry="4.5" fill="#FB275D" transform="rotate(-8 5 8)" />
    <ellipse cx="12" cy="8" rx="2" ry="4.5" fill="#FFCC00" />
    <ellipse cx="19" cy="8" rx="2" ry="4.5" fill="#00CA72" transform="rotate(8 19 8)" />
  </svg>
);

/* Workspace icon — 4 squares grid */
const WorkspaceIcon = ({ color = 'var(--secondary-text-color)' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5">
    <rect x="2" y="2" width="7" height="7" rx="1.5" />
    <rect x="11" y="2" width="7" height="7" rx="1.5" />
    <rect x="2" y="11" width="7" height="7" rx="1.5" />
    <rect x="11" y="11" width="7" height="7" rx="1.5" />
  </svg>
);

/* Notetaker icon */
const NotetakerIcon = ({ color = 'var(--secondary-text-color)' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 1 0 9 9" />
    <path d="M12 3v9l6.5-3.5" />
    <circle cx="19" cy="5" r="3" fill={color} stroke="none" opacity="0.4" />
  </svg>
);

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  dividerAfter?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'workspace', icon: <WorkspaceIcon />, label: 'Work Space', active: true, dividerAfter: true },
  { id: 'search', icon: <Search size={18} color="var(--secondary-text-color)" />, label: 'Search' },
  { id: 'sidekick', icon: <AiGradientIcon size={18} id="navSK" />, label: 'Sidekick', dividerAfter: true },
  { id: 'favorites', icon: <Star size={18} color="var(--secondary-text-color)" />, label: 'Favorites' },
  { id: 'agents', icon: <Bot size={18} color="var(--secondary-text-color)" />, label: 'Agents' },
  { id: 'apps', icon: <LayoutGrid size={18} color="var(--secondary-text-color)" />, label: 'Apps' },
  { id: 'notetaker', icon: <FileText size={18} color="var(--secondary-text-color)" />, label: 'Notetaker' },
];

interface AICentricNavProps {
  animate?: boolean;
}

export function AICentricIconRail({ animate = false }: AICentricNavProps) {
  return (
    <div style={{
      width: 52, background: '#fff',
      borderRight: '1px solid var(--ui-background-color)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 6, paddingBottom: 12, flexShrink: 0,
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {/* Monday logo */}
        <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
          <MondayDots />
        </div>

        {/* Nav items */}
        {NAV_ITEMS.map((item, i) => {
          const Wrapper = animate ? motion.div : 'div' as any;
          const animProps = animate ? {
            initial: { opacity: 0, x: -8 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.05 + i * 0.04, duration: 0.25 },
          } : {};

          return (
            <Wrapper key={item.id} {...animProps}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  background: item.active ? 'var(--nav-active-bg)' : 'transparent',
                  position: 'relative',
                }}
              >
                {item.id === 'workspace' && item.active && (
                  <div style={{
                    position: 'absolute', left: -1, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: 20, borderRadius: '0 2px 2px 0',
                    background: 'var(--primary-color)',
                  }} />
                )}
                <div style={{ color: item.active ? 'var(--primary-color)' : 'var(--secondary-text-color)' }}>
                  {item.id === 'workspace' && item.active ? <WorkspaceIcon color="var(--primary-color)" /> : item.icon}
                </div>
              </div>
              {item.dividerAfter && (
                <div style={{ width: 24, height: 1, background: 'var(--ui-background-color)', margin: '4px auto' }} />
              )}
            </Wrapper>
          );
        })}
      </div>

      {/* More at bottom */}
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: 'var(--secondary-text-color)',
      }}>
        <MoreHorizontal size={18} />
      </div>
    </div>
  );
}

/* Secondary sidebar — workspace tree */
interface SidebarProps {
  agents?: { name: string; emoji: string; color: string }[];
  boards?: { name: string; active?: boolean; indent?: boolean }[];
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
      width: 230, background: '#fff',
      borderRight: '1px solid var(--layout-border-color)',
      padding: '10px 8px', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', gap: 6,
      height: '100%',
    }}>
      {/* Workspace header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4px 6px',
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Workspace
        </span>
        <MoreHorizontal size={14} color="var(--secondary-text-color)" />
      </div>

      {/* Workspace selector */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 8px', background: '#F6F7FB', borderRadius: 6,
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

      {/* Agents section */}
      {agents.length > 0 && (
        <div style={{ paddingTop: 4 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 8px', marginBottom: 2,
          }}>
            <Bot size={13} color="var(--agent-green)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-text-color)' }}>Agents</span>
          </div>
          {agents.map((a, i) => {
            const Wrapper = animate ? motion.div : 'div' as any;
            const animProps = animate ? { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 + i * 0.08 } } : {};
            return (
              <Wrapper key={a.name} {...animProps}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 8px 4px 18px', borderRadius: 4, marginBottom: 1,
                  cursor: 'pointer',
                }}>
                <span style={{ fontSize: 13 }}>{a.emoji}</span>
                <span style={{ fontSize: 12, color: 'var(--primary-text-color)' }}>{a.name}</span>
              </Wrapper>
            );
          })}
        </div>
      )}

      {/* Boards tree */}
      {boards.length > 0 && (
        <div style={{ borderTop: '1px solid var(--layout-border-color)', paddingTop: 6 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 8px', marginBottom: 2,
          }}>
            <ChevronDown size={12} color="var(--secondary-text-color)" />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-text-color)' }}>HR Department</span>
          </div>
          {boards.map((b) => (
            <div key={b.name} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: `3px 8px 3px ${b.indent ? 30 : 16}px`,
              borderRadius: 4, marginBottom: 1,
              background: b.active ? 'var(--primary-surface-color)' : 'transparent',
              cursor: 'pointer',
            }}>
              {b.indent ? (
                <FileText size={12} color={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} />
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" />
                </svg>
              )}
              <span style={{
                fontSize: 12,
                color: b.active ? 'var(--primary-color)' : 'var(--primary-text-color)',
                fontWeight: b.active ? 600 : 400,
              }}>
                {b.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
