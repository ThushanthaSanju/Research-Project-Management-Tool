import { useState, useContext, useEffect } from "react";
import { CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import {
  FilterList as FilterIcon,
  RemoveRedEye as ViewIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

// context
import GlobalContext from "../../../context/global-context";

// components
import DropDown from "../../../components/dropdown/DropDown";
import Modal from "../../../components/modal/Modal";
import TextField from "../../../components/textField/TextField";
import Notify from "../../../components/notify/Notify";

// services
import service from "../../../services/admin-services";

const options = [
  { value: "student", name: "Student" },
  { value: "staff", name: "Staff" },
  { value: "admin", name: "Admin" },
];

const gridColumns = [
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
  },
];

const formDetails = [
  {
    key: "f1",
    name: "firstName",
    label: "First Name",
    type: "text",
  },
  {
    key: "f2",
    name: "lastName",
    label: "Last Name",
    type: "text",
  },
  {
    key: "f3",
    name: "email",
    label: "Email",
    type: "text",
  },
  {
    key: "f4",
    name: "role",
    label: "Role",
    type: "dropdown",
    options,
  },
];

const Users = () => {
  const {
    open,
    loading,
    notify,
    onModalOpen,
    onModalClose,
    onLoading,
    onNotifyOpen,
  } = useContext(GlobalContext);

  const [role, setRole] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [rows, setRows] = useState([]);
  const [serverError, setServerError] = useState("");

  const dropDownChangeHandler = (event) => {
    setRole(event.target.value);
  };

  const viewClickHandler = (data) => {
    onModalOpen();
    setData(data);
  };

  const closeModalHandler = () => {
    onModalClose();
    setData({ firstName: "", lastName: "", email: "", role: "" });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      onLoading(true);
      const response = await service.patchUser(data._id, data);

      if (response.status === 200) {
        onModalClose();
        fetchUsers();
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      setServerError(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    const response = await service.deleteUser(id);

    if (response.status === 200) {
      onNotifyOpen();
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    try {
      onLoading(true);
      const response = await service.getUsers(role);
      if (response.status) {
        if (response.data.body && response.data.body.users) {
          setRows(response.data.body.users);
        }
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const columns = [
    ...gridColumns,
    {
      field: "actions",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={viewClickHandler.bind(null, params.row)}>
              <ViewIcon sx={{ color: "#00474F" }} />
            </IconButton>
            <IconButton onClick={deleteHandler.bind(null, params.row._id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  const content = (
    <Grid container spacing={2}>
      {serverError && (
        <Grid item xs={12}>
          <Typography color="red" variant="body1">
            {serverError}
          </Typography>
        </Grid>
      )}
      {formDetails.map((item) => {
        if (item.type === "dropdown") {
          return (
            <Grid key={item.key} item xs={12}>
              <DropDown
                name={item.name}
                label={item.label}
                value={data[item.name]}
                options={item.options}
                onChange={onChangeHandler}
              />
            </Grid>
          );
        }

        return (
          <Grid key={item.key} item xs={12}>
            <TextField
              fullWidth
              name={item.name}
              label={item.label}
              value={data[item.name]}
              helperText=""
              onChange={onChangeHandler}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <div style={{ minHeight: "400px" }}>
      <Grid container spacing={2}>
        <Grid container item xs={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Filters</Typography>
          </Grid>
          <Grid item xs={6}>
            <FilterIcon />
          </Grid>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={3}>
          <DropDown
            label="Role"
            name="role"
            value={role}
            options={options}
            onChange={dropDownChangeHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            {loading && <CircularProgress sx={{ marginLeft: "50%" }} />}
            {!loading && (
              <DataGrid
                columns={columns}
                rows={rows}
                getRowId={(row) => row._id}
                disableSelectionOnClick
                hideFooter
                disableColumnMenu
              />
            )}
          </div>
        </Grid>
      </Grid>
      <Modal
        title="Update details"
        open={open}
        content={content}
        buttonLabel="Update"
        onClose={closeModalHandler}
        onSubmit={submitHandler}
      />
      <Notify open={notify} message="User deleted successfully" />
    </div>
  );
};

export default Users;
