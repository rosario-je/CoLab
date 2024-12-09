import React, { useState } from "react";

export const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };
  return (
    <div className="search-bar z-10 fixed top-16 lg:top-20 left-[0px] right-[0px] lg:left-[200px] 2xl:left-[300px] lg:right-[200px] 2xl:right-[300px]">
      <label className="input flex items-center gap-2 bg-menu-colors rounded-none h-[45px] md:h-[65px]">
        <i className="fa-solid fa-magnifying-glass mx-3 text-[#ffffff]"></i>
        <input
          type="text"
          className="grow rounded-none"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </label>
    </div>
  );
};
