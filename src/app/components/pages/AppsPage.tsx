import { Plus, Upload, MessageSquare, Link } from 'lucide-react';

const ff = 'Figtree, sans-serif';

const IDEAS = ['Kanban View', 'Knowledge Base', 'Goal Tracker', 'Time tracker', 'Client Portal', 'Sales CRM'];

const APP_CARDS = [
  { name: 'Hiring Dashboard', desc: 'Track pipeline health and recruiter performance', color: '#F0EDFF' },
  { name: 'Candidate Portal', desc: 'Self-service application status and scheduling', color: '#E8F9F0' },
  { name: 'Interview Tracker', desc: 'Monitor interview progress and feedback', color: '#FFF0F0' },
];

export function AppsPage() {
  return (
    <>
      {/* Sidebar */}
      <div style={{ width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 16, alignSelf: 'stretch', borderRadius: '16px 0 0 0', borderRight: '0.5px solid var(--layout-border-color)', background: 'var(--primary-background-color)', fontFamily: ff, flexShrink: 0 }}>
        <div style={{ padding: '0 14px', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Vibe Apps</span>
          </div>
          <button style={{ width: '100%', background: '#fff', border: '1px solid #0073EA', borderRadius: 4, padding: '7px 12px', color: '#0073EA', fontSize: 13, fontWeight: 500, fontFamily: ff, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Plus size={13} /> New vibe app
          </button>
        </div>
        <div style={{ padding: '0 14px' }}>
          <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5"><path d="M12 2l8 8-8 8-8-8z" /></svg>
            My apps
          </span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 600, margin: '0 0 4px', textAlign: 'center' }}>
          Build your ideas with <span style={{ background: 'linear-gradient(90deg, #FB275D, #FFCC00, #00CA72, #8181FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vibe</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--secondary-text-color)', margin: '0 0 28px', textAlign: 'center' }}>
          Hey Rachel, let's build a new Vibe app for you
        </p>

        {/* Prompt */}
        <div style={{ width: '100%', maxWidth: 560, marginBottom: 16 }}>
          <div style={{ border: '2px solid #FDAB3D', borderRadius: 12, padding: '16px 18px 12px' }}>
            <div style={{ fontSize: 14, color: 'var(--placeholder-color)', marginBottom: 16, fontFamily: ff }}>
              Describe the app you want to build or Start from blank
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><Upload size={13} /> Upload files</span>
                <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><MessageSquare size={13} /> Discuss</span>
                <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><Link size={13} /> Connect boards</span>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ui-background-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Ideas */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--secondary-text-color)' }}>Ideas for you</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {IDEAS.map(idea => (
              <span key={idea} style={{ fontSize: 12, color: 'var(--secondary-text-color)', padding: '5px 14px', borderRadius: 16, border: '1px solid var(--ui-border-color)', cursor: 'pointer' }}>{idea}</span>
            ))}
          </div>
        </div>

        {/* Start with an idea */}
        <div style={{ width: '100%', maxWidth: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Start with an idea</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {['All', 'Projects', 'Sales', 'Marketing', 'Operations', 'HR'].map((t, i) => (
                <span key={t} style={{ fontSize: 12, color: i === 0 ? 'var(--primary-color)' : 'var(--secondary-text-color)', fontWeight: i === 0 ? 600 : 400, cursor: 'pointer', padding: '4px 8px', borderRadius: 4, background: i === 0 ? 'var(--primary-surface-color)' : 'transparent' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {APP_CARDS.map(card => (
              <div key={card.name} style={{ background: card.color, borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 120, background: `${card.color}`, borderRadius: '12px 12px 0 0' }} />
                <div style={{ padding: '14px 16px', background: '#fff', borderRadius: '0 0 12px 12px' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 2 }}>{card.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>{card.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
