import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { courses } from './data/courses.js';
import { enrollments } from './data/enrollments.js';
import { users } from './data/users.js';
import { requireAuth } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') ?? '*'
  })
);
app.use(express.json());

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    career: user.career
  };
}

function enrollmentView(enrollment) {
  const course = courses.find((item) => item.id === enrollment.courseId);
  return {
    ...enrollment,
    course
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'gestion-cursos-api' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales invalidas' });
  }

  const payload = publicUser(user);
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

  return res.json({ token, user: payload });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = users.find((item) => item.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.json({ user: publicUser(user) });
});

app.get('/api/courses', (_req, res) => {
  res.json({ data: courses });
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((item) => item.id === req.params.id);

  if (!course) {
    return res.status(404).json({ message: 'Curso no encontrado' });
  }

  return res.json({ data: course });
});

app.get('/api/enrollments/me', requireAuth, (req, res) => {
  const data = enrollments.filter((item) => item.userId === req.user.id).map(enrollmentView);
  res.json({ data });
});

app.post('/api/enrollments', requireAuth, (req, res) => {
  const { courseId } = req.body;
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return res.status(404).json({ message: 'Curso no encontrado' });
  }

  const existing = enrollments.find((item) => item.userId === req.user.id && item.courseId === courseId);

  if (existing) {
    return res.status(409).json({ message: 'Ya tienes una preinscripcion para este curso' });
  }

  const enrollment = {
    id: `enr-${Date.now()}`,
    userId: req.user.id,
    courseId,
    status: 'Preinscrito',
    createdAt: new Date().toISOString()
  };

  enrollments.push(enrollment);
  return res.status(201).json({ data: enrollmentView(enrollment) });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`API lista en http://localhost:${port}`);
});
