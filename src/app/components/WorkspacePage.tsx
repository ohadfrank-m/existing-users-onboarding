import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Filter, ArrowUpDown, ChevronDown, Plus,
  MoreHorizontal, Eye, Users, Sparkles, X, Table2,
} from 'lucide-react';
import { ClassicShell } from './ClassicShell';
import { PERSONA, RECRUITMENT_DATA, PAIN_SIGNALS } from '../data';

const ff = 'Figtree, sans-serif';
const fp = 'Poppins, sans-serif';

function Avatar({ initials, color, size = 26 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: ff, fontSize: size * 0.38, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function Checkbox() {
  return (
    <div style={{
      width: 16, height: 16, borderRadius: 3,
      border: '2px solid var(--ui-border-color)',
      background: 'transparent', cursor: 'pointer', flexShrink: 0,
    }} />
  );
}

function CellFill({ label, bg }: { label: string; bg: string }) {
  if (!label) return <div style={{ height: '100%', width: '100%' }} />;
  return (
    <div style={{
      height: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: bg,
      fontFamily: ff, fontSize: 14, fontWeight: 400, color: '#fff',
      whiteSpace: 'nowrap', overflow: 'hidden',
    }}>
      {label}
    </div>
  );
}

const AiGradientIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#bannerGrad)" />
    <defs>
      <linearGradient id="bannerGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB275D" />
        <stop offset="33%" stopColor="#FFCC00" />
        <stop offset="66%" stopColor="#00CA72" />
        <stop offset="100%" stopColor="#8181FF" />
      </linearGradient>
    </defs>
  </svg>
);

const COL_WIDTHS = { check: 40, name: 220, role: 180, assignee: 64, status: 172, priority: 130, due: 100, source: 100 };

export function WorkspacePage() {
  const navigate = useNavigate();
  const [bannerVisible, setBannerVisible] = useState(true);

  const banner = bannerVisible ? (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{
          background: 'linear-gradient(90deg, #1A1D35 0%, #251545 30%, #152540 60%, #1A3228 100%)',
          padding: '12px 24px',
          height: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated shimmer overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 70%, transparent 100%)',
            animation: 'bannerShimmer 4s ease-in-out infinite',
          }} />

          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            position: 'relative', zIndex: 1,
          }}>
            <AiGradientIcon />
            <span style={{
              fontFamily: fp, fontSize: 14, fontWeight: 500, color: '#fff', letterSpacing: '0.01em',
            }}>
              Introducing the new <strong style={{ fontWeight: 600 }}>monday AI work platform</strong>
            </span>
            <span style={{
              width: 1, height: 16, background: 'rgba(255,255,255,0.2)',
            }} />
            <span style={{
              fontFamily: ff, fontSize: 13, color: 'rgba(255,255,255,0.7)',
            }}>
              From managing work to doing the work
            </span>
            <button
              onClick={() => navigate('/preview')}
              style={{
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 6, padding: '6px 18px', cursor: 'pointer',
                fontFamily: ff, fontSize: 13, fontWeight: 600, color: '#fff',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)', marginLeft: 4,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <Sparkles size={13} />
              See what's new
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setBannerVisible(false)}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex',
              zIndex: 2,
            }}
          >
            <X size={14} color="rgba(255,255,255,0.5)" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;

  return (
    <ClassicShell banner={banner}>
      <style>{`
        @keyframes bannerShimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
      {/* Board header */}
      <div style={{ padding: '16px 24px 0', borderBottom: '1px solid var(--layout-border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, fontFamily: ff, color: 'var(--primary-text-color)' }}>Recruitment Pipeline</h2>
            <ChevronDown size={14} color="var(--secondary-text-color)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', marginRight: 4 }}>
              {PERSONA.teamMembers.map((tm, i) => (
                <div key={tm.initials} style={{ marginLeft: i > 0 ? -6 : 0, zIndex: 4 - i }}>
                  <Avatar initials={tm.initials} color={tm.color} size={28} />
                </div>
              ))}
            </div>
            <button style={{
              background: 'var(--primary-color)', border: 'none', borderRadius: 4,
              padding: '5px 14px', cursor: 'pointer',
              fontFamily: ff, fontSize: 13, fontWeight: 500, color: '#fff',
            }}>
              Invite
            </button>
            <button style={{
              background: 'none', border: '1px solid var(--ui-border-color)', borderRadius: 4,
              padding: '5px 7px', cursor: 'pointer', display: 'flex',
            }}>
              <MoreHorizontal size={16} color="var(--secondary-text-color)" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, paddingBottom: 10 }}>
          <button style={{
            background: 'var(--primary-color)', border: 'none', borderRadius: 4,
            padding: '5px 12px', cursor: 'pointer',
            fontFamily: ff, fontSize: 13, fontWeight: 500, color: '#fff',
            display: 'flex', alignItems: 'center', gap: 4, marginRight: 8,
          }}>
            <Plus size={14} /> New Item
          </button>
          <div style={{
            background: 'var(--primary-surface-color)', borderRadius: 4, padding: '4px 10px',
            display: 'flex', alignItems: 'center', gap: 4, marginRight: 4,
          }}>
            <Table2 size={14} color="var(--primary-color)" />
            <span style={{ fontFamily: ff, fontSize: 13, fontWeight: 500, color: 'var(--primary-color)' }}>Main table</span>
          </div>
          {[
            { icon: <Search size={14} />, label: 'Search' },
            { icon: <Users size={14} />, label: 'Person' },
            { icon: <Filter size={14} />, label: 'Filter' },
            { icon: <ArrowUpDown size={14} />, label: 'Sort' },
            { icon: <Eye size={14} />, label: 'Hide' },
          ].map(({ icon, label }) => (
            <button key={label} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: ff, fontSize: 13, color: 'var(--secondary-text-color)',
              display: 'flex', alignItems: 'center', gap: 4, padding: '5px 8px', borderRadius: 4,
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-background-hover-color)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Board content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px' }}>
        {RECRUITMENT_DATA.map((group, gi) => (
          <div key={group.group} style={{ marginTop: gi > 0 ? 28 : 16 }}>
            {/* Group label */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0 0 6px 4px', cursor: 'pointer', userSelect: 'none',
            }}>
              <ChevronDown size={15} strokeWidth={2.5} color={group.groupColor} />
              <span style={{ fontFamily: ff, fontSize: 15, fontWeight: 700, color: group.groupColor }}>{group.group}</span>
              <span style={{
                fontFamily: ff, fontSize: 11, fontWeight: 600,
                color: 'var(--secondary-text-color)',
                background: 'var(--ui-background-color)',
                borderRadius: 10, padding: '1px 6px', lineHeight: '18px',
              }}>
                {group.rows.length}
              </span>
            </div>

            {/* Column headers */}
            <div style={{
              height: 36, display: 'flex', alignItems: 'center',
              borderLeft: `3px solid ${group.groupColor}`,
              borderTop: '1px solid var(--layout-border-color)',
              borderBottom: '1px solid var(--layout-border-color)',
              background: 'var(--primary-surface-color)',
            }}>
              <div style={{ width: COL_WIDTHS.check, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                <Checkbox />
              </div>
              {(['name', 'role', 'assignee', 'status', 'priority', 'due', 'source'] as const).map(key => (
                <div key={key} style={{
                  width: COL_WIDTHS[key], flexShrink: 0, height: '100%',
                  display: 'flex', alignItems: 'center',
                  justifyContent: (['assignee', 'due', 'source'] as string[]).includes(key) ? 'center' : 'flex-start',
                  padding: (['assignee', 'due', 'source'] as string[]).includes(key) ? 0 : '0 var(--space-8)',
                  borderRight: '1px solid var(--layout-border-color)',
                  fontFamily: ff, fontSize: 12, fontWeight: 600, color: 'var(--secondary-text-color)',
                }}>
                  {{ name: 'Candidate', role: 'Role', assignee: 'Assignee', status: 'Status', priority: 'Priority', due: 'Due date', source: 'Source' }[key]}
                </div>
              ))}
              <div style={{ flex: 1, height: '100%', borderRight: '1px solid var(--layout-border-color)' }} />
            </div>

            {/* Data rows */}
            {group.rows.map((row) => {
              const assignee = PERSONA.teamMembers.find(t => t.name === row.assignee);
              return (
                <div
                  key={row.id}
                  style={{
                    height: 36, display: 'flex', alignItems: 'center',
                    borderLeft: `3px solid ${group.groupColor}`,
                    borderBottom: '1px solid var(--layout-border-color)',
                    background: 'var(--primary-background-color)',
                  }}
                >
                  {/* Checkbox */}
                  <div style={{ width: COL_WIDTHS.check, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                    <Checkbox />
                  </div>

                  {/* Name */}
                  <div style={{
                    width: COL_WIDTHS.name, flexShrink: 0, height: '100%',
                    display: 'flex', alignItems: 'center', padding: '0 var(--space-8)',
                    borderRight: '1px solid var(--layout-border-color)',
                    fontFamily: ff, fontSize: 14, fontWeight: 400, color: 'var(--primary-text-color)',
                  }}>
                    {row.name}
                  </div>

                  {/* Role */}
                  <div style={{
                    width: COL_WIDTHS.role, flexShrink: 0, height: '100%',
                    display: 'flex', alignItems: 'center', padding: '0 var(--space-8)',
                    borderRight: '1px solid var(--layout-border-color)',
                    fontFamily: ff, fontSize: 14, fontWeight: 400, color: 'var(--secondary-text-color)',
                  }}>
                    {row.role}
                  </div>

                  {/* Assignee */}
                  <div style={{
                    width: COL_WIDTHS.assignee, flexShrink: 0, height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: '1px solid var(--layout-border-color)',
                  }}>
                    {assignee ? (
                      <Avatar initials={assignee.initials} color={assignee.color} size={26} />
                    ) : (
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        border: '1.5px dashed var(--ui-border-color)', opacity: 0.4,
                      }} />
                    )}
                  </div>

                  {/* Status */}
                  <div style={{ width: COL_WIDTHS.status, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                    <CellFill label={row.status} bg={row.statusColor} />
                  </div>

                  {/* Priority */}
                  <div style={{ width: COL_WIDTHS.priority, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                    <CellFill label={row.priority} bg={row.priorityColor} />
                  </div>

                  {/* Due */}
                  <div style={{
                    width: COL_WIDTHS.due, flexShrink: 0, height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: '1px solid var(--layout-border-color)',
                    fontFamily: ff, fontSize: 14, fontWeight: row.overdue ? 600 : 400,
                    color: row.overdue ? '#E2445C' : 'var(--secondary-text-color)',
                  }}>
                    {row.dueDate}
                  </div>

                  {/* Source */}
                  <div style={{
                    width: COL_WIDTHS.source, flexShrink: 0, height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: '1px solid var(--layout-border-color)',
                    fontFamily: ff, fontSize: 14, fontWeight: 400, color: 'var(--secondary-text-color)',
                  }}>
                    {row.source}
                  </div>

                  <div style={{ flex: 1, height: '100%', borderRight: '1px solid var(--layout-border-color)' }} />
                </div>
              );
            })}

            {/* Add item */}
            <div style={{
              height: 36, display: 'flex', alignItems: 'center',
              borderLeft: `3px solid ${group.groupColor}`,
              borderBottom: '1px solid var(--layout-border-color)',
              paddingLeft: 'var(--space-12)', gap: 6, cursor: 'pointer',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-surface-color)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <Plus size={13} color="var(--secondary-text-color)" />
              <span style={{ fontFamily: ff, fontSize: 13, color: 'var(--secondary-text-color)' }}>+ Add Task</span>
            </div>
          </div>
        ))}
      </div>
    </ClassicShell>
  );
}
