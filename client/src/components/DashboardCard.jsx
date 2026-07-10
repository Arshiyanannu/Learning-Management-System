// Props:
// - icon: React icon component element
// - title: Card label string (e.g., "Total Students")
// - count: Metric representation value/number
// - color: Key selector string to dynamically theme the icon wrapper panel
const DashboardCard = ({ icon, title, count, color = 'primary' }) => {
  // Map of explicit background/text color combinations for clean platform styling
  const colorMap = {
    primary: 'bg-indigo-50 text-indigo-600 border-indigo-100/50',
    secondary: 'bg-sky-50 text-sky-600 border-sky-100/50',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100/50',
    orange: 'bg-amber-50 text-amber-600 border-amber-100/50',
  };

  const colorClasses = colorMap[color] || colorMap.primary;

  return (
    <div className="card bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex items-center gap-4.5 fade-in">
      {/* Structural Rounded Icon Base Panel */}
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-lg border ${colorClasses} shrink-0 shadow-sm/5`}>
        {icon}
      </div>

      {/* Structured Metric Metadata Display */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 truncate mb-0.5">
          {title}
        </p>
        <p className="text-2xl font-black text-slate-900 tracking-tight leading-none">
          {count}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;