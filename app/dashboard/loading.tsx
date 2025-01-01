export default function Loading() {
  return (
    <div className="flex relative items-center justify-center w-full h-full bg-slate-50 backdrop-blur-lg">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <span className="loading loading-spinner loading-lg bg-base-content"></span>
    </div>
  );
}
