import { api } from './api.js';

export async function getCourses() {
  const { data } = await api.get('/courses');
  return data.data;
}

export async function getCourse(id) {
  const { data } = await api.get(`/courses/${id}`);
  return data.data;
}

export async function enrollInCourse(courseId) {
  const { data } = await api.post('/enrollments', { courseId });
  return data.data;
}

export async function getMyEnrollments() {
  const { data } = await api.get('/enrollments/me');
  return data.data;
}
