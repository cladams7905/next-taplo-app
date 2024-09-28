"use client";

import CodeBlock from "@roo-app/react-code-block";
import { themes } from "prism-react-renderer";

export default function CodeCopyBlock({ codeBlock }: { codeBlock: string }) {
  return <CodeBlock code={codeBlock} theme={themes.vsDark} language="tsx" />;
}
