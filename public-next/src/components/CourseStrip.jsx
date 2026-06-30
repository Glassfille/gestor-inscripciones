import Link from 'next/link';

export function CourseStrip({ courses }) {
  return (
    <section className="content-band">
      <div className="section-heading">
        <p className="eyebrow">Catalogo publico</p>
        <h2>Cursos destacados</h2>
      </div>
      <div className="public-grid">
        {courses.map((course) => (
          <article className="public-card" key={course.id}>
            <span>{course.category}</span>
            <h3>{course.title}</h3>
            <p>{course.summary}</p>
            <Link href={`/cursos/${course.id}`}>Conocer curso</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
