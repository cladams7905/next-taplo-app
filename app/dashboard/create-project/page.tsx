import NewProjectForm from "./_components/NewProjectForm";

export default async function CreateProject() {
  return (
    <div className="flex items-start justify-center w-full h-screen-minus-navbar bg-gradient-to-tr from-primary/50 to-violet-100 font-sans">
      <div className="border mt-36 border-gray-300 z-[1] p-2 shadow-lg bg-base-100 rounded-md w-full max-w-lg">
        <div className="flex flex-col items-center justify-center w-full pt-6">
          <p className="font-semibold text-2xl mb-4">Create New Project</p>
          <NewProjectForm />
        </div>
      </div>
    </div>
  );
}
