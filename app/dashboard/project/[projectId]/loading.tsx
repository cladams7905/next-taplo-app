export default function Loading() {
  return (
    <div className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="flex items-center justify-center bg-base-100 w-1/5">
        <span className="loading loading-spinner loading-md"></span>
      </div>
      <div className="flex flex-col w-4/5 gap-4">
        <div className="flex items-center justify-center bg-base-100 w-full h-1/4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
        <div className="flex items-center justify-center bg-base-100 w-full h-3/4">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </div>
    </div>
  );
}
