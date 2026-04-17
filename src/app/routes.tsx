import { createBrowserRouter } from 'react-router';
import { WorkspacePage } from './components/WorkspacePage';
import { PreviewPage } from './components/PreviewPage';
import { TransitionPage } from './components/TransitionPage';
import { AgentRunPage } from './components/AgentRunPage';
import { NewHomePage } from './components/NewHomePage';

const base = import.meta.env.BASE_URL;

export const router = createBrowserRouter([
  { path: '/',           Component: WorkspacePage },
  { path: '/preview',    Component: PreviewPage },
  { path: '/transition', Component: TransitionPage },
  { path: '/agent-run',  Component: AgentRunPage },
  { path: '/home',       Component: NewHomePage },
], { basename: base.endsWith('/') ? base.slice(0, -1) : base });
