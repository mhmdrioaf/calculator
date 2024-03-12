import React from "react";
import { twMerge } from "tailwind-merge";

interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Body = React.forwardRef<HTMLDivElement, IBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={twMerge("w-full grid grid-cols-4 gap-2", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Body.displayName = "Body";
export { Body };
