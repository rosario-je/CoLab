import React, { useState } from "react";

export const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <div className="search-bar flex justify-center">
      <label className="input flex mx-auto fixed items-center gap-2 w-full bg-menu-colors rounded-none h-[65px]">
        <i className="fa-solid fa-magnifying-glass mx-3 text-[#000000]"></i>
        <input
          type="text"
          className="grow rounded-none"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={onKeyPress}
        />
      </label>
    </div>
  );
};
