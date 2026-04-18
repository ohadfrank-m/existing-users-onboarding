import { ChevronRight, ChevronDown, Settings, MessageCircle, Plus, Mic, Paperclip } from 'lucide-react';
import { PERSONA } from '../../data';
import imgAgent1 from '../../../assets/icons/agents.svg';

const ff = 'Figtree, sans-serif';

const AGENTS_ROW = [
  { name: 'Sidekick', gradient: true },
  { name: 'Screening', initials: '🔍', color: '#00C875' },
  { name: 'Scheduling', initials: '📅', color: '#579BFC' },
  { name: 'Sourcing', initials: '🎯', color: '#FDAB3D' },
  { name: 'HR Analyst', initials: '📊', color: '#784BD1' },
];

const SUGGESTIONS = [
  { icon: '📋', color: '#FDAB3D', bg: '#FFF8E1', text: 'What did my agents work on overnight?' },
  { icon: '🎯', color: '#00C875', bg: '#E8F9F0', text: 'What should I prioritize today?' },
  { icon: '📈', color: '#E2445C', bg: '#FFF0F0', text: 'Catch me up on what\'s in progress' },
  { icon: '🔔', color: '#579BFC', bg: '#F0F4FF', text: 'What\'s new since yesterday?' },
  { icon: '⚠️', color: '#784BD1', bg: '#F5F0FF', text: 'Blockers or issues I should know about?' },
];

/* Sidekick gradient pinwheel for the avatar */
const SidekickAvatar = () => (
  <div style={{
    width: 52, height: 52, borderRadius: '50%',
    background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #00CA72 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '3px solid var(--primary-color)',
    boxShadow: '0 0 0 2px rgba(0,115,234,0.2)',
  }}>
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
      <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="#fff" />
    </svg>
  </div>
);

export function SidekickPage() {
  return (
    <>
      {/* Sidebar */}
      <div style={{ width: 230, height: '100%', background: '#fff', borderRight: '1px solid var(--layout-border-color)', padding: '10px 0', display: 'flex', flexDirection: 'column', fontFamily: ff, flexShrink: 0 }}>
        <div style={{ padding: '0 14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Sidekick</span>
            <ChevronRight size={14} color="var(--secondary-text-color)" style={{ cursor: 'pointer', transform: 'rotate(180deg)' }} />
          </div>
          <button style={{ width: '100%', background: 'var(--primary-color)', border: 'none', borderRadius: 6, padding: '8px 14px', color: '#fff', fontSize: 13, fontWeight: 500, fontFamily: ff, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
            New chat
          </button>
        </div>

        <div style={{ padding: '0 14px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-text-color)' }}>Chats</span>
            <ChevronRight size={13} color="var(--secondary-text-color)" />
          </div>
          {['Recruitment Pipeline Review', 'Q2 Hiring Strategy', 'Onboarding Workflow'].map(chat => (
            <div key={chat} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 4, cursor: 'pointer', marginBottom: 1 }}>
              <MessageCircle size={13} color="var(--secondary-text-color)" />
              <span style={{ fontSize: 12, color: 'var(--primary-text-color)' }}>{chat}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 14px', borderTop: '1px solid var(--layout-border-color)', paddingTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', cursor: 'pointer' }}>
            <Settings size={14} color="var(--secondary-text-color)" />
            <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Settings</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', cursor: 'pointer' }}>
            <MessageCircle size={14} color="var(--secondary-text-color)" />
            <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Give us feedback</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: '40px 24px' }}>
        {/* monday logo + greeting */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 4 }}>
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none"><path d="M7 37C5.2 37 3.5 36 2.6 34.3C1.7 32.6 1.8 30.6 2.8 28.9L11.9 13.6C12.9 11.9 14.6 10.9 16.4 11C18.3 11 19.9 12.1 20.8 13.9C21.6 15.6 21.5 17.6 20.5 19.3L11.4 34.6C10.5 36.1 8.8 37.1 7 37Z" fill="#FB275D"/><path d="M22.8 37.1C21 37.1 19.3 36 18.4 34.3C17.5 32.6 17.5 30.6 18.5 28.9L27.7 13.6C28.6 11.9 30.3 10.9 32.2 10.9C34 11 35.7 12.1 36.6 13.8C37.4 15.6 37.3 17.6 36.3 19.3L27.1 34.6C26.2 36.1 24.6 37.1 22.8 37.1Z" fill="#FFCB00"/><circle cx="39.7" cy="30.6" r="6.4" fill="#00C875"/></svg>
          </div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 500, color: 'var(--primary-text-color)', margin: '8px 0 0' }}>
            Good morning, {PERSONA.firstName}
          </h1>
        </div>

        {/* Agents row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          {AGENTS_ROW.map((agent, i) => (
            <div key={agent.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              {agent.gradient ? (
                <SidekickAvatar />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: agent.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '2px solid transparent' }}>
                  {agent.initials}
                </div>
              )}
              <span style={{ fontSize: 11, color: 'var(--secondary-text-color)' }}>{agent.name}</span>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px dashed var(--ui-border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={20} color="var(--secondary-text-color)" />
            </div>
            <span style={{ fontSize: 11, color: 'var(--secondary-text-color)' }}>New agent</span>
          </div>
        </div>

        {/* Prompt input */}
        <div style={{ width: '100%', maxWidth: 640, marginBottom: 24 }}>
          <div style={{
            border: '2px solid #FDAB3D', borderRadius: 12, padding: '16px 18px 12px',
            background: '#fff',
          }}>
            <div style={{ fontSize: 16, color: 'var(--placeholder-color)', marginBottom: 12, fontFamily: ff }}>
              What should we do today?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 4, background: '#F6F7FB' }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="var(--ai-purple)" /></svg>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--primary-text-color)' }}>Sidekick</span>
                </div>
                <Paperclip size={16} color="var(--secondary-text-color)" style={{ cursor: 'pointer' }} />
                <Mic size={16} color="var(--secondary-text-color)" style={{ cursor: 'pointer' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                  <Plus size={14} color="var(--secondary-text-color)" />
                  <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Add context</span>
                </div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ui-background-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion cards */}
        <div style={{ display: 'flex', gap: 10, maxWidth: 640, width: '100%', flexWrap: 'wrap' }}>
          {SUGGESTIONS.map((s, i) => (
            <div key={i} style={{
              flex: '1 1 170px', minWidth: 150, maxWidth: 200,
              background: s.bg, borderRadius: 10, padding: '14px',
              cursor: 'pointer', border: '1px solid transparent',
            }}>
              <div style={{ fontSize: 18, marginBottom: 8 }}>{s.icon}</div>
              <span style={{ fontSize: 12, color: 'var(--primary-text-color)', lineHeight: '17px' }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
