import { Grid } from "@mui/material";

// components
import TextField from "../../../components/textField/TextField";

const UploadForm = ({ errors, helperTexts, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="file"
          name="file"
          label="File"
          error={errors}
          helperText={helperTexts}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};

export default UploadForm;
