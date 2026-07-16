// Inspired by https://github.com/ogi988/sanity-page-builder/blob/main/studio/components/LayoutPickerInput.tsx
import { LAYOUTS } from "@/lib/layouts";
import { Box, Card, Flex, Text } from "@sanity/ui";
import type { StringInputProps } from "sanity";
import { set, unset } from "sanity";

export function LayoutPickerInput(props: StringInputProps) {
  const { onChange, value } = props;

  return (
    <Flex
      gap={2}
      padding={1}
      align="center"
      justify="center"
      wrap="wrap"
    >
      {LAYOUTS.map((layout) => {
        const isSelected = value === layout.value;
        return (
          <Card
            key={layout.value}
            padding={3}
            radius={2}
            border={true}
            tone={isSelected ? "primary" : "default"}
            style={{
              cursor: "pointer",
              transition: "all 0.15s ease",
              width: "calc(33.333% - 8px)"
            }}
            onClick={() =>
              onChange(value === layout.value ? unset() : set(layout.value))
            }
          >
            <Flex
              direction="column"
              gap={3}
              align="center"
            >
              <Flex
                gap={1}
                style={{ width: "100%", height: 28 }}
              >
                {layout.columns.map((col, i) => {
                  const flex = col === 0 ? 1 : col;
                  const isEmpty = col === 0;
                  return (
                    <Box
                      key={i}
                      style={{
                        flex,
                        height: "100%",
                        backgroundColor: isEmpty
                          ? "transparent"
                          : "var(--card-badge-default-bg-color)",
                        borderColor: "var(--card-badge-default-icon-color)",
                        borderWidth: 1,
                        borderRadius: 3,
                        borderStyle: isEmpty ? "dashed" : "solid",
                        transition: "background-color 0.15s ease"
                      }}
                    />
                  );
                })}
              </Flex>
              <Text
                size={0}
                muted={!isSelected}
                style={{ whiteSpace: "nowrap" }}
              >
                {layout.label}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
}
