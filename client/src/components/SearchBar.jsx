import React from "react";

export const SearchBar = () => {
  return (
    <div>
      <label className="input flex items-center gap-2 w-full bg-menu-colors rounded-none">
        <i className="fa-solid fa-magnifying-glass mx-3 text-[#000000]"></i>
        <input type="text" className="grow rounded-none" placeholder="Search" />
        <i className="fa-solid fa-bars mr-10"></i>
      </label>
    </div>
  );
};