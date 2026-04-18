import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Upload } from 'lucide-react';
import { AICentricTopBar, AICentricIconRail } from './AICentricNav';
import { PERSONA } from '../data';
import sidekickClosedImg from '../../assets/sidekick-closed.png';
import sidekickIcon from '../../assets/sidekick-icon.png';

const ff = 'var(--font-body)';
const SIDEKICK_GRADIENT = 'conic-gradient(from 180deg at 50% 50%, #8181FF 56.38deg, #33DBDB 150deg, #33D58E 191.38deg, #FFD633 231deg, #FC527D 308.38deg, #8181FF 360deg)';

const AiSparkle = ({ size = 20 }: { size?: number }) => (
  <img src={sidekickIcon} width={size} height={size} alt="" style={{ flexShrink: 0, borderRadius: '50%' }} />
);

const AVATAR_OPTS = [
  { id: 'star', emoji: '✦', bg: 'linear-gradient(135deg, #667EEA, #764BA2)', label: 'AI Star' },
  { id: 'bot', emoji: '🤖', bg: 'linear-gradient(135deg, #00C875, #00A35C)', label: 'Helper Bot' },
  { id: 'sparkle', emoji: '⚡', bg: 'linear-gradient(135deg, #FDAB3D, #E68A1A)', label: 'Spark' },
  { id: 'heart', emoji: '💜', bg: 'linear-gradient(135deg, #784BD1, #5B3A9E)', label: 'Heart' },
  { id: 'fire', emoji: '🔥', bg: 'linear-gradient(135deg, #E2445C, #C73B4D)', label: 'Fire' },
  { id: 'gem', emoji: '💎', bg: 'linear-gradient(135deg, #579BFC, #0073EA)', label: 'Gem' },
];

type Step = 1 | 2 | 3;

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

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', paddingTop: 2 }}>
      {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#676879', animation: 'dotPulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />)}
    </div>
  );
}

function StreamingAI({ displayed, enabled }: { displayed: string; enabled: boolean }) {
  if (!enabled) return null;
  if (!displayed) return <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><AiSparkle size={20} /><TypingDots /></div>;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <AiSparkle size={20} />
      <span style={{ fontFamily: ff, fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#323338' }}>{displayed}</span>
    </div>
  );
}

function StreamingSub({ displayed, enabled }: { displayed: string; enabled: boolean }) {
  if (!enabled) return null;
  if (!displayed) return <div style={{ paddingLeft: 28 }}><TypingDots /></div>;
  return <span style={{ fontFamily: ff, fontSize: 15, lineHeight: '23px', color: '#323338', paddingLeft: 28, display: 'block' }}>{displayed}</span>;
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ maxWidth: 380, background: '#EDF1FC', borderRadius: '12px 12px 2px 12px', padding: '10px 16px', fontFamily: ff, fontSize: 15, color: '#323338', display: 'flex', alignItems: 'center', gap: 10 }}>{children}</div>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: PERSONA.teamMembers[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff', flexShrink: 0 }}>{PERSONA.teamMembers[0].initials}</div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  borderRadius: 12, padding: '20px 24px',
  background: '#fff', boxShadow: '0 2px 12px rgba(0,19,85,0.06)',
  border: '1px solid transparent',
};

export function TransitionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [nameInput, setNameInput] = useState('Sidekick');
  const [sidekickName, setSidekickName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<typeof AVATAR_OPTS[0] | null>(null);
  const [uploadedSrc, setUploadedSrc] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleNameSubmit = (def?: string) => {
    const name = def || nameInput.trim() || 'Sidekick';
    setSidekickName(name); localStorage.setItem('sidekick_name', name); setStep(2);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadedSrc(URL.createObjectURL(file));
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

  const s2m1 = useStreamText(`${sidekickName} — I like that! Pick a look for me — I'll use it every time we talk.`, 45, 500, step >= 2, step > 2);

  const s3m1 = useStreamText("I've been looking at your workspace — your Recruitment Pipeline, your team, your data.", 42, 500, step >= 3, false);
  const s3m2 = useStreamText("I've already created agents tailored to your hiring workflow. Let me show you everything.", 42, 300, s3m1.done, false);

  // Transition
  useEffect(() => {
    if (step === 3 && s3m2.done && !transitioning) {
      const t = setTimeout(() => setTransitioning(true), 1200);
      return () => clearTimeout(t);
    }
  }, [step, s3m2.done, transitioning]);

  useEffect(() => {
    if (transitioning) {
      const t = setTimeout(() => navigate('/platform?welcome=true'), 1800);
      return () => clearTimeout(t);
    }
  }, [transitioning, navigate]);

  // Scroll during streaming
  const streamCount = [s1m1, s1m2, s1m3, s2m1, s3m1, s3m2].reduce((n, s) => n + s.displayed.split(' ').length, 0);
  useEffect(() => { if (streamCount > 0 && streamCount % 4 === 0) bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [streamCount]);

  const avatarBg = selectedAvatar?.bg || '';
  const avatarEmoji = selectedAvatar?.emoji || '';

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff, background: '#fff' }}>
      <style>{`
        @keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
        @keyframes rotateGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* AppShell — topbar + icon nav, matching V3 */}
      <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <AICentricIconRail activeItem="sidekick" />

        {/* Main area — conversation inside the platform chrome */}
        <div style={{
          flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center',
          padding: '40px 24px 80px',
          borderTopLeftRadius: 16,
          background: '#fff',
          scrollBehavior: 'smooth',
        }}>
          <div style={{ width: 520, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Sidekick avatar — shows the icon by default, switches to chosen avatar */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <motion.div
                key={step > 2 ? selectedAvatar.id : 'default'}
                initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}>
                {selectedAvatar && (selectedAvatar.emoji || uploadedSrc) ? (
                  /* After avatar is chosen — show it with gradient ring */
                  <div style={{ width: 80, height: 80, borderRadius: '50%', padding: 3, background: SIDEKICK_GRADIENT, animation: 'rotateGradient 20s linear infinite', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, overflow: 'hidden' }}>
                      {uploadedSrc ? <img src={uploadedSrc} width={74} height={74} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" /> : avatarEmoji}
                    </div>
                  </div>
                ) : (
                  /* Default — just the Sidekick icon, clean, no extra ring */
                  <img src={sidekickIcon} width={80} height={80} alt="" style={{ borderRadius: '50%' }} />
                )}
              </motion.div>
            </div>

            {/* ═══ STEP 1: Name ═══ */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <StreamingAI displayed={s1m1.displayed} enabled={step >= 1} />
            </motion.div>
            {s1m1.done && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><StreamingSub displayed={s1m2.displayed} enabled={step >= 1} /></motion.div>}
            {s1m2.done && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><StreamingSub displayed={s1m3.displayed} enabled={step >= 1} /></motion.div>}

            <AnimatePresence mode="wait">
              {step === 1 && s1m3.done ? (
                <motion.div key="name-card"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #C3C6D4', borderRadius: 8, padding: '8px 12px' }}>
                    <input value={nameInput} onChange={e => setNameInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && nameInput.trim()) handleNameSubmit(); }}
                      placeholder="Sidekick" maxLength={32} autoFocus
                      style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: ff, fontSize: 15, color: '#323338' }} />
                  </div>
                  <button onClick={() => handleNameSubmit()}
                    style={{ width: '100%', height: 48, background: '#0073EA', border: 'none', borderRadius: 4, color: '#fff', fontFamily: ff, fontSize: 16, cursor: 'pointer' }}>
                    Continue
                  </button>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => handleNameSubmit('Sidekick')} style={{ background: 'none', border: 'none', fontFamily: ff, fontSize: 14, color: '#676879', cursor: 'pointer' }}>skip</button>
                  </div>
                </motion.div>
              ) : step > 1 ? (
                <motion.div key="name-confirmed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <UserBubble>{sidekickName}</UserBubble>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* ═══ STEP 2: Avatar ═══ */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div key="avatar-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <StreamingAI displayed={s2m1.displayed} enabled={step >= 2} />

                  <AnimatePresence mode="wait">
                    {step === 2 && s2m1.done ? (
                      <motion.div key="avatar-card"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                        style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                          {AVATAR_OPTS.map(opt => {
                            const isSelected = selectedAvatar?.id === opt.id;
                            return (
                              <button key={opt.id} onClick={() => setSelectedAvatar(opt)} title={opt.label}
                                style={{
                                  width: 64, height: 64, borderRadius: 16, padding: 3,
                                  border: `2px solid ${isSelected ? '#0073EA' : '#E7E9EF'}`,
                                  background: isSelected ? '#EDF1FC' : '#F5F6F8',
                                  cursor: 'pointer', overflow: 'hidden',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                  transition: 'transform 0.15s, border-color 0.15s',
                                }}>
                                <div style={{ width: '100%', height: '100%', borderRadius: 12, background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                                  {opt.emoji}
                                </div>
                              </button>
                            );
                          })}
                          {/* Upload */}
                          <button onClick={() => fileInputRef.current?.click()} title="Upload your own"
                            style={{ width: 64, height: 64, borderRadius: 16, border: `2px dashed ${selectedAvatar?.id === 'upload' ? '#0073EA' : '#C3C6D4'}`, background: selectedAvatar?.id === 'upload' ? '#EDF1FC' : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, overflow: 'hidden' }}>
                            {selectedAvatar?.id === 'upload' && uploadedSrc ? (
                              <img src={uploadedSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                            ) : (<><Upload size={18} color="#676879" /><span style={{ fontSize: 10, color: '#676879' }}>Upload</span></>)}
                          </button>
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                        </div>
                        <button onClick={handleAvatarConfirm}
                          style={{ width: '100%', height: 48, background: '#0073EA', border: 'none', borderRadius: 4, color: '#fff', fontFamily: ff, fontSize: 16, cursor: 'pointer' }}>
                          Looks good
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <button onClick={handleAvatarConfirm} style={{ background: 'none', border: 'none', fontFamily: ff, fontSize: 14, color: '#676879', cursor: 'pointer' }}>skip</button>
                        </div>
                      </motion.div>
                    ) : step > 2 ? (
                      <motion.div key="avatar-confirmed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <UserBubble>
                          {selectedAvatar?.id === 'upload' && uploadedSrc
                            ? <img src={uploadedSrc} alt="" style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: 6 }} />
                            : <span style={{ fontSize: 24 }}>{avatarEmoji}</span>}
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
                <motion.div key="outro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <StreamingAI displayed={s3m1.displayed} enabled={step >= 3} />
                  {s3m1.done && <StreamingSub displayed={s3m2.displayed} enabled={step >= 3} />}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} style={{ height: 1, flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* Transition overlay — clean fade with Sidekick moving to bottom-right */}
      <AnimatePresence>
        {transitioning && (
          <motion.div key="transition"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.img src={sidekickClosedImg}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0.7, opacity: 0.8, x: 'calc(50vw - 48px)', y: 'calc(50vh - 48px)' }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ width: 72, height: 72, borderRadius: '50%' }} alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
