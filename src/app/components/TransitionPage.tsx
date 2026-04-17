import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Bot, Sparkles, Search, Bell, Users, ChevronDown, ArrowRight,
  Home, LayoutGrid, Inbox, Star, MoreHorizontal, Filter, ArrowUpDown,
  Eye, Table2, Hash, MessageSquare, HelpCircle, User, Clock,
  ChevronRight, FileText, Heart, Recycle, Folder, X,
} from 'lucide-react';
import { PERSONA, RECRUITMENT_DATA } from '../data';
import { SidekickIcon } from './SidekickIcon';

const ff = 'Figtree, sans-serif';
const fp = 'Poppins, sans-serif';

const AiGradientIcon = ({ size = 20, id = 'tG' }: { size?: number; id?: string }) => (
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
  { id: 'star', label: 'AI Star', emoji: '✦', bg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' },
  { id: 'bot', label: 'Helper Bot', emoji: '🤖', bg: 'linear-gradient(135deg, #00C875 0%, #00A35C 100%)' },
  { id: 'sparkle', label: 'Spark', emoji: '⚡', bg: 'linear-gradient(135deg, #FDAB3D 0%, #E68A1A 100%)' },
];

/* Icon rail items matching the actual monday.com UI */
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

function RainbowHighlight({ active, children, style }: { active: boolean; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ position: 'relative', ...style }}>
      {active && <div style={{ position: 'absolute', inset: -3, borderRadius: 10, background: 'linear-gradient(135deg, #FB275D, #FFCC00, #00CA72, #8181FF)', zIndex: -1, opacity: 0.7, animation: 'rainbowPulse 2s ease-in-out infinite' }} />}
      {children}
    </div>
  );
}

type Phase = string;
const REVEAL_STEPS: Record<string, { step: number; total: number; label: string }> = {
  'r-sidekick': { step: 1, total: 4, label: 'Your AI Assistant' },
  'r-topbar': { step: 2, total: 4, label: 'New platform header' },
  'r-board': { step: 3, total: 4, label: 'Your board' },
  'r-sidebar': { step: 4, total: 4, label: 'Workspace & Agents' },
};

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

export function TransitionPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('p1');
  const [nameInput, setNameInput] = useState('Sidekick');
  const [skName, setSkName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTS[0]);
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const skBottomRef = useRef<HTMLDivElement>(null);

  const phaseOrder = ['p1','p2','p3','p4','p5','r-sidekick','r-topbar','r-board','r-sidebar','settled'];
  const pastPhase = (t: string) => phaseOrder.indexOf(phase) > phaseOrder.indexOf(t);
  const atOrPast = (t: string) => phase === t || pastPhase(t);

  const isCentered = !atOrPast('r-sidekick');
  const showSKPanel = atOrPast('r-sidekick');
  const showTopBar = atOrPast('r-topbar');
  const showBoard = atOrPast('r-board');
  const showSidebar = atOrPast('r-sidebar');
  const isRevealing = ['r-sidekick','r-topbar','r-board','r-sidebar'].includes(phase);
  const revealInfo = REVEAL_STEPS[phase];

  const handleNameSubmit = (def?: string) => { const n = def || nameInput.trim() || 'Sidekick'; setSkName(n); localStorage.setItem('sidekick_name', n); setPhase('p3'); };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; setUploadedSrc(URL.createObjectURL(file)); setSelectedAvatar({ id: 'upload', label: 'Your photo', emoji: '', bg: '' }); };
  const handleAvatarConfirm = () => { localStorage.setItem('sidekick_avatar_id', selectedAvatar.id); if (selectedAvatar.id === 'upload' && uploadedSrc) localStorage.setItem('sidekick_avatar_upload', uploadedSrc); setPhase('p5'); };

  const p1Done = phase !== 'p1';
  const s1a = useStreamText(`Hi ${PERSONA.firstName} — I'm your new AI Work Assistant.`, 50, 500, true, p1Done);
  const s1b = useStreamText("I'm going to give you superpowers and always be on your side so we can get more things done together.", 38, 300, s1a.done, p1Done);
  const s1c = useStreamText("I'll be guiding you through the new monday. I already started creating a personalized guide for you.", 38, 300, s1b.done, p1Done);
  const s1d = useStreamText("As a first step — how about you give me a name?", 50, 400, s1c.done, p1Done);
  useEffect(() => { if (phase === 'p1' && s1d.done) setPhase('p2'); }, [phase, s1d.done]);

  const s3a = useStreamText(`${skName} — I like that! Now pick a look for me. I'll use it every time we talk.`, 42, 500, phase === 'p3' || pastPhase('p3'), pastPhase('p3'));
  useEffect(() => { if (phase === 'p3' && s3a.done) setPhase('p4'); }, [phase, s3a.done]);

  const s5a = useStreamText(`Perfect! I'm all set, ${PERSONA.firstName}. Now let me show you what's new — I'll walk you through each piece of your upgraded workspace.`, 34, 500, phase === 'p5' || pastPhase('p5'), pastPhase('p5'));

  useEffect(() => {
    const timers: Record<string, number> = { 'r-sidekick': 5000, 'r-topbar': 5000, 'r-board': 5500, 'r-sidebar': 5500 };
    const next: Record<string, string> = { 'r-sidekick': 'r-topbar', 'r-topbar': 'r-board', 'r-board': 'r-sidebar', 'r-sidebar': 'settled' };
    if (timers[phase]) { const t = setTimeout(() => setPhase(next[phase]), timers[phase]); return () => clearTimeout(t); }
  }, [phase]);

  const skMessages: Record<string, string> = {
    'r-sidekick': `This is my new home — right here on the right side, always available for you. Whenever you need help, ideas, or want to run an agent, I'm one click away. Let's keep going.`,
    'r-topbar': `Notice the new header — monday is now the AI work platform. Same product you love, now with AI built into everything.`,
    'r-board': `Your Recruitment Pipeline is loaded with all your data. Same board, same structure — but now AI-powered, with agents ready to help you manage candidates faster.`,
    'r-sidebar': `On your left — your workspace with all your boards, plus something new: your AI Agents. I've already created a Screening Agent, Scheduling Agent, and Sourcing Agent tailored to your hiring workflow.`,
  };

  const sSettled = useStreamText(`Everything is set up, ${PERSONA.firstName}. Your workspace, your board, your agents — all ready. Want to see what your Screening Agent can do with those ${RECRUITMENT_DATA[0].rows.length} unscreened candidates?`, 32, 600, phase === 'settled', false);

  useEffect(() => { setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 350); }, [phase]);
  useEffect(() => { if (showSKPanel) setTimeout(() => skBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 500); }, [phase]);

  const group = RECRUITMENT_DATA[0];
  const rows = group.rows.slice(0, 6);

  const renderAvatar = (opt: typeof AVATAR_OPTS[0]) => {
    if (opt.id === 'upload' && uploadedSrc) return <img src={uploadedSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }} />;
    return <div style={{ width: '100%', height: '100%', borderRadius: 14, background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{opt.emoji}</div>;
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#F6F7FB', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff }}>
      <style>{`
        @keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
        @keyframes rainbowPulse { 0%, 100% { opacity: 0.5; filter: blur(4px); } 50% { opacity: 0.85; filter: blur(6px); } }
      `}</style>

      {/* Progress pill */}
      <AnimatePresence>
        {revealInfo && (
          <motion.div key="progress" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: showTopBar ? 52 : 8, left: '50%', transform: 'translateX(-50%)', zIndex: 70, background: '#fff', borderRadius: 20, padding: '5px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontFamily: ff, fontSize: 12, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 8, transition: 'top 0.4s ease' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{revealInfo.step} of {revealInfo.total}</span><span>{revealInfo.label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ TOP BAR — dark, matching monday.com ═══ */}
      {showTopBar ? (
        <RainbowHighlight active={phase === 'r-topbar'} style={{ zIndex: 20, flexShrink: 0 }}>
          <motion.div initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 44, background: '#292F4C', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
            {/* Left — logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="16" r="2.5" fill="#FB275D"/><circle cx="12" cy="16" r="2.5" fill="#FFCC00"/><circle cx="19" cy="16" r="2.5" fill="#00CA72"/><ellipse cx="5" cy="8" rx="2" ry="4.5" fill="#FB275D" transform="rotate(-8 5 8)"/><ellipse cx="12" cy="8" rx="2" ry="4.5" fill="#FFCC00"/><ellipse cx="19" cy="8" rx="2" ry="4.5" fill="#00CA72" transform="rotate(8 19 8)"/></svg>
              <span style={{ fontFamily: fp, fontWeight: 600, fontSize: 14, color: '#fff' }}>monday</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>work management</span>
            </div>
            {/* Center — search + AI Sidekick */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '5px 14px', width: 200 }}>
                <Search size={13} color="rgba(255,255,255,0.5)" /><span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Search</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>
                <AiGradientIcon size={14} id="skBtn" />
                <span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>AI Sidekick</span>
              </div>
            </div>
            {/* Right — icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bell size={16} color="rgba(255,255,255,0.6)" />
              <MessageSquare size={16} color="rgba(255,255,255,0.6)" />
              <HelpCircle size={16} color="rgba(255,255,255,0.6)" />
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: PERSONA.teamMembers[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>{PERSONA.teamMembers[0].initials}</div>
            </div>
          </motion.div>
        </RainbowHighlight>
      ) : (
        <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid var(--ui-background-color)', background: '#fff' }}>
          <AiGradientIcon size={20} id="tb0" /><span style={{ fontFamily: fp, fontWeight: 600, fontSize: 15, color: 'var(--primary-text-color)', marginLeft: 6 }}>monday</span><span style={{ fontSize: 11, color: 'var(--ai-purple)', fontWeight: 500, background: '#F0EDFF', padding: '2px 6px', borderRadius: 3, marginLeft: 6 }}>AI work platform</span>
        </div>
      )}

      {/* ═══ BODY ═══ */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* ═══ LEFT ICON RAIL — matching monday.com ═══ */}
        {showSidebar && (
          <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 48, opacity: 1 }} transition={{ duration: 0.4 }}
            style={{ background: '#fff', borderRight: '1px solid var(--ui-background-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 2, flexShrink: 0, justifyContent: 'space-between', paddingBottom: 16, zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {ICON_RAIL.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 + i * 0.04 }}
                  style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: i === 0 ? 'var(--primary-color)' : 'var(--secondary-text-color)', background: i === 0 ? 'var(--nav-active-bg)' : 'transparent' }}>
                  {item.icon}
                </motion.div>
              ))}
            </div>
            {/* Bottom icons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-text-color)' }}><MoreHorizontal size={18} /></div>
              <div style={{ width: 34, height: 34, borderRadius: 7, background: 'var(--primary-text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                <Plus size={16} color="#fff" />
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ SECONDARY SIDEBAR — workspace tree ═══ */}
        {showSidebar && (
          <RainbowHighlight active={phase === 'r-sidebar'} style={{ flexShrink: 0, zIndex: phase === 'r-sidebar' ? 25 : 10 }}>
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: '#fff', borderRight: '1px solid var(--layout-border-color)', padding: '12px 8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
              {/* Workspace header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--secondary-text-color)' }}>Workspaces</span>
                <MoreHorizontal size={14} color="var(--secondary-text-color)" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px', background: '#F6F7FB', borderRadius: 6 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>N</div>
                <span style={{ fontSize: 12, fontWeight: 500 }}>Novella</span>
                <ChevronDown size={12} color="var(--secondary-text-color)" style={{ marginLeft: 'auto' }} />
              </div>

              {/* Agents */}
              <div style={{ paddingTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginBottom: 2 }}>
                  <Bot size={13} color="var(--agent-green)" /><span style={{ fontSize: 12, fontWeight: 600 }}>Agents</span>
                </div>
                {SIDEBAR_AGENTS.map((a, i) => (
                  <motion.div key={a.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px 4px 16px', borderRadius: 4, marginBottom: 1 }}>
                    <span style={{ fontSize: 12 }}>{a.emoji}</span>
                    <span style={{ fontSize: 12, color: 'var(--primary-text-color)' }}>{a.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Board tree */}
              <div style={{ borderTop: '1px solid var(--layout-border-color)', paddingTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginBottom: 2 }}>
                  <ChevronDown size={12} color="var(--secondary-text-color)" />
                  <span style={{ fontSize: 12, fontWeight: 600 }}>HR Department</span>
                </div>
                {[
                  { name: 'Recruitment Pipeline', active: true, indent: false },
                  { name: 'Interview tracker', active: false, indent: true },
                  { name: 'Candidate feedback', active: false, indent: true },
                  { name: 'Employee Onboarding', active: false, indent: false },
                  { name: 'Team Directory', active: false, indent: false },
                ].map((b) => (
                  <div key={b.name} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: `3px 6px 3px ${b.indent ? 28 : 14}px`, borderRadius: 4, marginBottom: 1,
                    background: b.active ? 'var(--primary-surface-color)' : 'transparent',
                  }}>
                    {b.indent ? <FileText size={12} color={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} /> :
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={b.active ? 'var(--primary-color)' : 'var(--secondary-text-color)'} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>}
                    <span style={{ fontSize: 12, color: b.active ? 'var(--primary-color)' : 'var(--primary-text-color)', fontWeight: b.active ? 600 : 400 }}>{b.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </RainbowHighlight>
        )}

        {/* ═══ MAIN CONTENT ═══ */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

          {/* Centered chat */}
          {isCentered && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', overflowY: 'auto', padding: '40px 24px 60px', zIndex: 5 }}>
              <div style={{ width: 500, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <AIMsg text={s1a.displayed} enabled={true} />
                {s1a.done && <AISub text={s1b.displayed} enabled={true} />}
                {s1b.done && <AISub text={s1c.displayed} enabled={true} />}
                {s1c.done && <AISub text={s1d.displayed} enabled={true} />}
                <AnimatePresence mode="wait">
                  {phase === 'p2' && (
                    <motion.div key="nc" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ borderRadius: 12, padding: '16px 20px', background: '#fff', boxShadow: '0 2px 12px rgba(0,19,85,0.05)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--ui-border-color)', borderRadius: 8, padding: '8px 12px' }}><input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && nameInput.trim()) handleNameSubmit(); }} placeholder="Sidekick" maxLength={32} autoFocus style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: ff, fontSize: 15, color: 'var(--primary-text-color)' }} /></div>
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
                        {AVATAR_OPTS.map(opt => { const sel = selectedAvatar.id === opt.id; return <button key={opt.id} onClick={() => setSelectedAvatar(opt)} style={{ width: 64, height: 64, borderRadius: 14, padding: 3, border: `2px solid ${sel ? 'var(--primary-color)' : 'var(--ui-border-color)'}`, background: sel ? 'var(--primary-surface-color)' : '#F6F7FB', cursor: 'pointer', overflow: 'hidden' }}>{renderAvatar(opt)}</button>; })}
                        <button onClick={() => fileInputRef.current?.click()} style={{ width: 64, height: 64, borderRadius: 14, border: '2px dashed var(--ui-border-color)', background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>{selectedAvatar.id === 'upload' && uploadedSrc ? <img src={uploadedSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} /> : <><Plus size={16} color="var(--secondary-text-color)" /><span style={{ fontSize: 9, color: 'var(--secondary-text-color)' }}>Upload</span></>}</button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                      </div>
                      <button onClick={handleAvatarConfirm} style={{ width: '100%', height: 42, background: 'var(--primary-color)', border: 'none', borderRadius: 4, color: '#fff', fontFamily: ff, fontSize: 15, cursor: 'pointer' }}>Looks good</button>
                      <div style={{ textAlign: 'center' }}><button onClick={handleAvatarConfirm} style={{ background: 'none', border: 'none', fontFamily: ff, fontSize: 13, color: 'var(--secondary-text-color)', cursor: 'pointer' }}>skip</button></div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {pastPhase('p4') && <UserBubble><span style={{ fontSize: 20 }}>{selectedAvatar.emoji || '📷'}</span> This one!</UserBubble>}
                {pastPhase('p4') && <AIMsg text={s5a.displayed} enabled={true} />}
                {phase === 'p5' && s5a.done && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => setPhase('r-sidekick')} style={{ background: 'var(--primary-color)', border: 'none', borderRadius: 10, padding: '14px 36px', cursor: 'pointer', fontFamily: ff, fontSize: 16, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(0,115,234,0.35)' }}>
                      Ready? Let's go <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}
                <div ref={isCentered ? bottomRef : undefined} style={{ height: 1 }} />
              </div>
            </div>
          )}

          {/* ═══ BOARD ═══ */}
          <AnimatePresence>
            {showBoard && (
              <RainbowHighlight active={phase === 'r-board'} style={{ position: 'absolute', top: 0, left: 0, right: showSKPanel ? 360 : 0, bottom: 0, zIndex: phase === 'r-board' ? 25 : 5, display: 'flex', transition: 'right 0.6s ease' }}>
                <motion.div key="board" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ flex: 1, background: '#fff', overflow: 'hidden', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', boxShadow: '0 4px 32px rgba(0,19,85,0.08)', display: 'flex', flexDirection: 'column' }}>
                  {/* Board header — matching monday UI */}
                  <div style={{ padding: '14px 20px 0', borderBottom: '1px solid var(--layout-border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 20, fontWeight: 600 }}>Recruitment Pipeline</span>
                        <ChevronDown size={14} color="var(--secondary-text-color)" />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#F6F7FB', borderRadius: 6, padding: '3px 10px' }}>
                          <LayoutGrid size={12} color="var(--secondary-text-color)" /><span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Overview</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ display: 'flex' }}>{PERSONA.teamMembers.slice(0, 3).map((tm, i) => <div key={tm.initials} style={{ marginLeft: i > 0 ? -5 : 0, width: 24, height: 24, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', border: '2px solid #fff', zIndex: 3 - i }}>{tm.initials}</div>)}</div>
                        <span style={{ fontSize: 12, color: 'var(--primary-color)', fontWeight: 500 }}>Invite</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: -1 }}>
                      {['Main table', 'Gantt', 'Kanban'].map((v, i) => (
                        <span key={v} style={{ fontSize: 13, color: i === 0 ? 'var(--primary-text-color)' : 'var(--secondary-text-color)', fontWeight: i === 0 ? 600 : 400, padding: '8px 14px', borderBottom: i === 0 ? '2px solid var(--primary-color)' : '2px solid transparent' }}>{v}</span>
                      ))}
                      <Plus size={14} color="var(--secondary-text-color)" style={{ marginLeft: 4 }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 20px', borderBottom: '1px solid var(--layout-border-color)' }}>
                    <div style={{ background: 'var(--primary-color)', borderRadius: 4, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 4, marginRight: 8 }}><Plus size={12} color="#fff" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>New task</span><ChevronDown size={10} color="rgba(255,255,255,0.6)" /></div>
                    {[<Search size={13} />, 'Search'].map((x, i) => i === 0 ? null : <span key={String(x)} style={{ fontSize: 12, color: 'var(--secondary-text-color)', padding: '4px 6px', display: 'flex', alignItems: 'center', gap: 3 }}><Search size={13} />{x}</span>)}
                    {['Filter', 'Sort', 'Hide', 'Group By'].map(l => <span key={l} style={{ fontSize: 12, color: 'var(--secondary-text-color)', padding: '4px 8px' }}>{l}</span>)}
                    <MoreHorizontal size={14} color="var(--secondary-text-color)" style={{ marginLeft: 'auto' }} />
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 0 4px' }}><ChevronDown size={13} color={group.groupColor} strokeWidth={2.5} /><span style={{ fontSize: 14, fontWeight: 700, color: group.groupColor }}>{group.group}</span><span style={{ fontSize: 10, color: 'var(--secondary-text-color)', background: 'var(--ui-background-color)', borderRadius: 8, padding: '0 5px' }}>{rows.length}</span></div>
                    <div style={{ height: 32, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${group.groupColor}`, borderTop: '1px solid var(--layout-border-color)', borderBottom: '1px solid var(--layout-border-color)', background: 'var(--primary-surface-color)' }}>
                      {[['', 32], ['Candidate', 180], ['Role', 140], ['Assignee', 56], ['Status', 130], ['Priority', 110], ['Due', 75]].map(([l, w]) => (
                        <div key={String(l)} style={{ width: Number(w), flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: l === '' || l === 'Assignee' || l === 'Due' ? 'center' : 'flex-start', padding: l === '' || l === 'Assignee' || l === 'Due' ? 0 : '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)' }}>{String(l)}</div>
                      ))}
                    </div>
                    {rows.map((row, i) => {
                      const a = PERSONA.teamMembers.find(t => t.name === row.assignee);
                      return (
                        <motion.div key={row.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}
                          style={{ height: 32, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${group.groupColor}`, borderBottom: '1px solid var(--layout-border-color)' }}>
                          <div style={{ width: 32, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)' }}><div style={{ width: 13, height: 13, borderRadius: 2, border: '1.5px solid var(--ui-border-color)' }} /></div>
                          <div style={{ width: 180, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 13 }}>{row.name}</div>
                          <div style={{ width: 140, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, color: 'var(--secondary-text-color)' }}>{row.role}</div>
                          <div style={{ width: 56, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)' }}>
                            {a ? <div style={{ width: 22, height: 22, borderRadius: '50%', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{a.initials}</div> : <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1px dashed var(--ui-border-color)', opacity: 0.35 }} />}
                          </div>
                          <div style={{ width: 130, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}><CellFill label={row.status} bg={row.statusColor} /></div>
                          <div style={{ width: 110, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}><CellFill label={row.priority} bg={row.priorityColor} /></div>
                          <div style={{ width: 75, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, color: row.overdue ? '#E2445C' : 'var(--secondary-text-color)', fontWeight: row.overdue ? 600 : 400 }}>{row.dueDate}</div>
                        </motion.div>
                      );
                    })}
                    <div style={{ height: 32, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${group.groupColor}`, borderBottom: '1px solid var(--layout-border-color)', paddingLeft: 12, gap: 4 }}>
                      <Plus size={12} color="var(--secondary-text-color)" /><span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>+ Add subitem</span>
                    </div>
                  </div>
                </motion.div>
              </RainbowHighlight>
            )}
          </AnimatePresence>
        </div>

        {/* ═══ SIDEKICK PANEL — matching monday.com design ═══ */}
        <AnimatePresence>
          {showSKPanel && (
            <RainbowHighlight active={phase === 'r-sidekick'} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 55, width: 360 }}>
              <motion.div key="skPanel" initial={{ x: 380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 360, height: '100%', background: '#fff', borderLeft: '1px solid var(--layout-border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Header — matching the inspiration */}
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--layout-border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AiGradientIcon size={18} id="skH" />
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{skName || 'Sidekick'}</span>
                    <span style={{ fontSize: 10, color: 'var(--primary-color)', background: 'var(--primary-surface-color)', padding: '1px 6px', borderRadius: 3, fontWeight: 500 }}>Beta</span>
                    <ChevronDown size={12} color="var(--secondary-text-color)" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                    <X size={14} color="var(--secondary-text-color)" />
                  </div>
                </div>
                {/* Scope indicator */}
                <div style={{ padding: '6px 16px', borderBottom: '1px solid var(--layout-border-color)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>
                  <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Recruitment Pipeline</span>
                </div>
                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
                  {Object.entries(skMessages).map(([key, msg]) => {
                    if (!atOrPast(key)) return null;
                    const isCurrent = phase === key;
                    return (
                      <motion.div key={key} initial={{ opacity: 0, y: 6 }} animate={{ opacity: isCurrent ? 1 : 0.55, y: 0 }} transition={{ duration: 0.4 }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 16 }}>
                        <AiGradientIcon size={16} id={`skm${key}`} />
                        <div>
                          <span style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)', display: 'block', marginBottom: 2 }}>{skName || 'Sidekick'}</span>
                          <span style={{ fontFamily: ff, fontSize: 13, lineHeight: '20px', color: 'var(--primary-text-color)' }}>{msg}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                  {phase === 'settled' && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
                        <AiGradientIcon size={16} id="skmFinal" />
                        <div>
                          <span style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 2 }}>{skName || 'Sidekick'}</span>
                          <span style={{ fontFamily: ff, fontSize: 13, lineHeight: '20px' }}>{sSettled.displayed}</span>
                        </div>
                      </div>
                      {sSettled.done && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                          <div style={{ background: '#F6F7FB', borderRadius: 8, padding: '12px', marginBottom: 12 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Followup actions</span>
                            <button onClick={() => navigate('/agent-run')} style={{ width: '100%', background: '#fff', border: '1px solid var(--layout-border-color)', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontFamily: ff, fontSize: 13, color: 'var(--primary-text-color)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                              <ArrowRight size={13} color="var(--primary-color)" /> Run Screening Agent on pipeline
                            </button>
                            <button style={{ width: '100%', background: '#fff', border: '1px solid var(--layout-border-color)', borderRadius: 6, padding: '8px 12px', cursor: 'pointer', fontFamily: ff, fontSize: 13, color: 'var(--primary-text-color)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <ArrowRight size={13} color="var(--secondary-text-color)" /> Explore all agents
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                  <div ref={skBottomRef} style={{ height: 1 }} />
                </div>
                {/* Input — matching monday Sidekick */}
                <div style={{ padding: '10px 14px', borderTop: '1px solid var(--layout-border-color)' }}>
                  <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'var(--placeholder-color)' }}>{`Tell ${skName || 'Sidekick'} what you want to do...`}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                      <AiGradientIcon size={14} id="skInput" />
                    </div>
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
