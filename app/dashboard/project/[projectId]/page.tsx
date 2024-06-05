export default function DashboardHome() {
  return (
    <main className="flex flex-grow w-full columns-2 gap-3">
      <div className="w-1/5">
        <div className="w-full h-1/4 bg-base-100 border border-gray-200 rounded-md mb-3"></div>
        <div className="w-full h-3/4 bg-base-100 border border-gray-200 rounded-md"></div>
      </div>
      <div className="w-4/5 bg-base-100 border border-gray-200 rounded-md"></div>
    </main>
  );
}
