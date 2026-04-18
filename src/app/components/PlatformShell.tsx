import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AICentricIconRail, AICentricTopBar } from './AICentricNav';
import { SidekickPanel, SKMessageData } from './SidekickPanel';
import { WorkSpacePage } from './pages/WorkSpacePage';
import { SidekickPage } from './pages/SidekickPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AgentsPage } from './pages/AgentsPage';
import { AppsPage } from './pages/AppsPage';
import { NotetakerPage } from './pages/NotetakerPage';
import { MorePage } from './pages/MorePage';
import { PERSONA } from '../data';
import sidekickClosedImg from '../../assets/sidekick-closed.png';

type NavId = 'workspace' | 'sidekick' | 'favorites' | 'agents' | 'apps' | 'notetaker' | 'more';

export function PlatformShell() {
  const [activeNav, setActiveNav] = useState<NavId>('workspace');
  const [sidekickOpen, setSidekickOpen] = useState(false);
  const [sidekickClosedVisible, setSidekickClosedVisible] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [welcomeMessages, setWelcomeMessages] = useState<SKMessageData[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasShownWelcome = useRef(false);

  const skName = localStorage.getItem('sidekick_name') || 'Sidekick';

  const [streamingText, setStreamingText] = useState('');
  const [streamDone, setStreamDone] = useState(false);

  const fullWelcomeText = `Welcome to your new workspace, ${PERSONA.firstName}! Everything is set up and ready to go. Your boards and documents have been migrated, and I've configured three AI agents tailored to your hiring workflow.`;

  // Auto-open Sidekick on first arrival from onboarding
  useEffect(() => {
    if (hasShownWelcome.current) return;

    const fromOnboarding = localStorage.getItem('onboarding_complete') === 'true';
    if (fromOnboarding) {
      hasShownWelcome.current = true;
      localStorage.removeItem('onboarding_complete');

      // Phase 1: Show skeleton loading
      setSkeletonLoading(true);

      // Phase 2: After 800ms, show closed Sidekick button (bottom-right)
      setTimeout(() => setSidekickClosedVisible(true), 800);

      // Phase 3: After 1.5s, open Sidekick panel
      setTimeout(() => {
        setSidekickClosedVisible(false);
        setSidekickOpen(true);
      }, 1800);

      // Phase 4: After 2.5s, remove skeleton, show real content
      setTimeout(() => setSkeletonLoading(false), 2800);

      // Phase 5: Stream welcome text
      const words = fullWelcomeText.split(' ');
      let i = 0;
      const delay = setTimeout(() => {
        const iv = setInterval(() => {
          i++;
          setStreamingText(words.slice(0, i).join(' '));
          if (i >= words.length) {
            clearInterval(iv);
            setTimeout(() => {
              setWelcomeMessages([{
                type: 'sidekick',
                text: fullWelcomeText,
                thinking: 'Analyzing workspace context: Recruitment Pipeline active, 8 new candidates in queue, 3 agents configured and ready.',
                contentCard: {
                  title: "What's ready for you",
                  items: [
                    { label: 'Your boards and documents — all migrated', color: 'var(--color-success)' },
                    { label: 'Screening Agent — ready to run', color: 'var(--agent-screening)' },
                    { label: 'Scheduling Agent — ready to run', color: 'var(--agent-scheduling)' },
                    { label: 'Sourcing Agent — ready to run', color: 'var(--agent-sourcing)' },
                  ],
                },
                actions: [
                  { label: 'Run Screening Agent on 8 new candidates' },
                  { label: 'Explore your AI agents' },
                  { label: 'Browse your workspace' },
                  { label: 'Dismiss', terminal: true },
                ],
              }]);
              setStreamDone(true);
            }, 400);
          }
        }, 45);
        return () => clearInterval(iv);
      }, 800);
      return () => clearTimeout(delay);
    }
  }, []);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [welcomeMessages]);

  const renderPage = () => {
    // If Sidekick nav is active, show the Sidekick home page without the panel
    if (activeNav === 'sidekick') return <SidekickPage />;
    switch (activeNav) {
      case 'workspace': return <WorkSpacePage />;
      case 'favorites': return <FavoritesPage />;
      case 'agents': return <AgentsPage />;
      case 'apps': return <AppsPage />;
      case 'notetaker': return <NotetakerPage />;
      case 'more': return <MorePage />;
    }
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', fontFamily: 'var(--font-body)',
      background: 'var(--surface-chrome)',
    }}>
      <style>{`@keyframes skelShimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }`}</style>

      {/* Top bar */}
      <AICentricTopBar
        userName={PERSONA.teamMembers[0].initials}
        userColor={PERSONA.teamMembers[0].color}
      />

      {/* Body: icon rail + page content + optional Sidekick panel */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <AICentricIconRail activeItem={activeNav} onNavClick={(id) => setActiveNav(id as NavId)} />

        {/* Page content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {renderPage()}
        </div>

        {/* Skeleton loading overlay */}
        <AnimatePresence>
          {skeletonLoading && (
            <motion.div key="skeleton" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
              style={{ position: 'absolute', inset: 0, zIndex: 30, background: 'var(--surface-content)', display: 'flex', flexDirection: 'column', padding: 'var(--space-32)', gap: 'var(--space-16)' }}>
              {/* Skeleton bars */}
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: '#E7E9EF' }} />
                  <div style={{ width: `${120 + (i % 3) * 60}px`, height: 12, borderRadius: 4, background: 'linear-gradient(90deg, #E8EAF0 25%, #F5F6FA 50%, #E8EAF0 75%)', backgroundSize: '200% 100%', animation: 'skelShimmer 1.5s infinite linear' }} />
                  <div style={{ width: `${80 + (i % 2) * 40}px`, height: 12, borderRadius: 4, background: 'linear-gradient(90deg, #E8EAF0 25%, #F5F6FA 50%, #E8EAF0 75%)', backgroundSize: '200% 100%', animation: 'skelShimmer 1.5s infinite linear', animationDelay: '0.3s' }} />
                  <div style={{ width: 60, height: 22, borderRadius: 4, background: 'linear-gradient(90deg, #E8EAF0 25%, #F5F6FA 50%, #E8EAF0 75%)', backgroundSize: '200% 100%', animation: 'skelShimmer 1.5s infinite linear', animationDelay: '0.6s' }} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closed Sidekick button — bottom-right, 56x56 */}
        <AnimatePresence>
          {sidekickClosedVisible && (
            <motion.div key="sk-closed"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => { setSidekickClosedVisible(false); setSidekickOpen(true); }}
              style={{
                position: 'fixed', bottom: 24, right: 24, zIndex: 60,
                display: 'flex', width: 56, height: 56,
                justifyContent: 'flex-end', alignItems: 'center',
                gap: 14, flexShrink: 0,
                background: '#fff', borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                justifyContent: 'center',
              }}>
              <img src={sidekickClosedImg} width={56} height={56} style={{ borderRadius: 'var(--radius-full)' }} alt="Open Sidekick" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidekick panel — slides in when open, not on Sidekick home page */}
        {sidekickOpen && activeNav !== 'sidekick' && (
          <SidekickPanel
            name={skName}
            scope="Recruitment Pipeline"
            messages={streamDone ? welcomeMessages : (streamingText ? [{ type: 'sidekick' as const, text: streamingText }] : [])}
            userInitials={PERSONA.teamMembers[0].initials}
            userColor={PERSONA.teamMembers[0].color}
            showGradientBorder
            panelRef={panelRef}
          >
            {/* Close button area */}
            <div style={{ padding: '0 var(--space-14)', marginBottom: 'var(--space-8)' }}>
              <button onClick={() => setSidekickOpen(false)}
                style={{
                  width: '100%', padding: 'var(--space-8)',
                  background: 'var(--surface-card-muted)',
                  border: 'none', borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}>
                Close panel
              </button>
            </div>
          </SidekickPanel>
        )}
      </div>
    </div>
  );
}
