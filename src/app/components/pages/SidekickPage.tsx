import { ChevronRight, Settings, MessageCircle, Plus, Mic, Paperclip, AtSign } from 'lucide-react';
import { PERSONA } from '../../data';
import imgAgent1 from '../../../assets/agent-avatar-1.png';
import imgAgent2 from '../../../assets/agent-avatar-2.png';
import imgAgent3 from '../../../assets/agent-avatar-3.png';
import iconMondayLogo from '../../../assets/icons/monday-logo.svg';

const ff = 'Figtree, sans-serif';

const SidekickAvatar = () => (
  <div style={{
    width: 56, height: 56, borderRadius: '50%', padding: 2,
    background: 'conic-gradient(from 0deg, #FAD239, #FF6B10, #E2445C, #784BD1, #6161FF, #00CA72, #FAD239)',
  }}>
    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #667EEA, #764BA2, #00CA72)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="#fff" /></svg>
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
      <div style={{ width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 24, alignSelf: 'stretch', borderRadius: '16px 0 0 0', background: '#fff', fontFamily: ff, flexShrink: 0 }}>
        <div style={{ padding: '0 12px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sidekick</span>
            <ChevronRight size={12} color="#676879" style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} />
          </div>
          {/* Outlined button style — not solid blue */}
          <button style={{ width: '100%', background: '#fff', border: '1px solid #0073EA', borderRadius: 4, padding: '7px 12px', color: '#0073EA', fontSize: 13, fontWeight: 500, fontFamily: ff, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0073EA" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
            New chat
          </button>
        </div>

        <div style={{ padding: '0 12px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>Chats</span>
            <ChevronRight size={12} color="#676879" />
          </div>
          {['Golden Grains Tart Launch', 'Budget Review Discussion', 'Promotional Insights Panel'].map(chat => (
            <div key={chat} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 6px', borderRadius: 4, cursor: 'pointer', marginBottom: 1 }}>
              <MessageCircle size={12} color="#676879" />
              <span style={{ fontSize: 12, color: '#323338' }}>{chat}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 12px', borderTop: '1px solid #E7E9EF', paddingTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', cursor: 'pointer' }}>
            <Settings size={13} color="#676879" /><span style={{ fontSize: 12, color: '#676879' }}>Settings</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', cursor: 'pointer' }}>
            <MessageCircle size={13} color="#676879" /><span style={{ fontSize: 12, color: '#676879' }}>Give us feedback</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'auto', padding: '32px 24px' }}>
        {/* Logo + greeting */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src={iconMondayLogo} width={32} height={32} alt="" style={{ marginBottom: 6 }} />
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 500, color: '#323338', margin: 0 }}>
            Good morning, {PERSONA.firstName}
          </h1>
        </div>

        {/* Agents row with actual photos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          {AGENTS_ROW.map(agent => (
            <div key={agent.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
              {agent.type === 'sidekick' ? <SidekickAvatar /> : (
                <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: '2px solid #E7E9EF' }}>
                  <img src={agent.img} width={56} height={56} style={{ objectFit: 'cover' }} alt="" />
                </div>
              )}
              <span style={{ fontSize: 11, color: agent.type === 'sidekick' ? '#0073EA' : '#676879', fontWeight: agent.type === 'sidekick' ? 600 : 400 }}>{agent.name}</span>
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px dashed #C3C6D4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={18} color="#676879" />
            </div>
            <span style={{ fontSize: 11, color: '#676879' }}>New agent</span>
          </div>
        </div>

        {/* Large prompt input — 2.5x taller as per feedback */}
        <div style={{ width: '100%', maxWidth: 640, marginBottom: 20 }}>
          <div style={{
            border: '2px solid transparent', borderRadius: 12, padding: '20px 20px 14px',
            background: '#fff',
            backgroundClip: 'padding-box',
            boxShadow: '0 0 0 2px #FDAB3D',
          }}>
            <div style={{ fontSize: 16, color: '#A8A8B8', marginBottom: 24, fontFamily: ff, minHeight: 48 }}>
              What should we do today?
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 4, background: '#F5F6F8' }}>
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="#8181FF" /></svg>
                  <span style={{ fontSize: 12, fontWeight: 500, color: '#323338' }}>Sidekick</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5" style={{ cursor: 'pointer' }}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                <Paperclip size={15} color="#676879" style={{ cursor: 'pointer' }} />
                <Mic size={15} color="#676879" style={{ cursor: 'pointer' }} />
                <AtSign size={15} color="#676879" style={{ cursor: 'pointer' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, cursor: 'pointer' }}>
                  <Plus size={13} color="#676879" /><span style={{ fontSize: 12, color: '#676879' }}>Add context</span>
                </div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E7E9EF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion cards — single horizontal row of 5 */}
        <div style={{ display: 'flex', gap: 10, maxWidth: 700, width: '100%' }}>
          {SUGGESTIONS.map((s, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 0,
              background: '#fff', borderRadius: 8, padding: '12px',
              cursor: 'pointer', border: '1px solid #E7E9EF',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6, background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, marginBottom: 6,
              }}>{s.icon}</div>
              <span style={{ fontSize: 11, color: '#323338', lineHeight: '16px' }}>{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
