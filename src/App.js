import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, resetData } from "./redux/reducer";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Filters from "./components/Filters";
import JobListing from "./components/JobListing";

function App() {
  const dispatch = useDispatch();
  const { jobs, status, error, offset } = useSelector((state) => state.data);
  const [filters, setFilters] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
  });

  const observerRef = useRef(null); // Reference for Intersection Observer

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleIntersection = (entries) => {
    console.log(entries[0].isIntersecting)
    if (entries[0].isIntersecting && status === 'succeeded') {
      dispatch(fetchData({ limit: 10, offset:offset }));
    }
  };

  useEffect(() => {
    dispatch(resetData()); // Reset data when component mounts
    dispatch(fetchData({ limit: 10, offset: 0 })); // Fetch initial data with filters

    // Initialize Intersection Observer
    observerRef.current = new IntersectionObserver(handleIntersection,{threshold: 1.0, // Fully intersecting
    rootMargin: "0px"});

    // Observe target element
    const target = document.getElementById('intersection-target');
    if (target) observerRef.current.observe(target);

    return () => {
      // Cleanup Intersection Observer
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [dispatch, filters]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={8}
          p={2}
          flexDirection="column"
        >
          <Filters />
          <JobListing jobs={jobs} />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
