import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaArrowLeft, FaHeading, FaParagraph, FaListUl, FaEdit } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import api from '../services/api';
 
const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lessons, setLessons] = useState([{ title: '', content: '' }]);
 
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
 
  // Fetch the existing course details and populate the form
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setLessons(
          data.lessons && data.lessons.length > 0
            ? data.lessons.map((lesson) => ({ title: lesson.title, content: lesson.content }))
            : [{ title: '', content: '' }]
        );
      } catch (error) {
        console.error('Failed to fetch course:', error);
        toast.error('Could not load course details');
      } finally {
        setLoading(false);
      }
    };
 
    fetchCourse();
  }, [id]);
 
  const addLesson = () => {
    setLessons([...lessons, { title: '', content: '' }]);
  };
 
  const removeLesson = (index) => {
    if (lessons.length === 1) return;
    setLessons(lessons.filter((_, i) => i !== index));
  };
 
  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][field] = value;
    setLessons(updatedLessons);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in the course title and description');
      return;
    }
 
    const validLessons = lessons.filter(
      (lesson) => lesson.title.trim() && lesson.content.trim()
    );
 
    setSubmitting(true);
    try {
      await api.put(`/courses/${id}`, {
        title,
        description,
        lessons: validLessons,
      });
 
      toast.success('Course updated successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update course';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
 
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col">
      <Navbar />
 
      <div className="page-container py-12 flex-grow max-w-3xl z-10 relative">
        {/* Back Link Row */}
        <div className="mb-6 select-none">
          <Link 
            to="/admin/dashboard" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <FaArrowLeft />
            <span>Console Workspace</span>
          </Link>
        </div>

        {/* Page Title Header Row */}
        <div className="mb-10 pb-6 border-b border-slate-200/60 flex items-start gap-4">
          <div className="bg-indigo-600 text-white p-3.5 rounded-2xl shadow-md shadow-indigo-100 shrink-0">
            <FaEdit className="text-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Course Manifest</h1>
            <p className="text-slate-500 text-sm mt-1">
              Modify syllabus tracks and lesson details inside the ecosystem registry.
            </p>
          </div>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-6 fade-in">
          
          {/* Course Title Field Container */}
          <div className="card bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xl shadow-slate-100/40">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              <FaHeading className="text-slate-400 text-[10px]" />
              <span>Course Identifier Title</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Full-Stack Web Development Mastery"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 focus:border-indigo-600 focus:ring-indigo-500/10 shadow-sm transition-all"
            />
          </div>
 
          {/* Course Description Field Container */}
          <div className="card bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xl shadow-slate-100/40">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              <FaParagraph className="text-slate-400 text-[10px]" />
              <span>Syllabus Structural Summary Description</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide an overview details of the technologies and modules covered..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 focus:border-indigo-600 focus:ring-indigo-500/10 shadow-sm transition-all resize-none leading-relaxed"
            />
          </div>
 
          {/* Dynamic Nested Lessons Layout Wrapper */}
          <div className="card bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xl shadow-slate-100/40">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <label className="flex items-center gap-2 text-sm font-extrabold text-slate-900 tracking-tight">
                <FaListUl className="text-slate-400 text-xs" />
                <span>Lecture Content Nodes</span>
              </label>
              <button
                type="button"
                onClick={addLesson}
                className="bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 text-indigo-600 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <FaPlus className="text-[10px]" /> Add Lesson Node
              </button>
            </div>
 
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <div
                  key={index}
                  className="border border-slate-200/70 rounded-xl p-5 relative bg-slate-50/50 flex flex-col gap-3 group/item transition-all hover:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-white border text-slate-500 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm/5">
                      Lecture Index Module {index + 1}
                    </span>
                    {lessons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLesson(index)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-slate-200/60 transition-colors shadow-sm/0 hover:shadow-sm/5"
                        title="Purge nested module block"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    )}
                  </div>
 
                  <input
                    type="text"
                    value={lesson.title}
                    onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                    placeholder="Provide a distinct lecture title string..."
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:border-indigo-600 focus:ring-indigo-500/10 shadow-sm transition-all"
                  />
 
                  <textarea
                    value={lesson.content}
                    onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
                    placeholder="Incorporate lecture parameters or textual references inside this block summary..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:border-indigo-600 focus:ring-indigo-500/10 shadow-sm transition-all resize-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
 
          {/* Action Trigger Buttons Container */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 disabled:opacity-60 hover:-translate-y-0.5"
            >
              {submitting ? 'Committing Changes...' : 'Save Manifest Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
 
      <Footer />
    </div>
  );
};
 
export default EditCourse;