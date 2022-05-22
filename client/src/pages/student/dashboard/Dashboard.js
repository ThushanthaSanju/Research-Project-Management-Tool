import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

//context
import GlobalContext from "../../../context/global-context";

//components
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import GroupForm from "./GroupForm";

const useStyles = makeStyles({
  icon: {
    color: "#a1a6a2",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const { open, onModalOpen, onModalClose } = useContext(GlobalContext);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Register a group</Typography>
        </Grid>
        <Grid container item spacing={2} xs={4} direction="row">
          <Grid item xs={1}>
            <ErrorIcon fontSize="large" className={classes.icon} />
          </Grid>
          <Grid item xs={2} mt={1} ml={2}>
            <Typography variant="subtitle2">hello</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button label="Register" onClick={onModalOpen} />
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        title="Register"
        content={<GroupForm />}
        onClose={onModalClose}
      />
    </>
  );
};

export default Dashboard;
