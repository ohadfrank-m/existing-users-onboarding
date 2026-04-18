import { ChevronRight, Zap, LayoutGrid, User, Bot, Puzzle } from 'lucide-react';

const ff = 'Figtree, sans-serif';

const MENU_ITEMS = [
  { icon: <Zap size={16} color="#676879" />, label: 'AI workflows' },
  { icon: <LayoutGrid size={16} color="#676879" />, label: 'Template center' },
  { icon: <User size={16} color="#676879" />, label: 'My work' },
  { icon: <Bot size={16} color="#676879" />, label: 'Autopilot hub' },
  { icon: <Puzzle size={16} color="#676879" />, label: 'Installed apps', hasSubmenu: true },
];

export function MorePage() {
  return (
    <div style={{ flex: 1, position: 'relative' }}>
      {/* Popup menu — floating card anchored to the More nav item */}
      <div style={{
        position: 'absolute', left: 8, bottom: 16,
        width: 220, background: '#fff', borderRadius: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #E7E9EF',
        padding: '6px 0', fontFamily: ff, zIndex: 10,
      }}>
        {MENU_ITEMS.map((item, i) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 14px', cursor: 'pointer',
          }}>
            {item.icon}
            <span style={{ fontSize: 13, color: '#323338', flex: 1 }}>{item.label}</span>
            {item.hasSubmenu && <ChevronRight size={14} color="#676879" />}
          </div>
        ))}
      </div>

      {/* Background — subtle to show the menu is a popup overlay */}
      <div style={{ flex: 1, background: '#F6F7FB', borderTopLeftRadius: 16, height: '100%' }} />
    </div>
  );
}
