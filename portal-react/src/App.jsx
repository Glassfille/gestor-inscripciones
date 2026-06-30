import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/AppLayout.jsx';
import { PrivateRoute } from './components/PrivateRoute.jsx';
import { CourseDetailPage } from './pages/CourseDetailPage.jsx';
import { CoursesPage } from './pages/CoursesPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { MyCoursesPage } from './pages/MyCoursesPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/cursos/:id" element={<CourseDetailPage />} />
          <Route path="/mis-cursos" element={<MyCoursesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/cursos" replace />} />
    </Routes>
  );
}
