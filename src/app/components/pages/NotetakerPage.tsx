import { Search, MoreHorizontal, ChevronDown, Settings, HelpCircle, MessageCircle } from 'lucide-react';
import { PERSONA } from '../../data';

const ff = 'Figtree, sans-serif';

const UPCOMING = [
  { time: 'Today at 1:00 pm', title: 'HR Team Weekly Sync', participants: ['RC', 'TM', 'NG'] },
  { time: 'Today at 3:00 pm', title: 'Candidate Review — Senior Designer', participants: ['RC', 'NG'] },
  { time: 'Tomorrow at 10:00 am', title: 'Q2 Hiring Strategy Planning', participants: ['RC', 'TM', 'NG', 'DS'] },
];

const MEETINGS = [
  { title: 'Interview Debrief — Maya Ben-Ari', participants: 3, date: 'Apr 15, 2026 4:00 PM', duration: '26m 40s', status: 'Recorded' },
  { title: 'HR Team Weekly Sync', participants: 5, date: 'Apr 15, 2026 3:00 PM', duration: '56m 37s', status: 'Recorded' },
  { title: 'Onboarding Process Review', participants: 3, date: 'Apr 15, 2026 2:00 PM', duration: '32m 26s', status: 'Recorded' },
  { title: 'Candidate Screen — Liam Foster', participants: 2, date: 'Apr 14, 2026 11:30 AM', duration: '57m 29s', status: 'Recorded' },
  { title: 'Benefits & Compensation Meeting', participants: 4, date: 'Apr 14, 2026 10:00 AM', duration: '29m 17s', status: 'Recorded' },
  { title: 'Recruiting Pipeline Review', participants: 3, date: 'Apr 14, 2026 9:30 AM', duration: '43m 26s', status: 'Recorded' },
  { title: 'New Hire Orientation Planning', participants: 2, date: 'Apr 14, 2026 1:30 PM', duration: '26m 28s', status: 'Recorded' },
];

export function NotetakerPage() {
  return (
    <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff }}>
      {/* Header */}
      <div style={{ padding: '20px 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>AI Notetaker</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 13, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><HelpCircle size={14} /> Learn more</span>
            <span style={{ fontSize: 13, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><MessageCircle size={14} /> Give feedback</span>
            <span style={{ fontSize: 13, color: 'var(--secondary-text-color)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}><Settings size={14} /> Settings</span>
          </div>
        </div>

        {/* Upcoming */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 10 }}>Upcoming</span>
          <div style={{ display: 'flex', gap: 12 }}>
            {UPCOMING.map((meeting, i) => (
              <div key={i} style={{ flex: 1, background: '#F8F9FC', border: '1px solid var(--layout-border-color)', borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }}>
                <span style={{ fontSize: 11, color: 'var(--secondary-text-color)', display: 'block', marginBottom: 4 }}>{meeting.time}</span>
                <span style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{meeting.title}</span>
                <div style={{ display: 'flex', gap: -4 }}>
                  {meeting.participants.map((p, j) => {
                    const tm = PERSONA.teamMembers.find(t => t.initials === p);
                    return <div key={j} style={{ width: 22, height: 22, borderRadius: '50%', background: tm?.color || '#999', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', marginLeft: j > 0 ? -4 : 0, border: '2px solid #fff', zIndex: 3 - j }}>{p}</div>;
                  })}
                  {meeting.participants.length > 2 && <span style={{ fontSize: 10, color: 'var(--secondary-text-color)', marginLeft: 4, alignSelf: 'center' }}>+{meeting.participants.length - 2}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--layout-border-color)' }}>
          {['Meeting summaries', 'Upcoming meetings'].map((tab, i) => (
            <span key={tab} style={{ fontSize: 13, padding: '8px 16px', color: i === 0 ? 'var(--primary-color)' : 'var(--secondary-text-color)', fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? '2px solid var(--primary-color)' : '2px solid transparent', cursor: 'pointer', marginBottom: -1 }}>{tab}</span>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div style={{ padding: '10px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F6F7FB', borderRadius: 6, padding: '6px 12px', width: 200 }}>
          <Search size={13} color="var(--secondary-text-color)" />
          <span style={{ fontSize: 12, color: 'var(--placeholder-color)' }}>Search</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', padding: '4px 10px', border: '1px solid var(--ui-border-color)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>Recorded only <ChevronDown size={11} /></span>
          <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', padding: '4px 10px', border: '1px solid var(--ui-border-color)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>My meetings <ChevronDown size={11} /></span>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 160px 90px 80px 32px', padding: '8px 0', borderBottom: '1px solid var(--layout-border-color)' }}>
          {['Meeting summaries', 'Participants', 'Date', 'Recording', 'Status', ''].map(h => (
            <span key={h} style={{ fontSize: 12, fontWeight: 600, color: 'var(--secondary-text-color)' }}>{h}</span>
          ))}
        </div>
        {/* Rows */}
        {MEETINGS.map((m, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 100px 160px 90px 80px 32px', padding: '10px 0', borderBottom: '1px solid var(--layout-border-color)', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex' }}>
                {[...Array(Math.min(m.participants, 3))].map((_, j) => {
                  const colors = ['#9D50DD', '#579BFC', '#FF642E', '#00C875'];
                  return <div key={j} style={{ width: 22, height: 22, borderRadius: '50%', background: colors[j % 4], marginLeft: j > 0 ? -6 : 0, border: '2px solid #fff', zIndex: 3 - j }} />;
                })}
                {m.participants > 3 && <span style={{ fontSize: 10, color: 'var(--secondary-text-color)', marginLeft: 4, alignSelf: 'center' }}>+{m.participants - 3}</span>}
              </div>
              <span style={{ fontSize: 13, color: 'var(--primary-text-color)' }}>{m.title}</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>{m.participants}</span>
            <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>{m.date}</span>
            <span style={{ fontSize: 12, color: 'var(--secondary-text-color)' }}>{m.duration}</span>
            <span style={{ fontSize: 11, color: 'var(--primary-color)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary-color)' }} />
              {m.status}
            </span>
            <MoreHorizontal size={14} color="var(--secondary-text-color)" style={{ cursor: 'pointer' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
