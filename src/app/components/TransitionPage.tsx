import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { AICentricTopBar, AICentricIconRail } from './AICentricNav';
import { PERSONA } from '../data';
import sidekickClosedImg from '../../assets/sidekick-closed.png';
import sidekickIcon from '../../assets/sidekick-icon.png';

const ff = 'var(--font-body)';

const AiSparkle = ({ size = 20 }: { size?: number }) => (
  <img src={sidekickIcon} width={size} height={size} alt="" style={{ flexShrink: 0, borderRadius: '50%' }} />
);

type Step = 1 | 2;

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
  const [transitioning, setTransitioning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleNameSubmit = (def?: string) => {
    const name = def || nameInput.trim() || 'Sidekick';
    setSidekickName(name);
    localStorage.setItem('sidekick_name', name);
    setStep(2);
  };

  // Scroll
  useEffect(() => { setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 400); }, [step]);

  // Streaming — step 1: intro + name
  const s1m1 = useStreamText(`Hi ${PERSONA.firstName} — I'm your new AI Work Assistant.`, 55, 500, step >= 1, step > 1);
  const s1m2 = useStreamText("I'm going to give you superpowers and always be on your side so we can get more things done together.", 42, 300, s1m1.done, step > 1);
  const s1m3 = useStreamText("I'll be guiding you through the new monday. As a first step — what would you like to call me?", 45, 300, s1m2.done, step > 1);

  // Step 2: outro (after naming, skip avatar)
  const s2m1 = useStreamText(`${sidekickName} it is! I've been looking at your workspace — your Recruitment Pipeline, your team, your data.`, 42, 500, step >= 2, false);
  const s2m2 = useStreamText("I've already created agents tailored to your hiring workflow. Let me show you everything.", 42, 300, s2m1.done, false);

  // Transition
  useEffect(() => {
    if (step === 2 && s2m2.done && !transitioning) {
      const t = setTimeout(() => setTransitioning(true), 1200);
      return () => clearTimeout(t);
    }
  }, [step, s2m2.done, transitioning]);

  useEffect(() => {
    if (transitioning) {
      const t = setTimeout(() => navigate('/platform?welcome=true'), 1800);
      return () => clearTimeout(t);
    }
  }, [transitioning, navigate]);

  // Scroll during streaming
  const streamCount = [s1m1, s1m2, s1m3, s2m1, s2m2].reduce((n, s) => n + s.displayed.split(' ').length, 0);
  useEffect(() => { if (streamCount > 0 && streamCount % 4 === 0) bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [streamCount]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff, background: '#fff' }}>
      <style>{`@keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }`}</style>

      <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <AICentricIconRail activeItem="sidekick" />

        <div style={{
          flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center',
          padding: '40px 24px 80px', borderTopLeftRadius: 16,
          background: '#fff', scrollBehavior: 'smooth',
        }}>
          <div style={{ width: 520, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Sidekick icon — always the default, never changes */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <img src={sidekickIcon} width={80} height={80} alt="" style={{ borderRadius: '50%' }} />
            </div>

            {/* Step 1: Intro + Name */}
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

            {/* Step 2: Outro (no avatar picker) */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div key="outro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <StreamingAI displayed={s2m1.displayed} enabled={step >= 2} />
                  {s2m1.done && <StreamingSub displayed={s2m2.displayed} enabled={step >= 2} />}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} style={{ height: 1, flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* Transition overlay */}
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
