import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Title } from '../components/Title';
import { ParticleOrb } from '../components/ParticleOrb';
import { Buttons } from '../components/Buttons';
import { SobreMi } from '../components/SobreMi';
import { Proyectos } from '../components/Proyectos';
import { Isaias } from '../components/Isaias';
import { Contacto } from '../components/Contacto';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Componente para el prompt de terminal con efecto de escritura y cursor parpadeante
const TerminalPrompt = () => {
  const { colors } = useTheme();
  const { t, language } = useLanguage();
  const fullText = t.hero.terminalPrompt;
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [fullText, language]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(12px, 3vw, 14px)',
        color: colors.textMuted,
        letterSpacing: '0.04em',
        marginBottom: '6px',
        userSelect: 'none',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ color: colors.accent }}>~</span>
      <span style={{ color: colors.textSecondary }}>{displayedText.slice(1)}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{
          display: 'inline-block',
          width: '7px',
          height: '15px',
          backgroundColor: colors.accent,
          marginLeft: '2px',
          borderRadius: '1px',
        }}
      />
    </motion.div>
  );
};

export const HomePage = () => {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section Responsive */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          alignItems: 'center',
          gap: 'clamp(32px, 4vw, 56px)',
          padding: 'clamp(12px, 2vw, 24px) 12px',
          boxSizing: 'border-box',
          minHeight: 'calc(100vh - 140px)',
        }}
      >
        {/* Columna Izquierda: Información de Entrada */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: '18px',
            zIndex: 2,
            width: '100%',
          }}
        >
          {/* Comando Terminal ~/rv.rivera $ whoami */}
          <TerminalPrompt />

          {/* Título Principal rv.rivera */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', width: '100%' }}>
            <Title />
          </div>

          {/* Subtítulo: Desarrollador Backend & Full-Stack */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(18px, 2.4vw, 28px)',
              fontWeight: 700,
              color: colors.textPrimary,
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              transition: 'color 0.3s ease',
            }}
          >
            {t.hero.role}
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.65,
              color: colors.textSecondary,
              maxWidth: '540px',
              margin: 0,
              transition: 'color 0.3s ease',
            }}
          >
            {t.hero.description}
          </motion.p>

          {/* Componente de Botones de Acción */}
          <Buttons />
        </div>

        {/* Columna Derecha: Orbe de Partículas 3D con Tu Retrato */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <ParticleOrb imageSrc="/avatar.png" size={500} />
        </motion.div>
      </div>

      {/* Sección Sobre Mí con Typewriter: Change Content */}
      <SobreMi />

      {/* Sección de Proyectos Destacados */}
      <Proyectos />

      {/* Cita de Isaías */}
      <Isaias />

      {/* Sección de Contacto */}
      <Contacto />
    </>
  );
};

export default HomePage;
