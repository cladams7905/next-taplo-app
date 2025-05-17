export default function Loading() {
  return (
    <div className="flex w-full h-screen columns-2 gap-3 font-sans relative backdrop-blur-lg">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100"></div>
      <div className="flex flex-col w-full items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg bg-primary"></span>
      </div>
    </div>
  );
}
