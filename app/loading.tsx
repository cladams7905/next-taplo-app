export default function Loading() {
  return (
    <div className="flex w-full h-screen columns-2 gap-3 font-sans relative bg-primary/35 dark:bg-base-100">
      <div className="flex flex-col w-full items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg bg-base-content"></span>
      </div>
    </div>
  );
}
