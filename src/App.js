import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, setFilters } from "./redux/reducer";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Filters from "./components/Filters";
import JobListing from "./components/JobListing";
import { useInView } from "react-intersection-observer";
import SpinLoader from "./components/loader";

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
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.setItem("selectedRole", JSON.stringify(value));
      } else {
        dispatch(
          setFilters({
            roles: { label: "", data: [] },
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.removeItem("selectedRole");
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
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.setItem("selectedExperience", JSON.stringify(value));
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: { label: "", data: "" },
            salary: filters.salary,
            location: filters.location,
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.removeItem("selectedExperience");
      }
    } else if (field === "employees") {
      if (value && value.length > 0) {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: { label: "Number of Employees", data: value.value },
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.setItem("selectedEmployees", JSON.stringify(value));
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: { label: "", data: "" },
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.removeItem("selectedEmployees");
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
            location: { label: "Remote", data: locations },
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.setItem("selectedLocation", JSON.stringify(value));
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: { label: "", data: [] },
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.removeItem("selectedLocation");
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
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.setItem("selectedSalary", JSON.stringify(value));
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: { label: "", data: "" },
            location: filters.location,
            tech: filters.tech,
            search: filters.search,
          })
        );
        localStorage.removeItem("selectedSalary");
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
            tech: filters.tech,
            search: { label: "Company Name", data: value },
          })
        );
        localStorage.setItem("search", value);
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            tech: filters.tech,
            search: { label: "", data: "" },
          })
        );
        localStorage.removeItem("search");
      }
    } else if (field === "tech") {
      if (value && value.length > 0) {
        const techs = value.map((location) => location.value);
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            tech: { label: "Tech Stack", data: techs },
            search: filters.search,
          })
        );
        localStorage.setItem("selectedTech", JSON.stringify(value));
      } else {
        dispatch(
          setFilters({
            roles: filters.roles,
            employees: filters.employees,
            experience: filters.experience,
            salary: filters.salary,
            location: filters.location,
            tech: { label: "", data: [] },
            search: filters.search,
          })
        );
        localStorage.removeItem("selectedTech");
      }
    }
  };

  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  useEffect(() => {
    setIsLoadingInitial(true);
    // Fetch initial data
    dispatch(fetchData({ limit: 9, offset: 0 })).then(() => {
      setIsLoadingInitial(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (inView && status === "succeeded") {
      dispatch(fetchData({ limit: 9, offset: offset })); //Fetch data on scroll
    }
  }, [inView, status, dispatch, offset]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // Filter the jobs based on current filters and search query
    // no data found related to employees and tech stack(so not included)
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
        (job.minJdSalary && job.minJdSalary <= filters.salary.data);
      const search =
        !filters.search.data ||
        job.companyName.toLowerCase().includes(filters.search.data);
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
          {isLoadingInitial ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SpinLoader />
            </div>
          ) : (
            <>
              <Filters handleFilterChange={handleFilterChange} />
              <JobListing jobs={filteredJobs} />
              {filteredJobs && filteredJobs?.length > 0 && (
                <div ref={ref}>{status === "loading" && <p>loading...</p>}</div>
              )}
            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
