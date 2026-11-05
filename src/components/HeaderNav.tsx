import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  name: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Sobre mí', id: 'sobre-mí' },
  { name: 'Proyectos', id: 'proyectos' },
  { name: 'Experiencia', id: 'experiencia' },
  { name: 'Contacto', id: 'contacto' },
];

export const HeaderNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
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
      {/* Logotipo rv.rivera */}
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: '18px',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <span>rv.rivera</span>
       
      </Link>

      {/* Navegación Desktop */}
      <nav className="desktop-nav" style={{ display: 'flex', gap: '28px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.hash === `#${item.id}`;
          return (
            <Link
              key={item.id}
              to={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo(item.id);
              }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#38bdf8' : '#94a3b8',
                textDecoration: 'none',
                transition: 'color 0.2s ease, text-shadow 0.2s ease',
                textShadow: isActive ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#38bdf8';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '#94a3b8';
              }}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Botón Menú Mobile */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
            {NAV_ITEMS.map((item) => {
              const isActive = location.hash === `#${item.id}`;
              return (
                <Link
                  key={item.id}
                  to={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.id);
                  }}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    color: isActive ? '#38bdf8' : '#e2e8f0',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HeaderNav;

