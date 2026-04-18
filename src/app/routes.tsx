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
  /* V1 — original multi-page flow */
  { path: '/',           Component: WorkspacePage },
  { path: '/preview',    Component: PreviewPage },
  { path: '/transition', Component: TransitionPage },
  { path: '/agent-run',  Component: AgentRunPage },
  { path: '/home',       Component: NewHomePage },
  /* V2 — single-page unified agentic flow */
  { path: '/v2',         Component: V2UnifiedFlow },
  /* Platform — full AI platform shell with all pages */
  { path: '/platform',   Component: PlatformShell },
], { basename: base.endsWith('/') ? base.slice(0, -1) : base });
