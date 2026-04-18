import { ChevronRight, Plus, Search, MoreHorizontal, Sparkles, AtSign, ChevronDown } from 'lucide-react';
import imgAgent1 from '../../../assets/agent-avatar-1.png';
import imgAgent2 from '../../../assets/agent-avatar-2.png';
import imgAgent3 from '../../../assets/agent-avatar-3.png';

const ff = 'Figtree, sans-serif';

const MY_AGENTS = [
  { name: 'Campaign Strategist', img: imgAgent1, desc: 'Marketing strategy' },
  { name: 'Content Writer', img: imgAgent2, desc: 'Content creation' },
  { name: 'Marketing Designer', img: imgAgent3, desc: 'Visual design' },
];

export function AgentsPage() {
  return (
    <>
      {/* Sidebar — matching AgentsHome.png */}
      <div style={{ width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 24, alignSelf: 'stretch', borderRadius: '16px 0 0 0', background: 'var(--chrome-surface-color)', fontFamily: ff, flexShrink: 0 }}>
        <div style={{ padding: '0 12px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Agents</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <Search size={12} color="#676879" style={{ cursor: 'pointer' }} />
              <ChevronRight size={12} color="#676879" style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} />
              <MoreHorizontal size={14} color="#676879" />
            </div>
          </div>
          {/* Outlined button */}
          <button style={{ width: '100%', background: '#fff', border: '1px solid #0073EA', borderRadius: 4, padding: '7px 12px', color: '#0073EA', fontSize: 13, fontWeight: 500, fontFamily: ff, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={13} /> New agent
          </button>
        </div>

        <div style={{ padding: '0 6px' }}>
          {/* Manage agents */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 4, cursor: 'pointer', marginBottom: 1 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            <span style={{ fontSize: 12, color: '#323338' }}>Manage agents</span>
          </div>
          {/* Skills hub */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 4, cursor: 'pointer', marginBottom: 4 }}>
            <Sparkles size={13} color="#676879" />
            <span style={{ fontSize: 12, color: '#323338' }}>Skills hub</span>
          </div>
        </div>

        {/* My agents */}
        <div style={{ padding: '0 6px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', marginBottom: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>My agents</span>
            <span style={{ fontSize: 11, color: '#0073EA', cursor: 'pointer' }}>See all</span>
          </div>
          {MY_AGENTS.map(a => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 4, cursor: 'pointer' }}>
              <img src={a.img} width={28} height={28} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
              <div>
                <span style={{ fontSize: 12, fontWeight: 500, display: 'block', lineHeight: '15px', color: '#323338' }}>{a.name}</span>
                <span style={{ fontSize: 10, color: '#676879' }}>{a.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content — matching AgentsHome.png */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', padding: '40px 24px' }}>
        {/* Start from blank link */}
        <div style={{ width: '100%', maxWidth: 560, display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#0073EA', cursor: 'pointer' }}>Start from blank</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28, maxWidth: 560 }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 600, margin: '0 0 4px' }}>
            Build your <span style={{ background: 'linear-gradient(90deg, #FB275D, #FFCC00, #00CA72, #8181FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Agent</span>
          </h1>
          <p style={{ fontSize: 14, color: '#676879', margin: 0 }}>Hi Rachel, create your AI teammate — start by defining their tasks</p>
        </div>

        {/* Prompt input */}
        <div style={{ width: '100%', maxWidth: 560, marginBottom: 10 }}>
          <div style={{ boxShadow: '0 0 0 2px #FDAB3D', borderRadius: 12, padding: '16px 18px 12px', background: '#fff' }}>
            <div style={{ fontSize: 14, color: '#A8A8B8', marginBottom: 14, lineHeight: '22px', fontFamily: ff, minHeight: 40 }}>
              Screen all new candidates in my Recruitment Pipeline, score them against job requirements, and flag the top matches
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <AtSign size={14} color="#676879" />
                <span style={{ fontSize: 12, color: '#676879' }}>Add context</span>
              </div>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0073EA', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Candidate screening', 'Interview scheduling', 'Offer management', 'Onboarding tasks'].map(t => (
            <span key={t} style={{ fontSize: 12, color: '#676879', padding: '4px 12px', borderRadius: 14, border: '1px solid #C3C6D4', cursor: 'pointer' }}>{t}</span>
          ))}
        </div>

        {/* Agents made for you */}
        <div style={{ width: '100%', maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#323338' }}>Agents made for you</span>
            <Sparkles size={14} color="#676879" />
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {[
              { img: imgAgent1, name: 'Feedback analyst', desc: 'Analyzes candidate interview feedback and generates structured insights', team: 'PerOps', tags: ['Hiring', 'AI'], based: 'Product Insights' },
              { img: imgAgent3, name: 'Feedback analyst', desc: 'Reviews candidate assessment data and surfaces purchase-relevant patterns', team: 'Sales', tags: ['Vendor Planning', 'AI'], based: 'Vendor Research' },
            ].map((agent, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', border: '1px solid #E7E9EF', borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ padding: '14px 14px 10px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <img src={agent.img} width={52} height={52} style={{ borderRadius: 10, objectFit: 'cover' }} alt="" />
                  <div>
                    <span style={{ fontSize: 10, color: '#676879', display: 'block', marginBottom: 2 }}>{agent.team}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 3, color: '#323338' }}>{agent.name}</span>
                    <span style={{ fontSize: 11, color: '#676879', lineHeight: '15px', display: 'block' }}>{agent.desc}</span>
                  </div>
                </div>
                <div style={{ padding: '4px 14px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10, color: '#676879' }}>Based on:</span>
                  <span style={{ fontSize: 10, color: '#323338', padding: '1px 6px', borderRadius: 3, background: '#F5F6F8' }}>{agent.based}</span>
                </div>
                <div style={{ padding: '6px 14px 10px', display: 'flex', gap: 4 }}>
                  {agent.tags.map(t => <span key={t} style={{ fontSize: 9, color: '#676879', padding: '2px 6px', borderRadius: 8, background: '#F5F6F8' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Explore more agents */}
          <div style={{ marginTop: 24 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#323338', display: 'block', marginBottom: 8 }}>Explore more agents</span>
            <span style={{ fontSize: 13, color: '#0073EA', cursor: 'pointer' }}>Browse agent marketplace →</span>
          </div>
        </div>
      </div>
    </>
  );
}
