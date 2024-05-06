import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import JobCard from "../JobCard";
import nodata from "../../assets/images/no-data.png";

const JobListing = ({ jobs }) => {
  return (
    <Box width="95%">
      {jobs && jobs.length > 0 ? (
        <Grid container spacing={3}>
          {jobs?.map((job, i) => (
            <Grid item sm={12} md={6} lg={4} xl={3} key={i}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            minHeight: "200px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"column"
          }}
        >
          <img src={nodata}  width={100} height={100}/>
          <p className="no-data">No jobs available for this category at the moment</p>
        </div>
      )}
    </Box>
  );
};

export default JobListing;
