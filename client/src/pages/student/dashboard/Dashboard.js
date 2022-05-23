import { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import {
  Error as ErrorIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

//context
import GlobalContext from "../../../context/global-context";

//components
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import GroupForm from "./GroupForm";

//service
import service from "../../../services/student-service";

const useStyles = makeStyles({
  icon: {
    color: "#a1a6a2",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const { open, onLoading, onModalOpen, onModalClose } = useContext(GlobalContext);

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

  const validate = () => {
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

  const onChangeHandler = (event) => {
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

  const submitHandler = async (event) => {
    event.preventDefault();

    setErrors({
      name: { error: false, text: "" },
      student1: { error: false, text: "" },
      student2: { error: false, text: "" },
      student3: { error: false, text: "" },
    });

    if (validate()) {
      onLoading(true);
      await service.postGroup({ name, students });
      onLoading(false);
      onModalClose();
      return;
    }
  };

  const fetchProfile = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await service.getProfile(user._id);

    if (response.status === 200) {
      setProfile(response.data.body.user);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Register a group</Typography>
        </Grid>
        <Grid container item spacing={2} xs={4} direction="row">
          <Grid item xs={1}>
            {!profile?.group && (
              <ErrorIcon fontSize="large" className={classes.icon} />
            )}
            {profile?.group && (
              <VerifiedIcon
                fontSize="large"
                className={classes.icon}
                color="success"
              />
            )}
          </Grid>
          <Grid item xs={3} mt={1} ml={2}>
            <Typography variant="subtitle2">
              {profile?.group ? profile.group.name : "No group"}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              label="Register"
              onClick={onModalOpen}
              disabled={!!profile?.group}
            />
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        title="Register"
        content={
          <GroupForm
            name={name}
            students={students}
            errors={errors}
            onChangeHandler={onChangeHandler}
          />
        }
        onClose={onModalClose}
        onSubmit={submitHandler}
      />
    </>
  );
};

export default Dashboard;
