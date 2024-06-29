"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function ImageWrapper() {
  const { theme } = useTheme();
  return (
    <>
      <Image
        alt={`${process.env.NEXT_PUBLIC_WEBSITE_NAME} banner`}
        src={`/images/${
          theme === "light" ? "light-banner" : "dark-banner"
        }.png`}
        width={1500}
        height={1500}
      />
    </>
  );
}
