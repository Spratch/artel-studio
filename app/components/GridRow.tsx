import { ProjectQueryResult } from "@/sanity.types";
import { Get } from "@sanity/codegen";
import { cn, getGridItemIndexes } from "../utils";

const SPAN_CLASS = (isThumbnail: boolean): Record<string, string> => {
  return {
    "1": !isThumbnail
      ? "col-span-3 sm:col-span-2"
      : "col-span-6 sm:col-span-3 md:col-span-2",
    "2": !isThumbnail ? "col-span-6 sm:col-span-4" : "col-span-6 md:col-span-4",
    "3": "col-span-6"
  };
};

export default function GridRow<T>({
  layout,
  items,
  renderItem,
  isThumbnail = false
}: {
  layout: Get<ProjectQueryResult, "pageContent", number, "layout">;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  isThumbnail?: boolean;
}) {
  const tokens = layout.split("-");
  const itemIndexes = getGridItemIndexes(tokens);

  return (
    <div
      className={cn(
        "grid grid-cols-6 gap-2.5",
        isThumbnail ? "max-sm:gap-y-2.5" : ""
      )}
    >
      {tokens.map((token, i) => {
        if (token === "0") {
          return (
            <div
              key={i}
              aria-hidden
              className="max-sm:hidden sm:col-span-2"
            ></div>
          );
        }
        const itemIndex = itemIndexes[i];
        const item = items[itemIndex!];

        return (
          <div
            key={i}
            className={SPAN_CLASS(isThumbnail)[token]}
          >
            {renderItem(item, itemIndex!)}
          </div>
        );
      })}
    </div>
  );
}
