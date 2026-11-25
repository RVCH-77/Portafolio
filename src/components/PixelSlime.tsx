import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const PixelSlime = () => {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const [isBlinking, setIsBlinking] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = t.pixelSlime.clicks;

  // Parpadeo aleatorio de ojos
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    setBubbleText(messages[messageIndex % messages.length]);
    setMessageIndex((prev) => (prev + 1) % messages.length);

    setTimeout(() => {
      setBubbleText(null);
    }, 2400);
  };

  return (
    <aside
      aria-label="Mascota Pixel Slime"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}
    >
      {/* Diálogo / Bocadillo de texto pixelado */}
      <AnimatePresence>
        {bubbleText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '68px',
              backgroundColor: colors.bgCard,
              border: `2px solid ${colors.accent}`,
              borderRadius: '8px',
              padding: '6px 12px',
              color: colors.textPrimary,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)',
              pointerEvents: 'none',
            }}
          >
            {bubbleText}
            {/* Triangulito del bocadillo */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `6px solid ${colors.accent}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slime interactivo con animación de rebote y squash/stretch */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.15, cursor: 'pointer' }}
        whileTap={{ scale: 0.85, y: 8 }}
        animate={{
          y: [0, -14, 0, -4, 0],
          scaleY: [1, 1.22, 0.82, 1.08, 1],
          scaleX: [1, 0.86, 1.2, 0.94, 1],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.35, 0.65, 0.85, 1],
        }}
        style={{
          width: '54px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.45))',
        }}
        title="Pixel Slime"
      >
        {/* Gráfico Pixel Art 2D dibujado vectorialmente con cuadrícula de píxeles */}
        <svg
          width="48"
          height="42"
          viewBox="0 0 16 14"
          style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
        >
          {/* Sombra base / Borde inferior */}
          <rect x="4" y="13" width="8" height="1" fill="#047857" />
          <rect x="2" y="12" width="12" height="1" fill="#047857" />

          {/* Cuerpo principal del Slime (Capa verde esmeralda / cian) */}
          <rect x="2" y="7" width="12" height="5" fill="#10b981" />
          <rect x="1" y="8" width="14" height="4" fill="#10b981" />
          <rect x="3" y="5" width="10" height="2" fill="#10b981" />
          <rect x="4" y="4" width="8" height="1" fill="#10b981" />
          <rect x="5" y="3" width="6" height="1" fill="#10b981" />
          <rect x="6" y="2" width="4" height="1" fill="#10b981" />

          {/* Sombreado interno oscuro (Sensación 3D pixelada) */}
          <rect x="2" y="11" width="12" height="1" fill="#059669" />
          <rect x="1" y="10" width="2" height="2" fill="#059669" />
          <rect x="13" y="10" width="2" height="2" fill="#059669" />

          {/* Brillo especular superior izquierdo (Highlight brillante) */}
          <rect x="4" y="4" width="2" height="2" fill="#6ee7b7" />
          <rect x="6" y="3" width="2" height="1" fill="#a7f3d0" />
          <rect x="3" y="6" width="1" height="2" fill="#a7f3d0" />

          {/* Ojos pixelados con estado de parpadeo */}
          {isBlinking ? (
            /* Ojos cerrados (línea de descanso) */
            <>
              <rect x="4" y="8" width="2" height="1" fill="#064e3b" />
              <rect x="10" y="8" width="2" height="1" fill="#064e3b" />
            </>
          ) : (
            /* Ojos abiertos con pupila y brillo */
            <>
              {/* Ojo izquierdo */}
              <rect x="4" y="7" width="2" height="3" fill="#064e3b" />
              <rect x="4" y="7" width="1" height="1" fill="#ffffff" />

              {/* Ojo derecho */}
              <rect x="10" y="7" width="2" height="3" fill="#064e3b" />
              <rect x="10" y="7" width="1" height="1" fill="#ffffff" />
            </>
          )}

          {/* Mejillas sonrojadas pixeladas (Cute blush) */}
          <rect x="2" y="9" width="2" height="1" fill="#34d399" opacity="0.8" />
          <rect x="12" y="9" width="2" height="1" fill="#34d399" opacity="0.8" />

          {/* Pequeña sonrisa pixelada */}
          <rect x="7" y="9" width="2" height="1" fill="#064e3b" />
        </svg>
      </motion.div>
    </aside>
  );
};

export default PixelSlime;
