import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import JobCard from "../JobCard";

const JobListing = () => {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container spacing={3}>
        <Grid item lg={4} sx={{padding:"8px"}}>
          <JobCard/>
        </Grid>
        <Grid item lg={4}>
          <JobCard/>
        </Grid>
        <Grid item lg={4}>
          <JobCard/>
        </Grid>
        <Grid item lg={4}>
          <JobCard/>
        </Grid>
        <Grid item lg={4}>
          <JobCard/>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default JobListing;
