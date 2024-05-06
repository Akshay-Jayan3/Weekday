import React, { useState } from "react";
import Select from "react-select";
import { ExperienceOptions } from "./options";
import { useSelector } from "react-redux";

export default function ExperienceSelect({ handleFilterChange }) {
  const { filters } = useSelector((state) => state.data);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.experience.label}</p>
      </div>
      <Select
        options={ExperienceOptions}
        placeholder="Experience"
        className="mult-select"
        classNamePrefix="select"
        isClearable
        onChange={(selectedOption) => {
          handleFilterChange("experience", selectedOption);
        }}
      />
    </div>
  );
}
