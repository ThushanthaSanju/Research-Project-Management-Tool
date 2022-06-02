import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, CircularProgress, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Forum as ForumIcon } from "@mui/icons-material";

// context
import GlobalContext from "../../../context/global-context";

// service
import service from "../../../services/staff-service";

const Groups = () => {
  const navigate = useNavigate();

  const { loading, onLoading } = useContext(GlobalContext);

  const [groups, setGroups] = useState([]);

  // fetch groups allocated to user
  const fetchGroups = async () => {
    try {
      onLoading(true);
      const response = await service.getGroups();

      if (response.status === 200) {
        setGroups(response.data.body.groups);
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error.message);
    }
  };

  const chatIconClickHandler = (id) => {
    navigate(`/group-chat/${id}`);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Group Name",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={chatIconClickHandler.bind(null, params.row._id)}>
          <ForumIcon sx={{ color: "#00474F" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "400px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {loading && <CircularProgress sx={{ marginLeft: "50%" }} />}
          {!loading && (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                columns={columns}
                rows={groups}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                hideFooter
                disableColumnMenu
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Groups;
