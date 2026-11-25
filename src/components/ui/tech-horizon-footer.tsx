import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

export interface TechHorizonLink {
  label: string;
  href?: string;
  external?: boolean;
}

export interface TechHorizonColumn {
  title: string;
  links: TechHorizonLink[];
}

export interface TechHorizonSocial {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'x' | 'mail';
}

export interface TechHorizonFooterProps {
  id?: string;
  statusBadge?: string;
  commandPrompt?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  headingSuffix?: string;
  subheading?: string;
  email?: string;
  ctaEmailLabel?: string;
  copyEmailLabel?: string;
  copiedLabel?: string;
  tagline?: string;
  columns?: TechHorizonColumn[];
  socials?: TechHorizonSocial[];
  copyright?: string;
  isDark?: boolean;
  accentColor?: string;
  bgColor?: string;
  bgSurface?: string;
  textPrimary?: string;
  textSecondary?: string;
  textMuted?: string;
  borderSubtle?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  pulsePhase: number;
}

export const TechHorizonFooter: React.FC<TechHorizonFooterProps> = ({
  id = 'contacto',
  statusBadge,
  commandPrompt,
  headingPrefix = '¿Tienes una idea o proyecto?',
  headingHighlight = 'Construyamos software',
  headingSuffix = 'escalable y de alto impacto.',
  subheading = 'Desarrollador Backend & Full-Stack · Especializado en APIs de alto rendimiento, microservicios y arquitectura limpia.',
  email = 'christoferriveravalderrama@gmail.com',
  ctaEmailLabel = 'Enviar correo directo',
  copyEmailLabel = 'Copiar correo',
  copiedLabel = '¡Copiado!',
  tagline = 'Transformando requerimientos complejos en arquitecturas seguras, mantenibles y de alta disponibilidad.',
  columns = [],
  socials = [],
  copyright = '© 2026 Christopher Rivera (rv.rivera). Todos los derechos reservados.',
  isDark = true,
  accentColor = '#38bdf8',
  bgColor = '#070709',
  bgSurface = '#0c0d14',
  textPrimary = '#ffffff',
  textSecondary = '#94a3b8',
  textMuted = '#64748b',
  borderSubtle = 'rgba(255, 255, 255, 0.08)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  // Handle clipboard copy
  const handleCopy = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  }, [email]);

  // Track mouse coordinates over the hero area
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mousePos.current.active = false;
  };

  // Canvas interactive cyber horizon rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Initialize floating nodes
    const particleCount = Math.min(45, Math.floor(width / 28));
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.75),
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.8 + 0.8,
          baseAlpha: Math.random() * 0.5 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    // Check if visible to pause RAF when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) loop();
    });
    if (containerRef.current) observer.observe(containerRef.current);

    let t = 0;
    const waveCount = 14;

    const loop = () => {
      if (!isVisible) return;
      t += 0.012;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw top & ambient spotlight
      const mouse = mousePos.current;
      const targetGlowX = mouse.active ? mouse.x : width * 0.5;
      const targetGlowY = mouse.active ? mouse.y : height * 0.35;

      const radial = ctx.createRadialGradient(
        targetGlowX,
        targetGlowY,
        0,
        targetGlowX,
        targetGlowY,
        Math.max(width * 0.45, 300)
      );
      radial.addColorStop(
        0,
        isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.08)'
      );
      radial.addColorStop(
        0.5,
        isDark ? 'rgba(56, 189, 248, 0.03)' : 'rgba(2, 132, 199, 0.02)'
      );
      radial.addColorStop(1, 'transparent');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw cybernetic nodes and connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height * 0.75;
        if (p.y > height * 0.75) p.y = 0;

        const pulse = Math.sin(t * 1.5 + p.pulsePhase) * 0.2 + 0.8;
        const currentAlpha = p.baseAlpha * pulse;

        ctx.fillStyle = isDark
          ? `rgba(56, 189, 248, ${currentAlpha * 0.8})`
          : `rgba(2, 132, 199, ${currentAlpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw 3D Perspective Wave Grid / Data Horizon
      const horizonY = height * 0.48;

      for (let i = 0; i < waveCount; i++) {
        const progress = i / (waveCount - 1); // 0 (horizon) to 1 (foreground)
        const depth = Math.pow(progress, 1.8);
        const yBase = horizonY + depth * (height - horizonY);

        ctx.beginPath();
        const numPoints = 80;
        const stepX = width / numPoints;

        for (let j = 0; j <= numPoints; j++) {
          const x = j * stepX;

          // Wave components
          const freq1 = 0.0035 + depth * 0.002;
          const freq2 = 0.008;
          const w1 = Math.sin(x * freq1 + t * 1.2 + i * 0.45);
          const w2 = Math.cos(x * freq2 - t * 0.8 + i * 0.3);

          // Mouse proximity elevation
          let mouseElev = 0;
          if (mouse.active) {
            const dmx = Math.abs(x - mouse.x);
            const dmy = Math.abs(yBase - mouse.y);
            const mDist = Math.hypot(dmx, dmy);
            if (mDist < 200) {
              mouseElev = (1 - mDist / 200) * 16 * (1 - depth * 0.4);
            }
          }

          const amp = (6 + depth * 32) * (w1 * 0.7 + w2 * 0.3) - mouseElev;
          const y = yBase + amp;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Color and stroke intensity based on depth
        const alpha = Math.min(0.7, 0.08 + depth * 0.45);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${alpha})`
          : `rgba(2, 132, 199, ${alpha * 0.85})`;
        ctx.lineWidth = 1 + depth * 1.1;
        ctx.stroke();
      }

      // 4. Subtle top and bottom fading masks for seamless blend
      // Top fade: fades from bgColor to transparent so there is NO sharp border
      const topFade = ctx.createLinearGradient(0, 0, 0, height * 0.35);
      topFade.addColorStop(0, bgColor);
      topFade.addColorStop(1, 'transparent');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, height * 0.35);

      // Bottom fade: fades to surface color smoothly
      const bottomFade = ctx.createLinearGradient(0, height * 0.75, 0, height);
      bottomFade.addColorStop(0, 'transparent');
      bottomFade.addColorStop(1, bgColor);
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height * 0.75, width, height * 0.25);

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [isDark, bgColor, accentColor]);

  return (
    <footer
      id={id}
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: bgColor,
        color: textPrimary,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: 'hidden',
        borderTop: `1px solid ${borderSubtle}`,
        marginTop: '60px',
      }}
    >
      {/* Background Interactive Canvas */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '560px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Main Hero Call To Action Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1180px',
          margin: '0 auto',
          padding: 'clamp(50px, 8vw, 90px) 24px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Status Pill Badge (Optional) */}
        {statusBadge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.12)',
              border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.4)'}`,
              color: isDark ? '#34d399' : '#059669',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              fontWeight: 500,
              marginBottom: '18px',
              letterSpacing: '0.02em',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 10px #10b981',
                display: 'inline-block',
              }}
            />
            {statusBadge}
          </motion.div>
        )}

        {/* Monospace Terminal Tag (Optional) */}
        {commandPrompt && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              color: textMuted,
              marginBottom: '14px',
              letterSpacing: '0.04em',
            }}
          >
            {commandPrompt}
          </div>
        )}

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            margin: '0 0 18px 0',
            fontSize: 'clamp(32px, 5.2vw, 58px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
            color: textPrimary,
          }}
        >
          <span>{headingPrefix} </span>
          <span
            style={{
              color: accentColor,
              textShadow: isDark
                ? `0 0 35px ${accentColor}40`
                : 'none',
            }}
          >
            {headingHighlight}
          </span>{' '}
          <span>{headingSuffix}</span>
        </motion.h2>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            margin: '0 0 32px 0',
            maxWidth: '640px',
            fontSize: 'clamp(14.5px, 1.3vw, 17px)',
            lineHeight: 1.6,
            color: textSecondary,
          }}
        >
          {subheading}
        </motion.p>

        {/* Primary Action Buttons Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '40px',
          }}
        >
          {/* Email Direct Link Button */}
          <a
            href={`mailto:${email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '10px',
              backgroundColor: accentColor,
              color: isDark ? '#070709' : '#ffffff',
              fontWeight: 600,
              fontSize: '14.5px',
              textDecoration: 'none',
              boxShadow: isDark
                ? `0 8px 24px -6px ${accentColor}60`
                : '0 6px 20px -5px rgba(2, 132, 199, 0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>{ctaEmailLabel}</span>
            <span style={{ fontSize: '16px' }}>↗</span>
          </a>

          {/* Copy Email Button */}
          <button
            onClick={handleCopy}
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '10px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              border: `1px solid ${copied ? '#10b981' : borderSubtle}`,
              color: copied ? '#10b981' : textPrimary,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13.5px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark
                ? 'rgba(255, 255, 255, 0.09)'
                : 'rgba(0, 0, 0, 0.07)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.04)';
            }}
          >
            {copied ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{copiedLabel}</span>
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span>{copyEmailLabel}</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Footer Navigation Columns Section */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: `1px solid ${borderSubtle}`,
          backgroundColor: isDark ? `${bgSurface}e6` : 'rgba(248, 250, 252, 0.92)',
          backdropFilter: 'blur(12px)',
          padding: '48px 24px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '40px',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '18px',
                color: textPrimary,
              }}
            >
              <span style={{ color: accentColor }}>&gt;</span> rv.rivera
            </div>
            <p
              style={{
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: textSecondary,
                margin: 0,
                maxWidth: '280px',
              }}
            >
              {tagline}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '8px',
              }}
            >
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    color: textMuted,
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                    border: `1px solid ${borderSubtle}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = accentColor;
                    e.currentTarget.style.borderColor = accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = textMuted;
                    e.currentTarget.style.borderColor = borderSubtle;
                  }}
                >
                  {s.icon === 'github' && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  )}
                  {s.icon === 'linkedin' && (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {s.icon === 'x' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {s.icon === 'mail' && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {columns.map((col, cIdx) => (
            <div key={cIdx} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: textPrimary,
                  letterSpacing: '0.04em',
                }}
              >
                // {col.title.toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {col.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.href || '#'}
                    target={link.external || link.href?.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.external || link.href?.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    style={{
                      fontSize: '13.5px',
                      color: textSecondary,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.15s ease',
                      width: 'fit-content',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = textSecondary;
                    }}
                  >
                    <span>{link.label}</span>
                    {(link.external || link.href?.startsWith('http')) && (
                      <span style={{ fontSize: '12px', opacity: 0.6 }}>↗</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright */}
        <div
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            paddingTop: '24px',
            borderTop: `1px solid ${borderSubtle}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: '12.5px',
            color: textMuted,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <div>{copyright}</div>
        </div>
      </div>
    </footer>
  );
};

export default TechHorizonFooter;