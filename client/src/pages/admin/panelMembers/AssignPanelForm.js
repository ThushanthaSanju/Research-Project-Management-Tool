import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

// components
import DropDown from "../../../components/dropdown/DropDown";

// services
import service from "../../../services/admin-services";

const AssignPanelForm = ({ value, serverError, onChange }) => {
  const [panelOptions, setPanelOptions] = useState([]);

  const fetchPanels = async () => {
    const response = await service.getPanels();

    if (response.status === 200) {
      if (response.data.body) {
        // convert response to options
        const temp = response.data.body.panels.map((panel) => {
          return { value: panel._id, name: panel.name };
        });
        setPanelOptions(temp);
      }
    }
  };

  useEffect(() => {
    fetchPanels();
  }, []);

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
          name="panel"
          label="Panels"
          value={value}
          options={panelOptions}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default AssignPanelForm;
