import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// components
import Button from "../button/Button";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {props.children}
      {props.onClose ? (
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Modal = ({
  title,
  open,
  onClose,
  onSubmit,
  content,
  buttonLabel = "Submit",
}) => {
  return (
    <form onSubmit={onSubmit}>
      <BootstrapDialog open={open} onClose={onClose}>
        <BootstrapDialogTitle onClose={onClose}>{title}</BootstrapDialogTitle>
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions>
          <Button type="submit" label={buttonLabel} />
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
};

export default Modal;
