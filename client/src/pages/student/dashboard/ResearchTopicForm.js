import { Grid } from "@mui/material";

// components
import TextField from "../../../components/textField/TextField";

const ResearchTopicForm = ({ value, error, helperText, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Title"
          name="title"
          value={value}
          fullWidth
          error={error}
          helperText={helperText}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default ResearchTopicForm;
