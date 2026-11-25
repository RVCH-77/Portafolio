import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export interface Project {
  id: string;
  slug: string;
  title: string;
  badgeType: 'privado' | 'demo' | 'codigo';
  badgeLabel: string;
  description: string;
  tags: string[];
  linkUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

// Configuración base de proyectos
const BASE_PROJECTS: Project[] = [
  {
    id: 'spb-logistica',
    slug: 'spb-logistica',
    title: 'SPB · Servicios Personalizados del Bajío',
    badgeType: 'privado',
    badgeLabel: 'Privado',
    description: '',
    tags: ['PHP 8', 'MySQL', 'JavaScript', 'APIs REST', 'Logística', 'Arquitectura Modular', 'Clean Architecture'],
    linkUrl: '#',
    featured: true,
  },
  {
    id: 'cooltura-turismo',
    slug: 'cooltura-y-turismo',
    title: 'Cooltura & Turismo · Portal Cultural',
    badgeType: 'demo',
    badgeLabel: 'En línea',
    description: '',
    tags: ['PHP', 'MySQL', 'Google AdSense', 'SEO', 'Core Web Vitals'],
    linkUrl: 'https://coolturaytourismo.com/',
  },
  {
    id: 'grupo-interactiva',
    slug: 'landing-grupo-interactiva',
    title: 'Grupo Interactiva · Plataforma Corporativa',
    badgeType: 'demo',
    badgeLabel: 'En línea',
    description: '',
    tags: ['Project Management', 'Gestión Ágil', 'JavaScript', 'HTML5 / CSS3', 'Arquitectura Web'],
    linkUrl: 'https://www.grupointeractiva.mx/',
    repoUrl: 'https://github.com/RVCH-77/Landing-grupo-interactiva',
  },
  {
    id: 'biblioteca-cqrs-ddd',
    slug: 'biblioteca',
    title: 'Biblioteca · Plataforma CQRS & DDD',
    badgeType: 'codigo',
    badgeLabel: 'Código',
    description: '',
    tags: ['JavaScript', 'Node.js', 'CQRS', 'DDD', 'MVC / DAO', 'Arquitectura'],
    linkUrl: 'https://github.com/RVCH-77/Biblioteca',
  },
  {
    id: 'ecosystem-fullstack',
    slug: 'ecosystem',
    title: 'Ecosystem · Monitoreo y Analítica IoT',
    badgeType: 'codigo',
    badgeLabel: 'Código',
    description: '',
    tags: ['.NET Core', 'C#', 'Kotlin / Android', 'Python', 'Jupyter', 'APIs REST'],
    linkUrl: 'https://github.com/IDGS-904-23001532/ECOSYSTEM-BACK',
  },
];

// Iconos vectoriales para tecnologías
const TechIcon = ({ name }: { name: string }) => {
  const n = name.toLowerCase();

  if (n.includes('php')) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.042 16.583H8.791l.812-4.104H8.25l-.271 1.354c-.208.979-.75 1.5-1.625 1.5-.479 0-.854-.125-1.125-.375s-.354-.625-.25-1.146l.875-4.417h2.167l-.771 3.917h1.354l.771-3.917h2.167l-1.584 7.188zm5.958-3.083c-.458.75-1.104 1.125-1.938 1.125h-1.667l.812-4.104h1.771c.792 0 1.375.312 1.75.938.375.604.417 1.333.125 2.041h-.853zm.188-4.104H14.98l-.812 4.104h1.667c.75 0 1.292-.292 1.625-.875.333-.604.354-1.271.062-1.958-.333-.792-.854-1.271-1.416-1.271h.999z" />
      </svg>
    );
  }

  if (n.includes('sql') || n.includes('mysql')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  if (n.includes('js') || n.includes('javascript') || n.includes('node')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.888-1.798-2.176-2.327l-.612-.249c-.524-.223-.743-.448-.743-.772 0-.374.324-.623.897-.623.599 0 .973.224 1.272.673l1.521-.998c-.474-.823-1.347-1.347-2.719-1.347-1.795 0-2.967 1.022-2.967 2.544 0 1.222.773 1.945 2.195 2.519l.623.249c.673.274.923.549.923.948 0 .449-.424.748-1.122.748-.823 0-1.322-.399-1.696-.998l-1.571 1.023c.524 1.097 1.621 1.671 3.242 1.671 1.996 0 3.293-1.072 3.293-2.684v-.017zm-8.878.349c0 1.222-.848 1.921-2.195 1.921-.773 0-1.397-.299-1.746-.773l1.247-1.172c.249.324.524.474.848.474.374 0 .574-.15.574-.449v-5.238h1.272v5.237z" />
      </svg>
    );
  }

  if (n.includes('api') || n.includes('rest')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    );
  }

  if (n.includes('.net') || n.includes('c#') || n.includes('csharp')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.895 16.386H7.98v-8.77h2.125v8.77zm6.78-2.616c-.347.882-1.025 1.57-2.034 2.062-.998.492-2.195.738-3.59.738-1.57 0-2.883-.34-3.94-1.02v-2.316c1.173.81 2.455 1.215 3.845 1.215 1.48 0 2.458-.453 2.935-1.358.33-.62.495-1.46.495-2.52 0-1.14-.175-2.02-.525-2.64-.52-1.01-1.54-1.515-3.06-1.515-1.33 0-2.55.37-3.66 1.11V5.722c1.23-.55 2.52-.825 3.87-.825 1.52 0 2.8.293 3.84.878 1.07.595 1.8 1.45 2.19 2.565.37.99.555 2.16.555 3.51 0 1.57-.17 2.87-.51 3.92z" />
      </svg>
    );
  }

  if (n.includes('kotlin') || n.includes('android')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 24H0V0h24L12 12Z" />
      </svg>
    );
  }

  if (n.includes('python') || n.includes('jupyter')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.813v.825H3.904S0 5.78 0 11.908c0 6.13 3.406 5.918 3.406 5.918h2.034v-2.853s-.11-3.406 3.344-3.406h5.753s3.235.053 3.235-3.181V2.656S18.232 0 11.914 0zm-3.235 1.838a.965.965 0 1 1 0 1.93.965.965 0 0 1 0-1.93zM12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.813v-.825h8.115s3.904.451 3.904-5.677c0-6.13-3.406-5.918-3.406-5.918h-2.034v2.853s.11 3.406-3.344 3.406H9.463s-3.235-.053-3.235 3.181v5.728S5.768 24 12.086 24zm3.235-1.838a.965.965 0 1 1 0-1.93.965.965 0 0 1 0 1.93z" />
      </svg>
    );
  }

  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
};

const BadgeIcon = ({ type }: { type: 'privado' | 'demo' | 'codigo' }) => {
  if (type === 'privado') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  if (type === 'demo') {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};

export const Proyectos = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <motion.section
      id="proyectos"
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '90px auto 40px',
        padding: '0 clamp(16px, 3vw, 24px)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        background: 'transparent',
      }}
    >
      {/* Cabecera de la sección */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            color: colors.textMuted,
          }}
        >
          <span style={{ color: colors.accent }}>~</span>
          <span style={{ color: colors.accent, fontWeight: 600 }}>/proyectos</span>
          <span style={{ opacity: 0.6 }}>· {t.proyectos.sectionBadge}</span>
        </div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
            fontSize: 'clamp(34px, 5vw, 56px)',
            fontWeight: 800,
            color: colors.textPrimary,
            letterSpacing: '-0.03em',
            margin: 0,
            transition: 'color 0.3s ease',
          }}
        >
          {t.proyectos.sectionTitle}
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            color: colors.textSecondary,
            maxWidth: '700px',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {t.proyectos.sectionSubtitle}
        </p>
      </div>

      {/* Grid de proyectos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '24px',
          width: '100%',
        }}
      >
        {BASE_PROJECTS.map((project) => {
          const itemT = t.proyectos.items.find((i) => i.id === project.id);
          const title = itemT ? itemT.title : project.title;
          const description = itemT ? itemT.description : project.description;
          const badgeLabel = itemT ? itemT.badgeLabel : project.badgeLabel;
          const tags = itemT ? itemT.tags : project.tags;

          return (
            <motion.article
              key={project.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                gridColumn: project.featured ? '1 / -1' : 'auto',
                borderRadius: '20px',
                backgroundColor: isDark ? 'rgba(11, 18, 22, 0.72)' : '#ffffff',
                border: `1px solid ${colors.borderSubtle}`,
                backdropFilter: 'blur(16px)',
                padding: project.featured ? 'clamp(26px, 3.5vw, 36px)' : 'clamp(24px, 3.2vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '22px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isDark ? 'none' : '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.boxShadow = isDark
                  ? '0 16px 40px -15px rgba(0, 0, 0, 0.7)'
                  : '0 20px 40px -12px rgba(2, 132, 199, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.borderSubtle;
                e.currentTarget.style.boxShadow = isDark ? 'none' : '0 10px 30px -10px rgba(0, 0, 0, 0.05)';
              }}
            >
              {/* Parte Superior: Comando Terminal y Badge */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    color: colors.textMuted,
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: colors.textSecondary }}>$ cd</span>
                    <span style={{ color: colors.textPrimary }}>~/projects/{project.slug}</span>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: colors.textSecondary,
                      fontSize: '12px',
                    }}
                  >
                    <BadgeIcon type={project.badgeType} />
                    <span>{badgeLabel}</span>
                  </div>
                </div>

                {/* Título Principal */}
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: project.featured ? 'clamp(23px, 2.7vw, 32px)' : 'clamp(20px, 2.2vw, 26px)',
                    fontWeight: 700,
                    color: colors.textPrimary,
                    margin: '0 0 14px 0',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {title}
                </h3>

                {/* Descripción */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(14px, 1.15vw, 15px)',
                    lineHeight: 1.7,
                    color: colors.textSecondary,
                    margin: 0,
                    maxWidth: project.featured ? '980px' : '100%',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {description}
                </p>
              </div>

              {/* Parte Inferior: Chips con Iconos y Botones */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px',
                  paddingTop: '10px',
                }}
              >
                {/* Pills de tecnologías */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                        border: `1px solid ${colors.borderSubtle}`,
                        color: colors.textPrimary,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      <TechIcon name={tag} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Botones de acción: Repo y/o Sitio */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Botón Repositorio */}
                  {project.repoUrl && project.repoUrl !== project.linkUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        height: '38px',
                        padding: '0 12px',
                        borderRadius: '999px',
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        border: `1px solid ${colors.borderSubtle}`,
                        color: colors.textPrimary,
                        textDecoration: 'none',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '12px',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.accentLight;
                        e.currentTarget.style.borderColor = colors.accent;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.borderColor = colors.borderSubtle;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      aria-label={`Ver repositorio de ${title} en GitHub`}
                      title="GitHub Repository"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>{t.proyectos.btnRepo}</span>
                    </a>
                  )}

                  {/* Botón Principal */}
                  <a
                    href={project.linkUrl || '#'}
                    target={project.linkUrl && project.linkUrl !== '#' ? '_blank' : undefined}
                    rel={project.linkUrl && project.linkUrl !== '#' ? 'noopener noreferrer' : undefined}
                    style={{
                      height: '38px',
                      padding: project.repoUrl ? '0 14px' : '0',
                      width: project.repoUrl ? 'auto' : '38px',
                      borderRadius: '999px',
                      backgroundColor:
                        project.badgeType === 'demo'
                          ? colors.accentLight
                          : isDark
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.06)',
                      color: project.badgeType === 'demo' ? colors.accent : colors.textPrimary,
                      border: `1px solid ${
                        project.badgeType === 'demo'
                          ? colors.accent
                          : colors.borderSubtle
                      }`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      cursor: project.linkUrl && project.linkUrl !== '#' ? 'pointer' : 'default',
                      opacity: project.linkUrl && project.linkUrl !== '#' ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (project.linkUrl && project.linkUrl !== '#') {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.backgroundColor = colors.accent;
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (project.linkUrl && project.linkUrl !== '#') {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor =
                          project.badgeType === 'demo'
                            ? colors.accentLight
                            : isDark
                            ? 'rgba(255, 255, 255, 0.08)'
                            : 'rgba(0, 0, 0, 0.06)';
                        e.currentTarget.style.color =
                          project.badgeType === 'demo' ? colors.accent : colors.textPrimary;
                      }
                    }}
                    aria-label={`Ver proyecto ${title}`}
                    title={project.badgeType === 'demo' ? t.proyectos.btnSite : t.proyectos.btnRepo}
                  >
                    {project.repoUrl && <span>{t.proyectos.btnSite}</span>}
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Proyectos;
