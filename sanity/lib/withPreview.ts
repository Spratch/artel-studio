import { getClient, isPreview } from "../config/client-config";

type PreviewProps = {
  searchParams?: { preview?: string };
  params?: Record<string, string | number | boolean>;
};

export function withPreview<Q extends string>(
  query: (preview: boolean) => Q,
  tags?: string[]
) {
  return async function fetchData(props?: PreviewProps) {
    const preview = isPreview(props?.searchParams);
    const client = getClient(preview);
    const options = preview
      ? {
          cache: "no-store" as RequestCache,
          next: { revalidate: 0, tags: ["preview"] }
        }
      : {
          cache: "force-cache" as RequestCache,
          next: { tags }
        };
    return client.fetch(query(preview), props?.params, options);
  };
}
