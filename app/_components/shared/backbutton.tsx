"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton({
  className,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button className={className} onClick={() => router.back()}>
      Go back
      <Undo2 />
    </button>
  );
}

export default BackButton;
