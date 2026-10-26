import { useState, useEffect } from 'react';
import { Title } from './components/Title';
import { ParticleOrb } from './components/ParticleOrb';
import { motion, AnimatePresence } from 'motion/react';
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
        fontSize: 'clamp(12px, 3vw, 14px)',
        color: '#64748b',
        letterSpacing: '0.04em',
        marginBottom: '6px',
        userSelect: 'none',
        flexWrap: 'wrap',
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

const NAV_ITEMS = ['Sobre mí', 'Proyectos', 'Experiencia', 'Contacto'];

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#070709',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        margin: 0,
        padding: '0 clamp(16px, 3vw, 24px) 48px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Barra de Navegación Superior Responsive */}
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
          padding: '20px 12px',
          boxSizing: 'border-box',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          marginBottom: 'clamp(16px, 3vw, 28px)',
          position: 'relative',
          zIndex: 50,
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

        {/* Navegación Desktop */}
        <nav className="desktop-nav">
          {NAV_ITEMS.map((item) => (
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

        {/* Botón Menú Mobile */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>

        {/* Menú Desplegable Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'rgba(8, 14, 33, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginTop: '8px',
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7)',
                zIndex: 60,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#e2e8f0',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

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
              color: '#f8fafc',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
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
              fontSize: 'clamp(14px, 1.2vw, 17px)',
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
