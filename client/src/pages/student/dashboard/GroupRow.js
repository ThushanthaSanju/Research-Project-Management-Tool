import { Grid, Typography } from "@mui/material";
import {
  Error as ErrorIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";

// components
import Button from "../../../components/button/Button";

const GroupRow = ({ profile, classes, onButtonClick }) => {
  return (
    <>
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
        <Grid item xs={6} mt={1} ml={2}>
          <Typography variant="subtitle2">
            {profile?.group ? profile.group.name : "No group"}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            label="Register"
            onClick={onButtonClick.bind(null, "group")}
            disabled={!!profile?.group}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GroupRow;
