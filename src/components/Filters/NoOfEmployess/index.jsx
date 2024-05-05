import React from "react";
import Select from "react-select";
import { NoOfEmployeeOptions } from "./options";

export default function NoOfEmployeeSelect() {
  return (
    <div className="role-select-container">
      <Select
        options={NoOfEmployeeOptions}
        placeholder="Number of Employees"
        className="mult-select"
        classNamePrefix="select"
      />
    </div>
  );
}
