const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full gap-3 fade-in">
      <div className="relative flex items-center justify-center">
        {/* Outer ambient glow ring */}
        <div className="absolute h-14 w-14 rounded-full border-4 border-indigo-500/10 animate-pulse" />
        
        {/* Core high-contrast kinetic spinning ring */}
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin shadow-sm" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">
        Loading 
      </span>
    </div>
  );
};

export default Loader;