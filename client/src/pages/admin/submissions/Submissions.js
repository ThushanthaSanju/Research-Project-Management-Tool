import { useState, useContext, useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

// context
import GlobalContext from "../../../context/global-context";

// service
import service from "../../../services/admin-services";

// components
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import SubmissionForm from "./SubmissionForm";

const gridColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
];

const Submissions = () => {
  const { open, loading, onLoading, onModalOpen, onModalClose } =
    useContext(GlobalContext);

  const [rows, setRows] = useState([]);
  const [values, setValues] = useState({ name: "", type: "" });
  const [errors, setErrors] = useState({ name: false, type: false });
  const [helperTexts, setHelperTexts] = useState({ name: "", type: "" });

  // validate input values
  const validate = () => {
    setErrors({ name: false, type: false });
    setHelperTexts({ name: "", type: "" });

    if (values.name.trim() === "" && values.type.trim() === "") {
      setErrors({ name: true, type: true });
      setHelperTexts({ name: "Name is required", type: "Type is required" });
      return false;
    }

    if (values.name.trim() === "") {
      setErrors({ name: true, type: false });
      setHelperTexts({ name: "Name is required", type: "" });
      return false;
    }

    if (values.type.trim() === "") {
      setErrors({ name: false, type: true });
      setHelperTexts({ name: "", type: "Type is required" });
      return false;
    }

    return true;
  };

  // fetch submissions
  const fetchSubmissions = async () => {
    onLoading(true);
    const response = await service.getSubmissionTypes();

    if (response.status === 200) {
      if (response.data && response.data.body) {
        setRows(response.data.body.submissions);
      }
    }
    onLoading(false);
  };

  // add new submission
  const addSubmission = async () => {
    onLoading(true);
    await service.postSubmissionTypes(values);
    fetchSubmissions();
    onLoading(false);
    onModalClose();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (validate()) {
      addSubmission();
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div style={{ minHeight: '400px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button
            label="Add"
            startIcon={<AddIcon />}
            onClick={onModalOpen}
            sx={{ float: "right", textTransform: "none" }}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            {loading && <CircularProgress sx={{ marginLeft: "50%" }} />}
            {!loading && (
              <DataGrid
                columns={gridColumns}
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
        title="Add new"
        content={
          <SubmissionForm
            values={values}
            errors={errors}
            helperTexts={helperTexts}
            onChange={onChangeHandler}
          />
        }
        onClose={onModalClose}
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default Submissions;
