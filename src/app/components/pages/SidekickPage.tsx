import { ChevronRight, Settings, MessageCircle, Plus, Mic, Paperclip } from 'lucide-react';
import { PERSONA } from '../../data';
import imgAgent1 from '../../../assets/agent-avatar-1.png';
import imgAgent2 from '../../../assets/agent-avatar-2.png';
import imgAgent3 from '../../../assets/agent-avatar-3.png';
import iconMondayLogo from '../../../assets/icons/monday-logo.svg';

const ff = 'Figtree, sans-serif';

/* Sidekick gradient avatar with active border */
const SidekickAvatar = () => (
  <div style={{
    width: 56, height: 56, borderRadius: '50%', padding: 3,
    background: 'linear-gradient(135deg, #579BFC, #6161FF, #784BD1)',
    boxShadow: '0 0 0 2px rgba(87,155,252,0.3)',
  }}>
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%',
      background: 'linear-gradient(135deg, #667EEA, #764BA2, #00CA72)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
        <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="#fff" />
      </svg>
    </div>
  </div>
);

const AGENTS_ROW = [
  { name: 'Sidekick', type: 'sidekick' as const },
  { name: 'Linda', img: imgAgent1 },
  { name: 'Michael', img: imgAgent2 },
  { name: 'Greg', img: imgAgent3 },
  { name: 'Jane', img: imgAgent1 },
  { name: 'David', img: imgAgent2 },
  { name: 'Aisha', img: imgAgent3 },
];

const SUGGESTIONS = [
  { icon: '📋', color: '#FDAB3D', bg: '#FFF8E1', text: 'What did my agents work on overnight?' },
  { icon: '🎯', color: '#00C875', bg: '#E8F9F0', text: 'What should I prioritize today?' },
  { icon: '📈', color: '#E2445C', bg: '#FFF0F0', text: 'Catch me up on what\'s in progress' },
  { icon: '🔔', color: '#579BFC', bg: '#F0F4FF', text: 'What\'s new since yesterday?' },
  { icon: '⚠️', color: '#784BD1', bg: '#F5F0FF', text: 'Blockers or issues I should know about?' },
];

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
            <img src={iconMondayLogo} width={36} height={36} alt="monday" />
          </div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 500, color: 'var(--primary-text-color)', margin: 0 }}>
            Good morning, {PERSONA.firstName}
          </h1>
        </div>

        {/* Agents row — using actual illustration images */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          {AGENTS_ROW.map((agent) => (
            <div key={agent.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              {agent.type === 'sidekick' ? (
                <SidekickAvatar />
              ) : (
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', overflow: 'hidden',
                  border: '2px solid var(--layout-border-color)',
                }}>
                  <img src={agent.img} width={56} height={56} style={{ objectFit: 'cover' }} alt={agent.name} />
                </div>
              )}
              <span style={{ fontSize: 11, color: agent.type === 'sidekick' ? 'var(--primary-color)' : 'var(--secondary-text-color)', fontWeight: agent.type === 'sidekick' ? 600 : 400 }}>{agent.name}</span>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px dashed var(--ui-border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={20} color="var(--secondary-text-color)" />
            </div>
            <span style={{ fontSize: 11, color: 'var(--secondary-text-color)' }}>New agent</span>
          </div>
        </div>

        {/* Prompt input — matching the yellow/orange border from Figma */}
        <div style={{ width: '100%', maxWidth: 640, marginBottom: 24 }}>
          <div style={{
            border: '2px solid transparent',
            borderImage: 'linear-gradient(135deg, #FDAB3D, #FF642E, #E2445C, #784BD1) 1',
            borderRadius: 12, padding: '16px 18px 12px',
            background: '#fff',
            backgroundClip: 'padding-box',
          }}>
            <div style={{ fontSize: 16, color: 'var(--placeholder-color)', marginBottom: 14, fontFamily: ff }}>
              What should we do today?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 4, background: '#F6F7FB' }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="var(--ai-purple)" /></svg>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--primary-text-color)' }}>Sidekick</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5" style={{ cursor: 'pointer' }}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
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
              background: '#fff', borderRadius: 10, padding: '14px',
              cursor: 'pointer', border: '1px solid var(--layout-border-color)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, marginBottom: 8,
              }}>{s.icon}</div>
              <span style={{ fontSize: 12, color: 'var(--primary-text-color)', lineHeight: '17px' }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
