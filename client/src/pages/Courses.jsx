import { useEffect, useState } from 'react';
import { FaSearch, FaBookReader, FaExclamationCircle } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import CourseCard from '../components/CourseCard';
import api from '../services/api';
 
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
 
  // Fetch all courses once when the page loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchCourses();
  }, []);
 
  // Filter courses on the frontend based on the search input (case-insensitive)
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800">
      <Navbar />
 
      <div className="page-container py-12 flex-grow z-10 relative">
        
        {/* Page Heading Frame */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <FaBookReader className="text-sm" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Knowledge Base</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Courses
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Browse your available curriculums and kickstart your learning tracks today.
            </p>
          </div>

          {/* Search Input Bar Wrapper */}
          <div className="relative w-full md:max-w-md group">
            <FaSearch className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses by title..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:border-indigo-600 focus:ring-indigo-500/10 shadow-sm transition-all"
            />
          </div>
        </div>
 
        {/* Main Content Render Layout */}
        {loading ? (
          <Loader />
        ) : filteredCourses.length === 0 ? (
          /* Premium Empty State Module Illustration Placement Box */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white border border-slate-200 rounded-2xl shadow-sm fade-in">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200/40">
              <FaExclamationCircle className="text-xl" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {searchTerm ? 'No Matching Catalogs' : 'Catalog Is Empty'}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {searchTerm
                ? `We couldn't find anything matching "${searchTerm}". Try refining your keywords.`
                : 'No course material has been published to this section yet. Check back shortly!'}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700 underline"
              >
                Clear Search Query
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
 
      <Footer />
    </div>
  );
};
 
export default Courses;