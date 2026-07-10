import { useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 
const NotFound = () => {
  const navigate = useNavigate();
 
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col relative overflow-hidden">
      {/* Background Decorative Mesh Layout Elements */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />
 
      <div className="flex-grow flex items-center justify-center px-4 z-10">
        <div className="max-w-md w-full bg-white border border-slate-200/80 p-8 rounded-2xl shadow-xl shadow-slate-100/40 text-center fade-in">
          
          {/* Main Context Error Icon Panel */}
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-100">
            <FaExclamationTriangle className="text-xl" />
          </div>

          {/* Large Stylized 404 Indicator Token */}
          <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 mb-2">
            404
          </h1>
          
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mb-2">
            Route Matrix Not Found
          </h2>
          
          <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 max-w-xs mx-auto">
            The operational sub-page or resource token path you are attempting to look for does not exist on this portal context.
          </p>

          {/* Core Action Escape Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 group"
          >
            <FaHome className="text-xs transition-transform group-hover:scale-110" /> 
            <span>Return to Safe Ground</span>
          </button>

        </div>
      </div>
 
      <Footer />
    </div>
  );
};
 
export default NotFound;