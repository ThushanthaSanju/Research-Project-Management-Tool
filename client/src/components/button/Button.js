import { Button as MaterialButton } from "@mui/material";

const Button = ({
  type = "button",
  variant = "contained",
  label,
  onClick,
  ...props
}) => {
  return (
    <MaterialButton
      type={type}
      variant={variant}
      onClick={onClick}
      sx={{ textTransform: "none" }}
      {...props}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;
