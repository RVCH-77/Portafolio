import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export interface Project {
  id: string;
  slug: string;
  title: string;
  badgeType: 'privado' | 'demo' | 'codigo';
  badgeLabel: string;
  description: string;
  tags: string[];
  linkUrl?: string;
  featured?: boolean;
}

// Catálogo de proyectos reales
const PROJECTS_DATA: Project[] = [
  {
    id: 'spb-logistica',
    slug: 'spb-logistica',
    title: 'SPB · Servicios Personalizados del Bajío',
    badgeType: 'privado',
    badgeLabel: 'Privado',
    description:
      'Plataforma empresarial diseñada bajo Clean Architecture para centralizar la operación logística y administrativa de transporte. Desarrollé la arquitectura modular de servicios: monitoreo de operadores, telemetría de kilometraje, asignación de rutas de paquetería, nómina y control de acceso RBAC. Implementé migraciones automatizadas de base de datos y optimicé consultas críticas de geolocalización para alto rendimiento.',
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
    description:
      'Plataforma para difusión de agenda cultural y eventos con panel administrativo. Implementé monetización con anuncios de Google (AdSense), estrategia de posicionamiento SEO y optimizaciones en Core Web Vitals y consultas SQL para acelerar la velocidad del sitio.',
    tags: ['PHP', 'MySQL', 'Google AdSense', 'SEO', 'Core Web Vitals'],
    linkUrl: 'https://coolturaytourismo.com/',
  },
  {
    id: 'grupo-interactiva',
    slug: 'landing-grupo-interactiva',
    title: 'Grupo Interactiva · Plataforma Corporativa',
    badgeType: 'demo',
    badgeLabel: 'En línea',
    description:
      'Coordiné el desarrollo y entrega de la plataforma corporativa de Grupo Interactiva. Lideré la gestión de requerimientos, arquitectura de información y despliegue para audiencias de Gobierno y Empresas, estructurando soluciones con IA generativa, analítica y carruseles dinámicos.',
    tags: ['Project Management', 'Gestión Ágil', 'JavaScript', 'HTML5 / CSS3', 'Arquitectura Web'],
    linkUrl: 'https://www.grupointeractiva.mx/',
  },
];

// Iconos vectoriales para tecnologías y badges
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

  if (n.includes('js') || n.includes('javascript')) {
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

  if (n.includes('vitals') || n.includes('performance') || n.includes('seo')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }

  if (n.includes('google') || n.includes('adsense') || n.includes('analytics')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    );
  }

  if (n.includes('management') || n.includes('gestión') || n.includes('gestion') || n.includes('ágil') || n.includes('agil')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
    );
  }

  if (n.includes('html') || n.includes('css') || n.includes('bootstrap')) {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }

  // Icono por defecto (etiqueta tecnológica)
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
      {/* Cabecera sutil */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            color: '#64748b',
          }}
        >
          <span style={{ color: '#38bdf8' }}>~</span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>/proyectos</span>
        </div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
            fontSize: 'clamp(34px, 5vw, 56px)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Proyectos
        </h2>
      </div>

      {/* Grid de 2 columnas lado a lado al estilo de tu captura */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '24px',
          width: '100%',
        }}
      >
        {PROJECTS_DATA.map((project) => (
          <motion.article
            key={project.id}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{
              gridColumn: project.featured ? '1 / -1' : 'auto',
              borderRadius: '20px',
              backgroundColor: 'rgba(11, 18, 22, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              padding: project.featured ? 'clamp(26px, 3.5vw, 36px)' : 'clamp(24px, 3.2vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '22px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
              e.currentTarget.style.boxShadow = '0 16px 40px -15px rgba(0, 0, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
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
                  color: '#64748b',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>$ cd</span>
                  <span style={{ color: '#cbd5e1' }}>~/projects/{project.slug}</span>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#94a3b8',
                    fontSize: '12px',
                  }}
                >
                  <BadgeIcon type={project.badgeType} />
                  <span>{project.badgeLabel}</span>
                </div>
              </div>

              {/* Título Principal */}
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: project.featured ? 'clamp(23px, 2.7vw, 32px)' : 'clamp(20px, 2.2vw, 26px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 14px 0',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.25,
                }}
              >
                {project.title}
              </h3>

              {/* Descripción */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(14px, 1.15vw, 15px)',
                  lineHeight: 1.7,
                  color: '#94a3b8',
                  margin: 0,
                  maxWidth: project.featured ? '980px' : '100%',
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Parte Inferior: Chips con Iconos y Botón Flecha */}
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
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#cbd5e1',
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

              {/* Botón Circular con flecha ↗ */}
              <a
                href={project.linkUrl || '#'}
                target={project.linkUrl && project.linkUrl !== '#' ? '_blank' : undefined}
                rel={project.linkUrl && project.linkUrl !== '#' ? 'noopener noreferrer' : undefined}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor:
                    project.badgeType === 'demo'
                      ? 'rgba(56, 189, 248, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)',
                  color: project.badgeType === 'demo' ? '#38bdf8' : '#ffffff',
                  border: `1px solid ${
                    project.badgeType === 'demo'
                      ? 'rgba(56, 189, 248, 0.3)'
                      : 'rgba(255, 255, 255, 0.1)'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                  e.currentTarget.style.backgroundColor = '#38bdf8';
                  e.currentTarget.style.color = '#040711';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor =
                    project.badgeType === 'demo'
                      ? 'rgba(56, 189, 248, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color =
                    project.badgeType === 'demo' ? '#38bdf8' : '#ffffff';
                }}
                aria-label={`Ver proyecto ${project.title}`}
              >
                ↗
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default Proyectos;
