import dynamic from "next/dynamic";

const PreviewScrollRestore = dynamic(() =>
  import("../components/PreviewScrollRestore").then(
    (m) => m.PreviewScrollRestore
  )
);

export function PreviewScrollGate({ preview }: { preview?: string }) {
  if (preview !== "true") return null;
  return <PreviewScrollRestore />;
}
