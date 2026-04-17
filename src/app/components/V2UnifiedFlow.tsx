import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Bot, Sparkles, Search, Bell, Users, ChevronDown, ArrowRight,
  Home, LayoutGrid, Inbox, Star, MoreHorizontal, Filter, ArrowUpDown,
  Eye, Table2, Clock, MessageSquare, HelpCircle, User,
  FileText, X, Check, Calendar, Zap,
} from 'lucide-react';
import { PERSONA, RECRUITMENT_DATA } from '../data';
import { SidekickIcon } from './SidekickIcon';
import { AICentricIconRail, AICentricSidebar } from './AICentricNav';

const ff = 'Figtree, sans-serif';
const fp = 'Poppins, sans-serif';

const AiGradientIcon = ({ size = 20, id = 'v2G' }: { size?: number; id?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill={`url(#${id})`} />
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" /><stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" />
      </linearGradient>
    </defs>
  </svg>
);

const AVATAR_OPTS = [
  { id: 'star', emoji: '✦', bg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' },
  { id: 'bot', emoji: '🤖', bg: 'linear-gradient(135deg, #00C875 0%, #00A35C 100%)' },
  { id: 'sparkle', emoji: '⚡', bg: 'linear-gradient(135deg, #FDAB3D 0%, #E68A1A 100%)' },
];

const ICON_RAIL = [
  { icon: <Home size={18} />, label: 'Home' },
  { icon: <LayoutGrid size={18} />, label: 'Apps' },
  { icon: <Search size={18} />, label: 'Search' },
  { icon: <Clock size={18} />, label: 'My work' },
  { icon: <Inbox size={18} />, label: 'Inbox' },
  { icon: <Star size={18} />, label: 'Favorites' },
];

const SIDEBAR_AGENTS = [
  { name: 'Screening Agent', emoji: '🔍', color: '#00C875' },
  { name: 'Scheduling Agent', emoji: '📅', color: '#579BFC' },
  { name: 'Sourcing Agent', emoji: '🎯', color: '#FDAB3D' },
];

interface AgentAction {
  id: number; text: string; rowId: number;
  field: 'priority' | 'assignee' | 'status';
  newValue: string; newColor?: string;
}

const AGENT_ACTIONS: AgentAction[] = [
  { id: 1, text: 'Screening Maya Ben-Ari → Priority: High (strong portfolio, 7 days overdue)', rowId: 1, field: 'priority', newValue: 'High', newColor: '#E2445C' },
  { id: 2, text: 'Assigning Maya Ben-Ari → Noa Goldstein (design roles)', rowId: 1, field: 'assignee', newValue: 'Noa Goldstein' },
  { id: 3, text: 'Screening Liam Foster → Priority: High (referred, engineering fit)', rowId: 2, field: 'priority', newValue: 'High', newColor: '#E2445C' },
  { id: 4, text: 'Assigning Liam Foster → Tal Mizrahi (engineering)', rowId: 2, field: 'assignee', newValue: 'Tal Mizrahi' },
  { id: 5, text: 'Screening Priya Kapoor → Priority: Medium (good match)', rowId: 3, field: 'priority', newValue: 'Medium', newColor: '#FDAB3D' },
  { id: 6, text: 'Assigning Priya Kapoor → Dan Shapiro', rowId: 3, field: 'assignee', newValue: 'Dan Shapiro' },
  { id: 7, text: 'Moving Maya Ben-Ari → Phone Screen (auto-advanced)', rowId: 1, field: 'status', newValue: 'Phone Screen', newColor: '#579BFC' },
  { id: 8, text: 'Screening James O\'Connor → Priority: Medium', rowId: 4, field: 'priority', newValue: 'Medium', newColor: '#FDAB3D' },
  { id: 9, text: 'Assigning Sarah Kim → Noa Goldstein (marketing)', rowId: 5, field: 'assignee', newValue: 'Noa Goldstein' },
  { id: 10, text: 'Screening Alex Petrov → Priority: High (referral)', rowId: 6, field: 'priority', newValue: 'High', newColor: '#E2445C' },
];

function RainbowHighlight({ active, children, style }: { active: boolean; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      {active && <div style={{ position: 'absolute', inset: -3, borderRadius: 10, background: 'linear-gradient(135deg, #FB275D, #FFCC00, #00CA72, #8181FF)', zIndex: -1, opacity: 0.7, animation: 'rainbowPulse 2s ease-in-out infinite' }} />}
      {children}
    </div>
  );
}

/*
  PHASES — single continuous flow:
  p1→p2→p3→p4→p5 = personalization
  r-sk = sidekick migrates right
  r-topbar = top bar
  r-board = board loads
  r-sidebar = sidebar + agents
  agent-suggest = sidekick proposes running agent
  agent-running = agent executes, cells update
  agent-done = summary + before/after flash
  whats-next = timeline
*/

function useStreamText(text: string, speed = 45, delay = 0, enabled = true, instant = false) {
  const [displayed, setDisplayed] = useState(instant ? text : '');
  const [done, setDone] = useState(instant);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tmRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (instant) { setDisplayed(text); setDone(true); return; }
    if (!enabled) { setDisplayed(''); setDone(false); return; }
    setDisplayed(''); setDone(false);
    const words = text.split(' '); let i = 0;
    tmRef.current = setTimeout(() => {
      ivRef.current = setInterval(() => { i++; setDisplayed(words.slice(0, i).join(' ')); if (i >= words.length) { if (ivRef.current) clearInterval(ivRef.current); setDone(true); } }, speed);
    }, delay);
    return () => { if (tmRef.current) clearTimeout(tmRef.current); if (ivRef.current) clearInterval(ivRef.current); };
  }, [text, speed, delay, enabled, instant]);
  return { displayed, done };
}

function TypingDots() {
  return <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>{[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--secondary-text-color)', animation: 'dotPulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />)}</div>;
}
function AIMsg({ text, enabled, icon }: { text: string; enabled: boolean; icon?: React.ReactNode }) {
  if (!enabled) return null;
  return <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>{icon || <AiGradientIcon size={18} id={`ai${Math.random().toString(36).slice(2, 6)}`} />}{text ? <span style={{ fontFamily: ff, fontSize: 15, fontWeight: 500, lineHeight: '23px', color: 'var(--primary-text-color)' }}>{text}</span> : <TypingDots />}</div>;
}
function AISub({ text, enabled }: { text: string; enabled: boolean }) {
  if (!enabled) return null;
  return text ? <span style={{ fontFamily: ff, fontSize: 14, lineHeight: '22px', color: 'var(--primary-text-color)', paddingLeft: 26, display: 'block' }}>{text}</span> : <div style={{ paddingLeft: 26 }}><TypingDots /></div>;
}
function UserBubble({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 8 }}><div style={{ maxWidth: 360, background: 'var(--primary-surface-color)', borderRadius: '12px 12px 2px 12px', padding: '9px 14px', fontFamily: ff, fontSize: 14, color: 'var(--primary-text-color)', display: 'flex', alignItems: 'center', gap: 8 }}>{children}</div><div style={{ width: 28, height: 28, borderRadius: '50%', background: PERSONA.teamMembers[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ff, fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{PERSONA.teamMembers[0].initials}</div></div>;
}
function CellFill({ label, bg }: { label: string; bg: string }) {
  if (!label) return <div style={{ height: '100%', width: '100%' }} />;
  return <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, fontFamily: ff, fontSize: 12, color: '#fff', whiteSpace: 'nowrap' }}>{label}</div>;
}

/* Sidekick panel message */
function SKMsg({ name, text, opacity = 1 }: { name: string; text: string; opacity?: number }) {
  if (!text) return <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 14, opacity }}><AiGradientIcon size={16} id={`sk${Math.random().toString(36).slice(2,5)}`} /><div><span style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 2 }}>{name}</span><TypingDots /></div></div>;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 14, opacity }}>
      <AiGradientIcon size={16} id={`sk${Math.random().toString(36).slice(2,5)}`} />
      <div><span style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 2 }}>{name}</span><span style={{ fontFamily: ff, fontSize: 13, lineHeight: '20px' }}>{text}</span></div>
    </div>
  );
}

export function V2UnifiedFlow() {
  const [phase, setPhase] = useState('p1');
  const [nameInput, setNameInput] = useState('Sidekick');
  const [skName, setSkName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTS[0]);
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const skBottomRef = useRef<HTMLDivElement>(null);

  // Agent run state
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  const [currentAction, setCurrentAction] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const phaseOrder = ['p1','p2','p3','p4','p5','r-sk','r-topbar','r-board','r-sidebar','agent-suggest','agent-running','agent-done','whats-next'];
  const pastPhase = (t: string) => phaseOrder.indexOf(phase) > phaseOrder.indexOf(t);
  const atOrPast = (t: string) => phase === t || pastPhase(t);

  const isCentered = !atOrPast('r-sk');
  const showSKPanel = atOrPast('r-sk');
  const showTopBar = atOrPast('r-topbar');
  const showBoard = atOrPast('r-board');
  const showSidebar = atOrPast('r-sidebar');

  const handleNameSubmit = (def?: string) => { const n = def || nameInput.trim() || 'Sidekick'; setSkName(n); localStorage.setItem('sidekick_name', n); setPhase('p3'); };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (!f) return; setUploadedSrc(URL.createObjectURL(f)); setSelectedAvatar({ id: 'upload', emoji: '', bg: '' }); };
  const handleAvatarConfirm = () => { localStorage.setItem('sidekick_avatar_id', selectedAvatar.id); if (selectedAvatar.id === 'upload' && uploadedSrc) localStorage.setItem('sidekick_avatar_upload', uploadedSrc); setPhase('p5'); };

  // Personalization streaming
  const p1Done = phase !== 'p1';
  const s1a = useStreamText(`Hi ${PERSONA.firstName} — I'm your new AI Work Assistant.`, 50, 500, true, p1Done);
  const s1b = useStreamText("I'm going to give you superpowers and always be on your side so we can get more things done together.", 38, 300, s1a.done, p1Done);
  const s1c = useStreamText("As a first step — how about you give me a name?", 50, 400, s1b.done, p1Done);
  useEffect(() => { if (phase === 'p1' && s1c.done) setPhase('p2'); }, [phase, s1c.done]);

  const s3a = useStreamText(`${skName} — love it! Now pick a look for me.`, 42, 500, phase === 'p3' || pastPhase('p3'), pastPhase('p3'));
  useEffect(() => { if (phase === 'p3' && s3a.done) setPhase('p4'); }, [phase, s3a.done]);

  const s5a = useStreamText(`Perfect. I'm all set, ${PERSONA.firstName}. I've already been looking at your workspace — your Recruitment Pipeline has ${RECRUITMENT_DATA[0].rows.length} candidates waiting. Let me show you what's new.`, 32, 500, phase === 'p5' || pastPhase('p5'), pastPhase('p5'));

  // Sidekick panel streaming — data-specific messages
  const overdueCount = RECRUITMENT_DATA[0].rows.filter(r => r.overdue).length;
  const firstOverdue = RECRUITMENT_DATA[0].rows.find(r => r.overdue);

  const skSK = useStreamText(
    `This is where I live now — right here, always by your side. Think of me as your AI co-pilot for everything in monday. Let me show you around.`,
    32, 500, atOrPast('r-sk'), pastPhase('r-sk'));
  const skTopbar = useStreamText(
    `The header is new — monday is now an AI work platform. Notice the "AI Sidekick" button up there? That's me. Anyone on your team can reach me from anywhere.`,
    32, 500, atOrPast('r-topbar'), pastPhase('r-topbar'));
  const skBoard = useStreamText(
    `Here's your Recruitment Pipeline — ${RECRUITMENT_DATA[0].rows.length} candidates in "New applications." I noticed ${firstOverdue?.name || 'a candidate'} has been waiting since ${firstOverdue?.dueDate || 'last week'} — that's ${overdueCount} overdue items total. I can help with that.`,
    30, 500, atOrPast('r-board'), pastPhase('r-board'));
  const skSidebar = useStreamText(
    `On your left — your workspace, plus three AI agents I created for your hiring workflow. A Screening Agent that scores candidates, a Scheduling Agent for interviews, and a Sourcing Agent that finds talent. They're ready to go.`,
    30, 500, atOrPast('r-sidebar'), pastPhase('r-sidebar'));
  const skSuggest = useStreamText(
    `Here's what I'd do right now: run the Screening Agent on those ${RECRUITMENT_DATA[0].rows.length} unscreened candidates. It'll analyze each one, set priorities based on role fit, and assign them to the right recruiter. Takes about 10 seconds. Want to try?`,
    28, 500, phase === 'agent-suggest', false);
  const skDone = useStreamText(
    `Done. ${completedActions.length} updates in 10 seconds — priorities set, candidates assigned, one auto-advanced to Phone Screen. That used to take your team 30 minutes.`,
    30, 500, phase === 'agent-done', false);
  const skNext = useStreamText(
    `That was just the Screening Agent. Here's what your next week looks like with AI:`,
    34, 500, phase === 'whats-next', false);

  const allStreams = [
    { key: 'r-sk', stream: skSK },
    { key: 'r-topbar', stream: skTopbar },
    { key: 'r-board', stream: skBoard },
    { key: 'r-sidebar', stream: skSidebar },
    { key: 'agent-suggest', stream: skSuggest },
  ];

  // Auto-advance reveal phases
  useEffect(() => {
    const timers: Record<string, number> = { 'r-sk': 5500, 'r-topbar': 5500, 'r-board': 6000, 'r-sidebar': 6500 };
    const next: Record<string, string> = { 'r-sk': 'r-topbar', 'r-topbar': 'r-board', 'r-board': 'r-sidebar', 'r-sidebar': 'agent-suggest' };
    if (timers[phase]) { const t = setTimeout(() => setPhase(next[phase]), timers[phase]); return () => clearTimeout(t); }
  }, [phase]);

  // Agent execution
  useEffect(() => {
    if (phase !== 'agent-running') return;
    if (currentAction >= AGENT_ACTIONS.length) {
      setTimeout(() => { setShowBeforeAfter(true); setTimeout(() => { setShowBeforeAfter(false); setPhase('agent-done'); }, 1800); }, 600);
      return;
    }
    const timer = setTimeout(() => {
      setCompletedActions(prev => [...prev, AGENT_ACTIONS[currentAction].id]);
      setCurrentAction(prev => prev + 1);
    }, 500 + Math.random() * 400);
    return () => clearTimeout(timer);
  }, [phase, currentAction]);

  // Auto-advance from agent-done to whats-next
  useEffect(() => {
    if (phase === 'agent-done' && skDone.done) {
      const t = setTimeout(() => setPhase('whats-next'), 2500);
      return () => clearTimeout(t);
    }
  }, [phase, skDone.done]);

  // Scroll
  useEffect(() => { setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 350); }, [phase]);
  useEffect(() => { if (showSKPanel) setTimeout(() => skBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 500); }, [phase, completedActions.length]);

  const group = RECRUITMENT_DATA[0];
  const rows = group.rows.slice(0, 8);

  // Apply agent actions to board data
  const boardData = rows.map(row => {
    const applied: Record<string, string> = {};
    for (const actionId of completedActions) {
      const action = AGENT_ACTIONS.find(a => a.id === actionId);
      if (action && action.rowId === row.id) {
        if (action.field === 'priority') { applied.priority = action.newValue; applied.priorityColor = action.newColor || ''; }
        else if (action.field === 'assignee') { applied.assignee = action.newValue; }
        else if (action.field === 'status') { applied.status = action.newValue; applied.statusColor = action.newColor || row.statusColor; }
      }
    }
    return { ...row, priority: applied.priority ?? row.priority, priorityColor: applied.priorityColor ?? row.priorityColor, assignee: applied.assignee ?? row.assignee, status: applied.status ?? row.status, statusColor: applied.statusColor ?? row.statusColor };
  });

  const renderAvatar = (opt: typeof AVATAR_OPTS[0]) => {
    if (opt.id === 'upload' && uploadedSrc) return <img src={uploadedSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }} />;
    return <div style={{ width: '100%', height: '100%', borderRadius: 14, background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{opt.emoji}</div>;
  };

  const displayRows = showBeforeAfter ? rows : boardData;

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#F6F7FB', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff }}>
      <style>{`
        @keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
        @keyframes rainbowPulse { 0%, 100% { opacity: 0.5; filter: blur(4px); } 50% { opacity: 0.85; filter: blur(6px); } }
      `}</style>

      {/* Before/after flash overlay */}
      <AnimatePresence>
        {showBeforeAfter && (
          <motion.div key="ba" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.02, opacity: 0 }}
              style={{ background: '#fff', borderRadius: 16, padding: '32px 40px', textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
              <AiGradientIcon size={36} id="baIcon" />
              <h2 style={{ fontFamily: fp, fontSize: 22, fontWeight: 600, margin: '12px 0 4px' }}>Before → After</h2>
              <p style={{ fontFamily: ff, fontSize: 14, color: 'var(--secondary-text-color)', margin: 0 }}>10 seconds. {completedActions.length} updates. Zero manual work.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP BAR */}
      {showTopBar ? (
        <RainbowHighlight active={phase === 'r-topbar'} style={{ zIndex: 20, flexShrink: 0 }}>
          <motion.div initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 44, background: '#292F4C', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="16" r="2.5" fill="#FB275D"/><circle cx="12" cy="16" r="2.5" fill="#FFCC00"/><circle cx="19" cy="16" r="2.5" fill="#00CA72"/><ellipse cx="5" cy="8" rx="2" ry="4.5" fill="#FB275D" transform="rotate(-8 5 8)"/><ellipse cx="12" cy="8" rx="2" ry="4.5" fill="#FFCC00"/><ellipse cx="19" cy="8" rx="2" ry="4.5" fill="#00CA72" transform="rotate(8 19 8)"/></svg>
              <span style={{ fontFamily: fp, fontWeight: 600, fontSize: 14, color: '#fff' }}>monday</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>work management</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '5px 14px', width: 200 }}>
                <Search size={13} color="rgba(255,255,255,0.5)" /><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Search</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '4px 12px' }}>
                <AiGradientIcon size={14} id="skBtnV2" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>AI Sidekick</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bell size={16} color="rgba(255,255,255,0.6)" /><MessageSquare size={16} color="rgba(255,255,255,0.6)" /><HelpCircle size={16} color="rgba(255,255,255,0.6)" />
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: PERSONA.teamMembers[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>{PERSONA.teamMembers[0].initials}</div>
            </div>
          </motion.div>
        </RainbowHighlight>
      ) : (
        <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid var(--ui-background-color)', background: '#fff' }}>
          <AiGradientIcon size={20} id="tb0v2" /><span style={{ fontFamily: fp, fontWeight: 600, fontSize: 15, color: 'var(--primary-text-color)', marginLeft: 6 }}>monday</span>
        </div>
      )}

      {/* BODY */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* ICON RAIL — AI-Centric Navigation */}
        {showSidebar && (
          <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 52, opacity: 1 }} transition={{ duration: 0.4 }}
            style={{ flexShrink: 0, zIndex: 10, overflow: 'hidden' }}>
            <AICentricIconRail animate />
          </motion.div>
        )}

        {/* SIDEBAR */}
        {showSidebar && (
          <RainbowHighlight active={phase === 'r-sidebar'} style={{ flexShrink: 0, zIndex: phase === 'r-sidebar' ? 25 : 10 }}>
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 230, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden', height: '100%' }}>
              <AICentricSidebar
                animate
                agents={SIDEBAR_AGENTS}
                boards={[
                  { name: 'Recruitment Pipeline', active: true },
                  { name: 'Employee Onboarding' },
                  { name: 'Team Directory' },
                ]}
              />
            </motion.div>
          </RainbowHighlight>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Centered chat */}
          {isCentered && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', overflowY: 'auto', padding: '40px 24px 60px', zIndex: 5 }}>
              <div style={{ width: 500, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <AIMsg text={s1a.displayed} enabled={true} />
                {s1a.done && <AISub text={s1b.displayed} enabled={true} />}
                {s1b.done && <AISub text={s1c.displayed} enabled={true} />}
                <AnimatePresence mode="wait">
                  {phase === 'p2' && (
                    <motion.div key="nc" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ borderRadius: 12, padding: '16px 20px', background: '#fff', boxShadow: '0 2px 12px rgba(0,19,85,0.05)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: 8, padding: '8px 12px' }}><input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleNameSubmit(); }} placeholder="Sidekick" maxLength={32} autoFocus style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: ff, fontSize: 15, color: 'var(--primary-text-color)' }} /></div>
                      <button onClick={() => handleNameSubmit()} style={{ width: '100%', height: 42, background: 'var(--primary-color)', border: 'none', borderRadius: 4, color: '#fff', fontFamily: ff, fontSize: 15, cursor: 'pointer' }}>Continue</button>
                      <div style={{ textAlign: 'center' }}><button onClick={() => handleNameSubmit('Sidekick')} style={{ background: 'none', border: 'none', fontFamily: ff, fontSize: 13, color: 'var(--secondary-text-color)', cursor: 'pointer' }}>skip</button></div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {pastPhase('p2') && <UserBubble>{skName}</UserBubble>}
                {pastPhase('p2') && <AIMsg text={s3a.displayed} enabled={true} />}
                <AnimatePresence mode="wait">
                  {phase === 'p4' && (
                    <motion.div key="ac" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ borderRadius: 12, padding: '16px 20px', background: '#fff', boxShadow: '0 2px 12px rgba(0,19,85,0.05)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {AVATAR_OPTS.map(opt => <button key={opt.id} onClick={() => setSelectedAvatar(opt)} style={{ width: 64, height: 64, borderRadius: 14, padding: 3, border: `2px solid ${selectedAvatar.id === opt.id ? 'var(--primary-color)' : 'var(--ui-border-color)'}`, background: selectedAvatar.id === opt.id ? 'var(--primary-surface-color)' : '#F6F7FB', cursor: 'pointer', overflow: 'hidden' }}>{renderAvatar(opt)}</button>)}
                        <button onClick={() => fileInputRef.current?.click()} style={{ width: 64, height: 64, borderRadius: 14, border: '2px dashed var(--ui-border-color)', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}><Plus size={16} color="var(--secondary-text-color)" /><span style={{ fontSize: 9, color: 'var(--secondary-text-color)' }}>Upload</span></button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                      </div>
                      <button onClick={handleAvatarConfirm} style={{ width: '100%', height: 42, background: 'var(--primary-color)', border: 'none', borderRadius: 4, color: '#fff', fontFamily: ff, fontSize: 15, cursor: 'pointer' }}>Looks good</button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {pastPhase('p4') && <UserBubble><span style={{ fontSize: 20 }}>{selectedAvatar.emoji || '📷'}</span> This one!</UserBubble>}
                {pastPhase('p4') && <AIMsg text={s5a.displayed} enabled={true} />}
                {phase === 'p5' && s5a.done && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => setPhase('r-sk')} style={{ background: 'var(--primary-color)', border: 'none', borderRadius: 10, padding: '14px 36px', cursor: 'pointer', fontFamily: ff, fontSize: 16, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(0,115,234,0.35)' }}>
                      Ready? Let's go <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}
                <div ref={isCentered ? bottomRef : undefined} style={{ height: 1 }} />
              </div>
            </div>
          )}

          {/* BOARD — agent runs HERE, no page navigation */}
          <AnimatePresence>
            {showBoard && (
              <RainbowHighlight active={phase === 'r-board'} style={{ position: 'absolute', top: 0, left: 0, right: showSKPanel ? 360 : 0, bottom: 0, zIndex: phase === 'r-board' ? 25 : 5, display: 'flex', transition: 'right 0.6s ease' }}>
                <motion.div key="board" initial={{ opacity: 0, y: 16 }} animate={{ opacity: showBeforeAfter ? 0.4 : 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ flex: 1, background: '#fff', overflow: 'hidden', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', boxShadow: '0 4px 32px rgba(0,19,85,0.08)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '14px 20px 0', borderBottom: '1px solid var(--layout-border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>Recruitment Pipeline</span><ChevronDown size={14} color="var(--secondary-text-color)" />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#F6F7FB', borderRadius: 6, padding: '3px 10px' }}><LayoutGrid size={12} color="var(--secondary-text-color)" /><span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Overview</span></div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ display: 'flex' }}>{PERSONA.teamMembers.slice(0, 3).map((tm, i) => <div key={tm.initials} style={{ marginLeft: i > 0 ? -5 : 0, width: 24, height: 24, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', border: '2px solid #fff', zIndex: 3 - i }}>{tm.initials}</div>)}</div>
                        <span style={{ fontSize: 12, color: 'var(--primary-color)', fontWeight: 500 }}>Invite</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: -1 }}>
                      {['Main table', 'Gantt', 'Kanban'].map((v, i) => <span key={v} style={{ fontSize: 13, color: i === 0 ? 'var(--primary-text-color)' : 'var(--secondary-text-color)', fontWeight: i === 0 ? 600 : 400, padding: '8px 14px', borderBottom: i === 0 ? '2px solid var(--primary-color)' : '2px solid transparent' }}>{v}</span>)}
                      <Plus size={14} color="var(--secondary-text-color)" style={{ marginLeft: 4 }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 20px', borderBottom: '1px solid var(--layout-border-color)' }}>
                    <div style={{ background: 'var(--primary-color)', borderRadius: 4, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 4, marginRight: 8 }}><Plus size={12} color="#fff" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>New task</span></div>
                    {['Search', 'Filter', 'Sort', 'Hide', 'Group By'].map(l => <span key={l} style={{ fontSize: 12, color: 'var(--secondary-text-color)', padding: '4px 8px' }}>{l}</span>)}
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0 4px' }}><ChevronDown size={13} color={group.groupColor} strokeWidth={2.5} /><span style={{ fontSize: 14, fontWeight: 700, color: group.groupColor }}>{group.group}</span><span style={{ fontSize: 10, color: 'var(--secondary-text-color)', background: 'var(--ui-background-color)', borderRadius: 8, padding: '0 5px' }}>{displayRows.length}</span></div>
                    <div style={{ height: 32, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${group.groupColor}`, borderTop: '1px solid var(--layout-border-color)', borderBottom: '1px solid var(--layout-border-color)', background: 'var(--primary-surface-color)' }}>
                      {[['', 32], ['Candidate', 170], ['Role', 130], ['Assignee', 56], ['Status', 120], ['Priority', 100], ['Due', 70]].map(([l, w]) => (
                        <div key={String(l)} style={{ width: Number(w), flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: l === '' || l === 'Assignee' || l === 'Due' ? 'center' : 'flex-start', padding: l === '' || l === 'Assignee' || l === 'Due' ? 0 : '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)' }}>{String(l)}</div>
                      ))}
                    </div>
                    {displayRows.map((row) => {
                      const a = PERSONA.teamMembers.find(t => t.name === row.assignee);
                      const justChanged = completedActions.length > 0 && AGENT_ACTIONS.find(act => act.id === completedActions[completedActions.length - 1])?.rowId === row.id;
                      return (
                        <motion.div key={row.id}
                          animate={justChanged ? { backgroundColor: ['rgba(129,129,255,0.12)', 'rgba(255,255,255,0)'] } : {}}
                          transition={{ duration: 1.5 }}
                          style={{ height: 32, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${group.groupColor}`, borderBottom: '1px solid var(--layout-border-color)' }}>
                          <div style={{ width: 32, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)' }}><div style={{ width: 13, height: 13, borderRadius: 2, border: '1.5px solid var(--ui-border-color)' }} /></div>
                          <div style={{ width: 170, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 13 }}>{row.name}</div>
                          <div style={{ width: 130, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, color: 'var(--secondary-text-color)' }}>{row.role}</div>
                          <div style={{ width: 56, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)' }}>
                            {a ? <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}><div style={{ width: 22, height: 22, borderRadius: '50%', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{a.initials}</div></motion.div> : <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1px dashed var(--ui-border-color)', opacity: 0.35 }} />}
                          </div>
                          <div style={{ width: 120, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}><CellFill label={row.status} bg={row.statusColor} /></div>
                          <div style={{ width: 100, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}>
                            {row.priority ? <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ height: '100%' }}><CellFill label={row.priority} bg={row.priorityColor} /></motion.div> : <CellFill label="" bg="" />}
                          </div>
                          <div style={{ width: 70, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, color: row.overdue ? '#E2445C' : 'var(--secondary-text-color)', fontWeight: row.overdue ? 600 : 400 }}>{row.dueDate}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </RainbowHighlight>
            )}
          </AnimatePresence>
        </div>

        {/* SIDEKICK PANEL */}
        <AnimatePresence>
          {showSKPanel && (
            <RainbowHighlight active={phase === 'r-sk'} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 55, width: 360 }}>
              <motion.div key="skP" initial={{ x: 380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 360, height: '100%', background: '#fff', borderLeft: '1px solid var(--layout-border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--layout-border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AiGradientIcon size={18} id="skHV2" /><span style={{ fontSize: 14, fontWeight: 600 }}>{skName || 'Sidekick'}</span><span style={{ fontSize: 10, color: 'var(--primary-color)', background: 'var(--primary-surface-color)', padding: '1px 6px', borderRadius: 3 }}>Beta</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><X size={14} color="var(--secondary-text-color)" /></div>
                </div>
                <div style={{ padding: '6px 16px', borderBottom: '1px solid var(--layout-border-color)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>
                  <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Recruitment Pipeline</span>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
                  {allStreams.map(({ key, stream }) => {
                    if (!atOrPast(key)) return null;
                    const isCurrent = phase === key;
                    return <motion.div key={key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: isCurrent ? 1 : 0.5, y: 0 }}><SKMsg name={skName || 'Sidekick'} text={stream.displayed} opacity={isCurrent ? 1 : 0.5} /></motion.div>;
                  })}

                  {/* Agent suggest */}
                  {phase === 'agent-suggest' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      <SKMsg name={skName || 'Sidekick'} text={skSuggest.displayed} />
                      {skSuggest.done && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                          <button onClick={() => setPhase('agent-running')}
                            style={{ width: '100%', background: 'var(--primary-color)', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontFamily: ff, fontSize: 14, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
                            <Sparkles size={14} /> Run Screening Agent
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Agent running log */}
                  {(phase === 'agent-running' || phase === 'agent-done' || phase === 'whats-next') && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <Bot size={14} color="var(--agent-green)" /><span style={{ fontSize: 13, fontWeight: 600 }}>Screening Agent</span>
                        {phase === 'agent-running' && <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: 12, color: 'var(--agent-green)', fontWeight: 500 }}>Running...</motion.span>}
                        {atOrPast('agent-done') && <span style={{ fontSize: 12, color: 'var(--agent-green)', display: 'flex', alignItems: 'center', gap: 3 }}><Check size={12} /> Complete</span>}
                      </div>
                      {AGENT_ACTIONS.slice(0, currentAction).map(action => (
                        <motion.div key={action.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11, color: 'var(--secondary-text-color)', padding: '2px 0', borderBottom: '1px solid rgba(0,0,0,0.03)', lineHeight: '15px' }}>
                          <Check size={11} color="var(--agent-green)" style={{ flexShrink: 0, marginTop: 2 }} /><span>{action.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Done summary */}
                  {(phase === 'agent-done' || phase === 'whats-next') && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 12 }}>
                      <SKMsg name={skName || 'Sidekick'} text={skDone.displayed} />
                    </motion.div>
                  )}

                  {/* What's next */}
                  {phase === 'whats-next' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      <SKMsg name={skName || 'Sidekick'} text={skNext.displayed} />
                      {skNext.done && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                          style={{ background: '#F6F7FB', borderRadius: 8, padding: '14px', marginTop: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>Your next 7 days</span>
                          {[
                            { icon: <Check size={14} color="var(--agent-green)" />, day: 'Today', text: `Screening Agent triaged ${RECRUITMENT_DATA[0].rows.length} candidates`, done: true },
                            { icon: <Calendar size={14} color="var(--primary-color)" />, day: 'Tomorrow', text: 'Auto-screen new applications as they come in' },
                            { icon: <Zap size={14} color="#FDAB3D" />, day: 'This week', text: 'Activate Interview Scheduler for top candidates' },
                            { icon: <Sparkles size={14} color="var(--ai-purple)" />, day: 'Ongoing', text: 'Daily digest of pipeline changes + agent activity' },
                          ].map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.12 }}
                              style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                              <div style={{ marginTop: 1, flexShrink: 0 }}>{item.icon}</div>
                              <div>
                                <span style={{ fontSize: 12, fontWeight: 600, display: 'block', color: item.done ? 'var(--agent-green)' : 'var(--primary-text-color)' }}>{item.day}</span>
                                <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>{item.text}</span>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                  <div ref={skBottomRef} style={{ height: 1 }} />
                </div>

                {/* Input */}
                <div style={{ padding: '10px 14px', borderTop: '1px solid var(--layout-border-color)' }}>
                  <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'var(--placeholder-color)' }}>{`Tell ${skName || 'Sidekick'} what you want to do...`}</span>
                    <AiGradientIcon size={14} id="skInV2" />
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--secondary-text-color)', marginTop: 4, display: 'block' }}>AI may be inaccurate, make sure to review it.</span>
                </div>
              </motion.div>
            </RainbowHighlight>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
