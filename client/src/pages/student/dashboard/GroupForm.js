import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

// components
import DropDown from "../../../components/dropdown/DropDown";
import TextField from "../../../components/textField/TextField";

// services
import service from "../../../services/student-service";

const GroupForm = ({ name, students, errors, onChangeHandler }) => {
  const [studentsOptions, setStudentsOptions] = useState([]);

  const fetchStudents = async () => {
    const response = await service.getStudents();

    if (response.status === 200) {
      if (response.data.body?.students.length > 0) {
        const temp = response.data.body.students.map((student) => {
          return { value: student._id, name: student.email };
        });
        setStudentsOptions(temp);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Group Name"
          name="name"
          value={name}
          onChange={onChangeHandler}
          fullWidth
          error={errors.name.error}
          helperText={errors.name.text}
        />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          label="Student 1"
          name="student1"
          value={students[1]}
          options={studentsOptions}
          onChange={onChangeHandler}
          error={errors.student1.error}
          helperText={errors.student1.text}
        />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          label="Student 2"
          name="student2"
          value={students[2]}
          options={studentsOptions}
          onChange={onChangeHandler}
          error={errors.student2.error}
          helperText={errors.student2.text}
        />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          label="Student 3"
          name="student3"
          value={students[3]}
          options={studentsOptions}
          onChange={onChangeHandler}
          error={errors.student3.error}
          helperText={errors.student3.text}
        />
      </Grid>
    </Grid>
  );
};

export default GroupForm;
