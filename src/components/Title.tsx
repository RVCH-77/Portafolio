import { motion, type Variants } from "motion/react";

export const Title = () => {
  const text = "rv.rivera";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontSize: "clamp(48px, 6.8vw, 92px)",
        fontWeight: 900,
        letterSpacing: "-0.045em",
        fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
        color: "#ffffff",
        margin: 0,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {text.split("").map((char, index) => {
        if (char === ".") {
          return (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{
                display: "inline-block",
                width: "0.18em",
                height: "0.18em",
                borderRadius: "50%", // Círculo 100% geométrico y perfecto
                backgroundColor: "#2563eb", // Azul Rey
                margin: "0 0.06em",
                verticalAlign: "baseline",
                transform: "translateY(-0.02em)",
              }}
            />
          );
        }

        return (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.h1>
  );
};
