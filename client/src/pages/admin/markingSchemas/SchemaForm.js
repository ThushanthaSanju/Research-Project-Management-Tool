import { Grid, Typography } from "@mui/material";

// components
import TextField from "../../../components/textField/TextField";

const options = [
  { value: "initial", name: "Initial" },
  { value: "proposal", name: "Proposal" },
  { value: "progress_review_one", name: "Progress review one" },
  { value: "progress_review_two", name: "Progress review two" },
  { value: "final", name: "Final" },
];

const SchemaForm = ({ values, errors, serverError, helperTexts, onChange }) => {
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
        <TextField
          fullWidth
          label="Name"
          helperText={helperTexts["name"]}
          error={errors["name"]}
          name="name"
          value={values["name"]}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="file"
          label="File"
          helperText={helperTexts["file"]}
          error={errors["file"]}
          name="file"
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default SchemaForm;
