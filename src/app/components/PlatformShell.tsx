import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
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

/*
  REVEAL CHOREOGRAPHY (when ?welcome=true):

  Beat 1 (0-400ms):    Soft white screen with subtle fade
  Beat 2 (400-1000ms): Sidekick panel slides in from right edge,
                       greeting starts streaming immediately
  Beat 3 (1000-1600ms): Topbar fades down, icon rail slides in
                        — chrome layer materializes around Sidekick
  Beat 4 (1600-2200ms): Content area + sidebar fade in together
  Beat 5 (2200ms+):     Fully revealed, Sidekick shows cards + actions,
                        starts reviewing sidebar for the user
*/

export function PlatformShell() {
  const [activeNav, setActiveNav] = useState<NavId>('workspace');
  const [searchParams] = useSearchParams();
  const isWelcome = searchParams.get('welcome') === 'true';

  const [beat, setBeat] = useState(isWelcome ? 0 : 5);
  const [sidekickOpen, setSidekickOpen] = useState(!isWelcome);
  const [welcomeMessages, setWelcomeMessages] = useState<SKMessageData[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [streamDone, setStreamDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const skName = localStorage.getItem('sidekick_name') || 'Sidekick';

  const greetingText = `Welcome to your new workspace, ${PERSONA.firstName}! I can see your Recruitment Pipeline has 8 new candidates waiting. Let me show you around — I'll walk you through each part of your new platform.`;

  useEffect(() => {
    if (!isWelcome || hasStarted.current) return;
    hasStarted.current = true;

    // Beat 1 → 2: Open Sidekick panel + start streaming
    setTimeout(() => {
      setBeat(2);
      setSidekickOpen(true);

      // Stream greeting
      const words = greetingText.split(' ');
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setStreamingText(words.slice(0, i).join(' '));
        if (i >= words.length) {
          clearInterval(iv);
          setTimeout(() => {
            setStreamDone(true);
            setWelcomeMessages([{
              type: 'sidekick',
              text: greetingText,
              thinking: 'Analyzing workspace: Recruitment Pipeline with 8 unscreened candidates, 3 overdue. 3 AI agents configured. Workspace has 7 documents.',
              heading: 'Your new workspace',
              subheading: 'Here\'s what I set up for you:',
              contentCard: {
                title: 'Ready to work',
                items: [
                  { label: 'Screening Agent — score candidates against requirements', color: '#00C875' },
                  { label: 'Scheduling Agent — auto-book interviews', color: '#579BFC' },
                  { label: 'Sourcing Agent — find and rank talent', color: '#FDAB3D' },
                ],
              },
              instruction: 'Use the sidebar on the left to navigate between your workspace, agents, apps, and more. Click any nav icon to explore.',
              actions: [
                { label: 'Run Screening Agent on 8 new candidates' },
                { label: 'Explore all agents' },
                { label: 'Maybe later', terminal: true },
              ],
            }]);
          }, 300);
        }
      }, 38);
    }, 400);

    // Beat 2 → 3: Reveal topbar + icon rail
    setTimeout(() => setBeat(3), 1200);

    // Beat 3 → 4: Reveal content
    setTimeout(() => setBeat(4), 2000);

    // Beat 4 → 5: Fully ready
    setTimeout(() => setBeat(5), 2600);
  }, [isWelcome]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
  }, [streamingText, welcomeMessages]);

  const renderPage = () => {
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
      {/* Topbar — slides down at beat 3 */}
      <motion.div
        initial={isWelcome ? { opacity: 0, y: -10 } : false}
        animate={beat >= 3 ? { opacity: 1, y: 0 } : isWelcome ? { opacity: 0, y: -10 } : false}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />
      </motion.div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Icon rail — slides in at beat 3 */}
        <motion.div
          initial={isWelcome ? { opacity: 0, x: -20 } : false}
          animate={beat >= 3 ? { opacity: 1, x: 0 } : isWelcome ? { opacity: 0, x: -20 } : false}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AICentricIconRail activeItem={activeNav} onNavClick={(id) => setActiveNav(id as NavId)} />
        </motion.div>

        {/* Page content — fades in at beat 4 */}
        <motion.div
          initial={isWelcome ? { opacity: 0, scale: 0.98 } : false}
          animate={beat >= 4 ? { opacity: 1, scale: 1 } : isWelcome ? { opacity: 0, scale: 0.98 } : false}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
        >
          {renderPage()}
        </motion.div>

        {/* Sidekick panel — slides in from right at beat 2 */}
        <AnimatePresence>
          {sidekickOpen && activeNav !== 'sidekick' && (
            <motion.div key="sk-panel"
              initial={isWelcome ? { x: 360, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 360, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ flexShrink: 0, overflow: 'hidden' }}
            >
              <SidekickPanel
                name={skName}
                scope="Recruitment Pipeline"
                messages={streamDone ? welcomeMessages : (streamingText ? [{ type: 'sidekick' as const, text: streamingText }] : [])}
                userInitials={PERSONA.teamMembers[0].initials}
                userColor={PERSONA.teamMembers[0].color}
                showGradientBorder={isWelcome && beat < 5}
                panelRef={panelRef}
              >
                <div style={{ padding: '0 14px', marginBottom: 8 }}>
                  <button onClick={() => setSidekickOpen(false)}
                    style={{ width: '100%', padding: 8, background: '#F5F6F8', border: 'none', borderRadius: 8, fontSize: 12, color: '#676879', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                    Close panel
                  </button>
                </div>
              </SidekickPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
