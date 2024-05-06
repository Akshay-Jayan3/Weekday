import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function JobCard({ job }) {
  return (
    <Card sx={{ borderRadius: "20px", maxWidth: "360px" }} id="intersection-target">
      <div style={{ padding: "5px 15px", marginTop: "0.5rem" }}>
        <div className="posted-time">
          <img />
          <p>⏳ Posted 10 days ago</p>
        </div>
      </div>
      <CardContent sx={{ padding: "5px" }}>
        <Box
          display="flex"
          justifyContent="center"
          gap={1}
          sx={{ paddingInline: "16px", paddingBlock: "8px" }}
          flexDirection="column"
        >
          <div className="displayFlex">
            <img style={{width:"2.5rem" ,aspectRatio:1/1}} src={job.logoUrl} />
            <div className="info">
              <h3>{job.companyName}</h3>
              <h2>{job.jobRole}</h2>
              <p>{job.location}</p>
            </div>
          </div>
          <div className="displayFlex salary">
            <p>Estimated Salary : {job.minJdSalary}-{job.maxJdSalary} LPA</p>
            <span>✅</span>
          </div>
          <div className="company-info">
            <p className="about-company">About Company</p>
            <p className="about-us">About us</p>
            <div className="about-info">
              <p>{job.jobDetailsFromCompany}</p>
            </div>
            <button className="view-job">View Job</button>
            <div className="info">
              <h3>Minimum Experience</h3>
              <h2>{job.minExp ? job.minExp : 0} years</h2>
            </div>
          </div>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          paddingInline: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <button className="custom-btn easy-apply">⚡ Easy Apply</button>
        <button className="custom-btn ask-referral">Ask Referral</button>
      </CardActions>
    </Card>
  );
}
