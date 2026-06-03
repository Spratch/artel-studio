import { title } from "@/sanity/env";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `${title} | Admin`,
    description: "Administration du site Artel"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0, overscrollBehavior: "none" }}>
                {children}
            </body>
        </html>
    );
}
