import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

// components
import DropDown from "../../../components/dropdown/DropDown";

// service
import service from "../../../services/admin-services";

const RequestSupervisorForm = ({ type, value, error, helperText, onChange }) => {
  const [options, setOptions] = useState([]);

  // fetch staff members
  const fetchStaffMembers = async () => {
    const response = await service.getUsers("staff");

    if (response.status === 200) {
      setOptions(
        response.data.body?.users.map((user) => {
          return { value: user._id, name: user.email };
        })
      );
    }
  };

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DropDown
          name={type === 'supervisor' ? 'supervisor' : 'coSupervisor'}
          label={type === 'supervisor' ? 'Supervisor' : 'Co-supervisor'}
          value={value}
          error={error}
          options={options}
          helperText={helperText}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default RequestSupervisorForm;
