import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";

// context
import GlobalContext from "../../../context/global-context";

// components
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import UploadForm from "./UploadForm";

// services
import service from "../../../services/student-service";

const Uploads = () => {
  const { open, loading, onModalOpen, onModalClose, onLoading } =
    useContext(GlobalContext);

  const [profile, setProfile] = useState(null);
  const [submissionTypes, setSubmissionTypes] = useState([]);
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState({ error: false, text: "" });

  // fetch profile details
  const fetchProfile = async () => {
    onLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await service.getProfile(user._id);

    if (response.status === 200) {
      setProfile(response.data.body.user);
    }
    onLoading(false);
  };

  const onButtonClickHandler = (id) => {
    onModalOpen();
    setId(id);
  };

  // validate inputs
  const validate = () => {
    if (file === null) {
      setError({ error: true, text: "File is required" });
      return false;
    }

    return true;
  };

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  // submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (validate()) {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const data = new FormData();
      data.append("file", file);
      data.append("group_id", profile.group._id);
      data.append("type_id", id);

      try {
        onLoading(true);
        await service.postSubmission(data, config);
        onLoading(false);
        onModalClose();
      } catch (error) {
        console.log(error.message);
        onLoading(false);
        onModalClose();
      }
    }
  };

  // fetch submission types
  const fetchSubmissionTypes = async () => {
    onLoading(true);
    const response = await service.getSubmissionTypes();
    if (response.status === 200) {
      setSubmissionTypes(response.data.body.submissions);
    }
    onLoading(false);
  };

  useEffect(() => {
    fetchSubmissionTypes();
    fetchProfile();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ minHeight: "400px" }}>
        {loading && (
          <CircularProgress sx={{ marginLeft: "50%", marginTop: "10%" }} />
        )}
        {!loading &&
          submissionTypes.map((item) => (
            <>
              <Grid item xs={4}>
                <Typography variant="subtitle1">{item.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  label="Upload"
                  onClick={onButtonClickHandler.bind(null, item._id)}
                />
              </Grid>
              <Grid item xs={12} />
            </>
          ))}
      </Grid>
      <Modal
        open={open}
        title="Upload"
        content={
          <UploadForm
            errors={error.error}
            helperTexts={error.text}
            onChange={onChangeHandler}
          />
        }
        onSubmit={onSubmitHandler}
        onClose={onModalClose}
      />
    </>
  );
};

export default Uploads;
