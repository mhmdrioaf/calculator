import React from "react";
import { twMerge } from "tailwind-merge";

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, IContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          "w-full flex flex-col gap-2 rounded-lg px-4 py-4 overflow-hidden shadow-md bg-stone-800",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container };
