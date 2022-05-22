import { Grid } from "@mui/material";

// components
import DropDown from '../../../components/dropdown/DropDown';
const GroupForm = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DropDown label="Student 1" name="student1" onChange={() => {}} />
            </Grid>
            <Grid item xs={12}>
                <DropDown label="Student 2" name="student1" onChange={() => {}} />
            </Grid>
            <Grid item xs={12}>
                <DropDown label="Student 3" name="student1" onChange={() => {}} />
            </Grid>
        </Grid>
    );
};

export default GroupForm;