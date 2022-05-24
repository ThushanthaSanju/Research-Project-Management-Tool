import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";

// components
import Button from "../../../components/button/Button";

const RequestItem = ({ id, title, group, status, onClick }) => {
  return (
    <Card sx={{ minWidth: 275, bgcolor: '#d8e9eb' }}>
      <CardContent>
        <Grid item xs={12}>
          <Typography
            fontWeight="600"
            variant="subtitle1"
          >{`Research Title - ${title}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{`Group - ${group}`}</Typography>
        </Grid>
        <Grid item xs={6} mt={2}>
          <Button
            label={status}
            disabled={status === "accepted" || status === "rejected"}
            onClick={() => onClick(id)}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RequestItem;
