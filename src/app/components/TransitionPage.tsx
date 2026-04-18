import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Upload } from 'lucide-react';
import { AICentricTopBar, AICentricIconRail } from './AICentricNav';
import { PERSONA } from '../data';

const ff = 'var(--font-body)';

/* Gradient AI sparkle */
const AiSparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#skSpT)" />
    <defs><linearGradient id="skSpT" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" /><stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" /></linearGradient></defs>
  </svg>
);

const AVATAR_OPTS = [
  { id: 'star', emoji: '✦', bg: 'linear-gradient(135deg, #667EEA, #764BA2)', label: 'AI Star' },
  { id: 'bot', emoji: '🤖', bg: 'linear-gradient(135deg, #00C875, #00A35C)', label: 'Helper Bot' },
  { id: 'sparkle', emoji: '⚡', bg: 'linear-gradient(135deg, #FDAB3D, #E68A1A)', label: 'Spark' },
  { id: 'heart', emoji: '💜', bg: 'linear-gradient(135deg, #784BD1, #5B3A9E)', label: 'Heart' },
  { id: 'fire', emoji: '🔥', bg: 'linear-gradient(135deg, #E2445C, #C73B4D)', label: 'Fire' },
  { id: 'gem', emoji: '💎', bg: 'linear-gradient(135deg, #579BFC, #0073EA)', label: 'Gem' },
];

const SIDEKICK_GRADIENT = 'conic-gradient(from 180deg at 50% 50%, #8181FF 56.38deg, #33DBDB 150deg, #33D58E 191.38deg, #FFD633 231deg, #FC527D 308.38deg, #8181FF 360deg)';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

function useStreamText(text: string, speed = 50, delay = 0, enabled = true, instant = false) {
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
      ivRef.current = setInterval(() => {
        i++; setDisplayed(words.slice(0, i).join(' '));
        if (i >= words.length) { if (ivRef.current) clearInterval(ivRef.current); setDone(true); }
      }, speed);
    }, delay);
    return () => { if (tmRef.current) clearTimeout(tmRef.current); if (ivRef.current) clearInterval(ivRef.current); };
  }, [text, speed, delay, enabled, instant]);
  return { displayed, done };
}

/* Shared helpers */
const enterMotion = (delay = 0) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as number[], delay },
});

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 2 }}>
      {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: 'var(--radius-full)', background: 'var(--text-secondary)', animation: 'dotPulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />)}
    </div>
  );
}

function AIRow({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-8)' }}>
        <AiSparkle size={20} />
        <span style={{ fontFamily: ff, fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', lineHeight: '22px', color: 'var(--text-primary)' }}>{title}</span>
      </div>
      {subtitle && <span style={{ fontFamily: ff, fontSize: 'var(--font-size-md)', lineHeight: '22px', color: 'var(--text-primary)', paddingLeft: 28 }}>{subtitle}</span>}
    </div>
  );
}

function StreamingAI({ displayed, enabled }: { displayed: string; enabled: boolean }) {
  if (!enabled) return null;
  if (!displayed) return <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}><AiSparkle size={20} /><TypingDots /></div>;
  return <AIRow title={displayed} />;
}

function StreamingSub({ displayed, enabled }: { displayed: string; enabled: boolean }) {
  if (!enabled) return null;
  if (!displayed) return <div style={{ paddingLeft: 28 }}><TypingDots /></div>;
  return <span style={{ fontFamily: ff, fontSize: 'var(--font-size-md)', lineHeight: '22px', color: 'var(--text-primary)', paddingLeft: 28, display: 'block' }}>{displayed}</span>;
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 'var(--space-10)' }}>
      <div style={{
        maxWidth: 380, background: 'var(--surface-card-muted)',
        borderRadius: 'var(--radius-lg) var(--radius-lg) 2px var(--radius-lg)',
        padding: 'var(--space-12) var(--space-16)',
        fontFamily: ff, fontSize: 'var(--font-size-lg)', lineHeight: '22px', color: 'var(--text-primary)',
        display: 'flex', alignItems: 'center', gap: 'var(--space-10)',
      }}>{children}</div>
      <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-full)', background: PERSONA.teamMembers[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ff, fontSize: 13, fontWeight: 'var(--font-weight-semibold)' as any, color: 'var(--text-inverse)', flexShrink: 0 }}>{PERSONA.teamMembers[0].initials}</div>
    </div>
  );
}

function PrimaryButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: '100%', height: 48, background: disabled ? 'var(--surface-card-muted)' : 'var(--brand-primary)', border: 'none', borderRadius: 'var(--radius-sm)', color: disabled ? 'var(--text-tertiary)' : 'var(--text-inverse)', fontFamily: ff, fontSize: 'var(--font-size-xl)', cursor: disabled ? 'default' : 'pointer' }}>
      {label}
    </button>
  );
}

const cardStyle: React.CSSProperties = {
  border: '1px solid transparent', borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-20) var(--space-24)',
  background: 'var(--surface-content)', boxShadow: 'var(--shadow-md)',
};

export function TransitionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [nameInput, setNameInput] = useState('Sidekick');
  const [sidekickName, setSidekickName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTS[0]);
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleNameSubmit = (def?: string) => {
    const name = def || nameInput.trim() || 'Sidekick';
    setSidekickName(name); localStorage.setItem('sidekick_name', name); setStep(2);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedSrc(url);
    setSelectedAvatar({ id: 'upload', emoji: '', bg: '', label: 'Your photo' });
  };
  const handleAvatarConfirm = () => {
    localStorage.setItem('sidekick_avatar_id', selectedAvatar.id);
    if (selectedAvatar.id === 'upload' && uploadedSrc) localStorage.setItem('sidekick_avatar_upload', uploadedSrc);
    setStep(3);
  };

  // Scroll
  useEffect(() => { setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 400); }, [step]);

  // Streaming
  const s1m1 = useStreamText(`Hi ${PERSONA.firstName} — I'm your new AI Work Assistant.`, 55, 500, step >= 1, step > 1);
  const s1m2 = useStreamText("I'm going to give you superpowers and always be on your side so we can get more things done together.", 42, 300, s1m1.done, step > 1);
  const s1m3 = useStreamText("I'll be guiding you through the new monday. As a first step — what would you like to call me?", 45, 300, s1m2.done, step > 1);

  const s2m1 = useStreamText(`${sidekickName} — I like that! Pick a look for me — I'll use it every time we talk. You can always change it later.`, 45, 500, step >= 2, step > 2);

  const s3m1 = useStreamText("I've been looking at your workspace while we were setting up — your boards, your team, your data.", 45, 500, step >= 3, step > 3);
  const s3m2 = useStreamText("I've already started creating agents tailored to your workflow. Let me show you what's new.", 45, 300, s3m1.done, step > 3);

  useEffect(() => {
    if (step === 3 && s3m2.done) {
      const t = setTimeout(() => { localStorage.setItem('onboarding_complete', 'true'); navigate('/platform'); }, 2000);
      return () => clearTimeout(t);
    }
  }, [step, s3m2.done, navigate]);

  // Scroll during streaming
  const streamCount = [s1m1, s1m2, s1m3, s2m1, s3m1, s3m2].reduce((n, s) => n + s.displayed.split(' ').length, 0);
  useEffect(() => { if (streamCount > 0 && streamCount % 4 === 0) bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [streamCount]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff, background: 'var(--surface-chrome)' }}>
      <style>{`@keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } } @keyframes rotateGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* Topbar */}
      <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <AICentricIconRail activeItem="sidekick" />

        {/* Main area — centered conversation */}
        <div style={{
          flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center',
          padding: 'var(--space-48) var(--space-24) var(--space-64)',
          borderTopLeftRadius: 'var(--radius-lg)',
          background: 'var(--surface-content)',
          scrollBehavior: 'smooth',
        }}>
          <div style={{ width: 500, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>

            {/* ═══ STEP 1: Name ═══ */}
            <motion.div {...enterMotion(0)}><StreamingAI displayed={s1m1.displayed} enabled={step >= 1} /></motion.div>
            {s1m1.done && <motion.div {...enterMotion(0)}><StreamingSub displayed={s1m2.displayed} enabled={step >= 1} /></motion.div>}
            {s1m2.done && <motion.div {...enterMotion(0)}><StreamingSub displayed={s1m3.displayed} enabled={step >= 1} /></motion.div>}

            <AnimatePresence mode="wait">
              {step === 1 && s1m3.done ? (
                <motion.div key="name-card" {...enterMotion(0.1)} exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-input)', borderRadius: 'var(--radius-md)', padding: '8px 12px' }}>
                    <input value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && nameInput.trim()) handleNameSubmit(); }}
                      placeholder="Sidekick" maxLength={32} autoFocus
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: ff, fontSize: 'var(--font-size-lg)', color: 'var(--text-primary)' }} />
                  </div>
                  <PrimaryButton label="Continue" onClick={() => handleNameSubmit()} />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => handleNameSubmit('Sidekick')} style={{ background: 'none', border: 'none', fontFamily: ff, fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)', cursor: 'pointer' }}>skip</button>
                  </div>
                </motion.div>
              ) : step > 1 ? (
                <motion.div key="name-confirmed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><UserBubble>{sidekickName}</UserBubble></motion.div>
              ) : null}
            </AnimatePresence>

            {/* ═══ STEP 2: Avatar ═══ */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div key="avatar-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
                  <StreamingAI displayed={s2m1.displayed} enabled={step >= 2} />

                  <AnimatePresence mode="wait">
                    {step === 2 && s2m1.done ? (
                      <motion.div key="avatar-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                          {AVATAR_OPTS.map(opt => {
                            const isSelected = selectedAvatar?.id === opt.id;
                            return (
                              <button key={opt.id} onClick={() => setSelectedAvatar(opt)} title={opt.label}
                                style={{
                                  width: 64, height: 64, borderRadius: 'var(--radius-lg)', padding: 3,
                                  border: `2px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-input)'}`,
                                  background: isSelected ? 'var(--surface-hover)' : 'var(--surface-card-muted)',
                                  cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  transform: isSelected ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.15s, border-color 0.15s',
                                }}>
                                <div style={{ width: '100%', height: '100%', borderRadius: 12, background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{opt.emoji}</div>
                              </button>
                            );
                          })}
                          {/* Upload */}
                          <button onClick={() => fileInputRef.current?.click()} title="Upload your own"
                            style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', border: `2px dashed ${selectedAvatar?.id === 'upload' ? 'var(--brand-primary)' : 'var(--border-input)'}`, background: selectedAvatar?.id === 'upload' ? 'var(--surface-hover)' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, overflow: 'hidden' }}>
                            {selectedAvatar?.id === 'upload' && uploadedSrc ? (
                              <img src={uploadedSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                            ) : (<><Upload size={18} color="var(--text-secondary)" /><span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Upload</span></>)}
                          </button>
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                        </div>
                        <PrimaryButton label="Looks good" onClick={handleAvatarConfirm} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <button onClick={handleAvatarConfirm} style={{ background: 'none', border: 'none', fontFamily: ff, fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)', cursor: 'pointer' }}>skip</button>
                        </div>
                      </motion.div>
                    ) : step > 2 ? (
                      <motion.div key="avatar-confirmed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <UserBubble>
                          {selectedAvatar?.id === 'upload' && uploadedSrc ? (
                            <img src={uploadedSrc} alt="" style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: 6 }} />
                          ) : (
                            <span style={{ fontSize: 24 }}>{selectedAvatar?.emoji}</span>
                          )}
                          This one!
                        </UserBubble>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══ STEP 3: Outro ═══ */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div key="outro-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                  <StreamingAI displayed={s3m1.displayed} enabled={step >= 3} />
                  {s3m1.done && <StreamingSub displayed={s3m2.displayed} enabled={step >= 3} />}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} style={{ height: 1, flexShrink: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
