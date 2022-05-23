import { Grid, Typography } from "@mui/material";
import {
  Error as ErrorIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";

// components
import Button from "../../../components/button/Button";

const CoSupervisorRow = ({ profile, classes, onButtonClick }) => {
  return (
    <>
      <Grid item xs={3}>
        <Typography variant="subtitle1">Request a co-supervisor</Typography>
      </Grid>
      <Grid container item spacing={2} xs={4} direction="row">
        <Grid item xs={1}>
          {!profile?.group.coSupervisor && (
            <ErrorIcon fontSize="large" className={classes.icon} />
          )}
          {profile?.group.coSupervisor && (
            <VerifiedIcon
              fontSize="large"
              className={classes.icon}
              color="success"
            />
          )}
        </Grid>
        <Grid item xs={4} mt={1} ml={2}>
          <Typography variant="subtitle2">
            {profile?.group.coSupervisor
              ? profile.group.coSupervisor.email
              : "No supervisor"}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            label="Request"
            onClick={onButtonClick.bind(null, "co-supervisor")}
            disabled={!!profile?.group.coSupervisor}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CoSupervisorRow;
