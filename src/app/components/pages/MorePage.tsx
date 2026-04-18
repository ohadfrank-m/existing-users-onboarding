import { ChevronDown, ChevronRight, MoreHorizontal, Folder, FileText, LayoutGrid, Settings, Puzzle } from 'lucide-react';

const ff = 'Figtree, sans-serif';

const MORE_ITEMS = [
  { section: 'Resources', items: [
    { name: 'Template center', icon: <LayoutGrid size={14} color="var(--secondary-text-color)" /> },
    { name: 'My apps', icon: <Puzzle size={14} color="var(--secondary-text-color)" /> },
    { name: 'Installed apps', icon: <Settings size={14} color="var(--secondary-text-color)" /> },
  ]},
];

const WORKSPACE_ITEMS = [
  { name: 'HR Department', color: '#579BFC', items: ['Recruitment Pipeline', 'Employee Onboarding', 'Team Directory', 'Benefits & Compensation'] },
  { name: 'Operations', color: '#00C875', items: ['Office Management', 'Vendor Tracking'] },
  { name: 'Company', color: '#FDAB3D', items: ['Company Directory', 'Holiday Calendar'] },
];

export function MorePage() {
  return (
    <>
      {/* Expanded sidebar */}
      <div style={{ width: 260, height: '100%', background: '#fff', borderRight: '1px solid var(--layout-border-color)', padding: '10px 0', display: 'flex', flexDirection: 'column', fontFamily: ff, flexShrink: 0, overflowY: 'auto' }}>
        <div style={{ padding: '0 14px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>More</span>
            <ChevronRight size={14} color="var(--secondary-text-color)" style={{ cursor: 'pointer', transform: 'rotate(180deg)' }} />
          </div>
        </div>

        {/* Resources */}
        {MORE_ITEMS.map(section => (
          <div key={section.section} style={{ padding: '0 8px', marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.4px', padding: '0 6px', display: 'block', marginBottom: 4 }}>{section.section}</span>
            {section.items.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 4, cursor: 'pointer' }}>
                {item.icon}
                <span style={{ fontSize: 13 }}>{item.name}</span>
              </div>
            ))}
          </div>
        ))}

        {/* All workspaces */}
        <div style={{ padding: '0 8px', borderTop: '1px solid var(--layout-border-color)', paddingTop: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--secondary-text-color)', textTransform: 'uppercase', letterSpacing: '0.4px', padding: '0 6px', display: 'block', marginBottom: 6 }}>All workspaces</span>
          {WORKSPACE_ITEMS.map(ws => (
            <div key={ws.name} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 6px', cursor: 'pointer' }}>
                <ChevronDown size={11} color="var(--secondary-text-color)" />
                <div style={{ width: 18, height: 18, borderRadius: 4, background: ws.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff' }}>{ws.name[0]}</div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{ws.name}</span>
              </div>
              {ws.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px 4px 28px', borderRadius: 4, cursor: 'pointer' }}>
                  <FileText size={12} color="var(--secondary-text-color)" />
                  <span style={{ fontSize: 12, color: 'var(--primary-text-color)' }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, background: '#fff', borderTopLeftRadius: 16, border: '0.5px solid var(--layout-border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 16, color: 'var(--secondary-text-color)' }}>Select a board or workspace from the sidebar</span>
        </div>
      </div>
    </>
  );
}
