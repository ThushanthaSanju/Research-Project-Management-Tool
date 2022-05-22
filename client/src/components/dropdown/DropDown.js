import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";

const DropDown = ({
  fullWidth = true,
  error = false,
  label,
  name,
  value,
  helperText = "",
  options = [],
  onChange,
  style
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={error} style={style}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange}>
        {options.map(({ value, name }) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default DropDown;
