import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Typewriter } from "./Typewriter";

// Títulos que rotan con la animación Typewriter: Change Content
const TITLES = [
  "Sobre mí",
  "¿Quién soy?",
  "Mi perfil",
  "About me",
];

const CONTEXT_PARAGRAPHS = [
  "Soy un Desarrollador de Software enfocado en Backend,Me especializo en la implementación de APIs, diseño de arquitecturas y gestión de bases de datos.",
  "Actualmente trabajo en una consultoría de software donde no solo desarrollo soluciones, sino que entiendo las necesidades del negocio para llegar al resultado esperado. He participado en migraciones tecnológicas, desarrollo de sistemas escalables y establecimiento de pruebas bajo prácticas DevOps. Paralelamente, estudio Ingeniería en Gestión y Desarrollo de Software.",
];

export const SobreMi = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const [titleIndex, setTitleIndex] = useState(0);

  // Cambio dinámico de título cada 4.5 segundos (con backspacing inteligente)
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      id="sobre-mí"
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "90px auto 50px",
        padding: "0 clamp(16px, 3vw, 24px)",
        boxSizing: "border-box",
        background: "transparent",
      }}
    >
      {/* Layout de 2 columnas: Título a la izquierda y Texto al lado */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          alignItems: "center",
          gap: "clamp(24px, 5vw, 64px)",
          width: "100%",
        }}
      >
        {/* Columna Izquierda: Título con Typewriter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
              fontSize: "clamp(42px, 5.8vw, 76px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              margin: 0,
              userSelect: "none",
              display: "inline-flex",
              alignItems: "baseline",
            }}
          >
            <Typewriter
              text={TITLES[titleIndex]}
              typeSpeed={50}
              deleteSpeed={30}
              pauseBeforeType={120}
              cursor="|"
            />
          </h2>
        </div>

        {/* Columna Derecha: Tu texto original al lado */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "680px",
          }}
        >
          {CONTEXT_PARAGRAPHS.map((paragraph, idx) => (
            <p
              key={idx}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(15px, 1.25vw, 17px)",
                lineHeight: 1.75,
                color: "#cbd5e1",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SobreMi;
