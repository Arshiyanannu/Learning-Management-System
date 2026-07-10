import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
 
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // default role
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const validate = () => {
    const newErrors = {};
 
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
 
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
 
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validate()) return;
 
    setSubmitting(true);
 
    const success = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );
 
    setSubmitting(false);
 
    if (success) {
      if (formData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };
 
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative overflow-hidden">
      {/* Background Decorative Mesh Shapes */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />
 
      <div className="flex-grow flex items-center justify-center py-16 px-4 z-10">
        <div className="card w-full max-w-md bg-white border border-slate-200/80 p-8 rounded-2xl shadow-xl shadow-slate-100 fade-in">
          
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl border border-indigo-100/50 mb-3">
              <FaUserPlus className="text-xl" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Your Account</h1>
            <p className="text-sm text-slate-500 mt-1">
              Join our interactive platform today
            </p>
          </div>
 
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full Name</label>
              <div className="relative group">
                <FaUser className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                    errors.name 
                      ? 'border-red-300 focus:ring-red-100 bg-red-50/10' 
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/10'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.name}</p>}
            </div>
 
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                    errors.email 
                      ? 'border-red-300 focus:ring-red-100 bg-red-50/10' 
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/10'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.email}</p>}
            </div>
 
            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition-all ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-100 bg-red-50/10' 
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-500/10'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.password}</p>
              )}
            </div>
 
            {/* Role Badge Selection Blocks */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                I want to join as a
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Student Selector */}
                <div 
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`flex flex-col items-center gap-2 p-3 border rounded-xl cursor-pointer select-none transition-all duration-200 ${
                    formData.role === 'student'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/10 text-indigo-600'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-500'
                  }`}
                >
                  <FaGraduationCap className="text-lg" />
                  <span className="text-xs font-bold tracking-wide">Student</span>
                </div>

                {/* Admin/Instructor Selector */}
                <div 
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`flex flex-col items-center gap-2 p-3 border rounded-xl cursor-pointer select-none transition-all duration-200 ${
                    formData.role === 'admin'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/10 text-indigo-600'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70 text-slate-500'
                  }`}
                >
                  <FaChalkboardTeacher className="text-lg" />
                  <span className="text-xs font-bold tracking-wide">Instructor</span>
                </div>
              </div>
            </div>
 
            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <span>Creating account...</span>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </form>
 
          <div className="border-t border-slate-100 mt-6 pt-6 text-center">
            <p className="text-sm font-medium text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
 
      <Footer />
    </div>
  );
};
 
export default Register;