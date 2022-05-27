import { Grid, Typography } from "@mui/material";
import {
  Error as ErrorIcon,
  Verified as VerifiedIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";

// components
import Button from "../../../components/button/Button";

const SupervisorRow = ({ status = null, profile, classes, onButtonClick }) => {
  console.log(status);
  return (
    <>
      <Grid item xs={3}>
        <Typography variant="subtitle1">Request a supervisor</Typography>
      </Grid>
      <Grid container item spacing={2} xs={4} direction="row">
        <Grid item xs={1}>
          {status && status === "PENDING" && (
            <PendingIcon fontSize="large" className={classes.icon} />
          )}
          {!status && !profile?.group.supervisor && (
            <ErrorIcon fontSize="large" className={classes.icon} />
          )}
          {profile?.group.supervisor && (
            <VerifiedIcon
              fontSize="large"
              className={classes.icon}
              color="success"
            />
          )}
        </Grid>
        <Grid item xs={6} mt={1} ml={2}>
          <Typography variant="subtitle2">
            {profile?.group.supervisor
              ? profile.group.supervisor.email
              : "No supervisor"}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            label="Request"
            onClick={onButtonClick.bind(null, "supervisor")}
            disabled={!!profile?.group.supervisor || !!(status && status === 'pending')}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SupervisorRow;
