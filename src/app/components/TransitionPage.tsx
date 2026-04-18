import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowRight, ArrowLeft, ChevronDown, ChevronRight, MoreHorizontal, Undo2, Redo2, AlignLeft, CheckSquare, AtSign } from 'lucide-react';
import { PERSONA } from '../data';
import { AICentricIconRail, AICentricTopBar } from './AICentricNav';
import { SidekickIcon } from './SidekickIcon';
import iconAgents from '../../assets/icons/agents.svg';
import iconMondayLogo from '../../assets/icons/monday-logo.svg';

const ff = 'Figtree, sans-serif';

/* Gradient AI sparkle — always rainbow, never green */
const AiSparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#skSparkle)" />
    <defs><linearGradient id="skSparkle" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" /><stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" /></linearGradient></defs>
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

const STEP_LABELS = [
  { step: 1, total: 4, label: 'Your AI Assistant' },
  { step: 2, total: 4, label: 'New platform header' },
  { step: 3, total: 4, label: 'Your board' },
  { step: 4, total: 4, label: 'Workspace & Agents' },
];

const ASSETS = [
  { name: 'Campaign Brief', active: true },
  { name: 'Study outline' }, { name: 'Post-mortem' },
  { name: 'User interviews' }, { name: 'Sprint review' },
  { name: 'Content Calendar' }, { name: 'Social Media Plan' },
];

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

export function TransitionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [nameInput, setNameInput] = useState('Sidekick');
  const [skName, setSkName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTS[0]);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [avatarConfirmed, setAvatarConfirmed] = useState(false);
  const skRef = useRef<HTMLDivElement>(null);

  const handleNameSubmit = () => {
    const n = nameInput.trim() || 'Sidekick';
    setSkName(n); localStorage.setItem('sidekick_name', n); setNameSubmitted(true);
  };
  const handleAvatarConfirm = (opt: typeof AVATAR_OPTS[0]) => {
    setSelectedAvatar(opt); localStorage.setItem('sidekick_avatar_id', opt.id); setAvatarConfirmed(true);
  };

  // Sidekick messages per step
  const s1a = useStreamText(`Hi ${PERSONA.firstName} — I'm your new AI Work Assistant.`, 45, 400, step === 1 && !nameSubmitted, false);
  const s1b = useStreamText("I'm going to give you superpowers. Let's start — what would you like to call me?", 38, 300, s1a.done && !nameSubmitted, false);
  const s1c = useStreamText(`${skName} — love it! Now pick a look for me.`, 42, 400, nameSubmitted && !avatarConfirmed, false);
  const s1d = useStreamText("Perfect! I'm all set. Ready to see what's new?", 42, 400, avatarConfirmed, false);

  const s2 = useStreamText("This is your new header. monday is now an AI work platform — same product, now with AI built into everything. Notice the search bar can answer questions about your data too.", 30, 500, step === 2, false);
  const s3 = useStreamText(`Your board is right here — same data, same structure. I noticed ${PERSONA.firstName}'s Recruitment Pipeline has candidates waiting. It's now AI-powered with agents ready to help.`, 30, 500, step === 3, false);
  const s4 = useStreamText("On your left — your workspace with all your boards and documents, plus AI agents I've created for your hiring workflow. A Screening Agent, Scheduling Agent, and Sourcing Agent — all ready to go.", 28, 500, step === 4, false);

  useEffect(() => { skRef.current?.scrollTo({ top: skRef.current.scrollHeight, behavior: 'smooth' }); }, [step, s1a.displayed, s1b.displayed, s1c.displayed, s1d.displayed, s2.displayed, s3.displayed, s4.displayed]);

  const canGoNext = step === 1 ? avatarConfirmed && s1d.done : step < 4 ? true : true;

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff, background: 'var(--chrome-surface-color)' }}>

      {/* ═══ TOPBAR — always rendered ═══ */}
      <div style={{ position: 'relative', zIndex: step === 2 ? 60 : 10 }}>
        <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />
        {/* Stepper pill */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 70, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 20, padding: '4px 14px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#0073EA' }}>{STEP_LABELS[step - 1].step} of {STEP_LABELS[step - 1].total}</span>
          <span style={{ fontSize: 12, color: '#676879' }}>{STEP_LABELS[step - 1].label}</span>
        </div>
        {/* Spotlight glow for step 2 */}
        {step === 2 && <div style={{ position: 'absolute', inset: -2, borderRadius: 4, border: '2px solid rgba(0,115,234,0.4)', pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite' }} />}
      </div>

      <style>{`
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 8px rgba(0,115,234,0.15); } 50% { box-shadow: 0 0 20px rgba(0,115,234,0.3); } }
      `}</style>

      {/* ═══ BODY ═══ */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* Dim overlay — covers everything except the spotlighted element and Sidekick panel */}
        {step >= 2 && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 40, pointerEvents: 'none', transition: 'opacity 0.4s' }} />
        )}

        {/* NAV RAIL — always rendered */}
        <div style={{ zIndex: step === 4 ? 55 : 10, position: 'relative' }}>
          <AICentricIconRail activeItem="workspace" />
          {step === 4 && <div style={{ position: 'absolute', inset: -2, borderRadius: 4, border: '2px solid rgba(0,115,234,0.4)', pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite' }} />}
        </div>

        {/* INNER SIDEBAR — always rendered */}
        <div style={{ zIndex: step === 4 ? 55 : 10, position: 'relative', width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 24, alignSelf: 'stretch', borderRadius: '16px 0 0 0', background: '#fff', overflow: 'hidden', flexShrink: 0 }}>
          {step === 4 && <div style={{ position: 'absolute', inset: -2, borderRadius: '16px 0 0 0', border: '2px solid rgba(0,115,234,0.4)', pointerEvents: 'none', animation: 'pulseGlow 2s ease-in-out infinite' }} />}
          {/* Workspace header */}
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workspace</span>
              <MoreHorizontal size={14} color="#676879" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>N</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#323338' }}>Novella</span>
              <ChevronDown size={12} color="#676879" />
            </div>
          </div>
          {/* AI Workforce */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <ChevronDown size={10} color="#676879" />
              <img src={iconAgents} width={14} height={14} alt="" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#323338' }}>AI Workforce</span>
            </div>
            <div style={{ display: 'flex' }}>
              {PERSONA.teamMembers.slice(0, 3).map((tm, i) => <div key={tm.initials} style={{ width: 22, height: 22, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', marginLeft: i > 0 ? -5 : 0, border: '2px solid #fff', zIndex: 3 - i }}>{tm.initials}</div>)}
              <span style={{ fontSize: 11, color: '#676879', marginLeft: 4, alignSelf: 'center' }}>+3</span>
            </div>
          </div>
          {/* Assets */}
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

        {/* MAIN CONTENT AREA — board/doc, always rendered */}
        <div style={{ flex: 1, position: 'relative', zIndex: step === 3 ? 55 : 5 }}>
          {step === 3 && <div style={{ position: 'absolute', inset: -2, borderRadius: '16px 0 0 0', border: '2px solid rgba(0,115,234,0.4)', pointerEvents: 'none', zIndex: 60, animation: 'pulseGlow 2s ease-in-out infinite' }} />}
          <div style={{ height: '100%', background: '#fff', borderTopLeftRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Doc toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 20px', borderBottom: '1px solid #E7E9EF', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#0073EA', borderRadius: 4 }}><Plus size={11} color="#fff" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>Add</span></div>
              <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
              <Undo2 size={14} color="#676879" style={{ padding: 3 }} /><Redo2 size={14} color="#676879" style={{ padding: 3 }} />
              <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#676879' }}>H1</span><span style={{ fontSize: 12, color: '#676879', marginLeft: 3 }}>Large title</span><ChevronDown size={10} color="#676879" />
            </div>
            {/* Doc content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 40px' }}>
              <div style={{ width: '100%', height: 180, background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)' }} />
              <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 36px' }}>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Campaign Brief</h1>
                <div style={{ fontSize: 13, color: '#676879', marginBottom: 24 }}>Creator: Mark Green · Created Apr 10, 2026</div>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#323338', margin: '0 0 10px' }}>Objectives and KPI</h2>
                <p style={{ fontSize: 14, color: '#323338', lineHeight: '22px', margin: '0 0 20px' }}>Golden Grains is a bakery chain in Charlotte, NC. For Spring 2026, the chain is launching "The Morning Routine" to capture weekday commuter traffic.</p>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#323338', margin: '0 0 10px' }}>Target audience</h2>
                <p style={{ fontSize: 14, color: '#323338', lineHeight: '22px' }}>Weekday morning commuters in the Charlotte metro who currently drive past Golden Grains locations without stopping.</p>
              </div>
            </div>
          </div>

          {/* Step 1 overlay — centered Sidekick setup */}
          <AnimatePresence>
            {step === 1 && (
              <motion.div key="s1overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Sidekick hero card */}
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
                  style={{ background: '#fff', borderRadius: 16, padding: '32px 36px', maxWidth: 480, width: '90%', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>

                  {/* Sidekick avatar preview — updates as user picks */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', padding: 3, background: 'conic-gradient(from 0deg, #FAD239, #FF6B10, #E2445C, #784BD1, #6161FF, #00CA72, #FAD239)' }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: selectedAvatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                        {selectedAvatar.emoji}
                      </div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                    {s1a.displayed && <div style={{ display: 'flex', gap: 8 }}><AiSparkle size={16} /><span style={{ fontSize: 14, color: '#323338', lineHeight: '21px' }}>{s1a.displayed}</span></div>}
                    {s1b.displayed && <div style={{ paddingLeft: 24 }}><span style={{ fontSize: 14, color: '#323338', lineHeight: '21px' }}>{s1b.displayed}</span></div>}

                    {/* Name input */}
                    {s1b.done && !nameSubmitted && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleNameSubmit(); }} placeholder="Sidekick" autoFocus
                          style={{ flex: 1, border: '1px solid #C3C6D4', borderRadius: 6, padding: '8px 12px', fontSize: 14, outline: 'none', fontFamily: ff }} />
                        <button onClick={handleNameSubmit} style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '8px 16px', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: ff }}>Continue</button>
                      </motion.div>
                    )}

                    {/* Name confirmed */}
                    {nameSubmitted && <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div style={{ background: '#EDF1FC', borderRadius: '12px 12px 2px 12px', padding: '8px 14px', fontSize: 14, color: '#323338' }}>{skName}</div></div>}

                    {/* Avatar prompt */}
                    {s1c.displayed && <div style={{ display: 'flex', gap: 8 }}><AiSparkle size={16} /><span style={{ fontSize: 14, color: '#323338', lineHeight: '21px' }}>{s1c.displayed}</span></div>}

                    {/* Avatar picker — real visual selection */}
                    {s1c.done && !avatarConfirmed && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 4 }}>
                        {AVATAR_OPTS.map(opt => (
                          <button key={opt.id} onClick={() => handleAvatarConfirm(opt)}
                            style={{ width: 52, height: 52, borderRadius: '50%', padding: 2, border: selectedAvatar.id === opt.id ? '3px solid #0073EA' : '3px solid transparent', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{opt.emoji}</div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* Avatar confirmed + ready message */}
                    {avatarConfirmed && <div style={{ display: 'flex', justifyContent: 'flex-end' }}><div style={{ background: '#EDF1FC', borderRadius: '12px 12px 2px 12px', padding: '8px 14px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 20 }}>{selectedAvatar.emoji}</span> This one!</div></div>}
                    {s1d.displayed && <div style={{ display: 'flex', gap: 8 }}><AiSparkle size={16} /><span style={{ fontSize: 14, color: '#323338', lineHeight: '21px' }}>{s1d.displayed}</span></div>}
                  </div>

                  {/* CTA — bottom anchored */}
                  {s1d.done && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: 'center' }}>
                      <button onClick={() => setStep(2)} style={{ background: '#0073EA', border: 'none', borderRadius: 8, padding: '12px 32px', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: ff }}>
                        Ready? Let's go <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══ SIDEKICK PANEL — always visible, never dimmed ═══ */}
        <div style={{ width: 340, background: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 55, borderLeft: '2px solid transparent', borderImage: step >= 2 ? 'linear-gradient(180deg, #FB275D, #FFCC00, #00CA72, #8181FF) 1' : 'none' }}>
          {/* Header */}
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', gap: 6 }}>
            <AiSparkle size={18} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#323338' }}>{skName || 'Sidekick'}</span>
            <span style={{ fontSize: 10, color: '#0073EA', background: '#EDF1FC', padding: '1px 6px', borderRadius: 3 }}>Beta</span>
          </div>

          {/* Messages */}
          <div ref={skRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
            {/* Step 2 messages */}
            {step >= 2 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: step === 2 ? 1 : 0.5, y: 0 }} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <AiSparkle size={14} />
                <div><span style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 2, color: '#323338' }}>{skName || 'Sidekick'}</span><span style={{ fontSize: 13, lineHeight: '20px', color: '#323338' }}>{s2.displayed || '...'}</span></div>
              </motion.div>
            )}
            {/* Step 3 messages */}
            {step >= 3 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: step === 3 ? 1 : 0.5, y: 0 }} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <AiSparkle size={14} />
                <div><span style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 2, color: '#323338' }}>{skName || 'Sidekick'}</span><span style={{ fontSize: 13, lineHeight: '20px', color: '#323338' }}>{s3.displayed || '...'}</span></div>
              </motion.div>
            )}
            {/* Step 4 messages */}
            {step >= 4 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <AiSparkle size={14} />
                <div><span style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 2, color: '#323338' }}>{skName || 'Sidekick'}</span><span style={{ fontSize: 13, lineHeight: '20px', color: '#323338' }}>{s4.displayed || '...'}</span></div>
              </motion.div>
            )}
          </div>

          {/* ═══ CONTROLS — back / skip / next ═══ */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #E7E9EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Back */}
            <button onClick={() => step > 1 && setStep(step - 1)} disabled={step <= 1}
              style={{ background: 'none', border: 'none', cursor: step <= 1 ? 'default' : 'pointer', opacity: step <= 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#676879', fontFamily: ff, padding: 0 }}>
              <ArrowLeft size={14} /> Back
            </button>
            {/* Skip */}
            <button onClick={() => navigate('/platform')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#676879', fontFamily: ff, padding: 0 }}>
              Skip tour
            </button>
            {/* Next / Done */}
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)}
                style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '7px 16px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: ff }}>
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={() => navigate('/platform')}
                style={{ background: '#0073EA', border: 'none', borderRadius: 6, padding: '7px 16px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: ff }}>
                Done <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
