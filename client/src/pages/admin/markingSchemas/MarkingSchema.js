import { useState, useContext, useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

// context
import GlobalContext from "../../../context/global-context";

// components
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import SchemaForm from "./SchemaForm";

// services
import service from "../../../services/admin-services";

const gridColumns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "fileName",
    headerName: "Uploaded File Name",
    flex: 1,
  },
];

const MarkingSchema = () => {
  const { loading, open, onModalOpen, onModalClose, onLoading } =
    useContext(GlobalContext);

  const [rows, setRows] = useState([]);
  const [values, setValues] = useState({ name: "", file: null });
  const [errors, setErrors] = useState({ name: false, file: false });
  const [helperTexts, setHelperTexts] = useState({ name: "", file: "" });

  // handle input changes
  const onChangeHandler = (event) => {
    const { name, value, files } = event.target;

    setValues((prev) => {
      return { ...prev, [name]: name === "name" ? value : files[0] };
    });
  };

  // validate input values
  const validate = () => {
    setErrors({ name: false, type: false });
    setHelperTexts({ name: "", type: "" });

    if (values.name.trim() === "" && values.file === null) {
      setErrors({ name: true, file: true });
      setHelperTexts({ name: "Name is required", file: "File is required" });
      return false;
    }

    if (values.name.trim() === "") {
      setErrors({ name: true, file: false });
      setHelperTexts({ name: "Name is required", file: "" });
      return false;
    }

    if (values.file === null) {
      setErrors({ name: false, file: true });
      setHelperTexts({ name: "", file: "File is required" });
      return false;
    }

    return true;
  };

  // fetch all marking schemas
  const fetchMarkingSchemas = async () => {
    onLoading(true);
    const response = await service.getMarkingSchemas();

    if (response.status === 200) {
      if (response.data.body) {
        setRows(response.data.body.schemas);
      }
    }
    onLoading(false);
  };

  // add new marking schema
  const addSchema = async () => {
    onLoading(true);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const data = new FormData();
    data.append("file", values.file);
    data.append("name", values.name);

    await service.postMarkingSchemas(data, config);
    onLoading(false);
    onModalClose();
    fetchMarkingSchemas();
    setValues({ name: '', file: null })
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (validate()) {
      addSchema();
      return;
    }
  };

  useEffect(() => {
    fetchMarkingSchemas();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button
            label="Add"
            startIcon={<AddIcon />}
            sx={{ float: "right", textTransform: "none" }}
            onClick={onModalOpen}
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
        content={
          <SchemaForm
            values={values}
            errors={errors}
            helperTexts={helperTexts}
            onChange={onChangeHandler}
          />
        }
        onClose={onModalClose}
        onSubmit={submitHandler}
      />
    </>
  );
};

export default MarkingSchema;
