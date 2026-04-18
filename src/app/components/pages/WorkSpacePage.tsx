import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Undo2, Redo2, AlignLeft, List, CheckSquare, Type, AtSign, Bold, Italic } from 'lucide-react';
import { PERSONA } from '../../data';
import iconAgents from '../../../assets/icons/agents.svg';
import imgCover from '../../../assets/agent-avatar-3.png';

const ff = 'Figtree, sans-serif';

export function WorkSpacePage() {
  return (
    <>
      {/* Sidebar — workspace structure matching Workstream.png */}
      <div style={{ width: 220, height: '100%', background: '#fff', borderRight: '1px solid #D0D4E4', padding: '12px 0', display: 'flex', flexDirection: 'column', fontFamily: ff, flexShrink: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0 12px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workspace</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ChevronRight size={12} color="#676879" style={{ transform: 'rotate(180deg)' }} />
              <MoreHorizontal size={14} color="#676879" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', background: '#F5F6F8', borderRadius: 4, cursor: 'pointer' }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>N</div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#323338', flex: 1 }}>Novella</span>
            <ChevronDown size={12} color="#676879" />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 6px' }}>
          {/* AI Workforce */}
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginBottom: 2 }}>
              <ChevronDown size={10} color="#676879" />
              <img src={iconAgents} width={13} height={13} alt="" style={{ opacity: 0.55 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>AI Workforce</span>
            </div>
            <div style={{ padding: '2px 6px 2px 22px', display: 'flex', gap: -4, marginBottom: 4 }}>
              {PERSONA.teamMembers.slice(0, 3).map((tm, i) => (
                <div key={tm.initials} style={{ width: 20, height: 20, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff', marginLeft: i > 0 ? -4 : 0, border: '1.5px solid #fff', zIndex: 3 - i }}>{tm.initials}</div>
              ))}
              <span style={{ fontSize: 10, color: '#676879', marginLeft: 4, alignSelf: 'center' }}>+3</span>
            </div>
          </div>

          {/* Board tree */}
          <div style={{ borderTop: '1px solid #E7E9EF', paddingTop: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginBottom: 2 }}>
              <ChevronDown size={10} color="#676879" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>HR Department</span>
            </div>
            {[
              { name: 'Recruitment Pipeline', color: '#579BFC' },
              { name: 'Interview tracker', indent: true },
              { name: 'Candidate feedback', indent: true },
              { name: 'Employee Onboarding', color: '#00C875' },
              { name: 'Team Directory', color: '#FDAB3D' },
              { name: 'Benefits & Compensation', color: '#784BD1' },
            ].map((b) => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: `3px 6px 3px ${b.indent ? 32 : 22}px`, borderRadius: 4, marginBottom: 1, cursor: 'pointer', background: b.name === 'Recruitment Pipeline' ? '#D0E4FF' : 'transparent' }}>
                {b.color && <div style={{ width: 6, height: 6, borderRadius: '50%', background: b.color, flexShrink: 0 }} />}
                {b.indent && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={b.name === 'Recruitment Pipeline' ? '#0073EA' : '#676879'} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
                <span style={{ fontSize: 12, color: b.name === 'Recruitment Pipeline' ? '#0073EA' : '#323338', fontWeight: b.name === 'Recruitment Pipeline' ? 600 : 400 }}>{b.name}</span>
              </div>
            ))}
          </div>

          {/* Assets */}
          <div style={{ borderTop: '1px solid #E7E9EF', paddingTop: 6, marginTop: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', marginBottom: 2 }}>
              <ChevronDown size={10} color="#676879" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#323338' }}>Assets</span>
            </div>
            {['Team Photos', 'Brand Guidelines'].map(a => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 6px 3px 22px', borderRadius: 4, cursor: 'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#676879" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <span style={{ fontSize: 12, color: '#323338' }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content — DOCUMENT VIEW (not board) matching Workstream.png */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid #D0D4E4', boxShadow: '0 4px 32px rgba(0,19,85,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Doc toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '6px 20px', borderBottom: '1px solid #E7E9EF', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', background: '#0073EA', borderRadius: 4, cursor: 'pointer', marginRight: 8 }}>
            <Plus size={12} color="#fff" /><span style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>Add</span>
          </div>
          <div style={{ width: 1, height: 18, background: '#E7E9EF', margin: '0 4px' }} />
          <Undo2 size={15} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <Redo2 size={15} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <div style={{ width: 1, height: 18, background: '#E7E9EF', margin: '0 4px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '3px 8px', borderRadius: 4, cursor: 'pointer' }}>
            <Type size={13} color="#676879" /><span style={{ fontSize: 12, color: '#676879' }}>Large title</span><ChevronDown size={10} color="#676879" />
          </div>
          <Bold size={14} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <Italic size={14} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <div style={{ width: 1, height: 18, background: '#E7E9EF', margin: '0 4px' }} />
          <AlignLeft size={14} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <List size={14} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <CheckSquare size={14} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <div style={{ width: 1, height: 18, background: '#E7E9EF', margin: '0 4px' }} />
          <span style={{ fontSize: 12, color: '#676879', padding: '3px 6px', cursor: 'pointer' }}>Style</span>
          <AtSign size={14} color="#676879" style={{ cursor: 'pointer', padding: 4 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 4, cursor: 'pointer', marginLeft: 'auto' }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="#8181FF" /></svg>
            <span style={{ fontSize: 12, color: '#676879' }}>AI</span>
          </div>
        </div>

        {/* Doc content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 40px' }}>
          {/* Cover image */}
          <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '80%', height: '85%', background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'200\' fill=\'none\'%3E%3Crect width=\'400\' height=\'200\' rx=\'8\' fill=\'%23FFF8E1\'/%3E%3Ccircle cx=\'200\' cy=\'100\' r=\'60\' fill=\'%23FFCC00\' opacity=\'0.3\'/%3E%3Ccircle cx=\'140\' cy=\'80\' r=\'30\' fill=\'%23FB275D\' opacity=\'0.2\'/%3E%3Ccircle cx=\'260\' cy=\'120\' r=\'40\' fill=\'%2300C875\' opacity=\'0.2\'/%3E%3C/svg%3E") center/cover', borderRadius: 8 }} />
          </div>

          {/* Doc body */}
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 40px' }}>
            {/* Title */}
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 600, color: '#323338', margin: '0 0 16px', lineHeight: '40px' }}>
              Recruitment Pipeline Overview
            </h1>

            {/* Metadata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, fontSize: 13, color: '#676879' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: PERSONA.teamMembers[0].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{PERSONA.teamMembers[0].initials}</div>
                <span>Creator: {PERSONA.teamMembers[0].name}</span>
              </div>
              <span>·</span>
              <span>Created Apr 10, 2026, 16:13</span>
              <span>·</span>
              <span>Last updated Apr 15, 2026, 16:15</span>
            </div>

            {/* Content */}
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Objectives and KPI</h2>
            <p style={{ fontSize: 15, color: '#323338', lineHeight: '24px', margin: '0 0 24px' }}>
              Our recruitment pipeline is designed to streamline the hiring process from initial candidate sourcing through to offer acceptance. The goal is to reduce time-to-hire by 30% while maintaining a high-quality candidate experience. Key performance indicators include: average days in each pipeline stage, candidate satisfaction scores, and offer acceptance rates.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Target Audience</h2>
            <p style={{ fontSize: 15, color: '#323338', lineHeight: '24px', margin: '0 0 20px' }}>
              The pipeline targets professionals across engineering, design, marketing, and product management. We're focusing on mid-to-senior level candidates who are actively seeking new opportunities or are open to compelling roles. Primary sourcing channels include LinkedIn, employee referrals, and industry job boards.
            </p>

            {/* Inline data table */}
            <div style={{ border: '1px solid #E7E9EF', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #E7E9EF' }}>
                <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#676879', borderRight: '1px solid #E7E9EF' }}>Category</div>
                <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: '#676879' }}>Details</div>
              </div>
              {[
                ['Target roles', 'Senior engineers, product designers, marketing managers'],
                ['Sourcing channels', 'LinkedIn, referrals, Indeed, company website'],
                ['Time-to-hire goal', '< 30 days from application to offer'],
                ['Pipeline stages', 'New → Screening → Interview → Offer → Hired'],
              ].map(([cat, detail], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i < 3 ? '1px solid #E7E9EF' : 'none' }}>
                  <div style={{ padding: '10px 16px', fontSize: 13, color: '#323338', borderRight: '1px solid #E7E9EF' }}>{cat}</div>
                  <div style={{ padding: '10px 16px', fontSize: 13, color: '#323338' }}>{detail}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#323338', margin: '0 0 12px' }}>Current Status</h2>
            <p style={{ fontSize: 15, color: '#323338', lineHeight: '24px', margin: '0 0 8px' }}>
              We currently have 17 active candidates across all pipeline stages. 8 are in the initial screening phase, 4 are in active interviews, 3 are in the offer stage, and 2 positions have been recently filled. The Screening Agent has been activated to help triage incoming applications automatically.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
