import React, { useState } from "react";
import Select from "react-select";
import { SalaryOptions } from "./options";
import { useSelector } from "react-redux";

export default function SalarySelect({ handleFilterChange }) {
  const { filters } = useSelector((state) => state.data);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.salary.label}</p>
      </div>
      <Select
        options={SalaryOptions}
        placeholder="Minimum Base Pay Salary"
        className="mult-select"
        classNamePrefix="select"
        isClearable
        onChange={(selectedOption) => {
          handleFilterChange("salary", selectedOption);
        }}
      />
    </div>
  );
}
