import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({label, type, value, onChange}) {
  return (
    <Box
      component="form"
      sx={{
        width: "100%"
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" sx={{width: "100%"}} label={label} variant="outlined" type={type} value={value} onChange={onChange}/>
    </Box>
  );
}