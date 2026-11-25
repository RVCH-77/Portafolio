import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const GLYPHS = '0123456789ABCDEF!<>-_\\/[]{}—=+*^?#~';

export const Isaias = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const { colors, isDark } = useTheme();
  const { t, language } = useLanguage();

  const verseText = t.isaias.verseText;
  const highlightPhrase = t.isaias.highlightPhrase;
  const badgeText = t.isaias.badgeText;

  const replayLabels: Record<string, { idle: string; active: string; title: string }> = {
    es: { idle: 'Replay', active: 'Decodificando...', title: 'Volver a decodificar el texto' },
    en: { idle: 'Replay', active: 'Decoding...', title: 'Re-decode verse' },
    zh: { idle: '重新播放', active: '解码中...', title: '重新解码文本' },
  };
  const currentReplay = replayLabels[language] || replayLabels.es;

  const [verseChars, setVerseChars] = useState<string[]>(() => verseText.split(''));
  const [badgeDisplay, setBadgeDisplay] = useState(badgeText);
  const [isScrambling, setIsScrambling] = useState(false);

  const isScramblingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  const highlightStart = verseText.indexOf(highlightPhrase);
  const highlightEnd = highlightStart >= 0 ? highlightStart + highlightPhrase.length : 0;

  const triggerScramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    setIsScrambling(true);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const verseQueue = verseText.split('').map((char, i) => {
      if (char === ' ') {
        return { char: ' ', start: 0, end: 0, isSpace: true };
      }
      const start = Math.floor((i / verseText.length) * 42);
      const duration = Math.floor(Math.random() * 8 + 6);
      return { char, start, end: start + duration, isSpace: false };
    });

    const badgeQueue = badgeText.split('').map((char, i) => {
      if (char === ' ') {
        return { char: ' ', start: 0, end: 0, isSpace: true };
      }
      const start = Math.floor((i / badgeText.length) * 14);
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
  }, [verseText, badgeText]);

  // Al cambiar idioma, reiniciar y re-ejecutar scramble
  useEffect(() => {
    setVerseChars(verseText.split(''));
    setBadgeDisplay(badgeText);
    if (isInView) {
      triggerScramble();
    }
  }, [language, verseText, badgeText, isInView, triggerScramble]);

  // Activación al entrar en vista
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
        margin: '36px 0 56px',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px',
        background: 'transparent',
      }}
    >
      {/* Encabezado sin marcos */}
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: colors.accent }}>~</span>
          <span
            style={{
              color: colors.accent,
              fontWeight: 600,
              letterSpacing: '0.06em',
            }}
          >
            {badgeDisplay}
          </span>
        </div>

        <button
          onClick={() => triggerScramble()}
          disabled={isScrambling}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            padding: '2px 6px',
            color: isScrambling ? colors.accent : colors.textMuted,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            cursor: isScrambling ? 'default' : 'pointer',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={(e) => {
            if (!isScrambling) e.currentTarget.style.color = colors.textSecondary;
          }}
          onMouseLeave={(e) => {
            if (!isScrambling) e.currentTarget.style.color = colors.textMuted;
          }}
          title={currentReplay.title}
        >
          <motion.span
            animate={isScrambling ? { rotate: 360 } : { rotate: 0 }}
            transition={isScrambling ? { repeat: Infinity, duration: 0.8, ease: 'linear' } : { duration: 0.2 }}
            style={{ display: 'inline-block', lineHeight: 1 }}
          >
            ↻
          </motion.span>
          <span>{isScrambling ? currentReplay.active : currentReplay.idle}</span>
        </button>
      </div>

      {/* Versículo orgánico con texto destacado */}
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(15px, 3.8vw, 24px)',
          fontWeight: 600,
          lineHeight: 1.6,
          letterSpacing: '-0.02em',
          color: colors.textPrimary,
          margin: 0,
          maxWidth: '1050px',
          transition: 'color 0.3s ease',
        }}
      >
        {highlightStart >= 0 ? (
          <>
            {verseChars.slice(0, highlightStart).join('')}
            <span
              style={{
                color: colors.accent,
                fontWeight: 700,
                textShadow: isDark ? '0 0 20px rgba(56, 189, 248, 0.35)' : 'none',
              }}
            >
              {verseChars.slice(highlightStart, highlightEnd).join('')}
            </span>
            {verseChars.slice(highlightEnd).join('')}
          </>
        ) : (
          verseChars.join('')
        )}
      </p>
    </motion.section>
  );
};

export default Isaias;
