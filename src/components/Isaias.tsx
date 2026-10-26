import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';

const VERSE_TEXT =
  '«Los muchachos se fatigan y se cansan, los jóvenes flaquean y caen; pero los que esperan a Dios tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.»';

const HIGHLIGHT_PHRASE = 'tendrán nuevas fuerzas';
const BADGE_TEXT = 'Isaías 40:31';

const GLYPHS = '0123456789ABCDEF!<>-_\\/[]{}—=+*^?#~';

export const Isaias = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const [verseChars, setVerseChars] = useState<string[]>(() => VERSE_TEXT.split(''));
  const [badgeDisplay, setBadgeDisplay] = useState(BADGE_TEXT);
  const [isScrambling, setIsScrambling] = useState(false);

  const isScramblingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const highlightStart = VERSE_TEXT.indexOf(HIGHLIGHT_PHRASE);
  const highlightEnd = highlightStart + HIGHLIGHT_PHRASE.length;

  const triggerScramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    setIsScrambling(true);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    // Configuración de onda para el versículo (~0.9s de animación fluida)
    const verseQueue = VERSE_TEXT.split('').map((char, i) => {
      if (char === ' ') {
        return { char: ' ', start: 0, end: 0, isSpace: true };
      }
      const start = Math.floor((i / VERSE_TEXT.length) * 42);
      const duration = Math.floor(Math.random() * 8 + 6);
      return { char, start, end: start + duration, isSpace: false };
    });

    // Configuración para el badge del título
    const badgeQueue = BADGE_TEXT.split('').map((char, i) => {
      if (char === ' ') {
        return { char: ' ', start: 0, end: 0, isSpace: true };
      }
      const start = Math.floor((i / BADGE_TEXT.length) * 14);
      const duration = Math.floor(Math.random() * 6 + 5);
      return { char, start, end: start + duration, isSpace: false };
    });

    let frame = 0;

    const tick = () => {
      frame++;
      let verseDone = true;
      let badgeDone = true;

      // Actualizar caracteres del versículo
      const nextVerseChars: string[] = [];
      for (let i = 0; i < verseQueue.length; i++) {
        const item = verseQueue[i];
        if (item.isSpace) {
          nextVerseChars.push(' ');
          continue;
        }
        if (frame >= item.end) {
          nextVerseChars.push(item.char);
        } else {
          verseDone = false;
          const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          nextVerseChars.push(randomGlyph);
        }
      }
      setVerseChars(nextVerseChars);

      // Actualizar texto del badge
      const nextBadgeChars: string[] = [];
      for (let i = 0; i < badgeQueue.length; i++) {
        const item = badgeQueue[i];
        if (item.isSpace) {
          nextBadgeChars.push(' ');
          continue;
        }
        if (frame >= item.end) {
          nextBadgeChars.push(item.char);
        } else {
          badgeDone = false;
          const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          nextBadgeChars.push(randomGlyph);
        }
      }
      setBadgeDisplay(nextBadgeChars.join(''));

      if (!verseDone || !badgeDone) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        isScramblingRef.current = false;
        setIsScrambling(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  // Activación al hacer scroll hacia abajo
  useEffect(() => {
    if (isInView) {
      triggerScramble();
    }
  }, [isInView, triggerScramble]);

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: '1280px',
        padding: '0 12px',
        boxSizing: 'border-box',
        margin: '32px 0 48px',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '14px',
        background: 'transparent',
      }}
    >
      {/* Encabezado con Badge y botón de Replay opcional sin fondo de tarjeta */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '13px',
          letterSpacing: '0.04em',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            color: '#38bdf8',
            fontWeight: 600,
            backgroundColor: 'rgba(56, 189, 248, 0.08)',
            padding: '3px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {badgeDisplay}
        </span>

        <button
          onClick={() => triggerScramble()}
          disabled={isScrambling}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '3px 9px',
            color: isScrambling ? '#38bdf8' : '#64748b',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            cursor: isScrambling ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!isScrambling) {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
              e.currentTarget.style.color = '#94a3b8';
            }
          }}
          onMouseLeave={(e) => {
            if (!isScrambling) {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#64748b';
            }
          }}
          title="Volver a decodificar el texto"
        >
          <motion.span
            animate={isScrambling ? { rotate: 360 } : { rotate: 0 }}
            transition={isScrambling ? { repeat: Infinity, duration: 0.8, ease: 'linear' } : { duration: 0.2 }}
            style={{ display: 'inline-block', lineHeight: 1 }}
          >
            ↻
          </motion.span>
          <span>{isScrambling ? 'Decodificando...' : 'Replay'}</span>
        </button>
      </div>

      {/* Versículo con Text Scrambling directamente sobre el fondo negro */}
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(18px, 1.8vw, 24px)',
          fontWeight: 600,
          lineHeight: 1.6,
          letterSpacing: '-0.02em',
          color: '#f8fafc',
          margin: 0,
          maxWidth: '1100px',
        }}
      >
        {verseChars.slice(0, highlightStart).join('')}
        <span
          style={{
            color: '#38bdf8',
            fontWeight: 700,
            textShadow: '0 0 20px rgba(56, 189, 248, 0.35)',
          }}
        >
          {verseChars.slice(highlightStart, highlightEnd).join('')}
        </span>
        {verseChars.slice(highlightEnd).join('')}
      </p>
    </motion.section>
  );
};

export default Isaias;