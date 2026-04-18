import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Database, RotateCcw } from 'lucide-react';

const ff = 'Figtree, sans-serif';
const SIDEKICK_GRADIENT = 'conic-gradient(from 180deg at 50% 50%, #8181FF 56.38deg, #33DBDB 150deg, #33D58E 191.38deg, #FFD633 231deg, #FC527D 308.38deg, #8181FF 360deg)';

export function HandshakePage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: ff }}>
      <style>{`@keyframes rotateGradient { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', maxWidth: 480 }}>

        {/* Sidekick avatar — large, rotating */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{ width: 140, height: 140, borderRadius: '50%', background: SIDEKICK_GRADIENT, animation: 'rotateGradient 20s linear infinite', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 126, height: 126, borderRadius: '50%', background: 'linear-gradient(135deg, #667EEA, #764BA2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="56" height="56" viewBox="0 0 20 20" fill="none"><path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="#fff" /></svg>
            </div>
          </div>
        </div>

        {/* Hero text */}
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 600, color: '#323338', margin: '0 0 8px' }}>
          Welcome to monday AI, Rachel.
        </h1>
        <p style={{ fontSize: 16, color: '#676879', margin: '0 0 32px', lineHeight: '24px' }}>
          Before we dive in, meet your AI Work Assistant.<br />
          They'll be your guide — and your right-hand from now on.
        </p>

        {/* Three bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36, textAlign: 'left', maxWidth: 340, margin: '0 auto 36px' }}>
          {[
            { icon: <Clock size={18} color="#0073EA" />, text: '~2 minutes to set up' },
            { icon: <Database size={18} color="#00C875" />, text: 'Your data, boards, and workflows are all here' },
            { icon: <RotateCcw size={18} color="#FDAB3D" />, text: 'Switch back anytime from Settings' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
              <span style={{ fontSize: 14, color: '#323338' }}>{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          onClick={() => navigate('/transition')}
          style={{ background: '#0073EA', border: 'none', borderRadius: 10, padding: '14px 36px', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: ff, boxShadow: '0 4px 16px rgba(0,115,234,0.3)' }}>
          Meet your AI Assistant <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </div>
  );
}
