import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ExperienceOptions } from "./options";
import { useSelector } from "react-redux";

export default function ExperienceSelect({ handleFilterChange }) {
  const { filters } = useSelector((state) => state.data);
  const [selectedValue, setSelectedValue] = useState(null);
  const value = localStorage.getItem('selectedExperience');
  // Load selected value from localStorage
  useEffect(() => { 
    setSelectedValue(JSON.parse(value));
  }, [value]);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.experience.label}</p>
      </div>
      <Select
        options={ExperienceOptions}
        value={selectedValue}
        placeholder="Experience"
        className="mult-select"
        classNamePrefix="select"
        isClearable
        onChange={(selectedOption) => {
          handleFilterChange("experience", selectedOption);
          setSelectedValue(selectedOption)
        }}
      />
    </div>
  );
}
