import React from "react";
import { Grid } from "@mui/material";

// components
import DropDown from "../../../components/dropdown/DropDown";

const StatusChangeForm = ({ value, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DropDown
          name="status"
          value={value}
          options={[
            { value: "accepted", name: "Accept" },
            { value: "rejected", name: "Reject" },
          ]}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default StatusChangeForm;
