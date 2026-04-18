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

type NavId = 'workspace' | 'sidekick' | 'favorites' | 'agents' | 'apps' | 'notetaker' | 'more';

export function PlatformShell() {
  const [activeNav, setActiveNav] = useState<NavId>('workspace');
  const [sidekickOpen, setSidekickOpen] = useState(false);
  const [welcomeMessages, setWelcomeMessages] = useState<SKMessageData[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasShownWelcome = useRef(false);

  const skName = localStorage.getItem('sidekick_name') || 'Sidekick';

  const [streamingText, setStreamingText] = useState('');
  const [streamDone, setStreamDone] = useState(false);

  const fullWelcomeText = `Welcome to your new workspace, ${PERSONA.firstName}! I can see your Recruitment Pipeline has 8 new candidates waiting to be screened. I've already set up three AI agents for your hiring workflow — a Screening Agent, Scheduling Agent, and Sourcing Agent. Want me to run the Screening Agent on those candidates?`;

  // Auto-open Sidekick on first arrival from onboarding
  useEffect(() => {
    if (hasShownWelcome.current) return;

    const fromOnboarding = localStorage.getItem('onboarding_complete') === 'true';
    if (fromOnboarding) {
      hasShownWelcome.current = true;
      localStorage.removeItem('onboarding_complete');

      // Open Sidekick panel after a brief moment
      setTimeout(() => setSidekickOpen(true), 600);

      // Stream welcome text
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
