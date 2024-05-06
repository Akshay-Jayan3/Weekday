import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, resetData, setFilters } from "./redux/reducer";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Filters from "./components/Filters";
import JobListing from "./components/JobListing";
import { useInView } from "react-intersection-observer";

function App() {
  const dispatch = useDispatch();
  const { jobs, status, error, offset, filters } = useSelector(
    (state) => state.data
  );

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const handleFilterChange = (field, value) => {
    console.log(field);
    console.log(value);
    if (field === "role") {
      if (value && value.length > 0) {
        const roles = value.map((role) => role.value);
        dispatch(
          setFilters({
            roles: { label: "Role", data: roles },
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            search: filters.search,
          })
        );
      } else {
        dispatch(
          setFilters({
            roles: { label: "", data: [] },
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            search: filters.search,
          })
        );
      }
    } else if (field === "experience") {
      if (value) {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: { label: "Experience", data: value.value },
            salary: filters.salary,
            location: filters.location,
            search: filters.search,
          })
        );
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: { label: "", data: "" },
            salary: filters.salary,
            location: filters.location,
            search: filters.search,
          })
        );
      }
    } else if (field === "employee") {
      if (value) {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: { label: "Number of Employees", data: value.value },
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            search: filters.search,
          })
        );
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: { label: "", data: "" },
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            search: filters.search,
          })
        );
      }
    } else if (field === "location") {
      if (value && value.length > 0) {
        const locations = value.map((location) => location.value);
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            roles: { label: "Remote", value: locations },
            search: filters.search,
          })
        );
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: { label: "", value: [] },
            search: filters.search,
          })
        );
      }
    } else if (field === "salary") {
      if (value) {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: { label: "Minimum Base Pay", data: value.value },
            location: filters.location,
            search: filters.search,
          })
        );
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: { label: "", data: "" },
            location: filters.location,
            search: filters.search,
          })
        );
      }
    } else if (field === "search") {
      if (value !== "") {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            search: { label: "Company Name", data: value },
          })
        );
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            search: { label: "", data: "" },
          })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(fetchData({ limit: 9, offset: 0 })); // Fetch initial data
  }, []);

  useEffect(() => {
    if (inView && status === "succeeded") {
      dispatch(fetchData({ limit: 9, offset: offset }));
    }
  }, [inView, status]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Filter the jobs based on current filters and search query
    const filtered = jobs.filter((job) => {
      // Implement filter logic
      const roleFilter =
        filters.roles.data.length === 0 ||
        filters.roles.data.some(
          (role) => role.toLowerCase() === job.jobRole?.toLowerCase()
        );
      const employeeFilter =
        !filters.employees.data ||
        job.employees.toLowerCase() === filters.employees.data?.toLowerCase();
      const experienceFilter =
        !filters.experience.data ||
        (job.minExp && job.minExp === filters.experience.data);
      const salaryFilter =
        !filters.salary.data ||
        (job.minJdSalary && job.minJdSalary === filters.salary.data);
      const search =
        !filters.search.data ||
        job.companyName.toLowerCase() === filters.search.data.toLowerCase();
      const locationFilter =
        filters.location.data.length === 0 ||
        filters.location.data.some(
          (location) => location.toLowerCase() === job.location?.toLowerCase()
        );

      return (
        search &&
        roleFilter &&
        employeeFilter &&
        experienceFilter &&
        salaryFilter &&
        locationFilter
      );
    });

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={8}
          p={2}
          flexDirection="column"
        >
          <Filters handleFilterChange={handleFilterChange} />
          <JobListing jobs={filteredJobs} />
          {filteredJobs && filteredJobs?.length > 8 && (
            <div ref={ref}>{status === "loading" && <p>loading...</p>}</div>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
