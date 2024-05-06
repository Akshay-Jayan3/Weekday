import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SalaryOptions } from "./options";
import { useSelector } from "react-redux";

export default function SalarySelect({ handleFilterChange }) {
  const { filters } = useSelector((state) => state.data);
  const [selectedValue, setSelectedValue] = useState(null);
  const value = localStorage.getItem('selectedSalary');
  // Load selected value from localStorage
  useEffect(() => { 
    setSelectedValue(JSON.parse(value));
  }, [value]);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.salary.label}</p>
      </div>
      <Select
        options={SalaryOptions}
        value={selectedValue}
        placeholder="Minimum Base Pay Salary"
        className="mult-select"
        classNamePrefix="select"
        isClearable
        onChange={(selectedOption) => {
          handleFilterChange("salary", selectedOption);
          setSelectedValue(selectedOption)
        }}
      />
    </div>
  );
}
