import { useState } from 'react';
import { AICentricIconRail, AICentricTopBar } from './AICentricNav';
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

  const renderPage = () => {
    switch (activeNav) {
      case 'workspace': return <WorkSpacePage />;
      case 'sidekick': return <SidekickPage />;
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
      overflow: 'hidden', fontFamily: 'Figtree, sans-serif',
      background: 'var(--primary-background-hover-color)',
    }}>
      {/* Top bar */}
      <AICentricTopBar
        userName={PERSONA.teamMembers[0].initials}
        userColor={PERSONA.teamMembers[0].color}
      />

      {/* Body: icon rail + page content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Icon rail — always visible, clickable */}
        <AICentricIconRail activeItem={activeNav} onNavClick={(id) => setActiveNav(id as NavId)} />

        {/* Page content — each page renders its own sidebar + main area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
