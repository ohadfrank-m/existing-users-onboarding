import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { motion } from 'motion/react';
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

function useStreamText(text: string, speed = 38, delay = 0, enabled = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!enabled) { setDisplayed(''); setDone(false); return; }
    setDisplayed(''); setDone(false);
    const words = text.split(' '); let i = 0;
    const tm = setTimeout(() => {
      const iv = setInterval(() => { i++; setDisplayed(words.slice(0, i).join(' ')); if (i >= words.length) { clearInterval(iv); setDone(true); } }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(tm);
  }, [text, speed, delay, enabled]);
  return { displayed, done };
}

/*
  REVEAL BEATS (when ?welcome=true):

  Beat 0 (0ms):         Sidekick panel slides in, greeting streams
  Beat 1 (auto):        After greeting done → topbar fades in,
                        Sidekick explains the header
  Beat 2 (auto):        After header msg done → icon rail slides in,
                        Sidekick explains nav
  Beat 3 (auto):        After nav msg done → sidebar + content fades in,
                        Sidekick explains workspace
  Beat 4 (auto):        After workspace msg done → offer first action
*/

export function PlatformShell() {
  const [activeNav, setActiveNav] = useState<NavId>('workspace');
  const [searchParams] = useSearchParams();
  const isWelcome = searchParams.get('welcome') === 'true';

  const [beat, setBeat] = useState(isWelcome ? 0 : 5);
  const [sidekickOpen, setSidekickOpen] = useState(true);
  const [messages, setMessages] = useState<SKMessageData[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const skName = localStorage.getItem('sidekick_name') || 'Sidekick';

  // Beat 0: Greeting
  const msg0 = useStreamText(
    `Welcome to your new platform, ${PERSONA.firstName}! Everything you know is still here — but now it's powered by AI. Let me walk you through what's changed.`,
    36, 600, isWelcome && beat === 0
  );

  // Beat 1: Header
  const msg1 = useStreamText(
    "This is your new header. The search bar can now answer questions about your data, and you'll always find me right here on the side.",
    34, 400, beat === 1
  );

  // Beat 2: Nav rail
  const msg2 = useStreamText(
    "On the left — your new navigation. Work Space for your boards, Sidekick to chat with me, Favorites for quick access, Agents for your AI workers, Apps for Vibe, and Notetaker for meetings.",
    30, 400, beat === 2
  );

  // Beat 3: Workspace + content
  const msg3 = useStreamText(
    "Your workspace is loaded with all your documents and boards. Your Recruitment Pipeline is right here — same data, now AI-powered.",
    32, 400, beat === 3
  );

  // Auto-advance beats based on message completion
  useEffect(() => { if (msg0.done && beat === 0) setTimeout(() => setBeat(1), 800); }, [msg0.done, beat]);
  useEffect(() => { if (msg1.done && beat === 1) setTimeout(() => setBeat(2), 800); }, [msg1.done, beat]);
  useEffect(() => { if (msg2.done && beat === 2) setTimeout(() => setBeat(3), 800); }, [msg2.done, beat]);
  useEffect(() => {
    if (msg3.done && beat === 3) {
      setTimeout(() => {
        setBeat(4);
        // Show the final message with actions
        setMessages([{
          type: 'sidekick',
          text: "You're all set! I've configured three AI agents for your hiring workflow. Want to see them in action?",
          contentCard: {
            title: 'Your AI Agents',
            items: [
              { label: 'Screening Agent — score candidates against requirements', color: '#00C875' },
              { label: 'Scheduling Agent — auto-book interviews', color: '#579BFC' },
              { label: 'Sourcing Agent — find and rank talent', color: '#FDAB3D' },
            ],
          },
          actions: [
            { label: 'Run Screening Agent on 8 new candidates' },
            { label: 'Explore all agents' },
            { label: 'Got it, thanks!', terminal: true },
          ],
        }]);
      }, 600);
    }
  }, [msg3.done, beat]);

  // Scroll panel
  useEffect(() => {
    panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
  }, [msg0.displayed, msg1.displayed, msg2.displayed, msg3.displayed, messages]);

  // Build streaming messages array for the panel
  const streamingMessages: SKMessageData[] = [];
  if (beat >= 0 && msg0.displayed) streamingMessages.push({ type: 'sidekick', text: msg0.displayed });
  if (beat >= 1 && msg1.displayed) streamingMessages.push({ type: 'sidekick', text: msg1.displayed });
  if (beat >= 2 && msg2.displayed) streamingMessages.push({ type: 'sidekick', text: msg2.displayed });
  if (beat >= 3 && msg3.displayed) streamingMessages.push({ type: 'sidekick', text: msg3.displayed });

  const panelMessages = beat >= 4 ? [...streamingMessages.slice(0, -1), ...messages] : streamingMessages;
  // Fade past messages
  const renderMessages = beat >= 4 ? panelMessages : panelMessages;

  const showTopbar = beat >= 1 || !isWelcome;
  const showNav = beat >= 2 || !isWelcome;
  const showContent = beat >= 3 || !isWelcome;

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
      {/* Topbar — fades in at beat 1 */}
      <motion.div
        initial={isWelcome ? { opacity: 0, y: -8 } : false}
        animate={showTopbar ? { opacity: 1, y: 0 } : isWelcome ? { opacity: 0, y: -8 } : false}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AICentricTopBar userName={PERSONA.teamMembers[0].initials} userColor={PERSONA.teamMembers[0].color} />
      </motion.div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Icon rail — slides in at beat 2 */}
        <motion.div
          initial={isWelcome ? { opacity: 0, x: -16 } : false}
          animate={showNav ? { opacity: 1, x: 0 } : isWelcome ? { opacity: 0, x: -16 } : false}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <AICentricIconRail activeItem={activeNav} onNavClick={(id) => setActiveNav(id as NavId)} />
        </motion.div>

        {/* Page content — fades in at beat 3 */}
        <motion.div
          initial={isWelcome ? { opacity: 0 } : false}
          animate={showContent ? { opacity: 1 } : isWelcome ? { opacity: 0 } : false}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, display: 'flex', overflow: 'hidden' }}
        >
          {renderPage()}
        </motion.div>

        {/* Sidekick panel — fixed right side, full height, always visible during welcome */}
        {sidekickOpen && activeNav !== 'sidekick' && (
          <motion.div
            initial={isWelcome ? { x: 360, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 340, zIndex: 50,
              overflow: 'hidden',
            }}
          >
            <SidekickPanel
              name={skName}
              scope="Recruitment Pipeline"
              messages={renderMessages}
              userInitials={PERSONA.teamMembers[0].initials}
              userColor={PERSONA.teamMembers[0].color}
              showGradientBorder={isWelcome && beat < 5}
              panelRef={panelRef}
            >
              <div style={{ padding: '0 14px', marginBottom: 8 }}>
                <button onClick={() => { setSidekickOpen(false); setBeat(5); }}
                  style={{ width: '100%', padding: 8, background: '#F5F6F8', border: 'none', borderRadius: 8, fontSize: 12, color: '#676879', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  Close panel
                </button>
              </div>
            </SidekickPanel>
          </motion.div>
        )}
      </div>
    </div>
  );
}
