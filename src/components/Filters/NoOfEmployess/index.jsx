import React, { useState } from "react";
import Select from "react-select";
import { NoOfEmployeeOptions } from "./options";
import { useSelector } from "react-redux";

export default function NoOfEmployeeSelect({ handleFilterChange }) {
  const { filters } = useSelector((state) => state.data);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.employees.label}</p>
      </div>
      <Select
        options={NoOfEmployeeOptions}
        placeholder="Number of Employees"
        className="mult-select"
        isMulti
        classNamePrefix="select"
        onChange={(selectedOption) => {
          handleFilterChange("employees", selectedOption);
        }}
      />
    </div>
  );
}
