import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaChalkboardTeacher, FaBookOpen, FaCheckCircle, FaChevronRight, FaLock, FaListOl } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
 
const CourseDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, isStudent } = useAuth();
 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
 
  useEffect(() => {
    const fetchCourseAndEnrollmentStatus = async () => {
      try {
        setLoading(true);
        const { data: courseData } = await api.get(`/courses/${id}`);
        setCourse(courseData);
 
        if (isAuthenticated && isStudent) {
          const { data: enrollments } = await api.get('/enrollments/my');
          const alreadyEnrolled = enrollments.some(
            (enrollment) => enrollment.course?._id === id
          );
          setIsEnrolled(alreadyEnrolled);
        }
      } catch (error) {
        console.error('Failed to fetch course details:', error);
        toast.error('Could not load course details');
      } finally {
        setLoading(false);
      }
    };
 
    fetchCourseAndEnrollmentStatus();
  }, [id, isAuthenticated, isStudent]);
 
  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post('/enrollments', { courseId: id });
      setIsEnrolled(true);
      toast.success('Successfully enrolled in this course!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to enroll in this course';
      toast.error(message);
    } finally {
      setEnrolling(false);
    }
  };
 
  // CRITICAL LOADING LIFE-CYCLE SAFETY GUARD CHECK
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
 
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-20">
          <div className="bg-white border p-8 rounded-2xl shadow-sm text-center max-w-sm mx-4">
            <p className="text-slate-500 font-medium">Requested curriculum course tokens were not found inside our servers.</p>
            <Link to="/courses" className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 px-4 py-2.5 rounded-xl shadow-sm">
              Return to Catalog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col">
      <Navbar />
 
      <div className="page-container py-12 flex-grow max-w-4xl w-full mx-auto px-4 z-10 relative">
        {/* Breadcrumb Navigation Header */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 select-none">
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">Catalog</Link>
          <FaChevronRight className="text-[9px]" />
          <span className="text-slate-600 truncate max-w-[200px]">{course.title}</span>
        </div>

        {/* Course Header Banner Component */}
        <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-100/40 mb-8 fade-in">
          <div className="h-44 md:h-52 w-full rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl text-indigo-400 shadow-md">
              <FaBookOpen className="text-3xl" />
            </div>
          </div>
 
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-2 leading-tight">
            {course.title}
          </h1>
 
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400 mb-6 border-b border-slate-100 pb-4">
            <FaChalkboardTeacher className="text-slate-400 text-sm" />
            <span>Instructor Assignment Track: <span className="text-slate-700">{course.instructor?.name || 'Academic Faculty'}</span></span>
          </div>
 
          <p className="text-slate-600 text-sm leading-relaxed font-medium mb-8 bg-slate-50 border border-slate-100 p-4 rounded-xl">
            {course.description}
          </p>
 
          {/* Action Row */}
          <div className="pt-2">
            {isAuthenticated && isStudent && (
              <button
                onClick={handleEnroll}
                disabled={isEnrolled || enrolling}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 ${
                  isEnrolled
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-extrabold cursor-not-allowed shadow-none'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100'
                }`}
              >
                {isEnrolled ? (
                  <>
                    <FaCheckCircle className="text-sm" /> 
                    <span>Active Enrollment Verified</span>
                  </>
                ) : enrolling ? (
                  <span>Syncing Registration...</span>
                ) : (
                  <span>Access Syllabus Tracks</span>
                )}
              </button>
            )}
   
            {!isAuthenticated && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-800">
                <FaLock className="text-sm text-amber-600 shrink-0" />
                <p className="text-xs font-medium">
                  Authentication protocol restricted. Please <Link to="/login" className="font-bold underline text-amber-900">Sign In</Link> with an active student token to unlock enrollment procedures.
                </p>
              </div>
            )}
          </div>
        </div>
 
        {/* Course Lesson Module Timeline Stack */}
        <div className="bg-white border border-slate-200/80 p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-100/40 fade-in">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <div className="bg-slate-100 text-slate-600 p-1.5 rounded-lg text-sm">
              <FaListOl className="text-xs" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Curriculum Structural Modules</h2>
          </div>
 
          {course.lessons && course.lessons.length > 0 ? (
            <ul className="space-y-3.5">
              {course.lessons.map((lesson, index) => (
                <li
                  key={lesson._id}
                  className="flex items-start gap-4 p-4 bg-slate-50/60 border border-slate-200/40 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <span className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
                    {index + 1}
                  </span>
                  
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors">{lesson.title}</p>
                    <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed line-clamp-2">{lesson.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 bg-slate-50/50 border border-dashed rounded-xl">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No Module Tracks Injected</p>
              <p className="text-slate-500 text-xs font-medium mt-1">This syllabus structure doesn&apos;t contain any lecture material nodes yet.</p>
            </div>
          )}
        </div>
      </div>
 
      <Footer />
    </div>
  );
};
 
export default CourseDetails;