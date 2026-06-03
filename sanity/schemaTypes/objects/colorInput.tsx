import { Card, Flex, TextInput } from "@sanity/ui";
import { StringInputProps } from "sanity";
import { defineField, TextRule } from "@sanity/types";
import { set } from "sanity";

function HexColorInput(props: StringInputProps) {
    const { value = "", onChange } = props;

    return (
        <>
            <style>{`.flex-parent > span {flex: 1;}`}</style>
            <Flex
                align="center"
                gap={2}
                className="flex-parent"
            >
                <Card
                    style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor:
                            /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)
                                ? value
                                : "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "100%"
                    }}
                />
                <TextInput
                    value={value}
                    onChange={(event) =>
                        onChange(set(event.currentTarget.value))
                    }
                />
            </Flex>
        </>
    );
}

export default defineField({
    name: "colorInput",
    type: "string",
    components: {
        input: HexColorInput
    },
    validation: (Rule: TextRule) =>
        Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
            name: "hex color",
            invert: false
        }).error("Entrez une couleur hexadécimale valide")
});
