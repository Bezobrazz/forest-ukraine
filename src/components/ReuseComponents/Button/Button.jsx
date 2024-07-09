import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({variant, color, title, onClick, icon}) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant={variant} color={color} onClick={onClick} endIcon={icon}>{title}</Button>
    </Stack>
  );
}

//The Button comes with three variants: text (default), 'contained', and 'outlined'.

//Prop "endIcon" add icon to the end of button. Choose icon - https://mui.com/material-ui/material-icons/?query=ad

//About more props and customize - https://mui.com/material-ui/react-button/