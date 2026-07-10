import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaBookOpen, FaUserGraduate, FaCheckCircle } from 'react-icons/fa';

// Props:
// - course: { _id, title, description, instructor: { name }, lessons: [] }
// - onEnroll: optional function called when the Enroll button is clicked
// - isEnrolled: optional boolean to change button text/state
const CourseCard = ({ course, onEnroll, isEnrolled }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/courses/${course._id}`);
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    if (onEnroll) {
      onEnroll(course._id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="card border border-slate-200/60 p-5 bg-white rounded-2xl shadow-sm interactive-hover cursor-pointer flex flex-col group"
    >
      {/* Decorative Multimedia Banner Block */}
      <div className="h-36 w-full rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center mb-4 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl transition-all group-hover:scale-120"></div>
        
        <div className="bg-slate-800/80 border border-slate-700/50 p-3.5 rounded-xl text-indigo-400 shadow-sm transition-all group-hover:scale-105">
          <FaBookOpen className="text-xl" />
        </div>

        {/* Dynamic Context Tag Component */}
        <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-[10px] text-slate-300 font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-slate-700/40">
          {course.lessons?.length || 0} {course.lessons?.length === 1 ? 'Lesson' : 'Lessons'}
        </span>
      </div>

      {/* Course Core Metadata Layout */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-base font-extrabold text-slate-900 mb-1.5 line-clamp-1 tracking-tight group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed font-medium">
          {course.description}
        </p>

        {/* Profile/Instructor Identity Line */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-slate-500">
          <div className="flex items-center gap-1.5 text-xs font-semibold max-w-[150px] truncate">
            <FaChalkboardTeacher className="text-slate-400 text-sm" />
            <span className="truncate">{course.instructor?.name || 'Unknown Instructor'}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50/60 px-2 py-0.5 rounded-md border border-indigo-100/30">
            <FaUserGraduate />
            <span>Core</span>
          </div>
        </div>
      </div>

      {/* Action CTA Block Wrapper */}
      {onEnroll && (
        <div className="mt-4 pt-1">
          <button
            onClick={handleEnrollClick}
            disabled={isEnrolled}
            className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
              isEnrolled
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50 cursor-not-allowed font-extrabold'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow shadow-indigo-100'
            }`}
          >
            {isEnrolled ? (
              <>
                <FaCheckCircle />
                <span>Enrolled</span>
              </>
            ) : (
              <span>Enroll Now</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;