export type Language = 'es' | 'en' | 'zh';

export interface ProjectTranslation {
  id: string;
  title: string;
  badgeLabel: string;
  description: string;
  tags: string[];
}

export interface Translations {
  nav: {
    inicio: string;
    sobreMi: string;
    proyectos: string;
    contacto: string;
    githubLabel: string;
    githubPersonal: string;
    githubAcademic: string;
    themeLight: string;
    themeDark: string;
    language: string;
  };
  hero: {
    terminalPrompt: string;
    role: string;
    description: string;
    btnContact: string;
    btnProjects: string;
  };
  sobreMi: {
    titles: string[];
    paragraphs: string[];
  };
  proyectos: {
    sectionBadge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    btnRepo: string;
    btnSite: string;
    badgePrivate: string;
    badgeLive: string;
    badgeCode: string;
    items: ProjectTranslation[];
  };
  isaias: {
    verseText: string;
    highlightPhrase: string;
    badgeText: string;
  };
  contacto: {
    title: string;
    subtitle: string;
    btnCopy: string;
    copiedToast: string;
    btnWrite: string;
    footerText: string;
    statusBadge: string;
    responseEstimate: string;
    directChannel: string;
  };
  pixelSlime: {
    greeting: string;
    clicks: string[];
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  es: {
    nav: {
      inicio: 'Inicio',
      sobreMi: 'Sobre mí',
      proyectos: 'Proyectos',
      contacto: 'Contacto',
      githubLabel: '// GitHub',
      githubPersonal: 'Personal',
      githubAcademic: 'Académico UTL',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Oscuro',
      language: 'Idioma',
    },
    hero: {
      terminalPrompt: ' C:/Users/rv.rivera> ¿Quien eres?',
      role: 'Desarrollador Back-end & Full-Stack',
      description:
        'Transformo ideas en realidades: Interpreto necesidades y construyo soluciones. Mediante APIs, Arquitecturas limpias, patrones de diseño, optimización de bases de datos y aprendiendo continuamente.',
      btnContact: 'Contáctame',
      btnProjects: 'Ver proyectos',
    },
    sobreMi: {
      titles: ['Sobre mí', '¿Quién soy?', 'Mi perfil', 'Trayectoria'],
      paragraphs: [
        'Soy un Desarrollador de Software enfocado en Backend. Me especializo en la implementación de APIs, diseño de arquitecturas y gestión de bases de datos.',
        'Actualmente trabajo en una consultoría de software donde no solo desarrollo soluciones, sino que entiendo las necesidades del negocio para llegar al resultado esperado. He participado en migraciones tecnológicas, desarrollo de sistemas escalables y establecimiento de pruebas bajo prácticas DevOps. Paralelamente, estudio Ingeniería en Gestión y Desarrollo de Software.',
      ],
    },
    proyectos: {
      sectionBadge: '// 02. TRABAJOS SELECCIONADOS',
      sectionTitle: 'Proyectos Destacados',
      sectionSubtitle:
        'Sistemas diseñados bajo estándares de arquitectura limpia, APIs desacopladas y soluciones tecnológicas orientadas a resolver necesidades críticas de negocio.',
      btnRepo: 'Repo',
      btnSite: 'Sitio',
      badgePrivate: 'Privado',
      badgeLive: 'En línea',
      badgeCode: 'Código',
      items: [
        {
          id: 'spb-logistica',
          title: 'SPB · Servicios Personalizados del Bajío',
          badgeLabel: 'Privado',
          description:
            'Plataforma empresarial diseñada bajo Clean Architecture para centralizar la operación logística y administrativa de transporte. Desarrollé la arquitectura modular de servicios: monitoreo de operadores, telemetría de kilometraje, asignación de rutas de paquetería, nómina y control de acceso RBAC. Implementé migraciones automatizadas de base de datos y optimicé consultas críticas de geolocalización para alto rendimiento.',
          tags: ['PHP 8', 'MySQL', 'JavaScript', 'APIs REST', 'Logística', 'Arquitectura Modular', 'Clean Architecture'],
        },
        {
          id: 'cooltura-turismo',
          title: 'Cooltura & Turismo · Portal Cultural',
          badgeLabel: 'En línea',
          description:
            'Plataforma para difusión de agenda cultural y eventos con panel administrativo. Implementé monetización con anuncios de Google (AdSense), estrategia de posicionamiento SEO y optimizaciones en Core Web Vitals y consultas SQL para acelerar la velocidad del sitio.',
          tags: ['PHP', 'MySQL', 'Google AdSense', 'SEO', 'Core Web Vitals'],
        },
        {
          id: 'grupo-interactiva',
          title: 'Grupo Interactiva · Plataforma Corporativa',
          badgeLabel: 'En línea',
          description:
            'Coordiné el desarrollo y entrega técnica de la plataforma corporativa de Grupo Interactiva. Lideré la gestión de requerimientos, arquitectura de información y despliegue para audiencias de Gobierno y Empresas, estructurando soluciones con IA generativa, analítica y carruseles dinámicos.',
          tags: ['Project Management', 'Gestión Ágil', 'JavaScript', 'HTML5 / CSS3', 'Arquitectura Web'],
        },
        {
          id: 'biblioteca-cqrs-ddd',
          title: 'Biblioteca · Plataforma CQRS & DDD',
          badgeLabel: 'Código',
          description:
            'Plataforma de interconexión bibliotecaria diseñada bajo estándares de ingeniería de software avanzada. El núcleo integra CQRS para la segregación de comandos/consultas, Domain-Driven Design (DDD) para comunicación con nodos universitarios externos, DAO y MVVM sobre base MVC.',
          tags: ['JavaScript', 'Node.js', 'CQRS', 'DDD', 'MVC / DAO', 'Arquitectura'],
        },
        {
          id: 'ecosystem-fullstack',
          title: 'Ecosystem · Monitoreo y Analítica IoT',
          badgeLabel: 'Código',
          description:
            'Ecosistema multiplataforma para monitoreo ambiental y análisis algorítmico. Desarrollado con arquitectura desacoplada: Web API en .NET / C# con Entity Framework, procesamiento algorítmico en Python y aplicación móvil nativa en Kotlin para Android.',
          tags: ['.NET Core', 'C#', 'Kotlin / Android', 'Python', 'Jupyter', 'APIs REST'],
        },
      ],
    },
    isaias: {
      verseText:
        '«Los muchachos se fatigan y se cansan, los jóvenes flaquean y caen; pero los que esperan a Dios tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.»',
      highlightPhrase: 'tendrán nuevas fuerzas',
      badgeText: 'Isaías 40:31',
    },
    contacto: {
      title: '¿Creamos algo juntos?',
      subtitle:
        'Ya sea para una propuesta de proyecto, una oportunidad laboral o charlar de arquitectura y desarrollo, mi bandeja de entrada está siempre abierta.',
      btnCopy: 'Copiar',
      copiedToast: '¡Copiado!',
      btnWrite: 'Escribir',
      footerText: '© 2026 · Diseñado con React, Vite & Motion',
      statusBadge: 'Canal en vivo · Abierto a propuestas',
      responseEstimate: 'Tiempo de respuesta: < 24 hrs',
      directChannel: 'CANAL DIRECTO',
    },
    pixelSlime: {
      greeting: '¡Hola! Soy Slime, tu asistente en este portafolio.',
      clicks: [
        '¡Boing! 🟢',
        'Backend sólido, arquitectura limpia.',
        '¿Ya revisaste los proyectos de C# y PHP?',
        '¡Que tengas un gran día explorando el código!',
      ],
    },
  },

  en: {
    nav: {
      inicio: 'Home',
      sobreMi: 'About',
      proyectos: 'Projects',
      contacto: 'Contact',
      githubLabel: '// GitHub',
      githubPersonal: 'Personal',
      githubAcademic: 'UTL Academic',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
      language: 'Language',
    },
    hero: {
      terminalPrompt: ' C:/Users/rv.rivera> whoami',
      role: 'Backend & Full-Stack Developer',
      description:
        'Turning ideas into reality: interpreting needs and building solutions through robust APIs, Clean Architecture, design patterns, database optimization, and continuous learning.',
      btnContact: 'Contact Me',
      btnProjects: 'View Projects',
    },
    sobreMi: {
      titles: ['About me', 'Who am I?', 'My Profile', 'Background'],
      paragraphs: [
        'I am a Software Developer focused on Backend engineering, specializing in API implementation, system architecture design, and database management.',
        'I currently work at a software consulting firm where I not only build technical solutions, but also understand core business requirements to deliver the expected impact. I have participated in technology migrations, scalable systems development, and automated testing under DevOps practices. Concurrently, I am pursuing my degree in Software Management and Development Engineering.',
      ],
    },
    proyectos: {
      sectionBadge: '// 02. SELECTED WORKS',
      sectionTitle: 'Featured Projects',
      sectionSubtitle:
        'Systems engineered with Clean Architecture, decoupled APIs, and modern technical stacks to solve high-impact business needs.',
      btnRepo: 'Repo',
      btnSite: 'Visit',
      badgePrivate: 'Private',
      badgeLive: 'Live',
      badgeCode: 'Code',
      items: [
        {
          id: 'spb-logistica',
          title: 'SPB · Bajío Personalized Services',
          badgeLabel: 'Private',
          description:
            'Enterprise logistics platform engineered with Clean Architecture to centralize transport and administrative operations. Developed modular micro-services: driver tracking, mileage telemetry, parcel route scheduling, payroll, and RBAC security. Automated database migrations and optimized geolocation queries for high throughput.',
          tags: ['PHP 8', 'MySQL', 'JavaScript', 'REST APIs', 'Logistics', 'Modular Architecture', 'Clean Architecture'],
        },
        {
          id: 'cooltura-turismo',
          title: 'Cooltura & Turismo · Cultural Portal',
          badgeLabel: 'Live',
          description:
            'Cultural event dissemination portal with a custom administrative CMS. Implemented Google AdSense monetization, technical SEO strategies, and optimized Core Web Vitals alongside SQL queries for high-speed page loads.',
          tags: ['PHP', 'MySQL', 'Google AdSense', 'SEO', 'Core Web Vitals'],
        },
        {
          id: 'grupo-interactiva',
          title: 'Grupo Interactiva · Corporate Platform',
          badgeLabel: 'Live',
          description:
            'Coordinated technical delivery and frontend development for Grupo Interactiva corporate web portal. Led requirement gathering, information architecture, and deployment tailored for Government and Enterprise clients, structuring generative AI showcases and analytics.',
          tags: ['Project Management', 'Agile Delivery', 'JavaScript', 'HTML5 / CSS3', 'Web Architecture'],
        },
        {
          id: 'biblioteca-cqrs-ddd',
          title: 'Library System · CQRS & DDD Platform',
          badgeLabel: 'Code',
          description:
            'Inter-university library platform engineered under advanced software standards. The core integrates CQRS for command/query segregation, Domain-Driven Design (DDD) bounded contexts for university node communication, DAO, and MVVM over an MVC base.',
          tags: ['JavaScript', 'Node.js', 'CQRS', 'DDD', 'MVC / DAO', 'Architecture'],
        },
        {
          id: 'ecosystem-fullstack',
          title: 'Ecosystem · IoT Telemetry & Analytics',
          badgeLabel: 'Code',
          description:
            'Cross-platform ecosystem for environmental monitoring and algorithmic analysis. Built with decoupled architecture: .NET Core / C# Web API with Entity Framework, Python algorithmic data processing, and native Kotlin mobile client for Android.',
          tags: ['.NET Core', 'C#', 'Kotlin / Android', 'Python', 'Jupyter', 'REST APIs'],
        },
      ],
    },
    isaias: {
      verseText:
        '«Even youths grow tired and weary, and young men stumble and fall; but those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.»',
      highlightPhrase: 'will renew their strength',
      badgeText: 'Isaiah 40:31',
    },
    contacto: {
      title: "Let's build something together",
      subtitle:
        'Whether you have a project idea, a job opportunity, or just want to discuss software architecture and backend engineering, my inbox is always open.',
      btnCopy: 'Copy',
      copiedToast: 'Copied!',
      btnWrite: 'Write',
      footerText: '© 2026 · Designed with React, Vite & Motion',
      statusBadge: 'Live channel · Open to opportunities',
      responseEstimate: 'Response time: < 24 hrs',
      directChannel: 'DIRECT CHANNEL',
    },
    pixelSlime: {
      greeting: "Hello! I'm Slime, your portfolio companion.",
      clicks: [
        'Boing! 🟢',
        'Solid backend, clean architecture.',
        'Did you check out the C# and PHP projects?',
        'Have a great time exploring the code!',
      ],
    },
  },

  zh: {
    nav: {
      inicio: '首页',
      sobreMi: '关于我',
      proyectos: '项目实践',
      contacto: '联系我',
      githubLabel: '// GitHub 主页',
      githubPersonal: '个人主页',
      githubAcademic: 'UTL 学术主页',
      themeLight: '亮色模式',
      themeDark: '暗色模式',
      language: '语言',
    },
    hero: {
      terminalPrompt: ' C:/Users/rv.rivera> whoami (我是谁)',
      role: '后端与全栈开发工程师',
      description:
        '将想法转化为现实：深刻理解业务需求并构建高可用技术方案。依托 REST APIs、整洁架构（Clean Architecture）、设计模式与数据库优化，持续精进技术边界。',
      btnContact: '立即联系',
      btnProjects: '浏览项目',
    },
    sobreMi: {
      titles: ['关于我', '我是谁？', '个人简介', '技术背景'],
      paragraphs: [
        '我是一名专注于后端开发的软件工程师，擅长 API 开发、微服务与模块化系统架构设计，以及关系型数据库优化。',
        '目前我在一家软件咨询公司工作，不仅负责高质量代码实现，更注重深入理解业务场景以确保项目成功落地。曾主导技术迁移、高扩展性系统开发及基于 DevOps 的自动化测试规范。同时，我正在攻读软件管理与开发工程专业学位。',
      ],
    },
    proyectos: {
      sectionBadge: '// 02. 精选项目与工程实践',
      sectionTitle: '代表作品 & 项目集',
      sectionSubtitle:
        '基于整洁架构、解耦 API 与现代技术栈构建的企业级解决方案，专注解决核心业务痛点。',
      btnRepo: '源码',
      btnSite: '在线访问',
      badgePrivate: '私有',
      badgeLive: '在线',
      badgeCode: '开源',
      items: [
        {
          id: 'spb-logistica',
          title: 'SPB · 智慧物流与运输管理云平台',
          badgeLabel: '私有',
          description:
            '采用整洁架构（Clean Architecture）构建的企业级运输与物流调度中枢。负责模块化服务开发：驾驶员智能监控、里程遥测、快递路线排程、薪酬核算与基于角色的访问控制（RBAC）。主导数据库自动化迁移并优化地理位置时空查询性能。',
          tags: ['PHP 8', 'MySQL', 'JavaScript', 'REST APIs', '物流系统', '模块化架构', 'Clean Architecture'],
        },
        {
          id: 'cooltura-turismo',
          title: 'Cooltura & Turismo · 文化与旅游门户平台',
          badgeLabel: '在线',
          description:
            '面向文化活动传播与资讯聚合的内容平台，配备自主开发的管理后台。集成 Google AdSense 商业化变现、全站 SEO 搜索引擎优化，并深度调优 Core Web Vitals 与 SQL 查询以确保毫秒级极速响应。',
          tags: ['PHP', 'MySQL', 'Google AdSense', 'SEO', 'Core Web Vitals'],
        },
        {
          id: 'grupo-interactiva',
          title: 'Grupo Interactiva · 企业官方平台与技术管理',
          badgeLabel: '在线',
          description:
            '统筹 Grupo Interactiva 官网的整体技术交付与架构开发。负责政府与大型企业客户的需求调研、信息架构与线上部署，搭建生成式 AI 成果展示板块与动态数据流交互。',
          tags: ['项目管理 (PM)', '敏捷交付', 'JavaScript', 'HTML5 / CSS3', 'Web 架构'],
        },
        {
          id: 'biblioteca-cqrs-ddd',
          title: '高校图书馆互联平台 · CQRS 与 DDD 架构',
          badgeLabel: '开源',
          description:
            '遵循高标准软件工程原则构建的高校图书互联系统。核心采用读写分离（CQRS）模式，运用领域驱动设计（DDD）界限上下文对接跨校外部节点，在 MVC 基础上实现 DAO 模式与 MVVM 状态解耦。',
          tags: ['JavaScript', 'Node.js', 'CQRS', 'DDD', 'MVC / DAO', '系统架构'],
        },
        {
          id: 'ecosystem-fullstack',
          title: 'Ecosystem · 物联网遥测与环境大数据分析',
          badgeLabel: '开源',
          description:
            '跨平台环境监测与算法分析系统。采用完全解耦架构：基于 .NET Core / C# 与 Entity Framework 的后端 Web API，配合 Python Jupyter 算法数据处理，并配备 Android 原生 Kotlin 移动端。',
          tags: ['.NET Core', 'C#', 'Kotlin / Android', 'Python', 'Jupyter', 'REST APIs'],
        },
      ],
    },
    isaias: {
      verseText:
        '«就是少年人也要疲乏困倦，强壮的也必全然跌倒；但那等候耶和华的，必重新得力。他们必如鹰展翅上腾，他们奔跑却不困倦，行走却不疲乏。»',
      highlightPhrase: '必重新得力',
      badgeText: '以赛亚书 40:31',
    },
    contacto: {
      title: '让我们携手打造卓越项目',
      subtitle:
        '无论是技术方案合作、职位机会交流，还是探讨后端架构与系统设计，欢迎随时与我取得联系。',
      btnCopy: '复制邮箱',
      copiedToast: '已复制！',
      btnWrite: '发送邮件',
      footerText: '© 2026 · 基于 React、Vite 与 Motion 构建',
      statusBadge: '在线信道 · 欢迎技术交流与合作',
      responseEstimate: '预计响应时间：24 小时内',
      directChannel: '直连通信信道',
    },
    pixelSlime: {
      greeting: '你好！我是 Slime，你的网站向导小精灵。',
      clicks: [
        '波音！🟢',
        '扎实的后端体系，整洁的架构之美。',
        '你查看过 C# 和 PHP 的项目工程了吗？',
        '祝你在浏览代码时收获满满！',
      ],
    },
  },
};
