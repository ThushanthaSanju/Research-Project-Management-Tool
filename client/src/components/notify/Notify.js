import { useContext } from "react";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";

// components
import Button from "../button/Button";

// context
import GlobalContext from "../../context/global-context";

const Notify = ({ open, message }) => {
  const { onNotifyClose } = useContext(GlobalContext);

  return (
    <Dialog open={open} onClose={onNotifyClose}>
      <DialogContent>
        <Grid container spacing={2} p={2} direction="column" alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6">Success</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{message}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button label="Continue" onClick={onNotifyClose} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Notify;
