import { Grid, Typography } from "@mui/material";
import {
  Error as ErrorIcon,
  Verified as VerifiedIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";

// components
import Button from "../../../components/button/Button";

const ResearchTopicRow = ({ profile, classes, onButtonClick }) => {
  let disabled = false;

  if (!profile?.group?.researchTopic) {
    disabled = false;
  }

  if (profile?.group?.researchTopic?.isAcceptedByPanel) {
    disabled = true;
  }

  if (
    profile?.group?.researchTopic &&
    profile?.group?.researchTopic.isAcceptedByPanel === undefined
  ) {
    disabled = true;
  }

  if (
    profile?.group?.researchTopic?.isAcceptedByPanel &&
    profile?.group?.researchTopic?.isAcceptedByPanel === false
  ) {
    disabled = false;
  }

  return (
    <>
      <Grid item xs={3}>
        <Typography variant="subtitle1">Register a research topic</Typography>
      </Grid>
      <Grid container item spacing={2} xs={4} direction="row">
        <Grid item xs={1}>
          {!profile?.group?.researchTopic && (
            <ErrorIcon fontSize="large" className={classes.icon} />
          )}
          {profile?.group?.researchTopic &&
            profile?.group.researchTopic?.isAcceptedByPanel === false && (
              <ErrorIcon fontSize="large" className={classes.icon} />
            )}
          {profile?.group?.researchTopic &&
            profile.group?.researchTopic.isAcceptedByPanel && (
              <VerifiedIcon
                fontSize="large"
                className={classes.icon}
                color="success"
              />
            )}
          {profile?.group?.researchTopic &&
            profile?.group?.researchTopic.isAcceptedByPanel === undefined && (
              <PendingIcon fontSize="large" className={classes.icon} />
            )}
        </Grid>
        <Grid item xs={6} mt={1} ml={2}>
          <Typography variant="subtitle2">
            {profile?.group?.researchTopic
              ? profile.group?.researchTopic?.title
              : "No research topic"}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button
            label="Register"
            onClick={onButtonClick.bind(null, "topic")}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ResearchTopicRow;
