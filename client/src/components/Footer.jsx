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