import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBookOpen, FaUsers, FaChalkboardTeacher, FaRocket, FaBook } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
 
const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
 
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // Fetch a few courses on page load to showcase on the homepage
  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setFeaturedCourses(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load featured courses:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchFeaturedCourses();
  }, []);

  // Dynamic conditional router for the main call-to-action button
  const handleCtaAction = () => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  };
 
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800">
      <Navbar />
 
      {/* ------------------- Hero Section ------------------- */}
      <section className="bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        {/* Subtle geometric grid overlay to eliminate empty space */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="page-container py-20 md:py-28 text-center relative z-10">
          {/* Decorative Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 fade-in">
            <FaRocket className="text-[10px]" />
            <span>Empowering Modern Online Education</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Learn Anything, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Anytime, Anywhere</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            A polished MERN learning management engine built to help instructors organize rich multimedia material and assist students in running their track at their own pace.
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/courses')}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            >
              <span>Explore Courses</span> 
              <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={handleCtaAction}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            </button>
          </div>
        </div>
      </section>
 
      {/* ------------------- Introduction / Features Section ------------------- */}
      <section className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="card border border-slate-200/60 p-6 bg-white rounded-2xl shadow-sm interactive-hover text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 border border-indigo-100/50">
              <FaBookOpen className="text-lg" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Create Courses</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Instructors can systematically create detailed curriculums and break modules down into modern, clear digital lesson nodes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card border border-slate-200/60 p-6 bg-white rounded-2xl shadow-sm interactive-hover text-center">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4 border border-sky-100/50">
              <FaUsers className="text-lg" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Learn at Your Pace</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Students sign up seamlessly, enroll into classes, and track their progressive completion thresholds step by step.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card border border-slate-200/60 p-6 bg-white rounded-2xl shadow-sm interactive-hover text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-100/50">
              <FaChalkboardTeacher className="text-lg" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Manage Everything</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Platform admins enjoy clean dedicated workspaces to moderate catalogs, review user accounts, and track standard metrics.
            </p>
          </div>

        </div>
      </section>
 
      {/* ------------------- Featured Courses Section ------------------- */}
      <section className="page-container pb-20 flex-grow">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 text-indigo-700 p-1.5 rounded-lg text-sm">
              <FaBook />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Featured Courses</h2>
          </div>
          <button
            onClick={() => navigate('/courses')}
            className="text-indigo-600 hover:text-indigo-700 text-sm font-bold flex items-center gap-1.5 group transition-colors"
          >
            <span>View All Courses</span> 
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
 
        {loading ? (
          <Loader />
        ) : featuredCourses.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <p className="text-slate-500 font-medium">
              No courses available yet. Click &quot;View All Courses&quot; or check back shortly!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>
 
      <Footer />
    </div>
  );
};
 
export default Home;