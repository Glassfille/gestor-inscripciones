import Link from 'next/link';
import { CourseStrip } from '../components/CourseStrip.jsx';
import { getPublicCourses } from '../services/courses.js';

export default async function HomePage() {
  const courses = await getPublicCourses();

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Gestion de Cursos e Inscripciones</p>
          <h1>Oferta academica lista para estudiantes que quieren avanzar.</h1>
          <p>
            Explora cursos, horarios y modalidades antes de ingresar al portal privado para gestionar tu
            preinscripcion.
          </p>
          <Link className="primary-link" href="/cursos">
            Ver catalogo
          </Link>
        </div>
      </section>
      <CourseStrip courses={courses.slice(0, 3)} />
    </main>
  );
}
