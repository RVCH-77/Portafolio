import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Typewriter } from "./Typewriter";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export const SobreMi = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const { colors } = useTheme();
  const { t, language } = useLanguage();

  const titles = t.sobreMi.titles;
  const paragraphs = t.sobreMi.paragraphs;

  const [titleIndex, setTitleIndex] = useState(0);

  // Reiniciar o ciclar títulos dinámicos
  useEffect(() => {
    setTitleIndex(0);
  }, [language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [titles.length]);

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
              color: colors.textPrimary,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              margin: 0,
              userSelect: "none",
              display: "inline-flex",
              alignItems: "baseline",
              transition: "color 0.3s ease",
            }}
          >
            <Typewriter
              key={`${language}-${titleIndex}`}
              text={titles[titleIndex]}
              typeSpeed={50}
              deleteSpeed={30}
              pauseBeforeType={120}
              cursor="|"
            />
          </h2>
        </div>

        {/* Columna Derecha: Texto al lado */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "680px",
          }}
        >
          {paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(15px, 1.25vw, 17px)",
                lineHeight: 1.75,
                color: colors.textSecondary,
                margin: 0,
                letterSpacing: "-0.01em",
                transition: "color 0.3s ease",
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
