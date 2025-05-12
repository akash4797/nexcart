import React from "react";
import useScroll from "@/hooks/scroll";

const PageTitle = ({
  title,
  subText,
  children,
}: {
  title: string;
  subText: string;
  children: React.ReactNode;
}) => {
  const isScrolled = useScroll();

  return (
    <div
      className={`bg-white dark:bg-[#0A0A0A] ${
        isScrolled ? "fixed z-50 top-0 p-5 left-0 w-full" : ""
      }`}
    >
      <h1
        className={`font-bold transition-all duration-500  ${
          isScrolled
            ? "text-xl text-start sm:text-center"
            : "text-2xl text-start sm:text-center"
        }`}
      >
        {title}
      </h1>
      <p
        className={`transition-all duration-500 text-sm text-start sm:text-center ${
          isScrolled ? "hidden" : ""
        } mt-1`}
      >
        {subText}
      </p>
      {children}
    </div>
  );
};

export default PageTitle;
