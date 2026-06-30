import { StatusMessage } from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { getMyEnrollments } from '../services/courseService.js';
import { formatDate } from '../utils/formatDate.js';

export function MyCoursesPage() {
  const { data: enrollments, loading, error } = useAsync(getMyEnrollments, []);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Vista protegida</p>
        <h2>Mis cursos</h2>
      </div>
      {loading && <StatusMessage>Cargando inscripciones...</StatusMessage>}
      <StatusMessage type="error">{error}</StatusMessage>
      {!loading && enrollments?.length === 0 && (
        <StatusMessage>Aun no tienes preinscripciones registradas.</StatusMessage>
      )}
      <div className="enrollment-list">
        {enrollments?.map((enrollment) => (
          <article className="enrollment-row" key={enrollment.id}>
            <div>
              <span className="badge">{enrollment.status}</span>
              <h3>{enrollment.course.title}</h3>
              <p>{enrollment.course.schedule}</p>
            </div>
            <time dateTime={enrollment.createdAt}>{formatDate(enrollment.createdAt)}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
