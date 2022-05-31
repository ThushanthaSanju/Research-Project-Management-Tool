import { useContext, useEffect, useState } from "react";
import { Grid, Typography, IconButton, CircularProgress } from "@mui/material";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

// context
import GlobalContext from "../../../context/global-context";

// components
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";

// services
import service from "../../../services/admin-services";
import AssignPanelForm from "./AssignPanelForm";
import NewPanelForm from "./NewPanelForm";

const gridColumns = [
  {
    field: "name",
    headerName: "Group Name",
    flex: 1,
  },
  {
    field: "student_1",
    headerName: "Student 1",
    flex: 1,
    renderCell: (params) => (
      <Typography>{params.row.students[0].email}</Typography>
    ),
  },
  {
    field: "student_2",
    headerName: "Student 2",
    flex: 1,
    renderCell: (params) => (
      <Typography>{params.row.students[1].email}</Typography>
    ),
  },
  {
    field: "student_3",
    headerName: "Student 3",
    flex: 1,
    renderCell: (params) => (
      <Typography>{params.row.students[2].email}</Typography>
    ),
  },
  // {
  //   field: "student_4",
  //   headerName: "Student 4",
  //   flex: 1,
  //   renderCell: (params) => (
  //     <Typography>{params.row?.students[3].email}</Typography>
  //   ),
  // },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {params.row.panel ? "Allocated" : "Not allocated"}
      </Typography>
    ),
  },
];

const PanelMembers = () => {
  const { open, loading, onLoading, onModalOpen, onModalClose } =
    useContext(GlobalContext);

  const [rows, setRows] = useState([]);
  const [type, setType] = useState("panel");
  const [panel, setPanel] = useState("");
  const [groupId, setGroupId] = useState("");
  const [values, setValues] = useState({
    name: "",
    member1: "",
    member2: "",
    member3: "",
    member4: "",
  });
  const [panelServerError, setPanelServerError] = useState('');
  const [allocateServerError, setAllocateServerError] = useState('');

  const fetchGroups = async () => {
    onLoading(true);
    const response = await service.getGroups();

    if (response.status === 200) {
      setRows(response.data.body.groups);
    }
    onLoading(false);
  };

  const assignClickHandler = (id) => {
    setGroupId(id);
    setType("assign");
    onModalOpen();
  };

  const newClickHandler = () => {
    setType("panel");
    onModalOpen();
  };

  // handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "panel":
        setPanel(value);
        break;
      case "name":
        setValues({ ...values, name: value });
        break;
      case "member1":
        setValues({ ...values, member1: value });
        break;
      case "member2":
        setValues({ ...values, member2: value });
        break;
      case "member3":
        setValues({ ...values, member3: value });
        break;
      case "member4":
        setValues({ ...values, member4: value });
        break;
      default:
        break;
    }
  };

  // handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // if type is assign then assign new panel
    if (type === "assign") {
      try {
        onLoading(true);
        await service.patchPanel(groupId, { panel: panel });
        onLoading(false);
        onModalClose();
        fetchGroups();
      } catch (error) {
        onLoading(false);
        setAllocateServerError(error.response.data.message);
      }
      return;
    }

    if (type === "panel") {
      try {
        onLoading(true);
        await service.postPanel({
          name: values.name,
          members: [
            values.member1,
            values.member2,
            values.member3,
            values.member4,
          ],
        });
        onLoading(false);
        onModalClose();
      } catch (error) {
        onLoading(false);
        setPanelServerError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const columns = [
    ...gridColumns,
    {
      field: "actions",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        if (!params.row.panel) {
          return (
            <IconButton onClick={assignClickHandler.bind(null, params.row._id)}>
              <AddIcon sx={{ color: "#00474F" }} />
            </IconButton>
          );
        }
      },
    },
  ];

  return (
    <div style={{ minHeight: '400px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button
            label="New Panel"
            sx={{ float: "right", textTransform: "none" }}
            onClick={newClickHandler}
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
        open={open}
        title={type === "panel" ? "New panel" : "Assign a panel"}
        content={
          type === "panel" ? (
            <NewPanelForm values={values} serverError={panelServerError} onChange={onChangeHandler} />
          ) : (
            <AssignPanelForm value={panel} serverError={allocateServerError} onChange={onChangeHandler} />
          )
        }
        onClose={onModalClose}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default PanelMembers;
