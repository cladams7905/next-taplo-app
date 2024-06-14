export default function Loading() {
  return (
    <div className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="flex items-center justify-center bg-base-100 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-neutral w-1/5 h-1/2">
        <span className="loading loading-spinner loading-md bg-primary"></span>
      </div>
      <div className="flex flex-col w-4/5 gap-4">
        <div className="flex items-center justify-center bg-base-100 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-neutral w-full h-1/4">
          <span className="loading loading-spinner loading-md bg-primary"></span>
        </div>
        <div className="flex items-center justify-center bg-base-100 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-neutral w-full h-3/4">
          <span className="loading loading-spinner loading-md bg-primary"></span>
        </div>
      </div>
    </div>
  );
}
