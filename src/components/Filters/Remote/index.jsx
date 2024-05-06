import React, { useState } from "react";
import Select from "react-select";
import { RemoteOptions } from "./options";
import { useSelector } from "react-redux";

export default function RemoteSelect({ handleFilterChange }) {
  const { filters } = useSelector(
    (state) => state.data
  );
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.location.label}</p>
      </div>
      <Select
        options={RemoteOptions}
        placeholder="Remote"
        className="mult-select"
        classNamePrefix="select"
        isMulti
        onChange={(selectedOption) => {
          handleFilterChange("location", selectedOption);
        }}
      />
    </div>
  );
}
