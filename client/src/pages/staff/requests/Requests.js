import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";

// context
import GlobalContext from "../../../context/global-context";

// components
import RequestItem from "./RequestItem";
import Modal from "../../../components/modal/Modal";
import StatusChangeForm from "./StatusChangeForm";

// services
import service from "../../../services/staff-service";

const PendingTopics = () => {
  const { loading, open, onModalOpen, onModalClose, onLoading } =
    useContext(GlobalContext);

  const [supervisorRequests, setSupervisorRequests] = useState([]);
  const [coSupervisorRequests, setCoSupervisorRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("accepted");

  // fetch requests
  const fetchRequests = async (type) => {
    try {
      onLoading(true);
      const response = await service.getRequests(`researchRole=${type}`);

      if (response.status === 200) {
        if (type === "supervisor") {
          setSupervisorRequests(response.data.body.requests);
        }
        if (type === "coSupervisor") {
          setCoSupervisorRequests(response.data.body.requests);
        }
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  const onClickHandler = (id) => {
    setSelected(id);
    onModalOpen();
  };

  // handle form submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // update request
    try {
      onLoading(true);
      await service.patchRequests(selected, { status });
      onLoading(false);
      fetchRequests("supervisor");
      fetchRequests("coSupervisor");
      onModalClose();
    } catch (error) {
      onLoading(false);
      onModalClose();
      fetchRequests("supervisor");
      fetchRequests("coSupervisor");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests("supervisor");
    fetchRequests("coSupervisor");
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ minHeight: "400px" }}>
        <Grid item xs={12}>
          <Typography variant="h6">All Requests</Typography>
        </Grid>
        {loading && (
          <CircularProgress sx={{ marginLeft: "50%", marginTop: "8%" }} />
        )}
        {!loading && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">As Supervisor</Typography>
          </Grid>
        )}
        {!loading &&
          supervisorRequests.length > 0 &&
          supervisorRequests.map((request, index) => (
            <Grid key={index} item xs={4}>
              <RequestItem
                id={request._id}
                title={request.title}
                group={request.groupName}
                status={request.status}
                onClick={onClickHandler}
              />
            </Grid>
          ))}
        {!loading && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">As Co-supervisor</Typography>
          </Grid>
        )}
        {!loading &&
          coSupervisorRequests.length > 0 &&
          coSupervisorRequests.map((request) => (
            <Grid key={request._id} item xs={4}>
              <RequestItem
                id={request._id}
                title={request.title}
                group={request.groupName}
                status={request.status}
                onClick={onClickHandler}
              />
            </Grid>
          ))}
      </Grid>
      <Modal
        open={open}
        title="Accept or reject"
        content={
          <StatusChangeForm
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          />
        }
        onClose={onModalClose}
        onSubmit={onSubmitHandler}
      />
    </>
  );
};

export default PendingTopics;
