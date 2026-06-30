import { Link } from 'react-router-dom';
import { StatusMessage } from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { getCourses } from '../services/courseService.js';

export function CoursesPage() {
  const { data: courses, loading, error } = useAsync(getCourses, []);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Oferta disponible</p>
        <h2>Cursos para este ciclo</h2>
      </div>
      {loading && <StatusMessage>Cargando cursos...</StatusMessage>}
      <StatusMessage type="error">{error}</StatusMessage>
      <div className="course-grid">
        {courses?.map((course) => (
          <article className="course-card" key={course.id}>
            <div>
              <span className="badge">{course.category}</span>
              <h3>{course.title}</h3>
              <p>{course.summary}</p>
            </div>
            <dl className="course-meta">
              <div>
                <dt>Duracion</dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>Cupos</dt>
                <dd>{course.seats}</dd>
              </div>
            </dl>
            <Link className="text-link" to={`/cursos/${course.id}`}>
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
