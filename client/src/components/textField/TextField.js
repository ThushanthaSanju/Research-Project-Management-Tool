import { TextField as MaterialTextField } from "@mui/material";

const TextField = ({
  name,
  type = "text",
  label,
  value,
  error = false,
  helperText,
  fullWidth = false,
  onChange,
  ...props
}) => {
  return (
    <MaterialTextField
      name={name}
      type={type}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      onChange={onChange}
      {...props}
    />
  );
};

export default TextField;
