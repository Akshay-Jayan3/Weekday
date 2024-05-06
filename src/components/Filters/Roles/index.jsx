import React, { useEffect, useState } from "react";
import Select from "react-select";
import { groupedOptions } from "./options";
import { useSelector } from "react-redux";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default function RoleSelect({ handleFilterChange }) {
  const { filters } = useSelector((state) => state.data);
  const [selectedValue, setSelectedValue] = useState(null);
  const value = localStorage.getItem('selectedRole');
  // Load selected value from localStorage
  useEffect(() => { 
    setSelectedValue(JSON.parse(value));
  }, [value]);
  return (
    <div className="select-container">
      <div className="label">
        <p>{filters?.roles.label}</p>
      </div>
      <Select
        isMulti
        options={groupedOptions}
        value={selectedValue}
        formatGroupLabel={formatGroupLabel}
        placeholder="Roles"
        className="mult-select"
        classNamePrefix="select"
        onChange={(selectedOption) => {
          handleFilterChange("role", selectedOption);
          setSelectedValue(selectedOption)
        }}
      />
    </div>
  );
}
