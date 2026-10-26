import { useState, useEffect } from 'react';
import { Title } from './components/Title';
import { ParticleOrb } from './components/ParticleOrb';
import { motion } from 'motion/react';
import { Isaias } from './components/Isaias';
import { Buttons } from './components/Buttons';

// Componente para el prompt de terminal con efecto de escritura y cursor parpadeante
const TerminalPrompt = () => {
  const fullText = ' C:/Users/rv.rivera> ¿Quien eres?';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

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
        fontSize: '14px',
        color: '#64748b',
        letterSpacing: '0.04em',
        marginBottom: '6px',
        userSelect: 'none',
      }}
    >
      <span style={{ color: '#38bdf8' }}>~</span>
      <span style={{ color: '#94a3b8' }}>{displayedText.slice(1)}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{
          display: 'inline-block',
          width: '7px',
          height: '15px',
          backgroundColor: '#38bdf8',
          marginLeft: '2px',
          borderRadius: '1px',
        }}
      />
    </motion.div>
  );
};

export function App() {
  return (
    <main
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#070709',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        margin: 0,
        padding: '0 24px 48px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Barra de Navegación Superior */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '1280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 12px',
          boxSizing: 'border-box',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '18px',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>rv.rivera</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {['Sobre mí', 'Proyectos', 'Experiencia', 'Contacto'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              {item}
            </a>
          ))}
        </nav>
      </motion.header>

      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          alignItems: 'center',
          gap: '40px',
          padding: '24px 12px',
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
          }}
        >
          {/* Comando Terminal ~/rv.rivera $ whoami */}
          <TerminalPrompt />

          {/* Título Principal rv.rivera */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <Title />
          </div>

          {/* Subtítulo: Desarrollador Backend & Full-Stack */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              fontWeight: 700,
              color: '#f8fafc',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Desarrollador Back-end & Full-Stack
          </motion.h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              lineHeight: 1.65,
              color: '#94a3b8',
              maxWidth: '540px',
              margin: 0,
            }}
          >
            Transformo ideas en realidades: Interpreto necesidades y construyo soluciones.
            Mediante APIs, Arquitecturas limpias, patrones de diseño, optimización de bases de datos y aprendiendo continuamente.
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

      <Isaias />

    </main> 
  );
}

export default App;
