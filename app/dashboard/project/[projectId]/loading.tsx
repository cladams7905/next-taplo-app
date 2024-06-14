export default function Loading() {
  return (
    <div className="flex w-full h-full columns-2 font-sans relative">
      <div className="flex items-center justify-center bg-base-100 rounded-md rounded-r-none border border-r-transparent border-gray-200 dark:border-gray-600 dark:bg-neutral w-1/5 full">
        <span className="loading loading-spinner loading-lg bg-primary"></span>
      </div>
      <div className="flex flex-col w-4/5">
        <div className="flex items-center justify-center bg-base-100 rounded-md rounded-l-none border border-gray-200 dark:border-gray-600 dark:bg-neutral w-full h-full">
          <span className="loading loading-spinner loading-lg bg-primary"></span>
        </div>
      </div>
    </div>
  );
}
