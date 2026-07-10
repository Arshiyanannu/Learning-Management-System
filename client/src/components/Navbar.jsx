// import { useState } from 'react';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes, FaGraduationCap, FaUserCircle, FaSignOutAlt, FaBookOpen } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { user, isAuthenticated, isAdmin, logout } = useAuth();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     setMenuOpen(false);
//     navigate('/login');
//   };

//   const closeMenu = () => setMenuOpen(false);

//   // High-contrast, interactive navigation styling
//   const linkClass = ({ isActive }) =>
//     `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
//       isActive
//         ? 'text-indigo-600 bg-indigo-50 shadow-sm border border-indigo-100/50'
//         : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80'
//     }`;

//   return (
//     <nav className="bg-slate-50/90 border-b border-slate-200/80 sticky top-0 z-50 backdrop-blur-md">
//       <div className="page-container !py-0">
//         <div className="flex items-center justify-between h-16">
          
//           {/* Logo / Brand */}
//           <Link to="/" className="flex items-center gap-2.5 text-indigo-600 font-extrabold text-xl tracking-tight">
//             <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-100">
//               <FaGraduationCap className="text-xl" />
//             </div>
//             <span>EduLMS</span>
//           </Link>

//           {/* Desktop Links */}
//           <div className="hidden md:flex items-center gap-1.5">
//             <NavLink to="/" end className={linkClass}>
//               Home
//             </NavLink>
            
//             <NavLink to="/courses" className={linkClass}>
//               Browse Courses
//             </NavLink>

//             {/* A premium platform link extension to make the project look rich and expansive */}
//             <span className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-400 select-none cursor-not-allowed opacity-70">
//               <FaBookOpen className="text-xs" />
//               <span>Learning Tracks</span>
//             </span>

//             {/* Guest Actions (Not Logged In) */}
//             {!isAuthenticated && (
//               <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-300">
//                 <NavLink to="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
//                   Sign In
//                 </NavLink>
//                 <NavLink to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100 transition-all duration-200 hover:-translate-y-0.5">
//                   Get Started
//                 </NavLink>
//               </div>
//             )}

//             {/* Authenticated Actions (Logged In) */}
//             {isAuthenticated && (
//               <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-300">
//                 <NavLink to={isAdmin ? "/admin/dashboard" : "/dashboard"} className={linkClass}>
//                   Workspace
//                 </NavLink>
//                 <NavLink to="/profile" className={linkClass}>
//                   Profile
//                 </NavLink>
                
//                 {/* User Identity Pill */}
//                 <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 shadow-sm">
//                   <FaUserCircle className="text-slate-400 text-base" />
//                   <span className="max-w-[100px] truncate font-semibold">{user?.name || 'User'}</span>
//                   <span className="bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">{user?.role}</span>
//                 </div>

//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 transition-all duration-200"
//                 >
//                   <FaSignOutAlt className="text-xs" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-slate-700 text-xl p-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle navigation menu"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         {menuOpen && (
//           <div className="md:hidden flex flex-col gap-1.5 pb-4 pt-2 border-t border-slate-200 fade-in">
//             <NavLink to="/" end className={linkClass} onClick={closeMenu}>
//               Home
//             </NavLink>
//             <NavLink to="/courses" className={linkClass} onClick={closeMenu}>
//               Browse Courses
//             </NavLink>
            
//             <span className="px-4 py-2 text-sm font-semibold text-slate-400/70 select-none">
//               Learning Tracks (Coming Soon)
//             </span>

//             {!isAuthenticated && (
//               <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200">
//                 <Link to="/login" className="px-3 py-2 text-center text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl" onClick={closeMenu}>
//                   Sign In
//                 </Link>
//                 <Link to="/register" className="px-3 py-2 text-center text-sm font-semibold text-white bg-indigo-600 rounded-xl" onClick={closeMenu}>
//                   Get Started
//                 </Link>
//               </div>
//             )}

//             {isAuthenticated && (
//               <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-200">
//                 <NavLink to={isAdmin ? "/admin/dashboard" : "/dashboard"} className={linkClass} onClick={closeMenu}>
//                   Workspace
//                 </NavLink>
//                 <NavLink to="/profile" className={linkClass} onClick={closeMenu}>
//                   Profile
//                 </NavLink>

//                 <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-500 font-medium my-1">
//                   Signed in as <span className="font-semibold text-slate-700">{user?.name}</span> ({user?.role})
//                 </div>

//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center justify-center gap-2 w-full px-4 py-2.5 mt-1 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors"
//                 >
//                   <FaSignOutAlt />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGraduationCap, FaSignOutAlt, FaThLarge, FaSignInAlt, FaUserPlus, FaHome, FaBook } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogoutAction = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200/80 sticky top-0 z-50 shadow-sm shadow-slate-100/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-indigo-600 text-white p-2 rounded-xl transition-transform group-hover:scale-105 shadow-sm">
                <FaGraduationCap className="text-lg" />
              </div>
              <span className="text-slate-900 font-black text-lg tracking-tight">EduLMS</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              to="/" 
              className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors px-2.5 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-1"
            >
              <FaHome className="text-[10px]" />
              <span>Home</span>
            </Link>

            <Link 
              to="/courses" 
              className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors px-2.5 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-1"
            >
              <FaBook className="text-[10px]" />
              <span>Courses</span>
            </Link>

            {/* Conditional Authentication View */}
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 border border-indigo-100"
                >
                  <FaThLarge className="text-[10px]" />
                  <span>Workspace</span>
                </Link>
                
                <button
                  onClick={handleLogoutAction}
                  className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
                  title="Terminate Session"
                >
                  <FaSignOutAlt className="text-sm" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 px-2.5 py-2 transition-colors flex items-center gap-1.5"
                >
                  <FaSignInAlt className="text-[10px]" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-indigo-100 flex items-center gap-1.5 hover:-translate-y-0.5"
                >
                  <FaUserPlus className="text-[10px]" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;