import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import JobCard from "../JobCard";

const JobListing = ({ jobs }) => {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container spacing={3}>
        {jobs?.map((job, i) => (
          <Grid item lg={4} key={i}>
            {" "}
            {/* Removed sx prop */}
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      <div
        id="intersection-target"
        style={{ height: "10px", backgroundColor: "red" }}
      ></div>
    </Box>
  );
};

export default JobListing;
