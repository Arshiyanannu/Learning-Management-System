import { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaIdBadge, FaGraduationCap, FaSignOutAlt, FaThLarge, FaCompass, FaUserShield, FaShieldAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
 
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
 
const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
 
  // Fetch fresh profile data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Could not load your profile');
      } finally {
        setLoading(false);
      }
    };
 
    fetchProfile();
  }, []);

  const handleSidebarLogout = () => {
    logout();
    navigate('/login');
  };

  // ------------------- SIDEBAR RENDERING SYSTEM BASED ON INDIVIDUAL AUTH ROLE -------------------
  const renderRoleSidebar = () => {
    const isSystemAdmin = profile?.role === 'admin';

    return (
      <aside className="w-full md:w-64 bg-slate-950 text-slate-400 flex flex-col border-r border-slate-800 shrink-0 z-30">
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-900 bg-slate-950">
          <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-md">
            <FaGraduationCap className="text-lg" />
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">EduLMS</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ml-auto ${
            isSystemAdmin 
              ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' 
              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
          }`}>
            {profile?.role}
          </span>
        </div>

        <div className="p-4 mx-3 my-4 bg-slate-900/60 rounded-xl border border-slate-900 flex items-center gap-3">
          {isSystemAdmin ? (
            <FaUserShield className="text-indigo-400 text-2xl shrink-0" />
          ) : (
            <FaUserCircle className="text-indigo-400 text-2xl shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs text-white font-bold truncate tracking-wide">{profile?.name || 'Workspace'}</p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
              {isSystemAdmin ? 'Systems Officer' : 'Active Student'}
            </p>
          </div>
        </div>

        <div className="flex-grow px-3 space-y-1">
          <NavLink 
            to={isSystemAdmin ? "/admin/dashboard" : "/dashboard"} 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-all"
          >
            <FaThLarge className="text-base" />
            <span>{isSystemAdmin ? 'Admin Overview' : 'My Learning Deck'}</span>
          </NavLink>
          
          {!isSystemAdmin && (
            <NavLink 
              to="/courses" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-all"
            >
              <FaCompass className="text-base" />
              <span>Browse Catalog</span>
            </NavLink>
          )}

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' : 'hover:bg-slate-900 hover:text-slate-200'}`}
          >
            <FaUserCircle className="text-base" />
            <span>Profile Settings</span>
          </NavLink>
        </div>

        <div className="p-3 border-t border-slate-900 mt-auto bg-slate-950">
          <button
            onClick={handleSidebarLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 transition-all duration-200"
          >
            <FaSignOutAlt className="text-xs" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>
    );
  };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800">
      
      {/* Dynamic Structural Sidebar Injector */}
      {profile && renderRoleSidebar()}
 
      {/* ------------------- CORE CONTENT CANVAS WORKSPACE ------------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="p-6 md:p-10 max-w-xl w-full mx-auto flex-grow flex flex-col justify-center">
          
          {profile ? (
            <div className="card bg-white border border-slate-200/80 p-8 rounded-2xl shadow-xl shadow-slate-100/40 fade-in w-full">
              
              {/* Top Identity Presenter Module */}
              <div className="flex flex-col items-center mb-8 pb-6 border-b border-slate-100 text-center">
                <div className="relative mb-3">
                  <FaUserCircle className="text-slate-200 text-7xl" />
                  <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm text-[10px]">
                    <FaShieldAlt />
                  </div>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h2>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border mt-2 ${
                  profile.role === 'admin'
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                }`}>
                  Account Access: {profile.role}
                </span>
              </div>
 
              {/* Form Metadata Fields Area Layout */}
              <div className="space-y-4">
                
                {/* Full Name Node */}
                <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-400 shadow-sm/5">
                    <FaUserCircle className="text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name Label</p>
                    <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{profile.name}</p>
                  </div>
                </div>
 
                {/* Email Node */}
                <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-400 shadow-sm/5">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Communication</p>
                    <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{profile.email}</p>
                  </div>
                </div>
 
                {/* Role Node */}
                <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-400 shadow-sm/5">
                    <FaIdBadge className="text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System Privilege Clearance</p>
                    <p className="text-sm font-bold text-slate-800 capitalize mt-0.5">{profile.role}</p>
                  </div>
                </div>

              </div>
 
              {/* Read Only Warning Accent Bar */}
              <div className="mt-8 p-3 bg-amber-50 rounded-xl border border-amber-100 text-center">
                <p className="text-[11px] font-medium text-amber-700">
                  Account parameter configuration fields are currently restricted (Read-Only).
                </p>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-slate-500 font-medium">Unable to load active profile information token tokens.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
 
export default Profile;