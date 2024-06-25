import BackButton from "@/components/shared/backbutton";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-tr from-primary/50 to-violet-100 items-center justify-center gap-10 font-sans">
      <div className="text-8xl font-bold">404</div>
      <div className="flex flex-col w-full items-center justify-center gap-3">
        {" "}
        <h2 className="text-2xl">
          We ran into a snag. This page does not seem to exist.
        </h2>
      </div>
      <BackButton className="btn btn-primary" />
    </div>
  );
}
