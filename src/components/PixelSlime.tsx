import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MESSAGES = [
  '¡Boing! ',
  '¡Hola! Soy Slimey ^_^',
  '*squish*',
  '¿Viste los proyectos?',
  '¡Bloop!',
];

export const PixelSlime = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  // Parpadeo aleatorio de ojos
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    setBubbleText(MESSAGES[messageIndex]);
    setMessageIndex((prev) => (prev + 1) % MESSAGES.length);

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
              backgroundColor: 'rgba(8, 14, 30, 0.95)',
              border: '2px solid #38bdf8',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#f8fafc',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.4), 0 8px 24px rgba(0, 0, 0, 0.8)',
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
                borderTop: '6px solid #38bdf8',
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
        title="¡Haz clic en el slime!"
      >
        {/* Gráfico Pixel Art 2D dibujado vectorialmente con cuadrícula de píxeles */}
        <svg
          viewBox="0 0 16 14"
          width="100%"
          height="100%"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Sombra / Borde exterior oscuro */}
          <path
            fill="#0369a1"
            d="
              M 5 0 H 11 V 1 H 13 V 2 H 14 V 4 H 15 V 10 H 14 V 12 H 13 V 13 H 11 V 14 H 5 V 13 H 3 V 12 H 2 V 10 H 1 V 4 H 2 V 2 H 3 V 1 H 5 Z
            "
          />

          {/* Cuerpo principal del Slime (Cian brillante) */}
          <path
            fill="#38bdf8"
            d="
              M 5 1 H 11 V 2 H 13 V 4 H 14 V 10 H 13 V 12 H 11 V 13 H 5 V 12 H 3 V 10 H 2 V 4 H 3 V 2 H 5 Z
            "
          />

          {/* Sombra inferior del cuerpo (Profundidad) */}
          <path
            fill="#0284c7"
            d="
              M 3 9 H 13 V 10 H 14 V 11 H 13 V 12 H 11 V 13 H 5 V 12 H 3 V 11 H 2 V 10 H 3 Z
            "
          />

          {/* Brillo especular superior / Glint (Luz pixel art) */}
          <rect x="4" y="2" width="2" height="1" fill="#f0f9ff" />
          <rect x="3" y="3" width="1" height="2" fill="#f0f9ff" />
          <rect x="4" y="3" width="2" height="1" fill="#bae6fd" />
          <rect x="10" y="2" width="2" height="1" fill="#bae6fd" opacity="0.7" />

          {/* Ojos y pestañas */}
          {isBlinking ? (
            // Ojos cerrados / Parpadeo
            <>
              <rect x="5" y="7" width="2" height="1" fill="#0c1829" />
              <rect x="9" y="7" width="2" height="1" fill="#0c1829" />
            </>
          ) : (
            // Ojos abiertos tiernos con brillo blanco
            <>
              {/* Ojo izquierdo */}
              <rect x="5" y="6" width="2" height="3" fill="#0c1829" />
              <rect x="5" y="6" width="1" height="1" fill="#ffffff" />

              {/* Ojo derecho */}
              <rect x="9" y="6" width="2" height="3" fill="#0c1829" />
              <rect x="9" y="6" width="1" height="1" fill="#ffffff" />
            </>
          )}

          {/* Sonrisa sutil */}
          <rect x="7" y="8" width="2" height="1" fill="#0369a1" />

          {/* Mejillas sonrojadas (Blush) */}
          <rect x="3" y="8" width="1" height="1" fill="#f472b6" opacity="0.75" />
          <rect x="12" y="8" width="1" height="1" fill="#f472b6" opacity="0.75" />
        </svg>
      </motion.div>

      {/* Sombra proyectada en el suelo con expansión inversa */}
      <motion.div
        animate={{
          scaleX: [1, 0.75, 1.35, 0.9, 1],
          opacity: [0.4, 0.2, 0.65, 0.35, 0.4],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.35, 0.65, 0.85, 1],
        }}
        style={{
          width: '42px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          filter: 'blur(3px)',
          marginTop: '-4px',
        }}
      />
    </aside>
  );
};

export default PixelSlime;

