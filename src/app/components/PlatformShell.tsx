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
import sidekickIcon from '../../assets/sidekick-icon.png';

type NavId = 'workspace' | 'sidekick' | 'favorites' | 'agents' | 'apps' | 'notetaker' | 'more';

/*
  REVEAL PHASES (when ?welcome=true):
  phase 0: closed sidekick button bottom-right (0-600ms)
  phase 1: sidekick panel expands, starts greeting (600-1200ms)
  phase 2: topbar + icon rail fade in (1200-1800ms)
  phase 3: sidebar + content fade in (1800-2400ms)
  phase 4: fully revealed, sidekick continues conversation
*/

export function PlatformShell() {
  const [activeNav, setActiveNav] = useState<NavId>('workspace');
  const [searchParams] = useSearchParams();
  const isWelcome = searchParams.get('welcome') === 'true';

  // Reveal state
  const [revealPhase, setRevealPhase] = useState(isWelcome ? 0 : 4);
  const [sidekickOpen, setSidekickOpen] = useState(!isWelcome);
  const [welcomeMessages, setWelcomeMessages] = useState<SKMessageData[]>([]);
  const [streamingText, setStreamingText] = useState('');
  const [streamDone, setStreamDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const skName = localStorage.getItem('sidekick_name') || 'Sidekick';

  const greetingText = `Welcome to your new workspace, ${PERSONA.firstName}! I can see your Recruitment Pipeline has 8 new candidates waiting. I've set up three AI agents for your hiring workflow — let me show you around.`;

  // Orchestrate the reveal sequence
  useEffect(() => {
    if (!isWelcome || hasStarted.current) return;
    hasStarted.current = true;

    // Phase 0 → 1: Expand Sidekick panel
    setTimeout(() => {
      setRevealPhase(1);
      setSidekickOpen(true);

      // Start streaming greeting
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
              thinking: 'Analyzing workspace: Recruitment Pipeline has 8 unscreened candidates. 3 overdue. Screening Agent configured and ready.',
              heading: 'Your AI Agents',
              contentCard: {
                title: 'Ready to work',
                items: [
                  { label: 'Screening Agent — score candidates against requirements', color: '#00C875' },
                  { label: 'Scheduling Agent — auto-book interviews', color: '#579BFC' },
                  { label: 'Sourcing Agent — find and rank talent', color: '#FDAB3D' },
                ],
              },
              actions: [
                { label: 'Run Screening Agent on 8 new candidates' },
                { label: 'Explore all agents' },
                { label: 'Maybe later', terminal: true },
              ],
            }]);
          }, 400);
        }
      }, 40);
    }, 800);

    // Phase 1 → 2: Reveal topbar + icon rail
    setTimeout(() => setRevealPhase(2), 1800);

    // Phase 2 → 3: Reveal sidebar + content
    setTimeout(() => setRevealPhase(3), 2800);

    // Phase 3 → 4: Fully revealed
    setTimeout(() => setRevealPhase(4), 3600);
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

  const showTopbar = revealPhase >= 2 || !isWelcome;
  const showNav = revealPhase >= 2 || !isWelcome;
  const showContent = revealPhase >= 3 || !isWelcome;

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', fontFamily: 'var(--font-body)',
      background: 'var(--surface-chrome)',
    }}>
      {/* Topbar — fades in at phase 2 */}
      <motion.div
        initial={isWelcome ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        animate={showTopbar ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <AICentricTopBar
          userName={PERSONA.teamMembers[0].initials}
          userColor={PERSONA.teamMembers[0].color}
        />
      </motion.div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Icon rail — fades in at phase 2 */}
        <motion.div
          initial={isWelcome ? { opacity: 0, x: -40 } : { opacity: 1, x: 0 }}
          animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <AICentricIconRail activeItem={activeNav} onNavClick={(id) => setActiveNav(id as NavId)} />
        </motion.div>

        {/* Page content — fades in at phase 3 */}
        <motion.div
          initial={isWelcome ? { opacity: 0 } : { opacity: 1 }}
          animate={showContent ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
        >
          {renderPage()}
        </motion.div>

        {/* Closed Sidekick button — phase 0 only */}
        <AnimatePresence>
          {isWelcome && revealPhase === 0 && (
            <motion.div key="sk-closed"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', bottom: 24, right: 24, zIndex: 60,
                width: 56, height: 56, borderRadius: '50%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                cursor: 'pointer', overflow: 'hidden',
              }}
              onClick={() => { setRevealPhase(1); setSidekickOpen(true); }}
            >
              <img src={sidekickIcon} width={56} height={56} alt="Open Sidekick" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sidekick panel — expands from phase 1 onward */}
        <AnimatePresence>
          {sidekickOpen && activeNav !== 'sidekick' && (
            <motion.div key="sk-panel"
              initial={isWelcome ? { width: 0, opacity: 0 } : { width: 340, opacity: 1 }}
              animate={{ width: 340, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden', flexShrink: 0 }}
            >
              <SidekickPanel
                name={skName}
                scope="Recruitment Pipeline"
                messages={streamDone ? welcomeMessages : (streamingText ? [{ type: 'sidekick' as const, text: streamingText }] : [])}
                userInitials={PERSONA.teamMembers[0].initials}
                userColor={PERSONA.teamMembers[0].color}
                showGradientBorder={isWelcome}
                panelRef={panelRef}
              >
                {sidekickOpen && (
                  <div style={{ padding: '0 14px', marginBottom: 8 }}>
                    <button onClick={() => setSidekickOpen(false)}
                      style={{ width: '100%', padding: 8, background: '#F5F6F8', border: 'none', borderRadius: 8, fontSize: 12, color: '#676879', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                      Close panel
                    </button>
                  </div>
                )}
              </SidekickPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
