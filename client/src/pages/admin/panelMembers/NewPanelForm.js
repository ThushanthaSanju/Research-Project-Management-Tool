import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

// components
import DropDown from "../../../components/dropdown/DropDown";
import TextField from "../../../components/textField/TextField";

// services
import service from "../../../services/admin-services";

const NewPanelForm = ({ values, onChange }) => {
  const [memberOptions, setMemberOptions] = useState([]);

  const fetchPanels = async () => {
    const response = await service.getUsers('staff');

    if (response.status === 200) {
      if (response.data.body) {
        // convert response to options
        const temp = response.data.body.users.map((user) => {
          return { value: user._id, name: user.email };
        });
        setMemberOptions(temp);
      }
    }
  };

  useEffect(() => {
    fetchPanels();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth name="name" label="Panel name" value={values.name} onChange={onChange} />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          name="member1"
          label="Member 1"
          value={values.member1}
          options={memberOptions}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          name="member2"
          label="Member 2"
          value={values.member2}
          options={memberOptions}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          name="member3"
          label="Member 3"
          value={values.member3}
          options={memberOptions}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <DropDown
          name="member4"
          label="Member 4"
          value={values.member4}
          options={memberOptions}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default NewPanelForm;
