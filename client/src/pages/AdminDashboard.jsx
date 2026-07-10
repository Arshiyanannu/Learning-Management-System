import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaBookOpen, FaLayerGroup } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import DashboardCard from '../components/DashboardCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
 
const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
 
  useEffect(() => {
    fetchCourses();
  }, []);
 
  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Could not load courses');
    } finally {
      setLoading(false);
    }
  };
 
  const handleDelete = async (courseId) => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;
 
    setDeletingId(courseId);
    try {
      await api.delete(`/courses/${courseId}`);
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
      toast.success('Course deleted successfully');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete course';
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };
 
  const totalLessons = courses.reduce(
    (sum, course) => sum + (course.lessons?.length || 0),
    0
  );
 
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-800">
      {/* Top Navbar Connection */}
      <Navbar />
 
      {/* Main Content Workspace Layout */}
      <main className="flex-grow">
        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto">
          
          {/* Welcome Dashboard Meta Row */}
          <div className="mb-8 border-b border-slate-200/60 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Welcome Back, {user?.name || 'Admin'}
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                Systems console initialized. Moderate, update, and manage your operational course modules.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/admin/create-course')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-indigo-100 flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto hover:-translate-y-0.5"
            >
              <FaPlus /> Create New Course
            </button>
          </div>
 
          {loading ? (
            <Loader />
          ) : (
            <div className="space-y-8 fade-in">
              {/* Metric Card Array Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <DashboardCard
                  icon={<FaBookOpen />}
                  title="Active Courses"
                  count={courses.length}
                  color="primary"
                />
                <DashboardCard
                  icon={<FaLayerGroup />}
                  title="Compiled Lessons"
                  count={totalLessons}
                  color="secondary"
                />
              </div>
 
              {/* Section Header */}
              <div className="space-y-4">
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">System Course Registry</h2>
                
                {courses.length === 0 ? (
                  <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center shadow-sm">
                    <p className="text-slate-500 font-medium">
                      No courses found inside the database schema yet. Click &quot;Create New Course&quot; to push an update.
                    </p>
                  </div>
                ) : (
                  /* Management Data Table Card Wrapper */
                  <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/40 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-400 text-xs font-bold uppercase tracking-wider select-none">
                            <th className="py-3.5 px-6">Course Title</th>
                            <th className="py-3.5 px-6 hidden sm:table-cell">Description Extract</th>
                            <th className="py-3.5 px-6 hidden md:table-cell text-center">Modules</th>
                            <th className="py-3.5 px-6 text-right">Actions Panel</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {courses.map((course) => (
                            <tr key={course._id} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="py-4 px-6 font-bold text-slate-900 max-w-xs truncate group-hover:text-indigo-600 transition-colors">
                                {course.title}
                              </td>
                              <td className="py-4 px-6 hidden sm:table-cell text-slate-500 font-medium max-w-xs truncate">
                                {course.description}
                              </td>
                              <td className="py-4 px-6 hidden md:table-cell text-slate-600 font-bold text-center">
                                <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200/40">
                                  {course.lessons?.length || 0}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-3.5">
                                  <button
                                    onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                                    className="text-slate-400 hover:text-indigo-600 text-base transition-colors"
                                    title="Modify course asset properties"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(course._id)}
                                    disabled={deletingId === course._id}
                                    className="text-slate-400 hover:text-rose-600 text-base transition-colors disabled:opacity-40"
                                    title="Purge course registry token"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
 
      {/* Universal Bottom Footer */}
      <Footer />
    </div>
  );
};
 
// Fixed explicit layout export entry matching component definitions
export default AdminDashboard;