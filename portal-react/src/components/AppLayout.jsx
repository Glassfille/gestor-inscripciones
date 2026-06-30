import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export function AppLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Portal estudiante</p>
          <h1>Gestion de cursos</h1>
        </div>
        <nav className="nav-list" aria-label="Navegacion principal">
          <NavLink to="/cursos">Cursos</NavLink>
          <NavLink to="/mis-cursos">Mis cursos</NavLink>
        </nav>
        <div className="student-card">
          <span>{user?.name}</span>
          <small>{user?.career}</small>
          <button className="ghost-button" type="button" onClick={logout}>
            Cerrar sesion
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
