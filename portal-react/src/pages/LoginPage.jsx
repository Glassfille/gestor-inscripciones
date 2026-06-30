import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { StatusMessage } from '../components/StatusMessage.jsx';

export function LoginPage() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: 'estudiante@isil.pe',
    password: '123456'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials);
    } catch (err) {
      setError(err.response?.data?.message ?? 'No se pudo iniciar sesion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-copy">
          <p className="eyebrow">ISIL - Programacion Web II</p>
          <h1>Portal del estudiante</h1>
          <p>
            Accede a tus cursos disponibles, revisa el detalle academico y confirma tu preinscripcion
            desde una vista protegida.
          </p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Correo institucional
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(event) =>
                setCredentials((current) => ({ ...current, password: event.target.value }))
              }
              required
            />
          </label>
          <StatusMessage type="error">{error}</StatusMessage>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Validando...' : 'Iniciar sesion'}
          </button>
        </form>
      </section>
    </main>
  );
}
