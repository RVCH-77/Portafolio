import { AppRoute } from './routes/AppRoute';

export function App() {
  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#070709',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
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
      }}
    >
      <AppRoute />
    </main>
  );
}

export default App;
