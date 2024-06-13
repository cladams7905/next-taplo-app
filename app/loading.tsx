export default function Loading() {
  return (
    <div className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="skeleton bg-slate-100 w-1/5"></div>
      <div className="flex flex-col w-4/5 gap-4">
        <div className="skeleton bg-slate-100 w-full h-1/4"></div>
        <div className="skeleton bg-slate-100 w-full h-3/4"></div>
      </div>
    </div>
  );
}
