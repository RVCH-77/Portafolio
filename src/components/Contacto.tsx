import TechHorizonFooter from '@/components/ui/tech-horizon-footer';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const Contacto = () => {
  const { language } = useLanguage();
  const { colors, isDark } = useTheme();

  const headings: Record<string, { prefix: string; highlight: string; suffix: string }> = {
    es: {
      prefix: 'Iniciemos un',
      highlight: 'nuevo proyecto',
      suffix: 'juntos hoy.',
    },
    en: {
      prefix: "Let's build",
      highlight: 'something great',
      suffix: 'together today.',
    },
    zh: {
      prefix: '让我们携手开启',
      highlight: '新项目实践',
      suffix: '共创卓越架构。',
    },
  };

  const subheadings: Record<string, string> = {
    es: 'Desarrollador Backend & Full-Stack · APIs escalables, arquitecturas limpias y consultoría.',
    en: 'Backend & Full-Stack Developer · Scalable APIs, Clean Architecture & software consulting.',
    zh: '后端与全栈开发工程师 · 高可用 API、整洁架构设计与企业级技术方案。',
  };

  const ctaEmailLabels: Record<string, string> = {
    es: 'Escribir correo',
    en: 'Send an Email',
    zh: '发送邮件',
  };

  const copyEmailLabels: Record<string, string> = {
    es: 'Copiar correo',
    en: 'Copy Email',
    zh: '复制邮箱',
  };

  const copiedLabels: Record<string, string> = {
    es: '¡Copiado!',
    en: 'Copied!',
    zh: '已复制！',
  };

  const taglines: Record<string, string> = {
    es: 'Transformo ideas en realidades: interpreto necesidades y construyo soluciones.',
    en: 'Turning ideas into reality: interpreting business needs and building scalable solutions.',
    zh: '将想法转化为现实：深度理解业务需求并构建高可用架构。',
  };

  const copyrightTexts: Record<string, string> = {
    es: '© 2026 Christopher Rivera (rv.rivera). Todos los derechos reservados.',
    en: '© 2026 Christopher Rivera (rv.rivera). All rights reserved.',
    zh: '© 2026 Christopher Rivera (rv.rivera). 保留所有权利。',
  };

  const columnsByLang = {
    es: [
      {
        title: 'Proyectos Destacados',
        links: [
          { label: 'SPB Logística (Backend)', href: '#proyectos' },
          { label: 'Cooltura & Turismo', href: 'https://coolturaytourismo.com/', external: true },
          { label: 'Grupo Interactiva', href: 'https://www.grupointeractiva.mx/', external: true },
          { label: 'Biblioteca CQRS & DDD', href: 'https://github.com/RVCH-77/Biblioteca', external: true },
          { label: 'Ecosystem IoT Big Data', href: 'https://github.com/IDGS-904-23001532/ECOSYSTEM-BACK', external: true },
        ],
      },
      {
        title: 'Cuentas GitHub',
        links: [
          { label: '@RVCH-77 (Personal)', href: 'https://github.com/RVCH-77', external: true },
          { label: '@IDGS-904 (Académico)', href: 'https://github.com/IDGS-904-23001532', external: true },
          { label: 'Repositorios Públicos', href: 'https://github.com/RVCH-77?tab=repositories', external: true },
        ],
      },
      {
        title: 'Contacto & Ubicación',
        links: [
          { label: 'christoferriveravalderrama@gmail.com', href: 'mailto:christoferriveravalderrama@gmail.com' },
          { label: 'Guanajuato, México', href: '#' },
          { label: 'UTL · Ingeniería de Software', href: '#' },
        ],
      },
    ],
    en: [
      {
        title: 'Featured Projects',
        links: [
          { label: 'SPB Logistics (Backend)', href: '#proyectos' },
          { label: 'Cooltura & Turismo', href: 'https://coolturaytourismo.com/', external: true },
          { label: 'Grupo Interactiva', href: 'https://www.grupointeractiva.mx/', external: true },
          { label: 'Library CQRS & DDD', href: 'https://github.com/RVCH-77/Biblioteca', external: true },
          { label: 'Ecosystem IoT Big Data', href: 'https://github.com/IDGS-904-23001532/ECOSYSTEM-BACK', external: true },
        ],
      },
      {
        title: 'GitHub Accounts',
        links: [
          { label: '@RVCH-77 (Personal)', href: 'https://github.com/RVCH-77', external: true },
          { label: '@IDGS-904 (Academic)', href: 'https://github.com/IDGS-904-23001532', external: true },
          { label: 'Public Repositories', href: 'https://github.com/RVCH-77?tab=repositories', external: true },
        ],
      },
      {
        title: 'Direct Info',
        links: [
          { label: 'christoferriveravalderrama@gmail.com', href: 'mailto:christoferriveravalderrama@gmail.com' },
          { label: 'Guanajuato, Mexico', href: '#' },
          { label: 'UTL · Software Engineering', href: '#' },
        ],
      },
    ],
    zh: [
      {
        title: '精选项目',
        links: [
          { label: 'SPB 智慧物流后端', href: '#proyectos' },
          { label: 'Cooltura & Turismo 文旅', href: 'https://coolturaytourismo.com/', external: true },
          { label: 'Grupo Interactiva 官网', href: 'https://www.grupointeractiva.mx/', external: true },
          { label: '图书馆系统 (CQRS/DDD)', href: 'https://github.com/RVCH-77/Biblioteca', external: true },
          { label: 'Ecosystem 物联网大数据', href: 'https://github.com/IDGS-904-23001532/ECOSYSTEM-BACK', external: true },
        ],
      },
      {
        title: 'GitHub 档案',
        links: [
          { label: '@RVCH-77 (个人开发)', href: 'https://github.com/RVCH-77', external: true },
          { label: '@IDGS-904 (学术研究)', href: 'https://github.com/IDGS-904-23001532', external: true },
          { label: '开源代码仓库', href: 'https://github.com/RVCH-77?tab=repositories', external: true },
        ],
      },
      {
        title: '联系方式与坐标',
        links: [
          { label: 'christoferriveravalderrama@gmail.com', href: 'mailto:christoferriveravalderrama@gmail.com' },
          { label: '墨西哥 · 瓜纳华托', href: '#' },
          { label: 'UTL 软件工程专业', href: '#' },
        ],
      },
    ],
  };

  const socials = [
    { label: 'GitHub Personal', href: 'https://github.com/RVCH-77', icon: 'github' as const },
    { label: 'GitHub Académico', href: 'https://github.com/IDGS-904-23001532', icon: 'github' as const },
    { label: 'Correo Directo', href: 'mailto:christoferriveravalderrama@gmail.com', icon: 'mail' as const },
  ];

  const currentHeading = headings[language] || headings.es;

  return (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      <TechHorizonFooter
        id="contacto"
        headingPrefix={currentHeading.prefix}
        headingHighlight={currentHeading.highlight}
        headingSuffix={currentHeading.suffix}
        subheading={subheadings[language] || subheadings.es}
        email="christoferriveravalderrama@gmail.com"
        ctaEmailLabel={ctaEmailLabels[language] || ctaEmailLabels.es}
        copyEmailLabel={copyEmailLabels[language] || copyEmailLabels.es}
        copiedLabel={copiedLabels[language] || copiedLabels.es}
        tagline={taglines[language] || taglines.es}
        columns={columnsByLang[language] || columnsByLang.es}
        socials={socials}
        copyright={copyrightTexts[language] || copyrightTexts.es}
        isDark={isDark}
        accentColor={colors.accent}
        bgColor={colors.bg}
        bgSurface={colors.bgSurface}
        textPrimary={colors.textPrimary}
        textSecondary={colors.textSecondary}
        textMuted={colors.textMuted}
        borderSubtle={colors.borderSubtle}
      />
    </div>
  );
};

export default Contacto;