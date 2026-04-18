import { useState } from 'react';
import { ChevronDown, ChevronRight, X, Paperclip, AtSign, Mic, ArrowRight } from 'lucide-react';

const ff = 'var(--font-body)';

/* Gradient AI sparkle */
const AiSparkle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#skSpPanel)" />
    <defs><linearGradient id="skSpPanel" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#FB275D" /><stop offset="33%" stopColor="#FFCC00" /><stop offset="66%" stopColor="#00CA72" /><stop offset="100%" stopColor="#8181FF" /></linearGradient></defs>
  </svg>
);

/* Sidekick circular avatar for header */
function SKAvatar({ size = 24 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 'var(--radius-full)',
      background: 'var(--brand-ai-gradient)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <div style={{
        width: size - 4, height: size - 4, borderRadius: 'var(--radius-full)',
        background: 'linear-gradient(135deg, #667EEA, #764BA2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 20 20" fill="none">
          <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="#fff" />
        </svg>
      </div>
    </div>
  );
}

/* User avatar */
function UserAvatar({ initials, color, size = 22 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 'var(--radius-full)',
      background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 700, color: 'var(--text-inverse)', flexShrink: 0,
    }}>{initials}</div>
  );
}

/* Thinking process expandable */
function ThinkingProcess({ children }: { children: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <button onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
          fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
          fontFamily: ff,
        }}>
        <ChevronRight size={12} style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 150ms' }} />
        Thinking process
      </button>
      {expanded && (
        <div style={{
          marginTop: 'var(--space-4)', padding: 'var(--space-8) var(--space-12)',
          background: 'var(--surface-card-muted)', borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
          lineHeight: 'var(--line-height-normal)',
        }}>{children}</div>
      )}
    </div>
  );
}

/* Action chip — full-width rounded box */
function ActionChip({ label, terminal, onClick }: { label: string; terminal?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--space-8)',
        padding: 'var(--space-8) var(--space-12)',
        background: 'var(--surface-content)', border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)', cursor: 'pointer',
        fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)',
        fontFamily: ff, marginBottom: 'var(--space-4)',
        transition: 'border-color var(--duration-fast)',
      }}>
      {!terminal && <ArrowRight size={13} color="var(--text-brand)" style={{ flexShrink: 0 }} />}
      <span style={{ flex: 1, textAlign: 'left' }}>{label}</span>
    </button>
  );
}

/* ═══ SIDEKICK MESSAGE ═══ */
export interface SKMessageData {
  type: 'sidekick' | 'user';
  text: string;
  thinking?: string;
  heading?: string;
  subheading?: string;
  instruction?: string;
  actions?: { label: string; terminal?: boolean }[];
  contentCard?: { title: string; items: { label: string; color: string }[] };
}

function SidekickMessage({ msg, name, userInitials, userColor }: { msg: SKMessageData; name: string; userInitials: string; userColor: string }) {
  if (msg.type === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
        <div style={{
          maxWidth: '80%', background: '#EDF1FC',
          borderRadius: '14px 14px 2px 14px',
          padding: 'var(--space-10) var(--space-14)',
          fontSize: 'var(--font-size-base)', color: 'var(--text-primary)',
        }}>{msg.text}</div>
        <UserAvatar initials={userInitials} color={userColor} />
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 'var(--space-16)' }}>
      {/* Speaker row */}
      <div style={{ display: 'flex', gap: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
        <AiSparkle size={16} />
        <span style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)' }}>{name}</span>
      </div>

      {/* Message body — indented under sparkle */}
      <div style={{ marginLeft: 24 }}>
        {/* Thinking process */}
        {msg.thinking && <ThinkingProcess>{msg.thinking}</ThinkingProcess>}

        {/* Main text */}
        {msg.text && (
          <p style={{
            fontSize: 'var(--font-size-base)', lineHeight: '20px',
            color: 'var(--text-primary)', margin: '0 0 var(--space-8)',
          }}>{msg.text}</p>
        )}

        {/* H2 heading */}
        {msg.heading && (
          <h2 style={{
            fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)', margin: '0 0 var(--space-4)',
          }}>{msg.heading}</h2>
        )}

        {/* Bold sub-heading */}
        {msg.subheading && (
          <p style={{
            fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)', margin: '0 0 var(--space-4)',
          }}>{msg.subheading}</p>
        )}

        {/* Instruction line */}
        {msg.instruction && (
          <p style={{
            fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)',
            margin: '0 0 var(--space-8)', lineHeight: '18px',
          }}>{msg.instruction}</p>
        )}

        {/* Content card */}
        {msg.contentCard && (
          <div style={{
            background: 'var(--surface-card-muted)', borderRadius: 'var(--radius-md)',
            padding: 'var(--space-10) var(--space-12)', marginBottom: 'var(--space-8)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)' }}>{msg.contentCard.title}</span>
            </div>
            {msg.contentCard.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', padding: '4px 0', borderLeft: `3px solid ${item.color}`, paddingLeft: 'var(--space-8)', marginBottom: 2 }}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action chips — stacked vertically, full-width */}
        {msg.actions && msg.actions.length > 0 && (
          <div style={{ marginTop: 'var(--space-4)' }}>
            {msg.actions.map((a, i) => (
              <ActionChip key={i} label={a.label} terminal={a.terminal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ SIDEKICK PANEL ═══ */
export interface SidekickPanelProps {
  name: string;
  scope?: string;
  messages: SKMessageData[];
  userInitials: string;
  userColor: string;
  showGradientBorder?: boolean;
  panelRef?: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
}

export function SidekickPanel({ name, scope, messages, userInitials, userColor, showGradientBorder, panelRef, children }: SidekickPanelProps) {
  return (
    <div style={{
      width: 'var(--sidekick-panel-width)',
      background: 'var(--sidekick-panel-bg)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      borderLeft: showGradientBorder ? '2px solid' : 'none',
      borderImage: showGradientBorder ? 'var(--sidekick-gradient-border) 1' : 'none',
    }}>
      {/* Header — avatar + name + dropdown + edit + close */}
      <div style={{
        padding: 'var(--space-10) var(--space-14)',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
          <SKAvatar size={26} />
          <span style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-primary)' }}>{name}</span>
          <ChevronDown size={12} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
          {/* Edit */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" style={{ cursor: 'pointer' }}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
          {/* Collapse */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" style={{ cursor: 'pointer' }}><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
          {/* Close */}
          <X size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Scope row */}
      {scope && (
        <div style={{
          padding: 'var(--space-6) var(--space-14)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-6)',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="9" x2="9" y2="21" /></svg>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{scope}</span>
        </div>
      )}

      {/* Messages */}
      <div ref={panelRef as any} style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-14)' }}>
        {messages.map((msg, i) => (
          <SidekickMessage key={i} msg={msg} name={name} userInitials={userInitials} userColor={userColor} />
        ))}
      </div>

      {/* Extra content (controls, etc.) */}
      {children}

      {/* Input area */}
      <div style={{ padding: 'var(--space-10) var(--space-14)', borderTop: '1px solid var(--border-light)' }}>
        <div style={{
          border: '1px solid var(--border-input)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-8) var(--space-12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-tertiary)', fontFamily: ff }}>
            Tell {name} what you want to do...
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
            <Paperclip size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            <AtSign size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            {/* Apps grid */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" style={{ cursor: 'pointer' }}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            <Mic size={14} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
            {/* Send */}
            <div style={{
              width: 24, height: 24, borderRadius: 'var(--radius-full)',
              background: 'var(--surface-card-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
            </div>
          </div>
        </div>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-4)', display: 'block' }}>
          AI may be inaccurate, make sure to review it.
        </span>
      </div>
    </div>
  );
}
