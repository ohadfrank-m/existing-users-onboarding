import { createBrowserRouter } from 'react-router';
import { WorkspacePage } from './components/WorkspacePage';
import { PreviewPage } from './components/PreviewPage';
import { TransitionPage } from './components/TransitionPage';
import { AgentRunPage } from './components/AgentRunPage';
import { NewHomePage } from './components/NewHomePage';
import { V2UnifiedFlow } from './components/V2UnifiedFlow';
import { PlatformShell } from './components/PlatformShell';

const base = import.meta.env.BASE_URL;

export const router = createBrowserRouter([
  /* Six-Act Onboarding Flow */
  { path: '/',           Component: WorkspacePage },     /* Act 0: The Invitation (banner) */
  { path: '/preview',    Component: PreviewPage },       /* Loader: upgrading workspace */
  { path: '/transition', Component: TransitionPage },    /* Sidekick setup conversation */

  /* Legacy routes (kept for backwards compat) */
  { path: '/agent-run',  Component: AgentRunPage },
  { path: '/home',       Component: NewHomePage },
  { path: '/v2',         Component: V2UnifiedFlow },

  /* Platform — the destination */
  { path: '/platform',   Component: PlatformShell },
], { basename: base.endsWith('/') ? base.slice(0, -1) : base });
