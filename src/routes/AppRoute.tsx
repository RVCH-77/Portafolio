import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderNav } from '../components/HeaderNav';
import { HomePage } from '../pages/HomePage';

export const AppRoute = () => {
  return (
    <BrowserRouter>
      {/* Encabezado de Navegación compartido */}
      <HeaderNav />

      {/* Definición de Rutas de la Aplicación */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* En el futuro puedes agregar más rutas como:
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/experiencia" element={<ExperienciaPage />} />
            <Route path="*" element={<NotFoundPage />} />
        */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
