import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Search, Filter, ArrowUpDown, Eye, Table2 } from 'lucide-react';
import { AICentricSidebar } from '../AICentricNav';
import { PERSONA, RECRUITMENT_DATA } from '../../data';

const ff = 'Figtree, sans-serif';

function CellFill({ label, bg }: { label: string; bg: string }) {
  if (!label) return <div style={{ height: '100%', width: '100%' }} />;
  return <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, fontSize: 12, color: '#fff', whiteSpace: 'nowrap' }}>{label}</div>;
}

export function WorkSpacePage() {
  const group = RECRUITMENT_DATA[0];
  const group2 = RECRUITMENT_DATA[1];

  return (
    <>
      <AICentricSidebar
        agents={[
          { name: 'Screening Agent', emoji: '🔍', color: '#00C875' },
          { name: 'Scheduling Agent', emoji: '📅', color: '#579BFC' },
          { name: 'Sourcing Agent', emoji: '🎯', color: '#FDAB3D' },
        ]}
        boards={[
          { name: 'Recruitment Pipeline', active: true, color: '#579BFC' },
          { name: 'Interview tracker', indent: true },
          { name: 'Candidate feedback', indent: true },
          { name: 'Employee Onboarding', color: '#00C875' },
          { name: 'Team Directory', color: '#FDAB3D' },
          { name: 'Benefits & Compensation', color: '#784BD1' },
        ]}
      />

      {/* Main content — board */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', boxShadow: '0 4px 32px rgba(0,19,85,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '14px 24px 0', borderBottom: '1px solid var(--layout-border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 600, fontFamily: ff }}>Recruitment Pipeline</span>
              <ChevronDown size={14} color="var(--secondary-text-color)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex' }}>{PERSONA.teamMembers.slice(0, 3).map((tm, i) => <div key={tm.initials} style={{ marginLeft: i > 0 ? -5 : 0, width: 24, height: 24, borderRadius: '50%', background: tm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', border: '2px solid #fff', zIndex: 3 - i }}>{tm.initials}</div>)}</div>
              <span style={{ fontSize: 12, color: 'var(--primary-color)', fontWeight: 500, cursor: 'pointer' }}>Invite</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: -1 }}>
            {['Main table', 'Gantt', 'Kanban'].map((v, i) => <span key={v} style={{ fontSize: 13, color: i === 0 ? 'var(--primary-text-color)' : 'var(--secondary-text-color)', fontWeight: i === 0 ? 600 : 400, padding: '8px 14px', borderBottom: i === 0 ? '2px solid var(--primary-color)' : '2px solid transparent', cursor: 'pointer' }}>{v}</span>)}
            <Plus size={14} color="var(--secondary-text-color)" style={{ marginLeft: 4, cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 24px', borderBottom: '1px solid var(--layout-border-color)' }}>
          <div style={{ background: 'var(--primary-color)', borderRadius: 4, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 4, marginRight: 8, cursor: 'pointer' }}>
            <Plus size={12} color="#fff" /><span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>New Item</span><ChevronDown size={10} color="rgba(255,255,255,0.6)" />
          </div>
          {[{ i: <Search size={14} />, l: 'Search' }, { i: <Filter size={14} />, l: 'Filter' }, { i: <ArrowUpDown size={14} />, l: 'Sort' }, { i: <Eye size={14} />, l: 'Hide' }].map(b => (
            <span key={b.l} style={{ fontSize: 13, color: 'var(--secondary-text-color)', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', borderRadius: 4 }}>{b.i}{b.l}</span>
          ))}
          <span style={{ fontSize: 13, color: 'var(--secondary-text-color)', padding: '5px 8px' }}>Group By</span>
          <MoreHorizontal size={16} color="var(--secondary-text-color)" style={{ marginLeft: 'auto', cursor: 'pointer' }} />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 24px 24px' }}>
          {[group, group2].map((g, gi) => (
            <div key={g.group} style={{ marginTop: gi > 0 ? 24 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 0 6px' }}>
                <ChevronDown size={14} color={g.groupColor} strokeWidth={2.5} />
                <span style={{ fontSize: 14, fontWeight: 700, color: g.groupColor }}>{g.group}</span>
                <span style={{ fontSize: 11, color: 'var(--secondary-text-color)', background: 'var(--ui-background-color)', borderRadius: 8, padding: '1px 6px' }}>{g.rows.length}</span>
              </div>
              <div style={{ height: 34, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${g.groupColor}`, borderTop: '1px solid var(--layout-border-color)', borderBottom: '1px solid var(--layout-border-color)', background: 'var(--primary-surface-color)' }}>
                {[['', 36], ['Candidate', 180], ['Role', 150], ['Assignee', 60], ['Status', 140], ['Priority', 120], ['Due date', 80], ['Source', 90]].map(([l, w]) => (
                  <div key={String(l)} style={{ width: Number(w), flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: l === '' || l === 'Assignee' || l === 'Due date' ? 'center' : 'flex-start', padding: l === '' || l === 'Assignee' || l === 'Due date' ? 0 : '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, fontWeight: 600, color: 'var(--secondary-text-color)' }}>{String(l)}</div>
                ))}
              </div>
              {g.rows.map(row => {
                const a = PERSONA.teamMembers.find(t => t.name === row.assignee);
                return (
                  <div key={row.id} style={{ height: 34, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${g.groupColor}`, borderBottom: '1px solid var(--layout-border-color)' }}>
                    <div style={{ width: 36, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)' }}><div style={{ width: 14, height: 14, borderRadius: 3, border: '1.5px solid var(--ui-border-color)' }} /></div>
                    <div style={{ width: 180, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 13 }}>{row.name}</div>
                    <div style={{ width: 150, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, color: 'var(--secondary-text-color)' }}>{row.role}</div>
                    <div style={{ width: 60, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)' }}>
                      {a ? <div style={{ width: 24, height: 24, borderRadius: '50%', background: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff' }}>{a.initials}</div> : <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px dashed var(--ui-border-color)', opacity: 0.35 }} />}
                    </div>
                    <div style={{ width: 140, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}><CellFill label={row.status} bg={row.statusColor} /></div>
                    <div style={{ width: 120, flexShrink: 0, height: '100%', borderRight: '1px solid var(--layout-border-color)' }}><CellFill label={row.priority} bg={row.priorityColor} /></div>
                    <div style={{ width: 80, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, color: row.overdue ? '#E2445C' : 'var(--secondary-text-color)', fontWeight: row.overdue ? 600 : 400 }}>{row.dueDate}</div>
                    <div style={{ width: 90, flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8px', borderRight: '1px solid var(--layout-border-color)', fontSize: 12, color: 'var(--secondary-text-color)' }}>{row.source}</div>
                  </div>
                );
              })}
              <div style={{ height: 32, display: 'flex', alignItems: 'center', borderLeft: `3px solid ${g.groupColor}`, borderBottom: '1px solid var(--layout-border-color)', paddingLeft: 14, gap: 4, cursor: 'pointer' }}>
                <Plus size={12} color="var(--secondary-text-color)" /><span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>+ Add Item</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
