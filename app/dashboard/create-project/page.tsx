import NewProjectForm from "./NewProjectForm";

export default async function CreateProject() {
  return (
    <div className="flex items-start border-t border-neutral justify-center w-full h-screen-minus-navbar font-sans">
      <div className="border mt-24 border-neutral z-[1] p-2 shadow bg-base-100 rounded-md w-full max-w-lg">
        <div className="flex flex-col items-center justify-center w-full p-6">
          <p className="font-semibold text-2xl mb-4">Create New Project</p>
          <NewProjectForm />
        </div>
      </div>
    </div>
  );
}
