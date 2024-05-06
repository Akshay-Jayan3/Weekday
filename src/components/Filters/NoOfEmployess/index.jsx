import React, { useEffect, useState } from "react";
import Select from "react-select";
import { NoOfEmployeeOptions } from "./options";
import { useSelector } from "react-redux";

export default function NoOfEmployeeSelect({ handleFilterChange }) {
  const { filters } = useSelector((state) => state.data);
  const [selectedValue, setSelectedValue] = useState(null);
  const value = localStorage.getItem('selectedEmployees');
  // Load selected value from localStorage
  useEffect(() => { 
    setSelectedValue(JSON.parse(value));
  }, [value]);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.employees.label}</p>
      </div>
      <Select
        options={NoOfEmployeeOptions}
        value={selectedValue}
        placeholder="Number of Employees"
        className="mult-select"
        isClearable
        isMulti
        classNamePrefix="select"
        onChange={(selectedOption) => {
          handleFilterChange("employees", selectedOption);
          setSelectedValue(selectedOption)
        }}
      />
    </div>
  );
}
