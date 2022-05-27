import { Grid } from "@mui/material";

// components
import TextField from "../../../components/textField/TextField";

const ResearchTopicForm = ({ values, errors, helperTexts, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Title"
          name="title"
          value={values.title}
          fullWidth
          error={errors.title}
          helperText={helperTexts.text}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Introduction"
          name="introduction"
          value={values.introduction}
          fullWidth
          error={errors.introduction}
          helperText={helperTexts.introduction}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default ResearchTopicForm;
