import React from "react";
import { Grid } from "@mui/material";

// components
import DropDown from "../../../components/dropdown/DropDown";
import TextField from "../../../components/textField/TextField";

const options = [
  { value: true, name: "Accept" },
  { value: false, name: "Reject" },
];

const EvaluateForm = ({ values, errors, helperTexts, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DropDown
          label="Status"
          name="isAcceptedByPanel"
          options={options}
          value={values.isAcceptedByPanel}
          error={errors.isAcceptedByPanel}
          helperText={helperTexts.isAcceptedByPanel}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Feed Back"
          name="feedback"
          value={values.feedback}
          error={errors.feedback}
          helperText={helperTexts.feedback}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default EvaluateForm;
