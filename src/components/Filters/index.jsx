import React from "react";
import RoleSelect from "./Roles";
import NoOfEmployeeSelect from "./NoOfEmployess";
import ExperienceSelect from "./Experience";
import RemoteSelect from "./Remote";
import SalarySelect from "./Salary";
import Search from "./Search";
import TechStackSelect from "./TechStack";
const Filters = ({ handleFilterChange }) => {
  return (
    <div className="filter-container">
      <RoleSelect handleFilterChange={handleFilterChange} />
      <NoOfEmployeeSelect handleFilterChange={handleFilterChange}/>
      <ExperienceSelect handleFilterChange={handleFilterChange}/>
      <RemoteSelect handleFilterChange={handleFilterChange}/>
      <SalarySelect handleFilterChange={handleFilterChange}/>
      <TechStackSelect handleFilterChange={handleFilterChange}/>
      <Search handleFilterChange={handleFilterChange}/>
    </div>
  );
};

export default Filters;
