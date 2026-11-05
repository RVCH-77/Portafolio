import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface TypewriterProps {
  /** Texto a escribir */
  text: string;
  /** Velocidad base de tecleo en ms por carácter (por defecto: 38ms) */
  typeSpeed?: number;
  /** Velocidad de borrado en ms por carácter (por defecto: 20ms) */
  deleteSpeed?: number;
  /** Pausa antes de empezar a escribir el nuevo texto (en ms) */
  pauseBeforeType?: number;
  /** Clase CSS adicional opcional */
  className?: string;
  /** Callback cuando termina de escribir */
  onComplete?: () => void;
  /** Carácter o elemento del cursor (por defecto: '▍') */
  cursor?: string;
}

export const Typewriter = ({
  text,
  typeSpeed = 35,
  deleteSpeed = 18,
  pauseBeforeType = 80,
  className = '',
  onComplete,
  cursor = '▍',
}: TypewriterProps) => {
  const [displayed, setDisplayed] = useState('');
  const displayedRef = useRef('');

  useEffect(() => {
    let isCurrent = true;

    const runAnimation = async () => {
      const current = displayedRef.current;
      const target = text;

      // 1. Encontrar el prefijo común entre el texto actual en pantalla y el nuevo texto
      let commonPrefixLen = 0;
      while (
        commonPrefixLen < current.length &&
        commonPrefixLen < target.length &&
        current[commonPrefixLen] === target[commonPrefixLen]
      ) {
        commonPrefixLen++;
      }

      // 2. Backspacing inteligente: retroceder solo hasta el punto en que difieren
      while (displayedRef.current.length > commonPrefixLen) {
        if (!isCurrent) return;
        const next = displayedRef.current.slice(0, -1);
        displayedRef.current = next;
        setDisplayed(next);
        await new Promise((resolve) => setTimeout(resolve, deleteSpeed));
      }

      // Pausa sutil antes de teclear la nueva parte
      if (current.length !== commonPrefixLen) {
        await new Promise((resolve) => setTimeout(resolve, pauseBeforeType));
      }

      // 3. Escribir naturalmente con ritmo humano y pausas en puntuación
      for (let i = commonPrefixLen; i < target.length; i++) {
        if (!isCurrent) return;
        const next = target.slice(0, i + 1);
        displayedRef.current = next;
        setDisplayed(next);

        const char = target[i];
        let delay = typeSpeed + (Math.random() * 22 - 6);
        if (['.', ',', ';', ':', '!', '?'].includes(char)) {
          delay += 110; // Pausa humana en signos de puntuación
        }

        await new Promise((resolve) => setTimeout(resolve, Math.max(12, delay)));
      }

      if (isCurrent && onComplete) {
        onComplete();
      }
    };

    runAnimation();

    return () => {
      isCurrent = false;
    };
  }, [text, typeSpeed, deleteSpeed, pauseBeforeType, onComplete]);

  return (
    <span className={className} style={{ display: 'inline', whiteSpace: 'pre-wrap' }}>
      <span>{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.75,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          display: 'inline-block',
          marginLeft: '3px',
          color: '#38bdf8',
          verticalAlign: 'baseline',
          fontWeight: 400,
          textShadow: '0 0 10px rgba(56, 189, 248, 0.6)',
        }}
        aria-hidden="true"
      >
        {cursor}
      </motion.span>
    </span>
  );
};

