import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";
export default function FeedbackBanner({
  featuresVoteToken,
}: {
  featuresVoteToken: string | null;
}) {
  return (
    <div className="w-full inline-block text-center items-center justify-center break-words py-2 font-sans h-fit bg-primary font-semibold text-white text-sm">
      → I want your feedback! Please{" "}
      <Link
        href={
          featuresVoteToken
            ? `https://taplo.features.vote/board?token=${featuresVoteToken}`
            : "#"
        }
        className="inline-flex link w-fit items-center text-center justify-center gap-1 flex-wrap break-words"
        target="_blank"
      >
        let me know what can be improved
        <ExternalLink width={16} height={16} />
      </Link>
    </div>
  );
}
