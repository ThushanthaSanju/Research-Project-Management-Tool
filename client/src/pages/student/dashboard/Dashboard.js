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
  const [topicTitleError, setTopicTitleError] = useState({
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
      return;
    }
  };

  // handle research topic submission
  const researchSubmitHandler = async (event) => {
    event.preventDefault();

    if (topicValidate()) {
      try {
        onLoading(true);
        await service.postResearchTopic({
          title: topicTitle,
          group: profile.group._id,
        });
        onLoading(false);
        onModalClose();
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
          researchTopic: "",
          staffMember: supervisor,
          researchRole: "supervisor",
        });
        onLoading(false);
        onModalClose();
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
          researchTopic: "",
          staffMember: coSupervisor,
          researchRole: "coSupervisor",
        });
        onLoading(false);
        onModalClose();
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
    }
    onLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ minHeight: "400px" }}>
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
              profile={profile}
              classes={classes}
              onButtonClick={onButtonClick}
            />
            <Grid item xs={12} />
            <CoSupervisorRow
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
              value={topicTitle}
              error={topicTitleError.error}
              helperText={topicTitleError.text}
              onChange={(event) => setTopicTitle(event.target.value)}
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
                if (event.target.name === 'coSupervisor') {
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
    </>
  );
};

export default Dashboard;
