export default function Loading() {
  return (
    <div className="flex relative items-center justify-center w-full h-full bg-slate-50 backdrop-blur-lg">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100"></div>
      <span className="loading loading-spinner loading-lg bg-primary"></span>
    </div>
  );
}
