import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  label,
  value,
  onChange,
  options = [],
  fullWidth = true,
  minWidth = 120,
  ...props
}) {
  return (
    <Box
      sx={{
        minWidth,
        width: fullWidth ? "100%" : "auto",
        border: "2px solid var(--primary-color)",
        borderRadius: "8px",
      }}
    >
      <FormControl fullWidth={fullWidth}>
        <InputLabel
          sx={{
            color: "var(--primary-color)",
          }}
          id="select-label"
          shrink
        >
          {label}
        </InputLabel>
        <Select
          sx={{
            backgroundColor: "white",
          }}
          size="small"
          labelId="select-label"
          id="select"
          value={value}
          label={label}
          onChange={onChange}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
