// import { useEffect, useState } from 'react';
// import { useNavigate, NavLink } from 'react-router-dom';
// import { FaBookOpen, FaCheckCircle, FaChartLine, FaGraduationCap, FaUserCircle, FaSignOutAlt, FaThLarge, FaCompass, FaRegFolderOpen } from 'react-icons/fa';
 
// import Loader from '../components/Loader';
// import DashboardCard from '../components/DashboardCard';
// import CourseCard from '../components/CourseCard';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';
 
// const StudentDashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
 
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(true);
 
//   // Fetch all courses the logged-in student is enrolled in
//   useEffect(() => {
//     const fetchMyEnrollments = async () => {
//       try {
//         const { data } = await api.get('/enrollments/my');
//         setEnrollments(data);
//       } catch (error) {
//         console.error('Failed to fetch enrollments:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchMyEnrollments();
//   }, []);
 
//   // Helper: calculate progress percentage for a single enrollment
//   const getProgressPercent = (enrollment) => {
//     const totalLessons = enrollment.course?.lessons?.length || 0;
//     const completed = enrollment.completedLessons?.length || 0;
 
//     if (totalLessons === 0) return 0;
//     return Math.round((completed / totalLessons) * 100);
//   };
 
//   // Stats used for the DashboardCard widgets at the top
//   const totalEnrolled = enrollments.length;
//   const totalCompletedCourses = enrollments.filter(
//     (enrollment) => getProgressPercent(enrollment) === 100
//   ).length;
//   const totalLessonsCompleted = enrollments.reduce(
//     (sum, enrollment) => sum + (enrollment.completedLessons?.length || 0),
//     0
//   );

//   const handleSidebarLogout = () => {
//     logout();
//     navigate('/login');
//   };
 
//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
//       {/* ------------------- STUDENT SIDEBAR WORKSPACE NAVIGATION ------------------- */}
//       <aside className="w-full md:w-64 bg-slate-950 text-slate-400 flex flex-col border-r border-slate-800 shrink-0 z-30">
//         {/* Brand Header */}
//         <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-900 bg-slate-950">
//           <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md">
//             <FaGraduationCap className="text-lg" />
//           </div>
//           <span className="text-white font-extrabold text-lg tracking-tight">EduLMS</span>
//           <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest ml-auto">
//             Student
//           </span>
//         </div>

//         {/* Identity Context Bar */}
//         <div className="p-4 mx-3 my-4 bg-slate-900/60 rounded-xl border border-slate-900 flex items-center gap-3">
//           <FaUserCircle className="text-indigo-400 text-2xl shrink-0" />
//           <div className="min-w-0 flex-1">
//             <p className="text-xs text-white font-bold truncate tracking-wide">{user?.name || 'Learner Deck'}</p>
//             <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Active Student</p>
//           </div>
//         </div>

//         {/* Menu Actions Array */}
//         <div className="flex-grow px-3 space-y-1">
//           <NavLink 
//             to="/dashboard" 
//             className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' : 'hover:bg-slate-900 hover:text-slate-200'}`}
//           >
//             <FaThLarge className="text-base" />
//             <span>My Learning Deck</span>
//           </NavLink>
          
//           <NavLink 
//             to="/courses" 
//             className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-all"
//           >
//             <FaCompass className="text-base" />
//             <span>Browse Catalog</span>
//           </NavLink>

//           <NavLink 
//             to="/profile" 
//             className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-all"
//           >
//             <FaUserCircle className="text-base" />
//             <span>Profile Identity</span>
//           </NavLink>
//         </div>

//         {/* Bottom Escape Anchor */}
//         <div className="p-3 border-t border-slate-900 mt-auto bg-slate-950">
//           <button
//             onClick={handleSidebarLogout}
//             className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 transition-all duration-200"
//           >
//             <FaSignOutAlt className="text-xs" />
//             <span>Terminate Session</span>
//           </button>
//         </div>
//       </aside>
 
//       {/* ------------------- MAIN CONTENT RUNTIME CANVAS ------------------- */}
//       <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
//         <div className="p-6 md:p-10 max-w-6xl w-full mx-auto flex-grow">
          
//           {/* Header Dashboard Welcome Area */}
//           <div className="mb-8 border-b border-slate-200/60 pb-6">
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight">
//               Welcome back, {user?.name}!
//             </h1>
//             <p className="text-slate-500 text-sm mt-1 font-medium">
//               Your learning dashboard is sync&apos;d. Monitor your milestones and jump right back into your modules.
//             </p>
//           </div>
 
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="space-y-10 fade-in">
//               {/* Dashboard Stat Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                 <DashboardCard
//                   icon={<FaBookOpen />}
//                   title="Enrolled Modules"
//                   count={totalEnrolled}
//                   color="primary"
//                 />
//                 <DashboardCard
//                   icon={<FaCheckCircle />}
//                   title="Completed Tracks"
//                   count={totalCompletedCourses}
//                   color="green"
//                 />
//                 <DashboardCard
//                   icon={<FaChartLine />}
//                   title="Lessons Cleared"
//                   count={totalLessonsCompleted}
//                   color="secondary"
//                 />
//               </div>
 
//               {/* Enrolled Track Grid Area */}
//               <div className="space-y-5">
//                 <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">My Active Curriculums</h2>
 
//                 {enrollments.length === 0 ? (
//                   <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-xl shadow-sm">
//                     <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FaRegFolderOpen className="text-lg" />
//                     </div>
//                     <h3 className="text-sm font-bold text-slate-900 mb-1">No Active Enrollments</h3>
//                     <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
//                       You haven&apos;t enrolled in any courses yet. Head over to our catalog to select your tracking framework!
//                     </p>
//                     <button
//                       onClick={() => navigate('/courses')}
//                       className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors shadow-sm"
//                     >
//                       Browse Courses
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {enrollments.map((enrollment) => {
//                       const progress = getProgressPercent(enrollment);
 
//                       return (
//                         <div key={enrollment._id} className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-200">
//                           {/* Inner Course Data Context */}
//                           <CourseCard course={enrollment.course} />
     
//                           {/* Integrated Linear Track Status Bar Progress Engine */}
//                           <div className="mt-4 pt-3 border-t border-slate-100">
//                             <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
//                               <span>Module Track Tracker</span>
//                               <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{progress}%</span>
//                             </div>
//                             <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/40">
//                               <div
//                                 className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-400"
//                                 style={{ width: `${progress}%` }}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };
 
// export default StudentDashboard;


import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBookOpen, FaCheckCircle, FaChartLine, FaRegFolderOpen } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import DashboardCard from '../components/DashboardCard';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
 
const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
 
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchMyEnrollments = async () => {
      try {
        const { data } = await api.get('/enrollments/my');
        setEnrollments(data);
      } catch (error) {
        console.error('Failed to fetch enrollments:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchMyEnrollments();
  }, []);
 
  const getProgressPercent = (enrollment) => {
    const totalLessons = enrollment.course?.lessons?.length || 0;
    const completed = enrollment.completedLessons?.length || 0;
 
    if (totalLessons === 0) return 0;
    return Math.round((completed / totalLessons) * 100);
  };
 
  const totalEnrolled = enrollments.length;
  const totalCompletedCourses = enrollments.filter(
    (enrollment) => getProgressPercent(enrollment) === 100
  ).length;
  const totalLessonsCompleted = enrollments.reduce(
    (sum, enrollment) => sum + (enrollment.completedLessons?.length || 0),
    0
  );
 
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-800">
      <Navbar />
 
      <main className="flex-grow">
        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto">
          
          {/* Header Area Layout */}
          <div className="mb-8 border-b border-slate-200/60 pb-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              Here is an overview of your real-time learning track matrices and active curriculum tasks.
            </p>
          </div>
 
          {loading ? (
            <Loader />
          ) : (
            <div className="space-y-10 fade-in">
              {/* Core Analytics Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <DashboardCard
                  icon={<FaBookOpen />}
                  title="Enrolled Modules"
                  count={totalEnrolled}
                  color="primary"
                />
                <DashboardCard
                  icon={<FaCheckCircle />}
                  title="Completed Tracks"
                  count={totalCompletedCourses}
                  color="green"
                />
                <DashboardCard
                  icon={<FaChartLine />}
                  title="Lessons Cleared"
                  count={totalLessonsCompleted}
                  color="secondary"
                />
              </div>
 
              {/* Enrolled Tracks Presentation Canvas */}
              <div className="space-y-5">
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">My Active Curriculums</h2>
 
                {enrollments.length === 0 ? (
                  <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-xl shadow-sm">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaRegFolderOpen className="text-lg" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">No Active Enrollments</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-4">
                      You haven&apos;t enrolled in any learning frameworks yet. Explore our open masterclass directories to start tracking tasks!
                    </p>
                    <Link
                      to="/courses"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-colors shadow-sm inline-block"
                    >
                      Browse Courses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map((enrollment) => {
                      const progress = getProgressPercent(enrollment);
 
                      return (
                        <div key={enrollment._id} className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-200">
                          <CourseCard course={enrollment.course} />
     
                          {/* Linear Status Track Progress Engine */}
                          <div className="mt-4 pt-3 border-t border-slate-100">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                              <span>Module Track Tracker</span>
                              <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/40">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm shadow-indigo-400"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
 
export default StudentDashboard;