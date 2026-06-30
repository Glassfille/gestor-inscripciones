import { CourseStrip } from '../../components/CourseStrip.jsx';
import { getPublicCourses } from '../../services/courses.js';

export const revalidate = 60;

export default async function CoursesPage() {
  const courses = await getPublicCourses();

  return (
    <main className="inner-page">
      <div className="section-heading">
        <p className="eyebrow">Rutas publicas Next.js</p>
        <h1>Catalogo de cursos</h1>
        <p>Informacion disponible para visitantes no autenticados.</p>
      </div>
      <CourseStrip courses={courses} />
    </main>
  );
}
