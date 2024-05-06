import React, { useEffect, useState } from "react";
import Select from "react-select";
import { TechStackOptions } from "./options";
import { useSelector } from "react-redux";

export default function TechStackSelect({ handleFilterChange }) {
  const { filters } = useSelector(
    (state) => state.data
  );
  const [selectedValue, setSelectedValue] = useState(null);
  const value = localStorage.getItem('selectedTech');
  // Load selected value from localStorage
  useEffect(() => { 
    setSelectedValue(JSON.parse(value));
  }, [value]);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.tech.label}</p>
      </div>
      <Select
        options={TechStackOptions}
        value={selectedValue}
        placeholder="Tech Stack"
        className="mult-select"
        classNamePrefix="select"
        isMulti
        onChange={(selectedOption) => {
          handleFilterChange("tech", selectedOption);
          setSelectedValue(selectedOption)
        }}
      />
    </div>
  );
}
