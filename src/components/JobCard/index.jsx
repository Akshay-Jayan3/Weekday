import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function JobCard() {
  return (
    <Card sx={{ borderRadius: "20px" ,maxWidth:"360px"}}>
      <div style={{padding:"5px 10px" ,marginTop:"0.5rem"}}>
        <div className="posted-time"><img/><p>Posted 10 days ago</p></div>
      </div>
      <CardContent sx={{ padding: "5px" }}>
        <Box
          display="flex"
          justifyContent="center"
          gap={1}
          sx={{ paddingInline: "16px", paddingBlock: "8px"}}
          flexDirection="column"
        >
          <div className="displayFlex">
            <img width={50} />
            <div className="info">
              <h3>Famby</h3>
              <h2>Backend Engineer</h2>
              <p>Banglore</p>
            </div>
          </div>
          <div className="displayFlex salary">
            <p>Estimated Salary : 12-16 LPA</p>
            <img />
          </div>
          <div className="company-info">
            <p>About Company</p>
            <p>About us</p>
            <div className="about-info">
              <p>
                Mindtickle is the market-leading sales readiness platform,
                helping revenue leaders at world-class companies like Johnson
                &amp; Johnson, Splunk, and Wipro, be ready to grow revenue by
                increasing knowledge, understanding ideal sales behaviors, and
                adapting to change. Dozens of Fortune 500 and Forbes Global 2000
                companies use Mindtickle to define excellence, build knowledge,
                align content, analyze performance, and optimize behavior
                throughout their sales organizations. Mindtickle is recognized
                as a market leader by top industry analysts and is ranked by G2
                as both the #1 enterprise software product and #5 sales software
                product.
              </p>
            </div>
            <button className="view-job">View Job</button>
            <div className="info">
              <h3>Minimum Experience</h3>
              <h2>2 years</h2>
            </div>
          </div>
        </Box>
      </CardContent>
      <CardActions
        sx={{ paddingInline: "20px", display: "flex", flexDirection: "column",justifyContent:"space-between",gap:"1rem" }}
      >
        <button className="custom-btn easy-apply">Easy Apply</button>
        <button className="custom-btn ask-referral">Ask Referral</button>
      </CardActions>
    </Card>
  );
}
