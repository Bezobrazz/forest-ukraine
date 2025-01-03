import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { GlobalStyles } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/de";

export default function BasicDatePicker({ label, value, onChange }) {
  return (
    <>
      <GlobalStyles
        styles={{
          ".css-10o2lyd-MuiStack-root": { paddingTop: 0, width: "100%" },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(newValue) =>
              onChange(newValue ? newValue.toISOString() : "")
            }
            sx={{ width: "100%" }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
