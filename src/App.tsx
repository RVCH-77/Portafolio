import { Title } from './components/Title';

export function App() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#070709',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Indicador ~/ en la esquina superior izquierda como en tu imagen */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '36px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '18px',
          color: '#64748b',
          letterSpacing: '0.1em',
          userSelect: 'none',
        }}
      >
        ~/
      </div>

      <Title />
    </main>
  );
}

export default App;
