import React from "react";
import { JoinRequestListItems } from "./JoinRequestListItems";

export const JoinRequestList = () => {
  return (
    <div className="h-full w-[90%]">
      {/* map through the component when database is populated */}
      <JoinRequestListItems />
    </div>
  );
};
