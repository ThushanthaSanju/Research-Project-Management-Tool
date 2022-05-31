import React from "react";
import { Grid, Typography } from "@mui/material";

// components
import TextField from "../../../components/textField/TextField";
import DropDown from "../../../components/dropdown/DropDown";

const UploadForm = ({
  values,
  errors,
  serverError,
  options,
  helperTexts,
  onChange,
}) => {
  return (
    <Grid container spacing={2}>
      {serverError && (
        <Grid item xs={12}>
          <Typography color="red" variant="body1">
            {serverError}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <DropDown
          name="submission_type"
          label="Submission Type"
          value={values["submission_type"]}
          options={options}
          error={errors["submission_type"]}
          helperText={helperTexts["submission_type"]}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="file"
          name="file"
          label="File"
          error={errors["file"]}
          helperText={helperTexts["file"]}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default UploadForm;
