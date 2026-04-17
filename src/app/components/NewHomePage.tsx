import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search, Bell, HelpCircle, Bot, Sparkles,
  ChevronRight, Clock, CheckCircle2, TrendingUp, ArrowRight,
  FileText, BarChart3, Calendar,
} from 'lucide-react';
import { PERSONA } from '../data';
import { SidekickIcon } from './SidekickIcon';

const ff = 'Figtree, sans-serif';

function Avatar({ initials, color, size = 26 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: ff, fontSize: size * 0.4, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

const AiGradientIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path d="M10 1 L11.8 8.2 L19 10 L11.8 11.8 L10 19 L8.2 11.8 L1 10 L8.2 8.2 Z" fill="url(#homeGrad)" />
    <defs>
      <linearGradient id="homeGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB275D" />
        <stop offset="33%" stopColor="#FFCC00" />
        <stop offset="66%" stopColor="#00CA72" />
        <stop offset="100%" stopColor="#8181FF" />
      </linearGradient>
    </defs>
  </svg>
);

const AGENTS = [
  { name: 'Candidate Screener', status: 'Just ran', statusColor: '#00C875', desc: 'Screened 8 candidates, assigned 4, set 5 priorities', icon: '🔍' },
  { name: 'Interview Scheduler', status: 'Ready to run', statusColor: '#579BFC', desc: '3 candidates ready for scheduling', icon: '📅' },
  { name: 'Offer Tracker', status: 'Ready to run', statusColor: '#579BFC', desc: '2 pending offers need follow-up', icon: '📋' },
];

const DISCOVERY_CARDS = [
  {
    icon: <Sparkles size={20} color="#8181FF" />,
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    border: '#DDD6FE',
    title: 'Try Vibe',
    desc: 'Turn your recruitment data into a live hiring dashboard — built by AI in seconds.',
    cta: 'Build an app',
  },
  {
    icon: <Calendar size={20} color="#00C875" />,
    bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    border: '#A7F3D0',
    title: 'Notetaker',
    desc: 'You have 2 interviews tomorrow. Notetaker can capture key points and action items automatically.',
    cta: 'Enable for interviews',
  },
  {
    icon: <TrendingUp size={20} color="#FDAB3D" />,
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    border: '#FDE68A',
    title: 'AI Workflows',
    desc: 'Automate candidate follow-ups when status changes. Smarter than regular automations.',
    cta: 'See workflows',
  },
];

const NavIcon = ({ active, children, label }: { active?: boolean; children: React.ReactNode; label: string }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    padding: '8px 4px', borderRadius: 8, cursor: 'pointer', width: 56,
    background: active ? 'var(--nav-active-bg)' : 'transparent',
  }}>
    {children}
    <span style={{ fontSize: 10, color: active ? 'var(--primary-color)' : 'var(--secondary-text-color)', fontWeight: active ? 600 : 400 }}>
      {label}
    </span>
  </div>
);

export function NewHomePage() {
  const skName = localStorage.getItem('sidekick_name') || 'Sidekick';

  return (
    <div style={{
      width: '100vw', height: '100vh', background: 'var(--primary-background-color)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: ff,
    }}>
      {/* Top bar */}
      <div style={{
        height: 52, flexShrink: 0, background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', borderBottom: '1px solid var(--layout-border-color)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AiGradientIcon size={22} />
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15, color: 'var(--primary-text-color)' }}>monday</span>
          <span style={{ fontSize: 12, color: 'var(--ai-purple)', fontWeight: 500, background: '#F0EDFF', padding: '2px 8px', borderRadius: 4 }}>AI work platform</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 360, background: '#F6F7FB', borderRadius: 8, padding: '8px 12px' }}>
          <Search size={14} color="var(--secondary-text-color)" />
          <span style={{ fontSize: 13, color: 'var(--placeholder-color)' }}>Search or ask anything...</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Bell size={18} color="var(--secondary-text-color)" />
          <HelpCircle size={18} color="var(--secondary-text-color)" />
          <Avatar initials={PERSONA.teamMembers[0].initials} color={PERSONA.teamMembers[0].color} size={30} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* New icon nav */}
        <div style={{
          width: 64, background: '#fff',
          borderRight: '1px solid var(--ui-background-color)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 12, gap: 4, flexShrink: 0,
        }}>
          <NavIcon active label="Home">
            <AiGradientIcon size={18} />
          </NavIcon>
          <NavIcon label="My Work">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </NavIcon>
          <NavIcon label="Teams">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-text-color)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </NavIcon>
          <NavIcon label="Agents">
            <Bot size={18} color="var(--secondary-text-color)" />
          </NavIcon>
          <NavIcon label="Vibe">
            <Sparkles size={18} color="var(--secondary-text-color)" />
          </NavIcon>
        </div>

        {/* Main content area */}
        <div style={{
          flex: 1, overflow: 'auto',
          background: '#F6F7FB',
          borderTopLeftRadius: 16,
          border: '0.5px solid var(--layout-border-color)',
        }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 32px' }}>
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 500,
                color: 'var(--primary-text-color)', margin: '0 0 4px',
              }}>
                Good morning, {PERSONA.firstName}
              </h1>
              <p style={{ fontSize: 15, color: 'var(--secondary-text-color)', margin: '0 0 32px' }}>
                Your AI workspace is set up and your first agent just ran. Here's what's happening.
              </p>
            </motion.div>

            {/* Agents section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ marginBottom: 32 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Bot size={18} color="var(--primary-text-color)" />
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: ff }}>Your agents</h3>
                </div>
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 13, color: 'var(--primary-color)', fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  See all agents <ChevronRight size={14} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {AGENTS.map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
                    style={{
                      background: '#fff', borderRadius: 12,
                      border: '1px solid var(--layout-border-color)',
                      padding: '20px', cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 24 }}>{agent.icon}</span>
                      <span style={{
                        fontSize: 11, fontWeight: 600, color: agent.statusColor,
                        background: `${agent.statusColor}15`, padding: '2px 8px', borderRadius: 4,
                      }}>
                        {agent.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)', margin: '0 0 4px' }}>{agent.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--secondary-text-color)', margin: 0, lineHeight: '18px' }}>{agent.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Discovery cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Sparkles size={18} color="var(--primary-text-color)" />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, fontFamily: ff }}>Discover more AI features</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {DISCOVERY_CARDS.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                    style={{
                      background: card.bg, borderRadius: 12,
                      border: `1px solid ${card.border}`,
                      padding: '20px', cursor: 'pointer',
                    }}
                  >
                    <div style={{ marginBottom: 12 }}>{card.icon}</div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)', margin: '0 0 6px' }}>{card.title}</p>
                    <p style={{ fontSize: 12, color: 'var(--secondary-text-color)', margin: '0 0 16px', lineHeight: '18px' }}>{card.desc}</p>
                    <span style={{
                      fontSize: 13, fontWeight: 600, color: 'var(--primary-color)',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      {card.cta} <ArrowRight size={14} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sidekick mini panel */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#fff', borderLeft: '1px solid var(--layout-border-color)',
            display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--layout-border-color)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <SidekickIcon size={18} />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-text-color)' }}>{skName}</span>
          </div>

          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <SidekickIcon size={16} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-text-color)', margin: '0 0 4px' }}>
                    Your Candidate Screener just finished
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--secondary-text-color)', margin: '0 0 12px', lineHeight: '18px' }}>
                    Next up: 3 candidates are ready for interview scheduling. Want me to run the Interview Scheduler?
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      background: 'var(--primary-color)', border: 'none', borderRadius: 6,
                      padding: '6px 14px', cursor: 'pointer',
                      fontSize: 12, fontWeight: 600, color: '#fff',
                    }}>
                      Run it
                    </button>
                    <button style={{
                      background: 'none', border: '1px solid var(--ui-border-color)', borderRadius: 6,
                      padding: '6px 14px', cursor: 'pointer',
                      fontSize: 12, fontWeight: 500, color: 'var(--secondary-text-color)',
                    }}>
                      Later
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px', borderTop: '1px solid var(--layout-border-color)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              flex: 1, background: '#F6F7FB', borderRadius: 8, padding: '10px 12px',
              fontSize: 13, color: 'var(--placeholder-color)',
            }}>
              {`Ask ${skName} anything...`}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
