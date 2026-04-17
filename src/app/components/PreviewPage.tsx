import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { PERSONA } from '../data';

const ff = 'Figtree, sans-serif';
const fp = 'Poppins, sans-serif';

const AiGradientIcon = ({ size = 20, id = 'mGrad' }: { size?: number; id?: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill={`url(#${id})`} />
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB275D" />
        <stop offset="33%" stopColor="#FFCC00" />
        <stop offset="66%" stopColor="#00CA72" />
        <stop offset="100%" stopColor="#8181FF" />
      </linearGradient>
    </defs>
  </svg>
);

/* HR team members + AI agents in the "people & agents" row */
const PEOPLE = [
  { name: 'Rachel C.', role: 'HR Director', initials: 'RC', color: '#9D50DD', isAgent: false },
  { name: 'Tal M.', role: 'Recruiter', initials: 'TM', color: '#579BFC', isAgent: false },
  { name: 'Noa G.', role: 'People Partner', initials: 'NG', color: '#FF642E', isAgent: false },
];

const AGENTS = [
  { name: 'Screening Agent', desc: 'Scores every application against your criteria, surfaces strong candidates immediately.', emoji: '🔍', gradient: 'linear-gradient(135deg, #00C875 0%, #00A35C 100%)', borderColor: '#00C875' },
  { name: 'Scheduling Agent', desc: 'Candidates self-book against live availability, confirmations handled automatically.', emoji: '📅', gradient: 'linear-gradient(135deg, #579BFC 0%, #0073EA 100%)', borderColor: '#579BFC' },
  { name: 'Sourcing Agent', desc: 'Finds and ranks candidates across multiple sources, reaches out automatically.', emoji: '🎯', gradient: 'linear-gradient(135deg, #FDAB3D 0%, #E68A1A 100%)', borderColor: '#FDAB3D' },
];

const VIBE_WORKFLOW = [
  { type: 'VIBE', name: 'Candidate Self-Service Portal', desc: 'Candidates check application status, upload documents, and pick interview slots — no dev team needed.', emoji: '🌐', borderColor: '#784BD1' },
  { type: 'WORKFLOWS', name: 'Offer Approval Chain', desc: 'When a candidate is marked "hire", the offer routes through legal, finance, and VP approval automatically.', emoji: '⚡', borderColor: '#FF642E' },
];

export function PreviewPage() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-cycle through sections for visual interest
  useEffect(() => {
    if (!entered) return;
    const iv = setInterval(() => setActiveSection(s => (s + 1) % 3), 3000);
    return () => clearInterval(iv);
  }, [entered]);

  return (
    <div style={{
      width: '100vw', height: '100vh', position: 'fixed', inset: 0, zIndex: 100,
      background: '#0A0B10', overflow: 'auto', fontFamily: ff,
    }}>
      {/* Ambient background */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,129,255,0.1) 0%, transparent 70%)',
          top: '-15%', right: '-10%', animation: 'orbFloat 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,114,0.06) 0%, transparent 70%)',
          bottom: '-10%', left: '-5%', animation: 'orbFloat 10s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(129,129,255,0.15); }
          50% { box-shadow: 0 0 40px rgba(129,129,255,0.25); }
        }
      `}</style>

      {/* Close */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 20, right: 20, zIndex: 10,
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex',
        }}
      >
        <X size={16} color="rgba(255,255,255,0.5)" />
      </button>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 5, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '60px 40px 80px',
      }}>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 20 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={entered ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 200 }}
            style={{ marginBottom: 16 }}
          >
            <AiGradientIcon size={44} id="heroG" />
          </motion.div>

          <h1 style={{
            fontFamily: fp, fontSize: 48, fontWeight: 600,
            color: '#fff', margin: '0 0 10px', lineHeight: '56px',
            letterSpacing: '-0.025em',
          }}>
            One platform.<br />
            <span style={{
              background: 'linear-gradient(90deg, #FB275D 0%, #FFCC00 30%, #00CA72 60%, #8181FF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Built for people and agents.
            </span>
          </h1>

          <p style={{
            fontFamily: ff, fontSize: 18, color: 'rgba(255,255,255,0.55)',
            margin: '0 auto 8px', maxWidth: 560, lineHeight: '28px',
          }}>
            From job post to interview, agents screen, schedule, and follow up — while your team focuses on what matters.
          </p>
        </motion.div>

        {/* People + Agents visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            gap: 12, marginBottom: 40, flexWrap: 'wrap',
          }}
        >
          {/* People */}
          <div style={{ display: 'flex', gap: 8 }}>
            {PEOPLE.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={entered ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: '#fff',
                  border: '2px solid rgba(255,255,255,0.15)',
                }}>
                  {p.initials}
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: '14px' }}>{p.role}</span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            width: 1, height: 56, background: 'rgba(255,255,255,0.1)',
            alignSelf: 'center', margin: '0 8px',
          }} />

          {/* Agents */}
          <div style={{ display: 'flex', gap: 8 }}>
            {AGENTS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={entered ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: a.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                  border: `2px solid ${a.borderColor}40`,
                  animation: activeSection === i ? 'pulseGlow 2s ease-in-out infinite' : 'none',
                }}>
                  {a.emoji}
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: '14px', maxWidth: 70 }}>{a.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Agent cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ width: '100%', maxWidth: 800, marginBottom: 24 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 16,
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--agent-green)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>AGENTS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {AGENTS.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: -16 }}
                animate={entered ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${agent.borderColor}25`,
                  borderLeft: `3px solid ${agent.borderColor}`,
                  borderRadius: 10, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: agent.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>
                  {agent.emoji}
                </div>
                <div>
                  <p style={{ fontFamily: ff, fontSize: 15, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{agent.name}</p>
                  <p style={{ fontFamily: ff, fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: '19px' }}>{agent.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vibe + Workflows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={entered ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          style={{ width: '100%', maxWidth: 800, marginBottom: 48 }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            {VIBE_WORKFLOW.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                animate={entered ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${item.borderColor}20`,
                  borderRadius: 10, padding: '16px 18px',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10,
                }}>
                  <span style={{ fontSize: 16 }}>{item.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: item.borderColor, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.type}</span>
                </div>
                <p style={{ fontFamily: ff, fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>{item.name}</p>
                <p style={{ fontFamily: ff, fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: '18px' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={entered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
        >
          <button
            onClick={() => navigate('/transition')}
            style={{
              background: 'var(--primary-color)', border: 'none', borderRadius: 12,
              padding: '16px 40px', cursor: 'pointer',
              fontFamily: ff, fontSize: 17, fontWeight: 600, color: '#fff',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 4px 24px rgba(0,115,234,0.4)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,115,234,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,115,234,0.4)';
            }}
          >
            <Sparkles size={18} />
            Switch to monday AI
            <ArrowRight size={18} />
          </button>

          <p style={{
            fontFamily: ff, fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0,
          }}>
            You can switch back anytime. Your data stays exactly as it is.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
