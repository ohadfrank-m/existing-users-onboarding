import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { AICentricTopBar, AICentricIconRail } from './AICentricNav';
import { PERSONA } from '../data';

const ff = 'var(--font-body)';
const fp = 'var(--font-heading)';

/* Spinner */
const Spinner = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="9" stroke="var(--border-light)" strokeWidth="2.5" />
    <path d="M12 3a9 9 0 0 1 9 9" stroke="var(--brand-primary)" strokeWidth="2.5" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.75s" repeatCount="indefinite" />
    </path>
  </svg>
);

const CARDS = [
  {
    id: 'card1',
    imgBg: '#F5F6FF',
    border: 'var(--border-subtle)',
    icon: '📋',
    title: 'Your Workspace',
    desc: 'All your boards, documents, and data — exactly where you left them.',
    doneTitle: 'Your workspace',
    doneDesc: 'Everything migrated. Boards, docs, and workflows — now AI-powered.',
  },
  {
    id: 'card2',
    imgBg: '#F0FBF8',
    border: '#A8D4BC',
    icon: '🤖',
    title: 'AI Agents',
    desc: 'Autonomous agents tailored to your workflow — screening, scheduling, sourcing.',
    doneTitle: 'Your agents',
    doneDesc: 'Screen candidates, schedule interviews, and find talent — running in the background.',
  },
  {
    id: 'card3',
    imgBg: '#F0EDFF',
    border: '#CBBEF4',
    icon: '✦',
    title: 'AI Work Assistant',
    desc: 'Your personal AI assistant — always available, always learning from your context.',
    doneTitle: 'Your assistant',
    doneDesc: 'Recommends actions, answers questions, and runs agents — one click away.',
  },
];

export function PreviewPage() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(1);
  const [headingDone, setHeadingDone] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleExplore = () => {
    setExiting(true);
    setTimeout(() => navigate('/transition'), 500);
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setRevealed(2), 2000),
      setTimeout(() => setRevealed(3), 4000),
      setTimeout(() => setHeadingDone(true), 5000),
      setTimeout(() => setShowCTA(true), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff, background: 'var(--surface-chrome)' }}>
      <style>{`@keyframes skelShimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }`}</style>

      {/* Topbar */}
      <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <AICentricIconRail activeItem="workspace" />

        {/* Main area */}
        <motion.div
          initial={false}
          animate={exiting ? { opacity: 0, scale: 0.97, y: -24 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.46, ease: [0.4, 0, 0.8, 1] }}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 var(--space-32)',
            borderTopLeftRadius: 'var(--radius-lg)',
            background: 'var(--surface-content)',
          }}
        >
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)', minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait" initial={false}>
              {!headingDone ? (
                <motion.h1 key="loading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  style={{ fontFamily: fp, fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)', margin: 0 }}>
                  Upgrading your workspace…
                </motion.h1>
              ) : (
                <motion.h1 key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: fp, fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)', margin: 0 }}>
                  Your AI work platform is ready
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <p style={{ fontFamily: ff, fontSize: 'var(--font-size-xl)', color: 'var(--text-primary)', margin: '0 0 var(--space-40)', textAlign: 'center', maxWidth: 560 }}>
            Your workspace, AI agents, and a personal assistant — built on top of everything you already have.
          </p>

          {/* Cards */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44, minHeight: 300, alignItems: 'center' }}>
            <motion.div layout transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', gap: 'var(--space-24)' }}>
              <AnimatePresence>
                {CARDS.slice(0, revealed).map((card) => (
                  <motion.div key={card.id} layout
                    initial={{ opacity: 0, x: 80, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: 280, borderRadius: 'var(--radius-lg)',
                      border: `1px solid ${card.border}`,
                      overflow: 'hidden', boxShadow: 'var(--shadow-md)',
                      background: 'var(--surface-content)', flexShrink: 0,
                    }}>
                    <div style={{ width: '100%', height: 160, background: card.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                      {card.icon}
                    </div>
                    <div style={{ padding: 'var(--space-16) var(--space-20) var(--space-20)' }}>
                      <p style={{ fontFamily: ff, fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)', margin: '0 0 6px' }}>
                        {headingDone ? card.doneTitle : card.title}
                      </p>
                      <p style={{ fontFamily: ff, fontSize: 'var(--font-size-md)', color: 'var(--text-primary)', margin: 0, lineHeight: 'var(--line-height-normal)' }}>
                        {headingDone ? card.doneDesc : card.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Spinner or CTA */}
          <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              {!showCTA ? (
                <motion.div key={`spin-${revealed}`}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
                  <Spinner />
                  <span style={{ fontSize: 'var(--font-size-md)', color: 'var(--text-secondary)' }}>
                    {revealed === 1 && 'Migrating your workspace'}
                    {revealed === 2 && 'Setting up your AI agents'}
                    {revealed >= 3 && 'Preparing your assistant'}
                  </span>
                </motion.div>
              ) : (
                <motion.button key="cta"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.015 }}
                  onClick={handleExplore}
                  style={{
                    width: 192, height: 48,
                    background: 'var(--brand-primary)', border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-inverse)',
                    fontFamily: ff, fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 'var(--space-8)',
                  }}>
                  See it in action
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-inverse)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
