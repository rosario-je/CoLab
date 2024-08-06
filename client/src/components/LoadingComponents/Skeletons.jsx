import React from "react";

export const Skeletons = () => {
  return (
    <div className="skeleton-container h-fit mt-6 flex flex-col gap-y-10">
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-52 w-full"></div>
        <div className="skeleton h-4 w-1/3"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-52 w-full"></div>
        <div className="flex items-center gap-4 justify-end">
          <div className="flex flex-col gap-4 items-end w-full">
            <div className="skeleton h-4 w-60"></div>
            <div className="skeleton h-4 w-96"></div>
          </div>
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-52 w-full"></div>
        <div className="skeleton h-4 w-1/3"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};
