import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, ArrowLeft, ChevronDown, MoreHorizontal, Undo2, Redo2, AlignLeft, CheckSquare, AtSign, X, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { PERSONA } from '../data';
import { AICentricIconRail, AICentricTopBar } from './AICentricNav';
import iconAgents from '../../assets/icons/agents.svg';

const ff = 'Figtree, sans-serif';

/* Gradient AI sparkle */
const AiSparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#skSp)" />
    <defs><linearGradient id="skSp" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" /><stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" /></linearGradient></defs>
  </svg>
);

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

const TOUR_STEPS: Record<string, { step: number; total: number; label: string }> = {
  'tour-topbar': { step: 2, total: 4, label: 'New platform header' },
  'tour-board': { step: 3, total: 4, label: 'Your board' },
  'tour-sidebar': { step: 4, total: 4, label: 'Workspace & Agents' },
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

/* Sidekick message with inline content card pattern (matching New project - created.png) */
function SKMessage({ name, text, children }: { name: string; text: string; children?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
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

/* Inline content card (milestones/items list) */
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

/* Feedback row (thumbs up/down + Undo + sources) */
function FeedbackRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, marginLeft: 24 }}>
      <ThumbsUp size={13} color="#676879" style={{ cursor: 'pointer' }} />
      <ThumbsDown size={13} color="#676879" style={{ cursor: 'pointer' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><RotateCcw size={12} color="#676879" /><span style={{ fontSize: 11, color: '#676879' }}>Undo</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}><span style={{ fontSize: 11, color: '#676879' }}>2 sources</span></div>
    </div>
  );
}

/* Followup actions */
function FollowupActions({ actions }: { actions: string[] }) {
  return (
    <div style={{ marginLeft: 24, marginBottom: 12 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#323338', display: 'block', marginBottom: 6 }}>Followup actions</span>
      {actions.map((a, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: '#fff', border: '1px solid #E7E9EF', borderRadius: 6, marginBottom: 4, cursor: 'pointer', fontSize: 12, color: '#323338' }}>
          <ArrowRight size={12} color="#0073EA" />{a}
        </div>
      ))}
    </div>
  );
}

type Phase = 'setup-name' | 'setup-avatar' | 'setup-ready' | 'transition' | 'tour-topbar' | 'tour-board' | 'tour-sidebar';

export function TransitionPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('setup-name');
  const [nameInput, setNameInput] = useState('Sidekick');
  const [skName, setSkName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTS[0]);
  const [productOpacity, setProductOpacity] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const skRef = useRef<HTMLDivElement>(null);

  const isAct1 = ['setup-name', 'setup-avatar', 'setup-ready'].includes(phase);
  const isAct2 = phase === 'transition';
  const isAct3 = ['tour-topbar', 'tour-board', 'tour-sidebar'].includes(phase);
  const showProduct = isAct2 || isAct3;

  const handleNameSubmit = () => {
    const n = nameInput.trim() || 'Sidekick';
    setSkName(n); localStorage.setItem('sidekick_name', n);
    setPhase('setup-avatar');
  };
  const handleAvatarSelect = (opt: typeof AVATAR_OPTS[0]) => {
    setSelectedAvatar(opt); localStorage.setItem('sidekick_avatar_id', opt.id);
    setPhase('setup-ready');
  };
  const handleLetsGo = () => {
    setPhase('transition');
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 600, 1);
      setProductOpacity(progress);
      if (progress < 1) requestAnimationFrame(animate);
      else setTimeout(() => setPhase('tour-topbar'), 300);
    };
    requestAnimationFrame(animate);
  };

  // Act 1 streaming
  const s1a = useStreamText(`Hi ${PERSONA.firstName} — I'm your new AI Work Assistant.`, 45, 400, phase === 'setup-name', false);
  const s1b = useStreamText("I'm going to give you superpowers and always be on your side so we can get more things done together.", 36, 200, s1a.done && phase === 'setup-name', false);
  const s1c = useStreamText("I'll be guiding you through the new monday. As a first step — what would you like to call me?", 36, 200, s1b.done && phase === 'setup-name', false);
  const s1d = useStreamText(`${skName} — love it! Now pick a look for me.`, 42, 400, phase === 'setup-avatar', false);
  const s1e = useStreamText("Perfect! I'm all set. Let's explore your new workspace together.", 42, 400, phase === 'setup-ready', false);

  // Act 3 streaming
  const sTopbar = useStreamText("This is your new header. monday is now an AI work platform — same product you love, now with AI built into everything.", 28, 500, phase === 'tour-topbar', false);
  const sBoard = useStreamText("Your documents and boards are right here — same data, same structure, now AI-powered.", 28, 500, phase === 'tour-board', false);
  const sSidebar = useStreamText("On your left — your workspace with all your documents, plus AI agents I've created for your workflow.", 28, 500, phase === 'tour-sidebar', false);

  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, [phase, s1a.displayed, s1b.displayed, s1c.displayed, s1d.displayed, s1e.displayed]);
  useEffect(() => { skRef.current?.scrollTo({ top: skRef.current.scrollHeight, behavior: 'smooth' }); }, [phase, sTopbar.displayed, sBoard.displayed, sSidebar.displayed]);

  const tourStep = TOUR_STEPS[phase];
  const displayName = skName || 'Sidekick';

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff, background: '#fff' }}>
      <style>{`
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 8px rgba(0,115,234,0.15); } 50% { box-shadow: 0 0 24px rgba(0,115,234,0.35); } }
        @keyframes rotateGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* ═══ ACT 1: FULL-PAGE CONVERSATIONAL ═══ */}
      <AnimatePresence>
        {isAct1 && (
          <motion.div key="act1" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, zIndex: 100, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Sidekick avatar — large, rotating gradient */}
            <div style={{ marginTop: 80, marginBottom: 32, position: 'relative' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%',
                background: 'conic-gradient(from 180deg at 50% 50%, #8181FF 56.38deg, #33DBDB 150deg, #33D58E 191.38deg, #FFD633 231deg, #FC527D 308.38deg, #8181FF 360deg)',
                animation: 'rotateGradient 20s linear infinite',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <motion.div key={selectedAvatar.id} initial={{ scale: 0.85 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                  style={{ width: 108, height: 108, borderRadius: '50%', background: selectedAvatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                  {selectedAvatar.emoji}
                </motion.div>
              </div>
            </div>

            {/* Conversation area */}
            <div ref={chatRef} style={{ flex: 1, width: 520, maxWidth: '90%', overflowY: 'auto', paddingBottom: 100 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Message 1 */}
                {s1a.displayed && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <AiSparkle size={18} />
                    <span style={{ fontSize: 16, fontWeight: 500, color: '#323338', lineHeight: '24px' }}>{s1a.displayed}</span>
                  </div>
                )}
                {/* Message 2 */}
                {s1b.displayed && (
                  <div style={{ paddingLeft: 28 }}>
                    <span style={{ fontSize: 15, color: '#323338', lineHeight: '23px' }}>{s1b.displayed}</span>
                  </div>
                )}
                {/* Message 3 — ask for name */}
                {s1c.displayed && (
                  <div style={{ paddingLeft: 28 }}>
                    <span style={{ fontSize: 15, color: '#323338', lineHeight: '23px' }}>{s1c.displayed}</span>
                  </div>
                )}

                {/* Name input */}
                {s1c.done && phase === 'setup-name' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginLeft: 28, display: 'flex', gap: 8, marginTop: 4 }}>
                    <input value={nameInput} onChange={e => setNameInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleNameSubmit(); }}
                      placeholder="Sidekick" autoFocus
                      style={{ flex: 1, border: '1px solid #C3C6D4', borderRadius: 8, padding: '10px 14px', fontSize: 15, outline: 'none', fontFamily: ff }} />
                    <button onClick={handleNameSubmit}
                      style={{ background: '#0073EA', border: 'none', borderRadius: 8, padding: '10px 22px', color: '#fff', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: ff }}>
                      Continue
                    </button>
                  </motion.div>
                )}

                {/* User bubble — name */}
                {phase !== 'setup-name' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#EDF1FC', borderRadius: '14px 14px 2px 14px', padding: '10px 18px', fontSize: 15, color: '#323338' }}>{skName}</div>
                  </div>
                )}

                {/* Pick a look prompt */}
                {s1d.displayed && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <AiSparkle size={18} />
                    <span style={{ fontSize: 16, fontWeight: 500, color: '#323338', lineHeight: '24px' }}>{s1d.displayed}</span>
                  </div>
                )}

                {/* Visual avatar picker */}
                {s1d.done && phase === 'setup-avatar' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap', paddingLeft: 28 }}>
                    {AVATAR_OPTS.map(opt => (
                      <motion.button key={opt.id} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                        onClick={() => handleAvatarSelect(opt)}
                        style={{
                          width: 64, height: 64, borderRadius: '50%', padding: 2, border: 'none', cursor: 'pointer',
                          background: 'conic-gradient(from 180deg at 50% 50%, #8181FF 56.38deg, #33DBDB 150deg, #33D58E 191.38deg, #FFD633 231deg, #FC527D 308.38deg, #8181FF 360deg)',
                        }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
                          {opt.emoji}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* User bubble — avatar choice */}
                {phase === 'setup-ready' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#EDF1FC', borderRadius: '14px 14px 2px 14px', padding: '10px 18px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 24 }}>{selectedAvatar.emoji}</span> This one!
                    </div>
                  </div>
                )}

                {/* Ready message */}
                {s1e.displayed && (
                  <div style={{ display: 'flex', gap: 10 }}>
                    <AiSparkle size={18} />
                    <span style={{ fontSize: 16, fontWeight: 500, color: '#323338', lineHeight: '24px' }}>{s1e.displayed}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom action zone */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingBottom: 32, background: 'linear-gradient(transparent, #fff 30%)' }}>
              {s1e.done && (
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

      {/* ═══ ACTS 2 & 3: PRODUCT + SIDEKICK PANEL ═══ */}
      {showProduct && (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: isAct2 ? productOpacity : 1 }}>

          {/* TOPBAR */}
          <div style={{ position: 'relative', zIndex: phase === 'tour-topbar' ? 55 : 10 }}>
            <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />
            {tourStep && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 70, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 20, padding: '4px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0073EA' }}>{tourStep.step} of {tourStep.total}</span>
                <span style={{ fontSize: 12, color: '#676879' }}>{tourStep.label}</span>
              </div>
            )}
            {phase === 'tour-topbar' && <div style={{ position: 'absolute', inset: -2, border: '2px solid rgba(0,115,234,0.4)', borderRadius: 4, pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite' }} />}
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
            {isAct3 && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 40, pointerEvents: 'none' }} />}

            {/* NAV RAIL */}
            <div style={{ zIndex: phase === 'tour-sidebar' ? 55 : 10, position: 'relative' }}>
              <AICentricIconRail activeItem="workspace" />
              {phase === 'tour-sidebar' && <div style={{ position: 'absolute', inset: -2, border: '2px solid rgba(0,115,234,0.4)', borderRadius: 4, pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite' }} />}
            </div>

            {/* SIDEBAR */}
            <div style={{ zIndex: phase === 'tour-sidebar' ? 55 : 10, position: 'relative', width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 16, alignSelf: 'stretch', borderRadius: '16px 0 0 0', borderRight: '0.5px solid var(--layout-border-color)', background: 'var(--primary-background-color)', overflow: 'hidden', flexShrink: 0 }}>
              {phase === 'tour-sidebar' && <div style={{ position: 'absolute', inset: -2, borderRadius: '16px 0 0 0', border: '2px solid rgba(0,115,234,0.4)', pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite' }} />}
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}><span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workspace</span><MoreHorizontal size={14} color="#676879" /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 22, height: 22, borderRadius: 5, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>N</div><span style={{ fontSize: 14, fontWeight: 500, color: '#323338' }}>Novella</span><ChevronDown size={12} color="#676879" /></div>
              </div>
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><ChevronDown size={10} color="#676879" /><img src={iconAgents} width={14} height={14} alt="" /><span style={{ fontSize: 13, fontWeight: 600, color: '#323338' }}>AI Workforce</span></div>
                <div style={{ display: 'flex' }}>{PERSONA.teamMembers.slice(0, 3).map((tm, i) => <div key={tm.initials} style={{ width: 22, height: 22, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', marginLeft: i > 0 ? -5 : 0, border: '2px solid #fff', zIndex: 3 - i }}>{tm.initials}</div>)}<span style={{ fontSize: 11, color: '#676879', marginLeft: 4, alignSelf: 'center' }}>+3</span></div>
              </div>
              <div style={{ width: '100%', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}><ChevronDown size={10} color="#676879" /><span style={{ fontSize: 13, fontWeight: 600, color: '#323338' }}>Assets</span></div>
                {ASSETS.map(a => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px 5px 20px', borderRadius: 4, marginBottom: 1, background: a.active ? '#D0E4FF' : 'transparent' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.active ? '#0073EA' : '#676879'} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                    <span style={{ fontSize: 13, color: a.active ? '#0073EA' : '#323338', fontWeight: a.active ? 600 : 400 }}>{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOARD/CONTENT */}
            <div style={{ flex: 1, position: 'relative', zIndex: phase === 'tour-board' ? 55 : 5 }}>
              {phase === 'tour-board' && <div style={{ position: 'absolute', inset: -2, borderRadius: '16px 0 0 0', border: '2px solid rgba(0,115,234,0.4)', pointerEvents: 'none', zIndex: 60, animation: 'pulseGlow 2s ease-in-out infinite' }} />}
              <div style={{ height: '100%', background: '#fff', borderTopLeftRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ display: 'flex', padding: 16, justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', borderBottom: '1px solid #E7E9EF', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#0073EA', borderRadius: 4 }}><Plus size={11} color="#fff" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>Add</span></div>
                  <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
                  <Undo2 size={14} color="#676879" style={{ padding: 3 }} /><Redo2 size={14} color="#676879" style={{ padding: 3 }} />
                  <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#676879' }}>H1</span><span style={{ fontSize: 12, color: '#676879', marginLeft: 3 }}>Large title</span>
                </div>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <div style={{ width: '100%', height: 160, background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)' }} />
                  <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 32px' }}>
                    <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 600, color: '#323338', margin: '0 0 10px' }}>Campaign Brief</h1>
                    <p style={{ fontSize: 14, color: '#323338', lineHeight: '22px' }}>Golden Grains is launching "The Morning Routine" to capture weekday commuter traffic.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ SIDEKICK PANEL — matching New project - created.png pattern ═══ */}
            <div style={{ width: 340, background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 55, borderLeft: isAct3 ? '2px solid' : 'none', borderImage: isAct3 ? 'linear-gradient(180deg, #FB275D, #FFCC00, #00CA72, #8181FF) 1' : 'none' }}>
              {/* Header — sparkle + name + Beta + dropdown + edit/close */}
              <div style={{ padding: '10px 14px', borderBottom: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <AiSparkle size={18} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#323338' }}>{displayName}</span>
                  <span style={{ fontSize: 10, color: '#0073EA', background: '#EDF1FC', padding: '1px 6px', borderRadius: 3, fontWeight: 500 }}>Beta</span>
                  <ChevronDown size={11} color="#676879" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                  <X size={13} color="#676879" />
                </div>
              </div>
              {/* Scope row */}
              <div style={{ padding: '5px 14px', borderBottom: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>
                <span style={{ fontSize: 12, color: '#676879' }}>Recruitment Pipeline</span>
              </div>

              {/* Messages */}
              <div ref={skRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 14px' }}>
                {/* Step 2 */}
                {phase === 'tour-topbar' && sTopbar.displayed && (
                  <SKMessage name={displayName} text={sTopbar.displayed}>
                    {sTopbar.done && (
                      <>
                        <ContentCard title="What's new" items={[
                          { label: 'AI-powered search across all boards', color: '#0073EA' },
                          { label: 'Sidekick always available from header', color: '#00C875' },
                          { label: 'Unified notification center', color: '#FDAB3D' },
                        ]} />
                        <FeedbackRow />
                        <FollowupActions actions={['Try the new search', 'Open notification settings']} />
                      </>
                    )}
                  </SKMessage>
                )}

                {/* Step 3 */}
                {(phase === 'tour-board' || phase === 'tour-sidebar') && (
                  <div style={{ opacity: phase === 'tour-board' ? 1 : 0.45 }}>
                    <SKMessage name={displayName} text={sBoard.displayed || (phase === 'tour-sidebar' ? 'Your documents and boards are right here — same data, same structure, now AI-powered.' : '')}>
                      {(sBoard.done || phase === 'tour-sidebar') && (
                        <>
                          <ContentCard title="Your workspace" items={[
                            { label: 'Campaign Brief — active', color: '#0073EA' },
                            { label: '6 more documents available', color: '#676879' },
                          ]} />
                          <FeedbackRow />
                        </>
                      )}
                    </SKMessage>
                  </div>
                )}

                {/* Step 4 */}
                {phase === 'tour-sidebar' && sSidebar.displayed && (
                  <SKMessage name={displayName} text={sSidebar.displayed}>
                    {sSidebar.done && (
                      <>
                        <ContentCard title="Your AI Agents" items={[
                          { label: 'Screening Agent — Ready', color: '#00C875' },
                          { label: 'Scheduling Agent — Ready', color: '#579BFC' },
                          { label: 'Sourcing Agent — Ready', color: '#FDAB3D' },
                        ]} />
                        <FeedbackRow />
                        <FollowupActions actions={['Run Screening Agent', 'Explore all agents', 'Customize agent settings']} />
                      </>
                    )}
                  </SKMessage>
                )}
              </div>

              {/* Controls */}
              <div style={{ padding: '10px 14px', borderTop: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button onClick={() => { if (phase === 'tour-topbar') { setPhase('setup-ready'); setProductOpacity(0); } else if (phase === 'tour-board') setPhase('tour-topbar'); else if (phase === 'tour-sidebar') setPhase('tour-board'); }}
                  disabled={phase === 'transition'}
                  style={{ background: 'none', border: 'none', cursor: phase === 'transition' ? 'default' : 'pointer', opacity: phase === 'transition' ? 0.3 : 1, display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#676879', fontFamily: ff, padding: 0 }}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={() => navigate('/platform')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#676879', fontFamily: ff, padding: 0 }}>Skip tour</button>
                {phase !== 'tour-sidebar' ? (
                  <button onClick={() => { if (phase === 'tour-topbar') setPhase('tour-board'); else if (phase === 'tour-board') setPhase('tour-sidebar'); }}
                    disabled={phase === 'transition'}
                    style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '7px 14px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: ff }}>
                    Next <ArrowRight size={14} />
                  </button>
                ) : (
                  <button onClick={() => navigate('/platform')} style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '7px 14px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: ff }}>
                    Done <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
