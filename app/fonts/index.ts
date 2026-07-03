import localFont from "next/font/local";

export const sagace = localFont({
  src: [
    {
      path: "./Sagace-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "./Sagace-Regular—Italic.woff2",
      weight: "400",
      style: "italic"
    }
  ]
});
