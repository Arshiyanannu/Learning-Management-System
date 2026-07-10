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