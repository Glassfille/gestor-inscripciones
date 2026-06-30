import { fallbackCourses } from '../data/fallbackCourses.js';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001/api';

export async function getPublicCourses() {
  try {
    const response = await fetch(`${apiUrl}/courses`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error('API no disponible');
    }

    const payload = await response.json();
    return payload.data;
  } catch {
    return fallbackCourses;
  }
}

export async function getPublicCourse(id) {
  const courses = await getPublicCourses();
  return courses.find((course) => course.id === id) ?? null;
}
