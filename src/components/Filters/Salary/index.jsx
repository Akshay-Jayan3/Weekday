import React from "react";
import Select from "react-select";
import { SalaryOptions } from "./options";

export default function SalarySelect() {
  return (
    <div className="role-select-container">
      <Select
        options={SalaryOptions}
        placeholder="Minimum Base Pay Salary"
        className="mult-select"
        classNamePrefix="select"
      />
    </div>
  );
}
