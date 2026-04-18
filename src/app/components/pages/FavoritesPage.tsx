import { ChevronRight, Star, MoreHorizontal, ChevronDown } from 'lucide-react';
import imgAgent1 from '../../../assets/agent-avatar-1.png';
import imgAgent2 from '../../../assets/agent-avatar-2.png';
import imgAgent3 from '../../../assets/agent-avatar-3.png';

const ff = 'Figtree, sans-serif';

const FAV_AGENTS = [
  { name: 'Campaign Strategist', role: 'Marketing', img: imgAgent1 },
  { name: 'Content Writer', role: 'Content', img: imgAgent2 },
  { name: 'Marketing Designer', role: 'Design', img: imgAgent3 },
];

const RECENTS = [
  { name: 'Recruitment Pipeline Overview', type: 'doc' },
  { name: 'Interview feedback template', type: 'doc' },
  { name: 'Q2 hiring plan', type: 'doc' },
  { name: 'Onboarding checklist', type: 'doc' },
  { name: 'Team retrospective', type: 'doc' },
];

export function FavoritesPage() {
  return (
    <>
      {/* Sidebar — matching FavoritesHome.png */}
      <div style={{ width: 220, height: '100%', background: '#fff', borderRight: '1px solid #D0D4E4', padding: '12px 0', display: 'flex', flexDirection: 'column', fontFamily: ff, flexShrink: 0 }}>
        <div style={{ padding: '0 12px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Favorites</span>
            <ChevronRight size={12} color="#676879" style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 6px' }}>
          {/* Agents section */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>Agents</span>
              <span style={{ fontSize: 11, color: '#0073EA', cursor: 'pointer' }}>See all</span>
            </div>
            {FAV_AGENTS.map(agent => (
              <div key={agent.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 4, cursor: 'pointer' }}>
                <img src={agent.img} width={28} height={28} style={{ borderRadius: '50%', objectFit: 'cover' }} alt="" />
                <div>
                  <span style={{ fontSize: 12, fontWeight: 500, display: 'block', lineHeight: '15px', color: '#323338' }}>{agent.name}</span>
                  <span style={{ fontSize: 10, color: '#676879' }}>{agent.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recents */}
          <div style={{ borderTop: '1px solid #E7E9EF', paddingTop: 8, marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>Recents</span>
              <span style={{ fontSize: 11, color: '#0073EA', cursor: 'pointer' }}>See all</span>
            </div>
            {RECENTS.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                <span style={{ fontSize: 12, color: '#323338' }}>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Empty state for no-more-favorites */}
          <div style={{ borderTop: '1px solid #E7E9EF', paddingTop: 16, padding: '16px 12px', textAlign: 'center' }}>
            <Star size={32} color="#E7E9EF" style={{ marginBottom: 8 }} />
            <p style={{ fontSize: 12, color: '#676879', margin: '0 0 4px', lineHeight: '17px' }}>
              No favorites yet
            </p>
            <p style={{ fontSize: 11, color: '#676879', margin: '0 0 8px', lineHeight: '16px' }}>
              Browse and star the ones you want quick access to.
            </p>
            <span style={{ fontSize: 11, color: '#0073EA', cursor: 'pointer' }}>Browse your boards</span>
          </div>
        </div>
      </div>

      {/* Main content — same doc view as workspace */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid #D0D4E4', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 40px' }}>
          <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)' }} />
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 40px' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 600, color: '#323338', margin: '0 0 16px' }}>Recruitment Pipeline Overview</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, fontSize: 13, color: '#676879' }}>
              <span>Creator: Rachel Cohen</span><span>·</span><span>Created Apr 10, 2026</span><span>·</span><span>Last updated Apr 15, 2026</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Objectives and KPI</h2>
            <p style={{ fontSize: 15, color: '#323338', lineHeight: '24px', margin: '0 0 24px' }}>Our recruitment pipeline is designed to streamline the hiring process from initial candidate sourcing through to offer acceptance. The goal is to reduce time-to-hire by 30% while maintaining quality.</p>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Target Audience</h2>
            <p style={{ fontSize: 15, color: '#323338', lineHeight: '24px' }}>The pipeline targets professionals across engineering, design, marketing, and product management at mid-to-senior level.</p>
          </div>
        </div>
      </div>
    </>
  );
}
