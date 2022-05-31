import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

// components
import Button from "../../../components/button/Button";

const TopicIte = ({ title, topic, researchTopic, onClick }) => {
  return (
    <Card sx={{ minWidth: 275, bgcolor: "#d8e9eb" }}>
      <CardContent>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{`Group - ${title}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">{`Title - ${topic}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button label="Evaluate" onClick={onClick} disabled={!!researchTopic?.isAcceptedByPanel} />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TopicIte;
