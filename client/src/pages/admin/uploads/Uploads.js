import { useState, useContext, useEffect } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

// context
import GlobalContext from "../../../context/global-context";

// service
import service from "../../../services/admin-services";

// components
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import UploadForm from "./UploadForm";

const initValues = { submission_type: "", file: null };
const initErrors = { submission_type: false, file: false };
const initText = { submission_type: "", file: "" };

const columns = [
  {
    field: "submission_type",
    headerName: "Type",
    flex: 1,
    renderCell: (params) => (
      <Typography>{params.row.submission_type.name}</Typography>
    ),
  },
  {
    field: "file_name",
    headerName: "Uploaded File Name",
    flex: 1,
  },
];

const Uploads = () => {
  const { open, loading, onLoading, onModalOpen, onModalClose } =
    useContext(GlobalContext);

  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState(initErrors);
  const [helperTexts, setHelperTexts] = useState(initText);
  const [rows, setRows] = useState([]);
  const [options, setOptions] = useState([]);
  const [serverError, setServerError] = useState("");

  const onModalCloseHandler = () => {
    setValues(initValues);
    onModalClose();
  };

  // fetch submissions
  const fetchSubmissions = async () => {
    try {
      onLoading(true);
      const response = await service.getSubmissionTypes();

      if (response.status === 200) {
        if (response.data && response.data.body) {
          setOptions(
            response.data.body.submissions.map((submission) => {
              return { value: submission._id, name: submission.name };
            })
          );
        }
      }
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  // fetch documents
  const fetchDocuments = async () => {
    try {
      onLoading(true);
      const response = await service.getDocuments();
      if (response.status === 200) {
        setRows(response.data.body.documents);
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  // validate input fields
  const validate = () => {
    if (values.submission_type.trim() === "") {
      setErrors({ submission_type: true, file: false });
      setHelperTexts({
        ...helperTexts,
        submission_type: "Submission type is required",
      });

      return false;
    }

    if (values.file === null) {
      setErrors({ submission_type: false, file: true });
      setHelperTexts({ submission_type: "", file: "File is required" });
      return false;
    }

    setErrors(initErrors);
    setHelperTexts(initText);
    return true;
  };

  const onChangeHandler = (event) => {
    const { name, value, files } = event.target;

    setValues((prev) => {
      return { ...prev, [name]: name === "submission_type" ? value : files[0] };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (validate()) {
      // send data
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const data = new FormData();
      data.append("file", values.file);
      data.append("submission_type", values.submission_type);
      try {
        onLoading(true);
        await service.postDocument(data, config);
        onModalCloseHandler();
        onLoading(false);
        fetchDocuments();
      } catch (error) {
        onLoading(false);
        setServerError(error.response.data.message)
      }
    }
  };

  useEffect(() => {
    fetchDocuments();
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
        title="Upload new"
        content={
          <UploadForm
            values={values}
            errors={errors}
            helperTexts={helperTexts}
            options={options}
            serverError={serverError}
            onChange={onChangeHandler}
          />
        }
        onClose={onModalCloseHandler}
        onSubmit={submitHandler}
      />
    </div>
  );
};

export default Uploads;
