import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
 
// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
 
// Protected Pages
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import Profile from './pages/Profile';
 
// Fallback Page
import NotFound from './pages/NotFound';
 
function App() {
  return (
    // AuthProvider makes login state available to every page/component
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ------------------- Public Routes ------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
 
          {/* ------------------- Student-Only Routes ------------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
 
          {/* ------------------- Admin-Only Routes ------------------- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-course"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-course/:id"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <EditCourse />
              </ProtectedRoute>
            }
          />
 
          {/* ------------------- Shared Protected Route (any logged-in role) ------------------- */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
 
          {/* ------------------- Fallback (404) ------------------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
 
      {/* Global toast notification container (used for success/error alerts) */}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}
 
export default App;

