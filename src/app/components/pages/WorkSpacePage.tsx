import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Undo2, Redo2, AlignLeft, List, CheckSquare, AtSign } from 'lucide-react';
import { PERSONA } from '../../data';
import iconAgents from '../../../assets/icons/agents.svg';

const ff = 'Figtree, sans-serif';

const ASSETS = [
  { name: 'Campaign Brief', active: true },
  { name: 'Study outline', active: false },
  { name: 'Post-mortem', active: false },
  { name: 'User interviews', active: false },
  { name: 'Sprint review', active: false },
  { name: 'Content Calendar', active: false },
  { name: 'Social Media Plan', active: false },
];

export function WorkSpacePage() {
  return (
    <>
      {/* Sidebar */}
      <div style={{ width: 296, display: 'flex', padding: '16px 20px', flexDirection: 'column', alignItems: 'flex-start', gap: 24, alignSelf: 'stretch', borderRadius: '16px 0 0 0', background: '#fff', overflow: 'hidden', fontFamily: ff, flexShrink: 0 }}>

        {/* Workspace dropdown + add button */}
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workspace</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ChevronRight size={12} color="#676879" style={{ transform: 'rotate(180deg)', cursor: 'pointer' }} />
              <MoreHorizontal size={14} color="#676879" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Compact workspace selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', flex: 1 }}>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>N</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#323338' }}>Novella</span>
              <ChevronDown size={12} color="#676879" />
            </div>
            {/* + add workspace button */}
            <div style={{ width: 24, height: 24, borderRadius: 4, border: '1px solid #C3C6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <Plus size={14} color="#676879" />
            </div>
          </div>
        </div>

        {/* AI Workforce — label left, avatars right */}
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <ChevronDown size={10} color="#676879" />
              <img src={iconAgents} width={14} height={14} alt="" style={{ opacity: 0.55 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#323338' }}>AI Workforce</span>
            </div>
            {/* Avatar stack — right-aligned */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {PERSONA.teamMembers.slice(0, 3).map((tm, i) => (
                <div key={tm.initials} style={{ width: 22, height: 22, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', marginLeft: i > 0 ? -5 : 0, border: '2px solid var(--chrome-surface-color)', zIndex: 3 - i }}>{tm.initials}</div>
              ))}
              <span style={{ fontSize: 11, color: '#676879', marginLeft: 4 }}>+3</span>
            </div>
          </div>
        </div>

        {/* Assets section — plain doc items, no HR Department */}
        <div style={{ width: '100%', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
            <ChevronDown size={10} color="#676879" />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#323338' }}>Assets</span>
          </div>
          {ASSETS.map(a => (
            <div key={a.name} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '5px 8px 5px 20px', borderRadius: 4, marginBottom: 1, cursor: 'pointer',
              background: a.active ? '#D0E4FF' : 'transparent',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.active ? '#0073EA' : '#676879'} strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span style={{ fontSize: 13, color: a.active ? '#0073EA' : '#323338', fontWeight: a.active ? 600 : 400 }}>{a.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content — document view */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Doc toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 20px', borderBottom: '1px solid #E7E9EF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#0073EA', borderRadius: 4, cursor: 'pointer', marginRight: 6 }}>
            <Plus size={11} color="#fff" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>Add</span>
          </div>
          <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
          <Undo2 size={14} color="#676879" style={{ cursor: 'pointer', padding: 3 }} />
          <Redo2 size={14} color="#676879" style={{ cursor: 'pointer', padding: 3 }} />
          <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#676879' }}>H1</span>
            <span style={{ fontSize: 12, color: '#676879' }}>Large title</span>
            <ChevronDown size={10} color="#676879" />
          </div>
          <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '3px 4px', borderRadius: 4, cursor: 'pointer' }}>
            <AlignLeft size={13} color="#676879" />
            <ChevronDown size={9} color="#676879" />
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5" strokeLinecap="round" style={{ cursor: 'pointer', padding: 3 }}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1.5" fill="#676879" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="#676879" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="#676879" stroke="none"/></svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="1.5" strokeLinecap="round" style={{ cursor: 'pointer', padding: 3 }}><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="3" y="8" fontSize="8" fill="#676879" stroke="none" fontFamily="sans-serif">1</text><text x="3" y="14" fontSize="8" fill="#676879" stroke="none" fontFamily="sans-serif">2</text><text x="3" y="20" fontSize="8" fill="#676879" stroke="none" fontFamily="sans-serif">3</text></svg>
          <CheckSquare size={13} color="#676879" style={{ cursor: 'pointer', padding: 3 }} />
          <div style={{ width: 1, height: 16, background: '#E7E9EF', margin: '0 4px' }} />
          <span style={{ fontSize: 12, color: '#676879', padding: '3px 6px', cursor: 'pointer' }}>Style</span>
          <AtSign size={13} color="#676879" style={{ cursor: 'pointer', padding: 3 }} />
          <div style={{ cursor: 'pointer', marginLeft: 'auto', padding: 3 }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#aiToolbar)" /><defs><linearGradient id="aiToolbar" x1="0" y1="0" x2="20" y2="20"><stop offset="0%" stopColor="#FB275D"/><stop offset="33%" stopColor="#FFCC00"/><stop offset="66%" stopColor="#00CA72"/><stop offset="100%" stopColor="#8181FF"/></linearGradient></defs></svg>
          </div>
        </div>

        {/* Doc content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 40px' }}>
          <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '80%', height: '85%', background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'200\' fill=\'none\'%3E%3Crect width=\'400\' height=\'200\' rx=\'8\' fill=\'%23FFF8E1\'/%3E%3Ccircle cx=\'200\' cy=\'100\' r=\'60\' fill=\'%23FFCC00\' opacity=\'0.3\'/%3E%3Ccircle cx=\'140\' cy=\'80\' r=\'30\' fill=\'%23FB275D\' opacity=\'0.2\'/%3E%3Ccircle cx=\'260\' cy=\'120\' r=\'40\' fill=\'%2300C875\' opacity=\'0.2\'/%3E%3C/svg%3E") center/cover', borderRadius: 8 }} />
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 40px' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 600, color: '#323338', margin: '0 0 16px', lineHeight: '40px' }}>Campaign Brief</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, fontSize: 13, color: '#676879' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: PERSONA.teamMembers[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{PERSONA.teamMembers[0].initials}</div>
                <span>Creator: Mark Green</span>
              </div>
              <span>·</span><span>Created Apr 10, 2026, 16:13</span><span>·</span><span>Last updated Apr 15, 2026, 16:15</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Objectives and KPI</h2>
            <p style={{ fontSize: 15, color: '#323338', lineHeight: '24px', margin: '0 0 24px' }}>
              Golden Grains is a bakery chain in Charlotte, NC, known for its "Any Reason" policy — everything is baked fresh daily. For Spring 2026, the chain is launching a new campaign, "The Morning Routine," to capture weekday commuter traffic from nearby communities who currently skip the bakery on their way to work.
            </p>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Target audience</h2>
            <p style={{ fontSize: 15, color: '#323338', lineHeight: '24px', margin: '0 0 20px' }}>
              The campaign targets weekday morning commuters in the Charlotte metro who currently drive past Golden Grains locations without stopping. These are time-pressed professionals who default to coffee chains or skip breakfast entirely.
            </p>
            <div style={{ border: '1px solid #E7E9EF', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #E7E9EF' }}>
                <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#676879', borderRight: '1px solid #E7E9EF' }}>Category</div>
                <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#676879' }}>Details</div>
              </div>
              {[
                ['Primary demographic', 'Working professionals aged 25-44 from dual-income households'],
                ['Geography', 'Commuters by car and on foot within 5km of Golden Grains locations'],
                ['Behavioral target', 'Habitually skip breakfast or default to coffee chains, responsive to time-saving goods or weekday offers'],
              ].map(([cat, detail], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < 2 ? '1px solid #E7E9EF' : 'none' }}>
                  <div style={{ padding: '10px 16px', fontSize: 13, color: '#323338', borderRight: '1px solid #E7E9EF' }}>{cat}</div>
                  <div style={{ padding: '10px 16px', fontSize: 13, color: '#323338' }}>{detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
