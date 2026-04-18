import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, ArrowLeft, ChevronDown, MoreHorizontal, Undo2, Redo2, X, ThumbsUp, ThumbsDown, RotateCcw, Upload, Check, Sparkles } from 'lucide-react';
import { PERSONA } from '../data';
import { AICentricIconRail, AICentricTopBar } from './AICentricNav';
import iconAgents from '../../assets/icons/agents.svg';
import imgAgent1 from '../../assets/agent-avatar-1.png';
import imgAgent2 from '../../assets/agent-avatar-2.png';
import imgAgent3 from '../../assets/agent-avatar-3.png';

const ff = 'Figtree, sans-serif';

/* Conic gradient for Sidekick — exact spec */
const SIDEKICK_GRADIENT = 'conic-gradient(from 180deg at 50% 50%, #8181FF 56.38deg, #33DBDB 150deg, #33D58E 191.38deg, #FFD633 231deg, #FC527D 308.38deg, #8181FF 360deg)';

/* Gradient AI sparkle — applied everywhere Sidekick speaks */
const AiSparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#skSp)" />
    <defs><linearGradient id="skSp" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" /><stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" /></linearGradient></defs>
  </svg>
);

/* Avatar options — 6 illustrated + upload */
const AVATAR_OPTS = [
  { id: 'star', emoji: '✦', bg: 'linear-gradient(135deg, #667EEA, #764BA2)' },
  { id: 'bot', emoji: '🤖', bg: 'linear-gradient(135deg, #00C875, #00A35C)' },
  { id: 'sparkle', emoji: '⚡', bg: 'linear-gradient(135deg, #FDAB3D, #E68A1A)' },
  { id: 'heart', emoji: '💜', bg: 'linear-gradient(135deg, #784BD1, #5B3A9E)' },
  { id: 'fire', emoji: '🔥', bg: 'linear-gradient(135deg, #E2445C, #C73B4D)' },
  { id: 'gem', emoji: '💎', bg: 'linear-gradient(135deg, #579BFC, #0073EA)' },
];

const ASSETS = [
  { name: 'Campaign Brief', active: true },
  { name: 'Study outline' }, { name: 'Post-mortem' },
  { name: 'User interviews' }, { name: 'Sprint review' },
  { name: 'Content Calendar' }, { name: 'Social Media Plan' },
];

const TOUR_LABELS: Record<string, { step: number; total: number; label: string }> = {
  'tour-workspace': { step: 1, total: 3, label: 'Your workspace' },
  'tour-board': { step: 2, total: 3, label: 'Your board' },
  'tour-agents': { step: 3, total: 3, label: 'Your AI Agents' },
};

function useStreamText(text: string, speed = 40, delay = 0, enabled = true, instant = false) {
  const [displayed, setDisplayed] = useState(instant ? text : '');
  const [done, setDone] = useState(instant);
  useEffect(() => {
    if (instant) { setDisplayed(text); setDone(true); return; }
    if (!enabled) { setDisplayed(''); setDone(false); return; }
    setDisplayed(''); setDone(false);
    const words = text.split(' '); let i = 0;
    const tm = setTimeout(() => {
      const iv = setInterval(() => { i++; setDisplayed(words.slice(0, i).join(' ')); if (i >= words.length) { clearInterval(iv); setDone(true); } }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(tm);
  }, [text, speed, delay, enabled, instant]);
  return { displayed, done };
}

/* Sidekick message container matching New project - created.png */
function SKMsg({ name, text, children }: { name: string; text: string; children?: React.ReactNode }) {
  if (!text) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: children ? 8 : 0 }}>
        <AiSparkle size={16} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#323338', display: 'block', marginBottom: 3 }}>{name}</span>
          <span style={{ fontSize: 13, lineHeight: '20px', color: '#323338' }}>{text}</span>
        </div>
      </div>
      {children && <div style={{ marginLeft: 24 }}>{children}</div>}
    </div>
  );
}

function ContentCard({ title, items }: { title: string; items: { label: string; color: string }[] }) {
  return (
    <div style={{ background: '#F5F6F8', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>{title}</span>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderLeft: `3px solid ${item.color}`, paddingLeft: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 12, color: '#323338' }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function FeedbackRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <ThumbsUp size={13} color="#676879" style={{ cursor: 'pointer' }} />
      <ThumbsDown size={13} color="#676879" style={{ cursor: 'pointer' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><RotateCcw size={12} color="#676879" /><span style={{ fontSize: 11, color: '#676879' }}>Undo</span></div>
      <span style={{ fontSize: 11, color: '#676879', marginLeft: 'auto' }}>2 sources</span>
    </div>
  );
}

function FollowupActions({ actions, onAction }: { actions: string[]; onAction?: (a: string) => void }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#323338', display: 'block', marginBottom: 6 }}>Followup actions</span>
      {actions.map((a, i) => (
        <div key={i} onClick={() => onAction?.(a)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: '#fff', border: '1px solid #E7E9EF', borderRadius: 6, marginBottom: 4, cursor: 'pointer', fontSize: 12, color: '#323338' }}>
          <ArrowRight size={12} color="#0073EA" />{a}
        </div>
      ))}
    </div>
  );
}

/*
  PHASES:
  Act 3: setup-name, setup-avatar, setup-ready
  Act 4: transition (animated)
  Act 5: tour-workspace, tour-board, tour-agents (3 steps)
  Act 6: first-win, first-win-running, first-win-done
*/
type Phase = 'setup-name' | 'setup-avatar' | 'setup-ready' | 'transition' | 'tour-workspace' | 'tour-board' | 'tour-agents' | 'first-win' | 'first-win-running' | 'first-win-done';

export function TransitionPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('setup-name');
  const [nameInput, setNameInput] = useState('Sidekick');
  const [skName, setSkName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<typeof AVATAR_OPTS[0] | null>(null);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [productOpacity, setProductOpacity] = useState(0);
  const [agentProgress, setAgentProgress] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const skRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const isAct3 = ['setup-name', 'setup-avatar', 'setup-ready'].includes(phase);
  const isAct4 = phase === 'transition';
  const isAct5 = ['tour-workspace', 'tour-board', 'tour-agents'].includes(phase);
  const isAct6 = ['first-win', 'first-win-running', 'first-win-done'].includes(phase);
  const showProduct = isAct4 || isAct5 || isAct6;

  const displayName = skName || 'Sidekick';

  const handleNameSubmit = () => {
    const n = nameInput.trim() || 'Sidekick';
    setSkName(n); localStorage.setItem('sidekick_name', n);
    setPhase('setup-avatar');
  };
  const handleAvatarSelect = (opt: typeof AVATAR_OPTS[0]) => {
    setSelectedAvatar(opt); localStorage.setItem('sidekick_avatar_id', opt.id);
    setPhase('setup-ready');
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedImg(url); localStorage.setItem('sidekick_avatar_id', 'upload');
    setSelectedAvatar({ id: 'upload', emoji: '', bg: '' });
    setPhase('setup-ready');
  };
  const handleLetsGo = () => {
    setPhase('transition');
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 800, 1);
      setProductOpacity(progress);
      if (progress < 1) requestAnimationFrame(animate);
      else setTimeout(() => setPhase('tour-workspace'), 300);
    };
    requestAnimationFrame(animate);
  };
  const handleRunAgent = () => {
    setPhase('first-win-running');
    let p = 0;
    const iv = setInterval(() => { p += 10; setAgentProgress(p); if (p >= 100) { clearInterval(iv); setTimeout(() => setPhase('first-win-done'), 500); } }, 300);
  };

  // Act 3 streaming
  const s3a = useStreamText(`Hi ${PERSONA.firstName} — I'm your new AI Work Assistant.`, 45, 400, phase === 'setup-name', false);
  const s3b = useStreamText("I'm going to give you superpowers and always be on your side so we can get more things done together.", 34, 200, s3a.done && phase === 'setup-name', false);
  const s3c = useStreamText("I'll be guiding you through the new monday. As a first step — what would you like to call me?", 34, 200, s3b.done && phase === 'setup-name', false);
  const s3d = useStreamText(`${skName} — love it! Now pick a look for me.`, 42, 400, phase === 'setup-avatar', false);
  const s3e = useStreamText("Perfect! I'm all set. Let's explore your new workspace together.", 42, 400, phase === 'setup-ready', false);

  // Act 5 streaming (3 steps)
  const sWS = useStreamText("Welcome to your new workspace. The sidebar and header have been redesigned — same product, now with AI built into everything. Your search bar can answer questions about your data too.", 26, 500, phase === 'tour-workspace', false);
  const sBoard = useStreamText("Your documents and boards are right here — same data, same structure, now AI-powered with agents ready to help you work faster.", 28, 500, phase === 'tour-board', false);
  const sAgents = useStreamText("Meet your AI agents. I've created a Screening Agent, Scheduling Agent, and Sourcing Agent tailored to your hiring workflow. They're ready to work.", 26, 500, phase === 'tour-agents', false);

  // Act 6 streaming
  const sWin = useStreamText(`One last thing — want to see your new agents in action? I'll run the Screening Agent on your 8 new candidates. Takes ~30 seconds.`, 28, 500, phase === 'first-win', false);
  const sWinDone = useStreamText("Done! Your Screening Agent scored 8 candidates, flagged 3 as strong matches, and assigned priorities. You just used your first AI agent.", 28, 300, phase === 'first-win-done', false);

  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, [phase, s3a.displayed, s3b.displayed, s3c.displayed, s3d.displayed, s3e.displayed]);
  useEffect(() => { skRef.current?.scrollTo({ top: skRef.current.scrollHeight, behavior: 'smooth' }); }, [phase, sWS.displayed, sBoard.displayed, sAgents.displayed, sWin.displayed, sWinDone.displayed]);

  const tourStep = TOUR_LABELS[phase];
  const avatarBg = selectedAvatar?.bg || AVATAR_OPTS[0].bg;
  const avatarEmoji = selectedAvatar?.emoji || AVATAR_OPTS[0].emoji;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff, background: '#fff' }}>
      <style>{`
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 8px rgba(0,115,234,0.15); } 50% { box-shadow: 0 0 24px rgba(0,115,234,0.35); } }
        @keyframes rotateGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* ═══ ACT 3: SIDEKICK SETUP — full page conversational ═══ */}
      <AnimatePresence>
        {isAct3 && (
          <motion.div key="act3" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, zIndex: 100, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Sidekick avatar — 96-120px with rotating conic gradient */}
            <div style={{ marginTop: 64, marginBottom: 28, position: 'relative' }}>
              <div style={{ width: 110, height: 110, borderRadius: '50%', background: SIDEKICK_GRADIENT, animation: 'rotateGradient 20s linear infinite', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div key={selectedAvatar?.id || 'default'} initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                  style={{ width: 100, height: 100, borderRadius: '50%', background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, overflow: 'hidden' }}>
                  {uploadedImg ? <img src={uploadedImg} width={100} height={100} style={{ objectFit: 'cover' }} alt="" /> : avatarEmoji}
                </motion.div>
              </div>
            </div>

            {/* Conversation */}
            <div ref={chatRef} style={{ flex: 1, width: 520, maxWidth: '90%', overflowY: 'auto', paddingBottom: 120 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {s3a.displayed && <div style={{ display: 'flex', gap: 10 }}><AiSparkle size={18} /><span style={{ fontSize: 16, fontWeight: 500, color: '#323338', lineHeight: '24px' }}>{s3a.displayed}</span></div>}
                {s3b.displayed && <div style={{ paddingLeft: 28 }}><span style={{ fontSize: 15, color: '#323338', lineHeight: '23px' }}>{s3b.displayed}</span></div>}
                {s3c.displayed && <div style={{ paddingLeft: 28 }}><span style={{ fontSize: 15, color: '#323338', lineHeight: '23px' }}>{s3c.displayed}</span></div>}

                {/* Name input */}
                {s3c.done && phase === 'setup-name' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginLeft: 28, display: 'flex', gap: 8 }}>
                    <input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleNameSubmit(); }} placeholder="Sidekick" autoFocus
                      style={{ flex: 1, border: '1px solid #C3C6D4', borderRadius: 8, padding: '10px 14px', fontSize: 15, outline: 'none', fontFamily: ff }} />
                    <button onClick={handleNameSubmit} style={{ background: '#0073EA', border: 'none', borderRadius: 8, padding: '10px 22px', color: '#fff', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: ff }}>Continue</button>
                  </motion.div>
                )}

                {/* User bubble — name */}
                {phase !== 'setup-name' && <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div style={{ background: '#EDF1FC', borderRadius: '14px 14px 2px 14px', padding: '10px 18px', fontSize: 15, color: '#323338' }}>{skName}</div></div>}

                {/* Avatar prompt */}
                {s3d.displayed && <div style={{ display: 'flex', gap: 10 }}><AiSparkle size={18} /><span style={{ fontSize: 16, fontWeight: 500, color: '#323338', lineHeight: '24px' }}>{s3d.displayed}</span></div>}

                {/* Avatar picker — 64px circles + upload (Fix #1, #2) */}
                {s3d.done && phase === 'setup-avatar' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap', paddingLeft: 28 }}>
                    {AVATAR_OPTS.map(opt => (
                      <motion.button key={opt.id} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                        onClick={() => handleAvatarSelect(opt)}
                        style={{ width: 64, height: 64, borderRadius: '50%', padding: 2, border: 'none', cursor: 'pointer', background: SIDEKICK_GRADIENT, position: 'relative' }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{opt.emoji}</div>
                      </motion.button>
                    ))}
                    {/* Upload option */}
                    <motion.button whileHover={{ scale: 1.08 }} onClick={() => fileRef.current?.click()}
                      style={{ width: 64, height: 64, borderRadius: '50%', border: '2px dashed #C3C6D4', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                      <Upload size={16} color="#676879" />
                      <span style={{ fontSize: 9, color: '#676879' }}>Upload</span>
                    </motion.button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                  </motion.div>
                )}

                {/* User bubble — avatar */}
                {phase === 'setup-ready' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#EDF1FC', borderRadius: '14px 14px 2px 14px', padding: '10px 18px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {uploadedImg ? <img src={uploadedImg} width={24} height={24} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" /> : <span style={{ fontSize: 24 }}>{avatarEmoji}</span>}
                      This one!
                    </div>
                  </div>
                )}

                {/* Ready */}
                {s3e.displayed && <div style={{ display: 'flex', gap: 10 }}><AiSparkle size={18} /><span style={{ fontSize: 16, fontWeight: 500, color: '#323338', lineHeight: '24px' }}>{s3e.displayed}</span></div>}
              </div>
            </div>

            {/* Bottom action zone */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingBottom: 32, background: 'linear-gradient(transparent, #fff 30%)' }}>
              {s3e.done && (
                <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  onClick={handleLetsGo}
                  style={{ background: '#0073EA', border: 'none', borderRadius: 10, padding: '14px 40px', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: ff, boxShadow: '0 4px 16px rgba(0,115,234,0.3)' }}>
                  Let's go <ArrowRight size={18} />
                </motion.button>
              )}
              <button onClick={() => navigate('/platform')} style={{ background: 'none', border: 'none', fontSize: 13, color: '#676879', cursor: 'pointer', fontFamily: ff }}>Skip tour</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ ACTS 4-6: PRODUCT + SIDEKICK PANEL ═══ */}
      {showProduct && (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: isAct4 ? productOpacity : 1 }}>

          {/* TOPBAR */}
          <div style={{ position: 'relative', zIndex: phase === 'tour-workspace' ? 55 : 10 }}>
            <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />
            {tourStep && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 70, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 20, padding: '4px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0073EA' }}>{tourStep.step} of {tourStep.total}</span>
                <span style={{ fontSize: 12, color: '#676879' }}>{tourStep.label}</span>
              </div>
            )}
            {phase === 'tour-workspace' && <div style={{ position: 'absolute', inset: -2, border: '2px solid rgba(0,115,234,0.4)', borderRadius: 4, pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite' }} />}
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
            {isAct5 && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 40, pointerEvents: 'none' }} />}

            {/* NAV + SIDEBAR */}
            <div style={{ zIndex: phase === 'tour-workspace' ? 55 : 10, position: 'relative', display: 'flex' }}>
              {phase === 'tour-workspace' && <div style={{ position: 'absolute', inset: -2, border: '2px solid rgba(0,115,234,0.4)', borderRadius: 4, pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite', zIndex: 56 }} />}
              <AICentricIconRail activeItem="workspace" />
              <div style={{ width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 16, alignSelf: 'stretch', borderRadius: '16px 0 0 0', borderRight: '0.5px solid var(--layout-border-color)', background: 'var(--primary-background-color)', overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ width: '100%' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}><span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workspace</span><MoreHorizontal size={14} color="#676879" /></div><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 22, height: 22, borderRadius: 5, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>N</div><span style={{ fontSize: 14, fontWeight: 500, color: '#323338' }}>Novella</span><ChevronDown size={12} color="#676879" /></div></div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><ChevronDown size={10} color="#676879" /><img src={iconAgents} width={14} height={14} alt="" /><span style={{ fontSize: 13, fontWeight: 600, color: '#323338' }}>AI Workforce</span></div><div style={{ display: 'flex' }}>{PERSONA.teamMembers.slice(0, 3).map((tm, i) => <div key={tm.initials} style={{ width: 22, height: 22, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', marginLeft: i > 0 ? -5 : 0, border: '2px solid #fff', zIndex: 3 - i }}>{tm.initials}</div>)}<span style={{ fontSize: 11, color: '#676879', marginLeft: 4, alignSelf: 'center' }}>+3</span></div></div>
                <div style={{ width: '100%', flex: 1, overflowY: 'auto' }}><div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}><ChevronDown size={10} color="#676879" /><span style={{ fontSize: 13, fontWeight: 600, color: '#323338' }}>Assets</span></div>{ASSETS.map(a => (<div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px 5px 20px', borderRadius: 4, marginBottom: 1, background: a.active ? '#D0E4FF' : 'transparent' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.active ? '#0073EA' : '#676879'} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg><span style={{ fontSize: 13, color: a.active ? '#0073EA' : '#323338', fontWeight: a.active ? 600 : 400 }}>{a.name}</span></div>))}</div>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div style={{ flex: 1, position: 'relative', zIndex: phase === 'tour-board' ? 55 : 5 }}>
              {phase === 'tour-board' && <div style={{ position: 'absolute', inset: -2, borderRadius: '16px 0 0 0', border: '2px solid rgba(0,115,234,0.4)', pointerEvents: 'none', zIndex: 60, animation: 'pulseGlow 2s ease-in-out infinite' }} />}
              <div style={{ height: '100%', background: '#fff', borderTopLeftRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', padding: 16, justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', borderBottom: '1px solid #E7E9EF', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#0073EA', borderRadius: 4 }}><Plus size={11} color="#fff" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>Add</span></div><div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} /><Undo2 size={14} color="#676879" /><Redo2 size={14} color="#676879" /><div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} /><span style={{ fontSize: 12, fontWeight: 600, color: '#676879' }}>H1</span><span style={{ fontSize: 12, color: '#676879', marginLeft: 3 }}>Large title</span></div>
                  <AiSparkle size={16} />
                </div>
                <div style={{ display: 'flex', paddingBottom: 40, flexDirection: 'column', alignItems: 'center', gap: 24, flex: '1 0 0', alignSelf: 'stretch', overflowY: 'auto' }}>
                  <div style={{ width: '100%', height: 160, background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', flexShrink: 0 }} />
                  <div style={{ maxWidth: 640, width: '100%', padding: '0 32px' }}>
                    <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 600, color: '#323338', margin: '0 0 10px' }}>Campaign Brief</h1>
                    <div style={{ fontSize: 12, color: '#676879', marginBottom: 20 }}>Creator: Mark Green · Created Apr 10, 2026</div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, color: '#323338', margin: '0 0 8px' }}>Objectives and KPI</h2>
                    <p style={{ fontSize: 14, color: '#323338', lineHeight: '22px' }}>Golden Grains is launching "The Morning Routine" to capture weekday commuter traffic.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SIDEKICK PANEL */}
            <div style={{ width: 340, background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: phase === 'tour-agents' ? 55 : 50, borderLeft: (isAct5 || isAct6) ? '2px solid' : 'none', borderImage: (isAct5 || isAct6) ? 'linear-gradient(180deg, #FB275D, #FFCC00, #00CA72, #8181FF) 1' : 'none' }}>
              {phase === 'tour-agents' && <div style={{ position: 'absolute', inset: -2, border: '2px solid rgba(0,115,234,0.4)', borderRadius: 4, pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite', zIndex: 56 }} />}

              {/* Header */}
              <div style={{ padding: '10px 14px', borderBottom: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AiSparkle size={18} /><span style={{ fontSize: 14, fontWeight: 600, color: '#323338' }}>{displayName}</span><span style={{ fontSize: 10, color: '#0073EA', background: '#EDF1FC', padding: '1px 6px', borderRadius: 3, fontWeight: 500 }}>Beta</span><ChevronDown size={11} color="#676879" /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg><X size={13} color="#676879" /></div>
              </div>
              <div style={{ padding: '5px 14px', borderBottom: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>
                <span style={{ fontSize: 12, color: '#676879' }}>Recruitment Pipeline</span>
              </div>

              {/* Messages */}
              <div ref={skRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px' }}>
                {/* Act 5 Step 1 */}
                {(phase === 'tour-workspace' || phase === 'tour-board' || phase === 'tour-agents') && (
                  <div style={{ opacity: phase === 'tour-workspace' ? 1 : 0.45 }}>
                    <SKMsg name={displayName} text={sWS.displayed || (phase !== 'tour-workspace' ? 'Welcome to your new workspace...' : '')}>
                      {(sWS.done || phase !== 'tour-workspace') && <><ContentCard title="What's new" items={[{ label: 'AI-powered search', color: '#0073EA' }, { label: 'Sidekick always available', color: '#00C875' }, { label: 'Unified notifications', color: '#FDAB3D' }]} /><FeedbackRow /></>}
                    </SKMsg>
                  </div>
                )}
                {/* Act 5 Step 2 */}
                {(phase === 'tour-board' || phase === 'tour-agents') && (
                  <div style={{ opacity: phase === 'tour-board' ? 1 : 0.45 }}>
                    <SKMsg name={displayName} text={sBoard.displayed || (phase === 'tour-agents' ? 'Your documents and boards are right here...' : '')}>
                      {(sBoard.done || phase === 'tour-agents') && <><ContentCard title="Your workspace" items={[{ label: 'Campaign Brief — active', color: '#0073EA' }, { label: '6 more documents', color: '#676879' }]} /><FeedbackRow /></>}
                    </SKMsg>
                  </div>
                )}
                {/* Act 5 Step 3 */}
                {phase === 'tour-agents' && (
                  <SKMsg name={displayName} text={sAgents.displayed}>
                    {sAgents.done && <><ContentCard title="Your AI Agents" items={[{ label: 'Screening Agent — Ready', color: '#00C875' }, { label: 'Scheduling Agent — Ready', color: '#579BFC' }, { label: 'Sourcing Agent — Ready', color: '#FDAB3D' }]} /><FeedbackRow /><FollowupActions actions={['Run Screening Agent', 'Explore all agents']} /></>}
                  </SKMsg>
                )}
                {/* Act 6 */}
                {isAct6 && (
                  <>
                    {/* Previous messages faded */}
                    <div style={{ opacity: 0.35 }}>
                      <SKMsg name={displayName} text="Your documents and boards are right here..." />
                      <SKMsg name={displayName} text="Meet your AI agents..." />
                    </div>
                    <SKMsg name={displayName} text={sWin.displayed || ''}>
                      {sWin.done && phase === 'first-win' && (
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                          <button onClick={handleRunAgent} style={{ flex: 1, background: '#0073EA', border: 'none', borderRadius: 8, padding: '10px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: ff }}><Sparkles size={14} /> Run Screening Agent</button>
                          <button onClick={() => navigate('/platform')} style={{ background: '#fff', border: '1px solid #C3C6D4', borderRadius: 8, padding: '10px 16px', color: '#676879', fontSize: 13, cursor: 'pointer', fontFamily: ff }}>Maybe later</button>
                        </div>
                      )}
                      {phase === 'first-win-running' && (
                        <div style={{ marginTop: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><Sparkles size={14} color="#0073EA" /><span style={{ fontSize: 13, color: '#0073EA', fontWeight: 500 }}>Screening Agent running...</span></div>
                          <div style={{ height: 6, background: '#E7E9EF', borderRadius: 3, overflow: 'hidden' }}><motion.div animate={{ width: `${agentProgress}%` }} style={{ height: '100%', background: '#0073EA', borderRadius: 3 }} /></div>
                        </div>
                      )}
                    </SKMsg>
                    {phase === 'first-win-done' && (
                      <>
                        <SKMsg name={displayName} text={sWinDone.displayed || ''}>
                          {sWinDone.done && (
                            <>
                              <ContentCard title="Screening results" items={[{ label: 'Maya Ben-Ari — High priority (strong portfolio)', color: '#E2445C' }, { label: 'Liam Foster — High priority (referral)', color: '#E2445C' }, { label: 'Alex Petrov — High priority (referral)', color: '#E2445C' }, { label: '5 candidates scored and assigned', color: '#676879' }]} />
                              <FeedbackRow />
                              {/* Celebration */}
                              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: 'spring' }}
                                style={{ background: 'linear-gradient(135deg, #F0EDFF, #E8F9F0)', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <div style={{ fontSize: 28 }}>🎉</div>
                                <div><span style={{ fontSize: 13, fontWeight: 600, color: '#323338', display: 'block' }}>You just used your first AI agent!</span><span style={{ fontSize: 12, color: '#676879' }}>Your workspace is ready. Explore more agents or start working.</span></div>
                              </motion.div>
                              <FollowupActions actions={['Go to workspace', 'Explore more agents', 'Customize agent settings']} onAction={(a) => { if (a === 'Go to workspace') navigate('/platform'); }} />
                            </>
                          )}
                        </SKMsg>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Controls */}
              <div style={{ padding: '10px 14px', borderTop: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={() => {
                  if (phase === 'tour-workspace') { setPhase('setup-ready'); setProductOpacity(0); }
                  else if (phase === 'tour-board') setPhase('tour-workspace');
                  else if (phase === 'tour-agents') setPhase('tour-board');
                }} disabled={isAct4 || isAct6}
                  style={{ background: 'none', border: 'none', cursor: (isAct4 || isAct6) ? 'default' : 'pointer', opacity: (isAct4 || isAct6) ? 0.3 : 1, display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#676879', fontFamily: ff, padding: 0 }}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={() => navigate('/platform')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#676879', fontFamily: ff, padding: 0 }}>Skip tour</button>
                {isAct5 && phase !== 'tour-agents' ? (
                  <button onClick={() => { if (phase === 'tour-workspace') setPhase('tour-board'); else if (phase === 'tour-board') setPhase('tour-agents'); }}
                    style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '7px 14px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: ff }}>
                    Next <ArrowRight size={14} />
                  </button>
                ) : phase === 'tour-agents' ? (
                  <button onClick={() => setPhase('first-win')}
                    style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '7px 14px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: ff }}>
                    Done <ArrowRight size={14} />
                  </button>
                ) : isAct6 && phase === 'first-win-done' && sWinDone.done ? (
                  <button onClick={() => navigate('/platform')}
                    style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '7px 14px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: ff }}>
                    Go to workspace <ArrowRight size={14} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
