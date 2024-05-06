import React, { useEffect, useState } from "react";
import Select from "react-select";
import { RemoteOptions } from "./options";
import { useSelector } from "react-redux";

export default function RemoteSelect({ handleFilterChange }) {
  const { filters } = useSelector(
    (state) => state.data
  );
  const [selectedValue, setSelectedValue] = useState(null);
  const value = localStorage.getItem('selectedLocation');
  // Load selected value from localStorage
  useEffect(() => { 
    setSelectedValue(JSON.parse(value));
  }, [value]);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.location.label}</p>
      </div>
      <Select
        options={RemoteOptions}
        value={selectedValue}
        placeholder="Remote"
        className="mult-select"
        classNamePrefix="select"
        isMulti
        onChange={(selectedOption) => {
          handleFilterChange("location", selectedOption);
          setSelectedValue(selectedOption);
        }}
      />
    </div>
  );
}
