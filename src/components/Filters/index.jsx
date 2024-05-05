import React from "react";
import Select from "react-select";
import Box from "@mui/material/Box";
const Filters = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Select
        options={options}
        placeholder="Roles"
        className="mult-select"
        classNamePrefix="select"
      />
      <Select
        options={options}
        placeholder="Number of Employees"
        className="mult-select"
        classNamePrefix="select"
      />
      <Select
        options={options}
        placeholder="Experience"
        className="mult-select"
        classNamePrefix="select"
      />
      <Select
        options={options}
        placeholder="Remote"
        className="mult-select"
        classNamePrefix="select"
      />
      <Select
        options={options}
        placeholder="Minimum Base Pay Salary"
        className="mult-select"
        classNamePrefix="select"
      />
    </Box>
  );
};

export default Filters;
