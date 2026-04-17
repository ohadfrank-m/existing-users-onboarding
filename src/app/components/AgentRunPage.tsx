import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot, Sparkles, Check, ArrowRight, ChevronDown, Plus,
} from 'lucide-react';
import { PERSONA, RECRUITMENT_DATA } from '../data';
import { SidekickIcon } from './SidekickIcon';

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

const AiGradientIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#agGrad)" />
    <defs>
      <linearGradient id="agGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB275D" />
        <stop offset="33%" stopColor="#FFCC00" />
        <stop offset="66%" stopColor="#00CA72" />
        <stop offset="100%" stopColor="#8181FF" />
      </linearGradient>
    </defs>
  </svg>
);

interface AgentAction {
  id: number;
  text: string;
  rowId: number;
  field: 'priority' | 'assignee' | 'status';
  newValue: string;
  newColor?: string;
}

const AGENT_ACTIONS: AgentAction[] = [
  { id: 1, text: 'Setting priority for Maya Ben-Ari → High (strong portfolio match)', rowId: 1, field: 'priority', newValue: 'High', newColor: '#E2445C' },
  { id: 2, text: 'Assigning Maya Ben-Ari → Noa Goldstein (design roles)', rowId: 1, field: 'assignee', newValue: 'Noa Goldstein' },
  { id: 3, text: 'Setting priority for Liam Foster → High (referred candidate)', rowId: 2, field: 'priority', newValue: 'High', newColor: '#E2445C' },
  { id: 4, text: 'Assigning Liam Foster → Tal Mizrahi (engineering roles)', rowId: 2, field: 'assignee', newValue: 'Tal Mizrahi' },
  { id: 5, text: 'Setting priority for Priya Kapoor → Medium', rowId: 3, field: 'priority', newValue: 'Medium', newColor: '#FDAB3D' },
  { id: 6, text: 'Assigning Priya Kapoor → Dan Shapiro', rowId: 3, field: 'assignee', newValue: 'Dan Shapiro' },
  { id: 7, text: 'Moving Maya Ben-Ari → Phone Screen', rowId: 1, field: 'status', newValue: 'Phone Screen', newColor: '#579BFC' },
  { id: 8, text: 'Setting priority for James O\'Connor → Medium', rowId: 4, field: 'priority', newValue: 'Medium', newColor: '#FDAB3D' },
  { id: 9, text: 'Assigning Sarah Kim → Noa Goldstein (marketing)', rowId: 5, field: 'assignee', newValue: 'Noa Goldstein' },
  { id: 10, text: 'Setting priority for Alex Petrov → High (referral)', rowId: 6, field: 'priority', newValue: 'High', newColor: '#E2445C' },
];

const COL_WIDTHS = { check: 40, name: 200, role: 160, assignee: 64, status: 152, priority: 120, due: 90 };

export function AgentRunPage() {
  const navigate = useNavigate();
  const [agentState, setAgentState] = useState<'suggest' | 'running' | 'done'>('suggest');
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  const [currentAction, setCurrentAction] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);
  const skName = localStorage.getItem('sidekick_name') || 'Sidekick';

  const boardData = RECRUITMENT_DATA[0].rows.map(row => {
    const applied: Record<string, string> = {};
    for (const actionId of completedActions) {
      const action = AGENT_ACTIONS.find(a => a.id === actionId);
      if (action && action.rowId === row.id) {
        if (action.field === 'priority') { applied.priority = action.newValue; applied.priorityColor = action.newColor || ''; }
        else if (action.field === 'assignee') { applied.assignee = action.newValue; }
        else if (action.field === 'status') { applied.status = action.newValue; applied.statusColor = action.newColor || row.statusColor; }
      }
    }
    return {
      ...row,
      priority: applied.priority ?? row.priority,
      priorityColor: applied.priorityColor ?? row.priorityColor,
      assignee: applied.assignee ?? row.assignee,
      status: applied.status ?? row.status,
      statusColor: applied.statusColor ?? row.statusColor,
    };
  });

  useEffect(() => {
    if (agentState !== 'running') return;
    if (currentAction >= AGENT_ACTIONS.length) {
      setTimeout(() => setAgentState('done'), 800);
      return;
    }
    const timer = setTimeout(() => {
      setCompletedActions(prev => [...prev, AGENT_ACTIONS[currentAction].id]);
      setCurrentAction(prev => prev + 1);
    }, 600 + Math.random() * 400);
    return () => clearTimeout(timer);
  }, [agentState, currentAction]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [completedActions]);

  const group = RECRUITMENT_DATA[0];

  return (
    <div style={{
      width: '100vw', height: '100vh', background: 'var(--primary-background-color)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff,
    }}>
      {/* Top bar */}
      <div style={{
        height: 48, flexShrink: 0, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 18px', borderBottom: '1px solid var(--ui-background-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <AiGradientIcon size={20} />
          <span style={{ fontFamily: fp, fontWeight: 600, fontSize: 15, color: 'var(--primary-text-color)' }}>monday</span>
          <span style={{ fontSize: 11, color: 'var(--ai-purple)', fontWeight: 500, background: '#F0EDFF', padding: '2px 6px', borderRadius: 3 }}>AI work platform</span>
        </div>
        <Avatar initials={PERSONA.teamMembers[0].initials} color={PERSONA.teamMembers[0].color} size={30} />
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Board area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Board header */}
          <div style={{ padding: '12px 24px 10px', borderBottom: '1px solid var(--layout-border-color)' }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, fontFamily: ff, color: 'var(--primary-text-color)' }}>Recruitment Pipeline</h2>
          </div>

          {/* Board */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 24px 24px' }}>
            {/* Group label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 0 6px 4px' }}>
              <ChevronDown size={15} strokeWidth={2.5} color={group.groupColor} />
              <span style={{ fontFamily: ff, fontSize: 15, fontWeight: 700, color: group.groupColor }}>{group.group}</span>
              <span style={{
                fontFamily: ff, fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)',
                background: 'var(--ui-background-color)', borderRadius: 10, padding: '1px 6px',
              }}>
                {boardData.length}
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
              {(['name', 'role', 'assignee', 'status', 'priority', 'due'] as const).map(key => (
                <div key={key} style={{
                  width: COL_WIDTHS[key], flexShrink: 0, height: '100%',
                  display: 'flex', alignItems: 'center',
                  justifyContent: (['assignee', 'due'] as string[]).includes(key) ? 'center' : 'flex-start',
                  padding: (['assignee', 'due'] as string[]).includes(key) ? 0 : '0 var(--space-8)',
                  borderRight: '1px solid var(--layout-border-color)',
                  fontFamily: ff, fontSize: 12, fontWeight: 600, color: 'var(--secondary-text-color)',
                }}>
                  {{ name: 'Candidate', role: 'Role', assignee: 'Assignee', status: 'Status', priority: 'Priority', due: 'Due date' }[key]}
                </div>
              ))}
              <div style={{ flex: 1, height: '100%', borderRight: '1px solid var(--layout-border-color)' }} />
            </div>

            {/* Data rows */}
            {boardData.map((row) => {
              const assignee = PERSONA.teamMembers.find(t => t.name === row.assignee);
              const justChanged = completedActions.length > 0 &&
                AGENT_ACTIONS.find(a => a.id === completedActions[completedActions.length - 1])?.rowId === row.id;
              return (
                <motion.div
                  key={row.id}
                  animate={justChanged ? { backgroundColor: ['rgba(129,129,255,0.1)', 'rgba(255,255,255,0)'] } : {}}
                  transition={{ duration: 1.5 }}
                  style={{
                    height: 36, display: 'flex', alignItems: 'center',
                    borderLeft: `3px solid ${group.groupColor}`,
                    borderBottom: '1px solid var(--layout-border-color)',
                  }}
                >
                  <div style={{ width: COL_WIDTHS.check, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                    <Checkbox />
                  </div>
                  <div style={{ width: COL_WIDTHS.name, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 var(--space-8)', borderRight: '1px solid var(--layout-border-color)', fontSize: 14, color: 'var(--primary-text-color)' }}>
                    {row.name}
                  </div>
                  <div style={{ width: COL_WIDTHS.role, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 var(--space-8)', borderRight: '1px solid var(--layout-border-color)', fontSize: 14, color: 'var(--secondary-text-color)' }}>
                    {row.role}
                  </div>
                  <div style={{ width: COL_WIDTHS.assignee, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)' }}>
                    {assignee ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                        <Avatar initials={assignee.initials} color={assignee.color} size={26} />
                      </motion.div>
                    ) : (
                      <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px dashed var(--ui-border-color)', opacity: 0.4 }} />
                    )}
                  </div>
                  <div style={{ width: COL_WIDTHS.status, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                    <CellFill label={row.status} bg={row.statusColor} />
                  </div>
                  <div style={{ width: COL_WIDTHS.priority, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                    {row.priority ? (
                      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }} style={{ height: '100%' }}>
                        <CellFill label={row.priority} bg={row.priorityColor} />
                      </motion.div>
                    ) : (
                      <CellFill label="" bg="" />
                    )}
                  </div>
                  <div style={{
                    width: COL_WIDTHS.due, flexShrink: 0, height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRight: '1px solid var(--layout-border-color)',
                    fontSize: 14, fontWeight: row.overdue ? 600 : 400,
                    color: row.overdue ? '#E2445C' : 'var(--secondary-text-color)',
                  }}>
                    {row.dueDate}
                  </div>
                  <div style={{ flex: 1, height: '100%', borderRight: '1px solid var(--layout-border-color)' }} />
                </motion.div>
              );
            })}

            {/* Add task */}
            <div style={{
              height: 36, display: 'flex', alignItems: 'center',
              borderLeft: `3px solid ${group.groupColor}`,
              borderBottom: '1px solid var(--layout-border-color)',
              paddingLeft: 'var(--space-12)', gap: 6,
            }}>
              <Plus size={13} color="var(--secondary-text-color)" />
              <span style={{ fontSize: 13, color: 'var(--secondary-text-color)' }}>+ Add Task</span>
            </div>
          </div>
        </div>

        {/* Sidekick panel */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 360, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#FAFBFD', borderLeft: '1px solid var(--layout-border-color)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
          }}
        >
          {/* Panel header */}
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid var(--layout-border-color)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <SidekickIcon size={18} />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)' }}>{skName}</span>
            <span style={{ fontSize: 11, color: 'var(--ai-purple)', background: '#F0EDFF', padding: '1px 6px', borderRadius: 3, fontWeight: 500 }}>AI Assistant</span>
          </div>

          {/* Panel body */}
          <div ref={logRef} style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <AnimatePresence>
              {agentState === 'suggest' && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <SidekickIcon size={16} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)', lineHeight: '20px' }}>
                        I found 8 new candidates without priorities or assignees.
                      </p>
                      <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--secondary-text-color)', lineHeight: '20px' }}>
                        Want me to run the <strong>Candidate Screener</strong> agent? It'll analyze each candidate, set priorities based on role fit, and assign them to the right recruiter.
                      </p>

                      <div style={{
                        background: '#fff', border: '1px solid var(--layout-border-color)',
                        borderRadius: 8, padding: '10px 14px', marginBottom: 12,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                          <Bot size={14} color="var(--agent-green)" />
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-text-color)' }}>Candidate Screener</span>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--secondary-text-color)', margin: 0, lineHeight: '17px' }}>
                          Analyzes candidate profiles, sets priority based on role match, and assigns to the right team member.
                        </p>
                      </div>

                      <button
                        onClick={() => setAgentState('running')}
                        style={{
                          width: '100%', background: 'var(--primary-color)', border: 'none',
                          borderRadius: 8, padding: '9px 18px', cursor: 'pointer',
                          fontFamily: ff, fontSize: 14, fontWeight: 600, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-hover-color)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary-color)')}
                      >
                        <Sparkles size={14} /> Run agent
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {(agentState === 'running' || agentState === 'done') && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <Bot size={14} color="var(--agent-green)" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-text-color)' }}>Candidate Screener</span>
                    {agentState === 'running' && (
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ fontSize: 12, color: 'var(--agent-green)', fontWeight: 500 }}
                      >
                        Running...
                      </motion.span>
                    )}
                    {agentState === 'done' && (
                      <span style={{ fontSize: 12, color: 'var(--agent-green)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Check size={12} /> Complete
                      </span>
                    )}
                  </div>

                  {AGENT_ACTIONS.slice(0, currentAction).map((action) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 6,
                        fontSize: 12, color: 'var(--secondary-text-color)',
                        padding: '3px 0', borderBottom: '1px solid rgba(0,0,0,0.03)',
                        lineHeight: '16px',
                      }}
                    >
                      <Check size={12} color="var(--agent-green)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{action.text}</span>
                    </motion.div>
                  ))}

                  {agentState === 'done' && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        background: '#F0FBF8', border: '1px solid #A8D4BC',
                        borderRadius: 8, padding: '14px', marginTop: 6,
                      }}
                    >
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)', margin: '0 0 6px' }}>
                        Done! Here's what I did:
                      </p>
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--secondary-text-color)', lineHeight: '22px' }}>
                        <li>Set priorities for 5 candidates</li>
                        <li>Assigned 4 candidates to recruiters</li>
                        <li>Moved 1 candidate to Phone Screen</li>
                      </ul>

                      <button
                        onClick={() => navigate('/home')}
                        style={{
                          width: '100%', background: 'var(--primary-color)', border: 'none',
                          borderRadius: 8, padding: '9px 18px', cursor: 'pointer',
                          fontFamily: ff, fontSize: 14, fontWeight: 600, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          marginTop: 14,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-hover-color)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary-color)')}
                      >
                        Explore your AI workspace <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
