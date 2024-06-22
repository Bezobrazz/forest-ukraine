import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({variant, color, title}) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant={variant} color={color}>{title}</Button>
    </Stack>
  );
}

//The Button comes with three variants: text (default), contained, and outlined.