import React, { useState } from "react";
import { useSelector } from "react-redux";

const Search = ({ handleFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { filters } = useSelector((state) => state.data);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    handleFilterChange("search", value);
  };
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.search.label}</p>
      </div>
      <input
        type="text"
        placeholder="Search Company Name"
        value={searchQuery}
        className="search"
        onChange={(e) => {
          handleSearch(e);
        }}
      />
    </div>
  );
};

export default Search;
