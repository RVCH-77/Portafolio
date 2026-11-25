import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppRoute } from './routes/AppRoute';
import { PixelSlime } from './components/PixelSlime';

function AppLayout() {
  const { colors } = useTheme();

  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: colors.bg,
        backgroundImage: `radial-gradient(${colors.bgPattern} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        margin: 0,
        padding: '0 clamp(16px, 3vw, 24px) 48px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <AppRoute />

      {/* Compañero Slime Pixel Art 2D */}
      <PixelSlime />
    </main>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppLayout />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
