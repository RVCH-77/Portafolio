import { motion } from 'motion/react';
import { ArrowUpRightIcon, ArrowDownIcon } from '@animateicons/react/lucide';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const Buttons = () => {
  const { colors, isDark } = useTheme();
  const { t } = useLanguage();

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
        <span>{t.hero.btnContact}</span>
        <ArrowUpRightIcon size={16} isAnimated={true} />
      </a>

      <a
        href="#proyectos"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
          border: `1px solid ${colors.borderSubtle}`,
          color: colors.textPrimary,
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
          e.currentTarget.style.borderColor = colors.accent;
          e.currentTarget.style.backgroundColor = colors.bgCardHover;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = colors.borderSubtle;
          e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <span>{t.hero.btnProjects}</span>
        <ArrowDownIcon size={16} isAnimated={true} />
      </a>
    </motion.div>
  );
};

export default Buttons;
