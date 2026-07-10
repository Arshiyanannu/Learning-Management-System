// import { Link } from 'react-router-dom';
// import { FaGraduationCap, FaGithub, FaLinkedin } from 'react-icons/fa';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-slate-50 border-t border-slate-200/80 mt-auto">
//       <div className="page-container !py-5">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          
//           {/* Brand Logo & Info */}
//           <div className="flex items-center gap-2 text-indigo-600 font-bold">
//             <div className="bg-indigo-600 text-white p-1 rounded-lg">
//               <FaGraduationCap className="text-sm" />
//             </div>
//             <span>EduLMS</span>
//             <span className="text-slate-300 font-normal">|</span>
//             <p className="text-xs text-slate-400 font-normal">&copy; {currentYear} All rights reserved.</p>
//           </div>

//           {/* Quick Core Links */}
//           <div className="flex items-center gap-5 text-xs text-slate-600">
//             <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
//             <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
//             <Link to="/login" className="hover:text-indigo-600 transition-colors">Login</Link>
//             <Link to="/register" className="hover:text-indigo-600 transition-colors">Register</Link>
//           </div>

//           {/* Minimal Developer Profiles */}
//           <div className="flex items-center gap-3 text-slate-400 text-base">
//             <a href="#" className="hover:text-slate-700 transition-colors" aria-label="GitHub"><FaGithub /></a>
//             <a href="#" className="hover:text-indigo-600 transition-colors" aria-label="LinkedIn"><FaLinkedin /></a>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGraduationCap } from 'react-icons/fa';

const Footer = () => {
  const { isAuthenticated, user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg text-xs">
              <FaGraduationCap />
            </div>
            <span className="text-slate-900 font-extrabold text-sm tracking-tight">EduLMS Portal</span>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>

            {/* Dynamic Authenticated Section */}
            {isAuthenticated ? (
              <Link 
                to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} 
                className="text-indigo-600 font-bold hover:underline"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hover:text-indigo-600 transition-colors">Login</Link>
                <Link to="/register" className="hover:text-indigo-600 transition-colors">Register</Link>
              </>
            )}
          </div>

          {/* Copyright Stamp */}
          <div className="text-slate-400 text-[11px] font-medium tracking-wide">
            &copy; {currentYear} EduLMS. Built for Academic Portfolio Evaluation.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;