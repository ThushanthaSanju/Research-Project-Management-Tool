import { useContext, useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import {
  Error as ErrorIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

//context
import GlobalContext from "../../../context/global-context";

//components
import Modal from "../../../components/modal/Modal";
import GroupRow from "./GroupRow";
import ResearchTopicRow from "./ResearchTopicRow";
import SupervisorRow from "./SupervisorRow";
import CoSupervisorRow from "./CoSupervisorRow";
import GroupForm from "./GroupForm";
import ResearchTopicForm from "./ResearchTopicForm";
import RequestSupervisorForm from "./RequestSupervisorForm";

//service
import service from "../../../services/student-service";

const useStyles = makeStyles({
  icon: {
    color: "#a1a6a2",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const { open, loading, onLoading, onModalOpen, onModalClose } =
    useContext(GlobalContext);

  const [profile, setProfile] = useState();
  const [requests, setRequests] = useState([]);
  const [name, setName] = useState("");
  const [students, setStudents] = useState([
    JSON.parse(localStorage.getItem("user"))._id,
  ]);
  const [errors, setErrors] = useState({
    name: { error: false, text: "" },
    student1: { error: false, text: "" },
    student2: { error: false, text: "" },
    student3: { error: false, text: "" },
  });
  const [type, setType] = useState("group");
  const [topicTitle, setTopicTitle] = useState("");
  const [topicIntroduction, setTopicIntroduction] = useState("");
  const [topicTitleError, setTopicTitleError] = useState({
    error: false,
    text: "",
  });
  const [topicIntroductionError, setTopicIntroductionError] = useState({
    error: false,
    text: "",
  });
  const [supervisor, setSupervisor] = useState("");
  const [supervisorError, setsupervisorError] = useState({
    error: false,
    text: "",
  });
  const [coSupervisor, setCoSupervisor] = useState("");
  const [coSupervisorError, setCoSupervisorError] = useState({
    error: false,
    text: "",
  });

  const onButtonClick = (formType) => {
    setType(formType);
    onModalOpen();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTopicTitle(value);
    }

    if (name === 'introduction') {
      setTopicIntroduction(value);
    }
  }

  // validate supervisor form inpus
  const supervisorValidate = () => {
    if (supervisor.trim() === "") {
      setsupervisorError({ error: true, text: "Supervisor is required" });
      return false;
    }

    return true;
  };

  // validate co-supervisor form inputs
  const coSupervisorValidate = () => {
    if (coSupervisor.trim() === "") {
      setCoSupervisorError({ error: true, text: "Co-supervisor is required" });
      return false;
    }

    return true;
  };

  // validate topic form inputs
  const topicValidate = () => {
    if (topicTitle.trim() === "") {
      setTopicTitleError({ error: true, text: "Title is required" });
      return false;
    }

    if (topicIntroduction.trim() === "") {
      setTopicIntroduction({ error: true, text: "Introduction is required" });
      return false;
    }

    return true;
  };

  // validate group form inputs
  const groupValidate = () => {
    console.log(students[1]);
    if (name.trim() === "") {
      setErrors((prev) => {
        return {
          ...prev,
          name: { error: true, text: "Group name is required" },
        };
      });

      return false;
    }

    if (students[1] === undefined) {
      setErrors((prev) => {
        return {
          ...prev,
          student1: { error: true, text: "Student is required" },
        };
      });

      return false;
    }

    if (students[2] === undefined) {
      setErrors((prev) => {
        return {
          ...prev,
          student2: { error: true, text: "Student is required" },
        };
      });

      return false;
    }

    if (students[3] === undefined) {
      setErrors((prev) => {
        return {
          ...prev,
          student3: { error: true, text: "Student is required" },
        };
      });

      return false;
    }

    return true;
  };

  // handle group onChange handler
  const groupOnChangeHandler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "student1": {
        let temp = [...students];
        temp[1] = value;
        setStudents(temp);
        break;
      }
      case "student2": {
        let temp = [...students];
        temp[2] = value;
        setStudents(temp);
        break;
      }
      case "student3": {
        let temp = [...students];
        temp[3] = value;
        setStudents(temp);
        break;
      }

      default:
        break;
    }
  };

  // handle group submission
  const groupSubmitHandler = async (event) => {
    event.preventDefault();

    setErrors({
      name: { error: false, text: "" },
      student1: { error: false, text: "" },
      student2: { error: false, text: "" },
      student3: { error: false, text: "" },
    });

    if (groupValidate()) {
      onLoading(true);
      await service.postGroup({ name, students });
      onLoading(false);
      onModalClose();
      fetchProfile();
      return;
    }
  };

  // handle research topic submission
  const researchSubmitHandler = async (event) => {
    event.preventDefault();

    if (topicValidate()) {
      try {
        onLoading(true);

        // update research topic
        if (profile.group?.researchTopic) {
          await service.patchResearchTopic({
            _id: profile.group.researchTopic._id,
            title: topicTitle,
            introduction: topicIntroduction,
            group: profile.group._id,
          });
        } else {
          await service.postResearchTopic({
            title: topicTitle,
            introduction: topicIntroduction,
            group: profile.group._id,
          });
        }
        onLoading(false);
        onModalClose();
        fetchProfile();
      } catch (error) {
        onLoading(false);
        onModalClose();
        console.log(error);
      }
    }
  };

  // handle supervisor submission
  const requestSupervisorSubmitHandler = async (event) => {
    event.preventDefault();

    if (supervisorValidate()) {
      try {
        onLoading(true);
        await service.postRequest({
          researchTopic: profile.group.researchTopic._id,
          staffMember: supervisor,
          researchRole: "supervisor",
        });
        onLoading(false);
        onModalClose();
        fetchProfile();
      } catch (error) {
        onLoading(false);
        onModalClose();
        console.log(error);
      }
    }
  };

  // handle co-supervisor submission
  const requestCoSupervisorSubmitHandler = async (event) => {
    event.preventDefault();

    if (coSupervisorValidate()) {
      try {
        onLoading(true);
        await service.postRequest({
          researchTopic: profile.group.researchTopic._id,
          staffMember: coSupervisor,
          researchRole: "coSupervisor",
        });
        onLoading(false);
        onModalClose();
        fetchProfile();
      } catch (error) {
        onLoading(false);
        onModalClose();
        console.log(error);
      }
    }
  };

  const fetchProfile = async () => {
    onLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await service.getProfile(user._id);

    if (response.status === 200) {
      setProfile(response.data.body.user);
      fetchRequestStatus(response.data.body.user.group._id);
    }
    onLoading(false);
  };

  const fetchRequestStatus = async (id) => {
    try {
      const response = await service.postRequestStatus({ group: id });

      if (response.status === 200) {
        setRequests(response.data.body.requests);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const supervisorStatus = requests.filter(
    (request) => request.researchRole === "supervisor"
  );
  const coSupervisorStatus = requests.filter(
    (request) => request.researchRole === "coSupervisor"
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ minHeight: "400px" }}>
      <Grid container spacing={2}>
        {loading && (
          <CircularProgress sx={{ marginLeft: "50%", marginTop: "10%" }} />
        )}
        {!loading && (
          <>
            <GroupRow
              profile={profile}
              classes={classes}
              onButtonClick={onButtonClick}
            />
            <Grid item xs={12} />
            <ResearchTopicRow
              profile={profile}
              classes={classes}
              onButtonClick={onButtonClick}
            />
            <Grid item xs={12} />
            <SupervisorRow
              status={supervisorStatus[0]?.status}
              profile={profile}
              classes={classes}
              onButtonClick={onButtonClick}
            />
            <Grid item xs={12} />
            <CoSupervisorRow
              status={coSupervisorStatus[0]?.status}
              profile={profile}
              classes={classes}
              onButtonClick={onButtonClick}
            />
          </>
        )}
      </Grid>
      <Modal
        open={open}
        title={type === "group" || type === "topic" ? "Register" : "Request"}
        content={
          type === "group" ? (
            <GroupForm
              name={name}
              students={students}
              errors={errors}
              onChangeHandler={groupOnChangeHandler}
            />
          ) : type === "topic" ? (
            <ResearchTopicForm
              values={{ title: topicTitle, introduction: topicIntroduction }}
              errors={{
                title: topicTitleError.error,
                introduction: topicIntroductionError.error,
              }}
              helperTexts={{
                title: topicTitleError.text,
                introduction: topicIntroductionError.text,
              }}
              onChange={onChangeHandler}
            />
          ) : (
            <RequestSupervisorForm
              type={type}
              value={type === "supervisor" ? supervisor : coSupervisor}
              error={
                type === "supervisor"
                  ? supervisorError.error
                  : coSupervisorError.error
              }
              helperText={
                type === "supervisor"
                  ? supervisorError.text
                  : coSupervisorError.text
              }
              onChange={(event) => {
                if (event.target.name === "supervisor") {
                  setSupervisor(event.target.value);
                }
                if (event.target.name === "coSupervisor") {
                  setCoSupervisor(event.target.value);
                }
              }}
            />
          )
        }
        onClose={onModalClose}
        onSubmit={
          type === "group"
            ? groupSubmitHandler
            : type === "topic"
            ? researchSubmitHandler
            : type === "supervisor"
            ? requestSupervisorSubmitHandler
            : requestCoSupervisorSubmitHandler
        }
      />
    </div>
  );
};

export default Dashboard;
