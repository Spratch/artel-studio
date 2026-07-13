import { ProjectQueryResult } from "@/sanity.types";
import { Get } from "@sanity/codegen";
import { getGridItemIndexes } from "../utils";

const SPAN_CLASS: Record<string, string> = {
  "1": "col-span-3 sm:col-span-2",
  "2": "col-span-6 sm:col-span-4",
  "3": "col-span-6"
};

export default function GridRow<T>({
  layout,
  items,
  renderItem
}: {
  layout: Get<ProjectQueryResult, "pageContent", number, "layout">;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  const tokens = layout.split("-");
  const itemIndexes = getGridItemIndexes(tokens);

  return (
    <div className="grid grid-cols-6 gap-x-2.5">
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
            className={SPAN_CLASS[token]}
          >
            {renderItem(item, itemIndex!)}
          </div>
        );
      })}
    </div>
  );
}
