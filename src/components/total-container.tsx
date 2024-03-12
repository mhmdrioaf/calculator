import React from "react";
import { twMerge } from "tailwind-merge";

interface ITotalContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  overall: string | null;
  total: string | number;
}

const TotalContainer = React.forwardRef<HTMLDivElement, ITotalContainerProps>(
  ({ className, overall, total, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          "w-full flex flex-col gap-2 px-2 py-1 bg-stone-600 rounded-md text-white text-right",
          className
        )}
        ref={ref}
        {...props}
      >
        <p className="text-sm text-amber-400">{overall}</p>
        <p className="text-2xl" id="display">
          {total}
        </p>
      </div>
    );
  }
);

TotalContainer.displayName = "TotalContainer";
export { TotalContainer };
