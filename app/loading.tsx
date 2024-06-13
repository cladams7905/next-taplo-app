export default function Loading() {
  return (
    <div className="flex w-full h-screen columns-2 gap-3 font-sans relative bg-slate-50">
      <div className="flex flex-col w-full items-center justify-center gap-3">
        {" "}
        <div className="text-4xl font-semibold">Loading...</div>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
}
