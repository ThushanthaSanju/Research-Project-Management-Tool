import { Grid } from "@mui/material";

// components
import TextField from "../../../components/textField/TextField";
import DropDown from "../../../components/dropdown/DropDown";

const options = [
    { value: 'initial', name: 'Initial' },
    { value: 'proposal', name: 'Proposal' },
    { value: 'progress_review_one', name: 'Progress review one' },
    { value: 'progress_review_two', name: 'Progress review two' },
    { value: 'final', name: 'Final' },
]

const SubmissionForm = ({ values, errors, helperTexts, onChange }) => {
  return (
    <Grid container spacing={2}>
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
        <DropDown
          label="Type"
          name="type"
          options={options}
          value={values["type"]}
          error={errors["type"]}
          helperText={helperTexts["type"]}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default SubmissionForm;
