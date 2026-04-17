const AVATAR_MAP: Record<string, { emoji: string; bg: string }> = {
  star:    { emoji: '✦', bg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' },
  bot:     { emoji: '🤖', bg: 'linear-gradient(135deg, #00C875 0%, #00A35C 100%)' },
  sparkle: { emoji: '⚡', bg: 'linear-gradient(135deg, #FDAB3D 0%, #E68A1A 100%)' },
};

const AiGradientIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#skGrad)" />
    <defs>
      <linearGradient id="skGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB275D" />
        <stop offset="33%" stopColor="#FFCC00" />
        <stop offset="66%" stopColor="#00CA72" />
        <stop offset="100%" stopColor="#8181FF" />
      </linearGradient>
    </defs>
  </svg>
);

export function SidekickIcon({ size = 20 }: { size?: number }) {
  const avatarId = localStorage.getItem('sidekick_avatar_id');
  const uploadSrc = localStorage.getItem('sidekick_avatar_upload');

  if (avatarId === 'upload' && uploadSrc) {
    return (
      <img
        src={uploadSrc}
        alt="Sidekick"
        style={{
          width: size, height: size, borderRadius: size * 0.25,
          objectFit: 'cover', flexShrink: 0,
        }}
      />
    );
  }

  const preset = avatarId ? AVATAR_MAP[avatarId] : null;
  if (preset) {
    return (
      <div style={{
        width: size, height: size, borderRadius: size * 0.25,
        background: preset.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.55, flexShrink: 0, lineHeight: 1,
      }}>
        {preset.emoji}
      </div>
    );
  }

  return <AiGradientIcon size={size} />;
}
