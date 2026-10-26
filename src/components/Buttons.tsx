import { motion } from 'motion/react';
import { ArrowUpRightIcon, ArrowDownIcon } from '@animateicons/react/lucide';

export const Buttons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginTop: '12px',
        flexWrap: 'wrap',
      }}
    >
      <a
        href="#contacto"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#0284c7',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '9999px',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textDecoration: 'none',
          boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.45)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0369a1';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0284c7';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span>Contáctame</span>
        <ArrowUpRightIcon size={16} isAnimated={true} />
      </a>

      <a
        href="#proyectos"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          color: '#e2e8f0',
          padding: '12px 24px',
          borderRadius: '9999px',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textDecoration: 'none',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span>Ver proyectos</span>
        <ArrowDownIcon size={16} isAnimated={true} />
      </a>
    </motion.div>
  );
};

export default Buttons;
