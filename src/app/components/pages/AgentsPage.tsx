import { ChevronRight, Plus, Search, MoreHorizontal, Sparkles, ArrowRight } from 'lucide-react';
import imgAgent1 from '../../../assets/agent-avatar-1.png';
import imgAgent2 from '../../../assets/agent-avatar-2.png';
import imgAgent3 from '../../../assets/agent-avatar-3.png';

const ff = 'Figtree, sans-serif';

const MY_AGENTS = [
  { name: 'Screening Agent', desc: 'Scores candidates against criteria', emoji: '🔍', color: '#00C875' },
  { name: 'Scheduling Agent', desc: 'Books interviews automatically', emoji: '📅', color: '#579BFC' },
  { name: 'Sourcing Agent', desc: 'Finds and ranks candidates', emoji: '🎯', color: '#FDAB3D' },
];

export function AgentsPage() {
  return (
    <>
      {/* Sidebar */}
      <div style={{ width: 230, height: '100%', background: '#fff', borderRight: '1px solid var(--layout-border-color)', padding: '10px 0', display: 'flex', flexDirection: 'column', fontFamily: ff, flexShrink: 0 }}>
        <div style={{ padding: '0 14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Agents</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <ChevronRight size={14} color="var(--secondary-text-color)" style={{ cursor: 'pointer', transform: 'rotate(180deg)' }} />
              <MoreHorizontal size={14} color="var(--secondary-text-color)" />
            </div>
          </div>
          <button style={{ width: '100%', background: 'var(--primary-color)', border: 'none', borderRadius: 6, padding: '8px 14px', color: '#fff', fontSize: 13, fontWeight: 500, fontFamily: ff, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={14} /> New agent
          </button>
          <div style={{ padding: '8px 0', cursor: 'pointer' }}>
            <span style={{ fontSize: 12, color: 'var(--primary-color)', fontWeight: 500 }}>Preview agents</span>
          </div>
        </div>

        <div style={{ padding: '0 14px', flex: 1 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-text-color)', display: 'block', marginBottom: 6 }}>My agents</span>
          {MY_AGENTS.map(a => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, cursor: 'pointer', marginBottom: 2 }}>
              <span style={{ fontSize: 16 }}>{a.emoji}</span>
              <div>
                <span style={{ fontSize: 12, fontWeight: 500, display: 'block', lineHeight: '15px' }}>{a.name}</span>
                <span style={{ fontSize: 10, color: 'var(--secondary-text-color)' }}>{a.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32, maxWidth: 560 }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 600, margin: '0 0 4px' }}>
            Build your <span style={{ background: 'linear-gradient(90deg, #FB275D, #FFCC00, #00CA72, #8181FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Agent</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--secondary-text-color)', margin: 0, lineHeight: '22px' }}>
            Hi {`Rachel`}, create your AI teammate — start by defining their tasks
          </p>
        </div>

        {/* Prompt input */}
        <div style={{ width: '100%', maxWidth: 560, marginBottom: 12 }}>
          <div style={{ border: '2px solid #FDAB3D', borderRadius: 12, padding: '16px 18px 12px', background: '#fff' }}>
            <div style={{ fontSize: 14, color: 'var(--placeholder-color)', marginBottom: 16, lineHeight: '22px', fontFamily: ff }}>
              Screen all new candidates in my Recruitment Pipeline, score them against job requirements, and flag the top matches
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Plus size={14} color="var(--secondary-text-color)" />
                <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>Add context</span>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick templates */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Candidate screening', 'Interview scheduling', 'Offer management', 'Onboarding tasks'].map(t => (
            <span key={t} style={{ fontSize: 12, color: 'var(--secondary-text-color)', padding: '4px 12px', borderRadius: 16, border: '1px solid var(--ui-border-color)', cursor: 'pointer' }}>{t}</span>
          ))}
        </div>

        {/* Agents made for you */}
        <div style={{ width: '100%', maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Agents made for you</span>
            <Sparkles size={14} color="var(--secondary-text-color)" />
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { img: imgAgent1, name: 'Screening Agent', desc: 'Analyzes candidate profiles and scores against job requirements', team: 'HR', tags: ['Hiring', 'AI'] },
              { img: imgAgent2, name: 'Interview Coordinator', desc: 'Schedules interviews and sends reminders automatically', team: 'HR', tags: ['Scheduling', 'Automation'] },
            ].map((agent, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', border: '1px solid var(--layout-border-color)', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ padding: '16px 16px 12px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <img src={agent.img} width={56} height={56} style={{ borderRadius: 12, objectFit: 'cover' }} alt="" />
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--secondary-text-color)', display: 'block', marginBottom: 2 }}>{agent.team}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 4 }}>{agent.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', lineHeight: '16px' }}>{agent.desc}</span>
                  </div>
                </div>
                <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 6 }}>
                  {agent.tags.map(t => <span key={t} style={{ fontSize: 10, color: 'var(--secondary-text-color)', padding: '2px 8px', borderRadius: 10, background: '#F6F7FB' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
