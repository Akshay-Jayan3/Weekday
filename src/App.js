import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Filters from "./components/Filters";
import JobListing from "./components/JobListing";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          p={2}
          flexDirection="column"
        >
          <Filters />
          <JobListing />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
