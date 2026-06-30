import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StatusMessage } from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { enrollInCourse, getCourse } from '../services/courseService.js';

export function CourseDetailPage() {
  const { id } = useParams();
  const { data: course, loading, error } = useAsync(() => getCourse(id), [id]);
  const [enrolling, setEnrolling] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [enrollError, setEnrollError] = useState('');

  async function handleEnroll() {
    setEnrolling(true);
    setFeedback('');
    setEnrollError('');

    try {
      await enrollInCourse(id);
      setFeedback('Preinscripcion registrada correctamente. Revisa la vista Mis cursos.');
    } catch (err) {
      setEnrollError(err.response?.data?.message ?? 'No se pudo registrar la preinscripcion');
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <section className="page-section">
      <Link className="text-link" to="/cursos">
        Volver a cursos
      </Link>
      {loading && <StatusMessage>Cargando detalle...</StatusMessage>}
      <StatusMessage type="error">{error}</StatusMessage>
      {course && (
        <article className="detail-panel">
          <span className="badge">{course.category}</span>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <dl className="detail-list">
            <div>
              <dt>Docente</dt>
              <dd>{course.teacher}</dd>
            </div>
            <div>
              <dt>Horario</dt>
              <dd>{course.schedule}</dd>
            </div>
            <div>
              <dt>Modalidad</dt>
              <dd>{course.modality}</dd>
            </div>
            <div>
              <dt>Cupos</dt>
              <dd>{course.seats}</dd>
            </div>
          </dl>
          <StatusMessage type="success">{feedback}</StatusMessage>
          <StatusMessage type="error">{enrollError}</StatusMessage>
          <button className="primary-button" type="button" onClick={handleEnroll} disabled={enrolling}>
            {enrolling ? 'Registrando...' : 'Inscribirme'}
          </button>
        </article>
      )}
    </section>
  );
}
