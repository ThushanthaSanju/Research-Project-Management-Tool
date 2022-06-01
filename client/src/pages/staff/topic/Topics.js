import React, { useContext, useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";

// context
import GlobalContext from "../../../context/global-context";

// component
import TopicIte from "./TopicIte";
import Modal from "../../../components/modal/Modal";
import EvaluateForm from "./EvaluateForm";

// service
import service from "../../../services/staff-service";

const Topics = () => {
  const { open, loading, onLoading, onModalOpen, onModalClose } =
    useContext(GlobalContext);

  const [groups, setGroups] = useState([]);
  const [id, setId] = useState("");
  const [isAcceptedByPanel, setIsAcceptedByPanel] = useState();
  const [isAcceptedByPaneError, setIsAcceptedByPanelError] = useState(false);
  const [isAcceptedByPaneHelperText, setIsAcceptedByPaneHelperText] =
    useState("");
  const [feedBack, setFeedBack] = useState("");
  const [feedBackError, setFeedBackError] = useState(false);
  const [feedBackHelperText, setFeedBackHelperText] = useState("");

  const onClickHandler = (id) => {
    console.log(id);
    setId(id);
    onModalOpen();
  };

  // handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "isAcceptedByPanel") {
      setIsAcceptedByPanel(value);
    }
    if (name === "feedback") {
      setFeedBack(value);
    }
  };

  // validate inputs
  const validate = () => {
    if (feedBack.trim() === "") {
      setFeedBackError(true);
      setFeedBackHelperText("Feed back is required");
      return false;
    }

    return true;
  };

  // submit form
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (validate()) {
      try {
        await service.patchResearchTopic(id, {
          isAcceptedByPanel,
          panelFeedback: feedBack,
        });
        fetchGroups();
        onModalClose();
      } catch (error) {
        onLoading(false);
        console.log(error);
      }
    }
  };

  // fetch groups
  const fetchGroups = async () => {
    try {
      onLoading(true);
      const response = await service.getPanelGroups();

      if (response.status === 200) {
        setGroups(response.data.body.groups);
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div style={{ minHeight: "400px" }}>
      {loading && <CircularProgress sx={{ marginLeft: "50%" }} />}
      {!loading && (
        <Grid container p={2} spacing={2}>
          {groups.map((item, index) => {
            if (
              item.researchTopic.isAcceptedByPanel ||
              item.researchTopic.isAcceptedByPanel === undefined
            ) {
              return (
                <TopicIte
                  key={index}
                  title={item.name}
                  topic={item.researchTopic?.title}
                  researchTopic={item.researchTopic}
                  onClick={onClickHandler.bind(null, item.researchTopic?._id)}
                />
              );
            }
            return;
          })}
        </Grid>
      )}
      <Modal
        open={open}
        title="Accept or reject"
        content={
          <EvaluateForm
            values={{
              isAcceptedByPanel: isAcceptedByPanel,
              feedback: feedBack,
            }}
            errors={{
              isAcceptedByPanel: isAcceptedByPaneError,
              feedback: feedBackError,
            }}
            helperTexts={{
              isAcceptedByPanel: isAcceptedByPaneHelperText,
              feedback: feedBackHelperText,
            }}
            onChange={onChangeHandler}
          />
        }
        onClose={onModalClose}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default Topics;
