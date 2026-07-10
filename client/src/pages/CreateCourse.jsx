import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaArrowLeft, FaHeading, FaParagraph, FaListUl, FaFolderPlus } from 'react-icons/fa';
 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';
 
const CreateCourse = () => {
  const navigate = useNavigate();
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
 
  // Each lesson is { title, content }. We start with one empty lesson row.
  const [lessons, setLessons] = useState([{ title: '', content: '' }]);
  const [submitting, setSubmitting] = useState(false);
 
  // Add a new empty lesson row
  const addLesson = () => {
    setLessons([...lessons, { title: '', content: '' }]);
  };
 
  // Remove a lesson row by index (keep at least one row)
  const removeLesson = (index) => {
    if (lessons.length === 1) return;
    setLessons(lessons.filter((_, i) => i !== index));
  };
 
  // Update a specific field (title/content) of a specific lesson
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
      await api.post('/courses', {
        title,
        description,
        lessons: validLessons,
      });
 
      toast.success('Course created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create course';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };
 
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
            <FaFolderPlus className="text-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create a New Course</h1>
            <p className="text-slate-500 text-sm mt-1">
              Initialize a fresh instructional blueprint track inside the database ecosystem.
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
              placeholder="Provide a robust architectural digest detailing what specific frameworks and technologies your students are going to master throughout this path module track..."
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
                    placeholder="Incorporate lecture parameters or textual markdown resource assets references inside this block summary..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-4 focus:border-indigo-600 focus:ring-indigo-500/10 shadow-sm transition-all resize-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
 
          {/* Action Trigger Buttons Container footer line */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 disabled:opacity-60 hover:-translate-y-0.5"
            >
              {submitting ? 'Pushing Commit...' : 'Publish New Course'}
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
 
export default CreateCourse;