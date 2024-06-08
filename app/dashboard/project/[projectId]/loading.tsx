export default function Loading() {
  return (
    <div className="flex w-full h-full columns-2 gap-3 font-sans relative">
      <div className="skeleton bg-gray-200 w-1/5"></div>
      <div className="skeleton bg-gray-200 w-4/5"></div>
    </div>
  );
}
