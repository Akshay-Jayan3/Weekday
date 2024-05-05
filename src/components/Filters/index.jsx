import React from "react";
import Box from "@mui/material/Box";
import RoleSelect from "./Roles";
import NoOfEmployeeSelect from "./NoOfEmployess";
import ExperienceSelect from "./Experience";
import RemoteSelect from "./Remote";
import SalarySelect from "./Salary";
const Filters = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      flexWrap="wrap"
    >
      <RoleSelect />
      <NoOfEmployeeSelect />
      <ExperienceSelect />
      <RemoteSelect />
      <SalarySelect />
    </Box>
  );
};

export default Filters;
