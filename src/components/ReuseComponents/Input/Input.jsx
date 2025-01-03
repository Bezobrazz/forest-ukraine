import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({
  label,
  type,
  value,
  size,
  placeholder,
  onChange,
}) {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        borderRadius: "8px",
        border: "2px solid var(--primary-color)",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        sx={{ width: "100%" }}
        label={label}
        variant="outlined"
        type={type}
        value={value}
        size={size}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
}
