import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DropDown = ({
  fullWidth = true,
  label,
  name,
  value,
  options = [],
  onChange,
  style
}) => {
  return (
    <FormControl fullWidth={fullWidth} style={style}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={value} onChange={onChange}>
        {options.map(({ value, name }) => (
          <MenuItem key={value} value={value}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
