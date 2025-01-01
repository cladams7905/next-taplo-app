export default function Loading() {
  return (
    <div className="flex w-full h-screen columns-2 gap-3 font-sans relative bg-slate-50 backdrop-blur-lg">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex flex-col w-full items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg bg-base-content"></span>
      </div>
    </div>
  );
}
