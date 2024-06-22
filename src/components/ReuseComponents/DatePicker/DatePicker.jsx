import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GlobalStyles } from '@mui/material';
import dayjs from 'dayjs';

export default function BasicDatePicker({ label, value, onChange }) {
  return (
    <>
      <GlobalStyles styles={{ '.css-10o2lyd-MuiStack-root': { paddingTop: 0, width: '100%' } }} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={label} value={value ? dayjs(value) : null}
            onChange={(newValue) => onChange(newValue ? newValue.toISOString() : '')} sx={{ width: '100%' }} />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
