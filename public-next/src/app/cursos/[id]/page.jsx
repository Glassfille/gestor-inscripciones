import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublicCourse, getPublicCourses } from '../../../services/courses.js';

export async function generateStaticParams() {
  const courses = await getPublicCourses();
  return courses.map((course) => ({ id: course.id }));
}

export async function generateMetadata({ params }) {
  const course = await getPublicCourse(params.id);

  if (!course) {
    return { title: 'Curso no encontrado' };
  }

  return {
    title: `${course.title} | Gestion de Cursos ISIL`,
    description: course.summary
  };
}

export default async function CourseDetailPage({ params }) {
  const course = await getPublicCourse(params.id);

  if (!course) {
    notFound();
  }

  return (
    <main className="inner-page">
      <Link className="back-link" href="/cursos">
        Volver al catalogo
      </Link>
      <article className="detail-public">
        <span>{course.category}</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <dl>
          <div>
            <dt>Docente</dt>
            <dd>{course.teacher}</dd>
          </div>
          <div>
            <dt>Duracion</dt>
            <dd>{course.duration}</dd>
          </div>
          <div>
            <dt>Horario</dt>
            <dd>{course.schedule}</dd>
          </div>
          <div>
            <dt>Modalidad</dt>
            <dd>{course.modality}</dd>
          </div>
        </dl>
      </article>
    </main>
  );
}
