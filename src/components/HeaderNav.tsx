import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../i18n/translations';

export const HeaderNav = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const githubDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (githubDropdownRef.current && !githubDropdownRef.current.contains(target)) {
        setIsGithubOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const navItems = [
    { name: t.nav.sobreMi, id: 'sobre-mí' },
    { name: t.nav.proyectos, id: 'proyectos' },
    { name: t.nav.contacto, id: 'contacto' },
  ];

  const githubAccounts = [
    {
      label: t.nav.githubPersonal,
      username: 'RVCH-77',
      url: 'https://github.com/RVCH-77',
      color: '#38bdf8',
    },
    {
      label: t.nav.githubAcademic,
      username: 'IDGS-904-23001532',
      url: 'https://github.com/IDGS-904-23001532',
      color: '#a855f7',
    },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: 'ES' },
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'zh', label: '中文 (简体)', flag: 'ZH' },
  ];

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
        borderBottom: `1px solid ${colors.borderSubtle}`,
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
          color: colors.textPrimary,
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
      <nav
        className="desktop-nav"
        style={{ display: 'flex', alignItems: 'center', gap: '22px' }}
      >
        {navItems.map((item) => {
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
                color: isActive ? colors.accent : colors.textSecondary,
                textDecoration: 'none',
                transition: 'color 0.2s ease, text-shadow 0.2s ease',
                textShadow: isActive && isDark ? '0 0 12px rgba(56, 189, 248, 0.5)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = colors.accent;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              {item.name}
            </Link>
          );
        })}

        {/* Separador vertical */}
        <div
          style={{
            width: '1px',
            height: '16px',
            backgroundColor: colors.borderSubtle,
          }}
        />

        {/* Selector de Idioma (ES / EN / ZH) */}
        <div ref={langDropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: isLangOpen
                ? colors.accentLight
                : isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.04)',
              border: `1px solid ${isLangOpen ? colors.accent : colors.borderSubtle}`,
              color: colors.textPrimary,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            title={t.nav.language}
            aria-label="Seleccionar idioma"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span style={{ textTransform: 'uppercase' }}>{language}</span>
            <span style={{ fontSize: '9px', transform: isLangOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              ▼
            </span>
          </button>

          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  minWidth: '150px',
                  backgroundColor: colors.bgCard,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${colors.borderStrong}`,
                  borderRadius: '12px',
                  padding: '6px',
                  boxShadow: colors.shadowSubtle,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  zIndex: 100,
                }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: language === l.code ? colors.accentLight : 'transparent',
                      color: language === l.code ? colors.accent : colors.textPrimary,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '13px',
                      fontWeight: language === l.code ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (language !== l.code) {
                        e.currentTarget.style.backgroundColor = colors.bgCardHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (language !== l.code) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span>{l.label}</span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        color: colors.textMuted,
                      }}
                    >
                      {l.flag}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Botón Selector de Tema (Modo Claro / Oscuro) */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            border: `1px solid ${colors.borderSubtle}`,
            color: isDark ? '#fbbf24' : '#0284c7',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            outline: 'none',
          }}
          title={isDark ? t.nav.themeLight : t.nav.themeDark}
          aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.borderColor = colors.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = colors.borderSubtle;
          }}
        >
          {isDark ? (
            /* Icono Sol (para cambiar a modo claro) */
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Icono Luna (para cambiar a modo oscuro) */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Botón Menú Desplegable de GitHub */}
        <div
          ref={githubDropdownRef}
          style={{ position: 'relative' }}
          onMouseEnter={() => setIsGithubOpen(true)}
          onMouseLeave={() => setIsGithubOpen(false)}
        >
          <button
            onClick={() => setIsGithubOpen(!isGithubOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: isGithubOpen
                ? colors.accentLight
                : isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.04)',
              border: `1px solid ${isGithubOpen ? colors.accent : colors.borderSubtle}`,
              color: colors.textPrimary,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
            aria-label="Cuentas de GitHub"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
            <span
              style={{
                fontSize: '9px',
                transform: isGithubOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              ▼
            </span>
          </button>

          <AnimatePresence>
            {isGithubOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  minWidth: '250px',
                  backgroundColor: colors.bgCard,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${colors.borderStrong}`,
                  borderRadius: '12px',
                  padding: '6px',
                  boxShadow: colors.shadowSubtle,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 100,
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    padding: '6px 10px 4px 10px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: colors.textMuted,
                    letterSpacing: '0.05em',
                  }}
                >
                  {t.nav.githubLabel}
                </div>

                {githubAccounts.map((acc) => (
                  <a
                    key={acc.username}
                    href={acc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.accentLight;
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: acc.color,
                          boxShadow: `0 0 6px ${acc.color}`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: colors.textPrimary,
                        }}
                      >
                        @{acc.username}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '11px',
                          color: colors.textSecondary,
                        }}
                      >
                        {acc.label}
                      </span>
                      <span style={{ color: colors.textMuted, fontSize: '11px' }}>↗</span>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Botón Menú Mobile */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        style={{ color: colors.textPrimary }}
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
              backgroundColor: colors.bgCard,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.borderStrong}`,
              borderRadius: '16px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginTop: '8px',
              boxShadow: colors.shadowSubtle,
              zIndex: 60,
            }}
          >
            {navItems.map((item) => {
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
                    color: isActive ? colors.accent : colors.textPrimary,
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: `1px solid ${colors.borderSubtle}`,
                  }}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Controles de Idioma y Tema en Mobile */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '6px',
                borderBottom: `1px solid ${colors.borderSubtle}`,
                paddingBottom: '12px',
              }}
            >
              {/* Selector de idioma mobile */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${language === l.code ? colors.accent : colors.borderSubtle}`,
                      backgroundColor: language === l.code ? colors.accentLight : 'transparent',
                      color: language === l.code ? colors.accent : colors.textPrimary,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {l.flag}
                  </button>
                ))}
              </div>

              {/* Botón de tema mobile */}
              <button
                onClick={toggleTheme}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.borderSubtle}`,
                  backgroundColor: colors.bgCardHover,
                  color: isDark ? '#fbbf24' : '#0284c7',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                <span>{isDark ? '☀️ Claro' : '🌙 Oscuro'}</span>
              </button>
            </div>

            {/* Cuentas GitHub en Mobile */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingTop: '4px',
              }}
            >
              {githubAccounts.map((acc) => (
                <a
                  key={acc.username}
                  href={acc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: colors.bgCardHover,
                    border: `1px solid ${colors.borderSubtle}`,
                    color: colors.textPrimary,
                    textDecoration: 'none',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12.5px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: acc.color,
                        boxShadow: `0 0 6px ${acc.color}`,
                      }}
                    />
                    <span>@{acc.username}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: colors.textSecondary }}>
                      {acc.label}
                    </span>
                    <span style={{ color: colors.accent }}>↗</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HeaderNav;
