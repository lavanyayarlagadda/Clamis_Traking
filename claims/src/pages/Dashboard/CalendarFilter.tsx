import {
  Popover,
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
} from "date-fns";
import { useState } from "react";
import { ButtonComponent } from "../../components/reusable/Button";
import { DropdownComponent, DropdownOption } from "../../components/reusable/Dropdown";

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onApply: (from: Date | null, to: Date | null, label: string) => void;
}

const DashboardFilterPopover = ({ anchorEl, onClose, onApply,open }: Props) => {

  const [type, setType] = useState("today");
   const [selectedPeriod, setSelectedPeriod] = useState<DropdownOption | null>({
    label: 'Today',
    value: 'today',
  });

  const [monthDate, setMonthDate] = useState<Date | null>(new Date());
  const [weekDate, setWeekDate] = useState<Date | null>(new Date());
  const [quarterDate, setQuarterDate] = useState<Date | null>(new Date());
  const [yearDate, setYearDate] = useState<Date | null>(new Date());
  const [customFrom, setCustomFrom] = useState<Date | null>(null);
  const [customTo, setCustomTo] = useState<Date | null>(null);

  const handleApply = () => {
    let from: Date | null = null;
    let to: Date | null = null;

    switch (type) {
      case "today":
        from = new Date();
        to = new Date();
        break;
      case "week":
        from = startOfWeek(weekDate || new Date(), { weekStartsOn: 1 });
        to = endOfWeek(weekDate || new Date(), { weekStartsOn: 1 });
        break;
      case "month":
        from = startOfMonth(monthDate || new Date());
        to = endOfMonth(monthDate || new Date());
        break;
      case "quarter":
        from = startOfQuarter(quarterDate || new Date());
        to = endOfQuarter(quarterDate || new Date());
        break;
      case "year":
        from = startOfYear(yearDate || new Date());
        to = endOfYear(yearDate || new Date());
        break;
      case "custom":
        from = customFrom;
        to = customTo;
        break;
    }

    onApply(from, to, type);
    onClose();
  };

    const periodOptions: DropdownOption[] = [
    { label: 'Today', value: 'today' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' },
    { label: 'Custom Range', value: 'custom' },
  ];


  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
       sx={{  display: "flex", padding: 1, mt: 12 }}
    >
    <Box
  sx={{
    p: 3,
    pr: { xs: '30px', sm: 3 }, 
    '@media (min-width:300px) and (max-width:374px)': {
      pr: '50px', // 6 * 8 = 48px
    },
    width: 320,
  }}
>
        <Typography variant="subtitle1" mb={1}>
        Select Period
      </Typography>
      <DropdownComponent
        options={periodOptions}
        value={selectedPeriod}
        onChange={setSelectedPeriod}
      />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {type === "week" && (
            <DatePicker
              label="Select a Day"
              value={weekDate}
              onChange={setWeekDate}
              slotProps={{ textField: { fullWidth: true, size: "small", sx: { mt: 2 } } }}
            />
          )}
          {type === "month" && (
            <DatePicker
              views={["year", "month"]}
              label="Select Month"
              value={monthDate}
              onChange={setMonthDate}
              slotProps={{ textField: { fullWidth: true, size: "small", sx: { mt: 2 } } }}
            />
          )}
          {type === "quarter" && (
            <DatePicker
              views={["year", "month"]}
              label="Pick Month (in quarter)"
              value={quarterDate}
              onChange={setQuarterDate}
              slotProps={{ textField: { fullWidth: true, size: "small", sx: { mt: 2 } } }}
            />
          )}
          {type === "year" && (
            <DatePicker
              views={["year"]}
              label="Select Year"
              value={yearDate}
              onChange={setYearDate}
              slotProps={{ textField: { fullWidth: true, size: "small", sx: { mt: 2 } } }}
            />
          )}
          {type === "custom" && (
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <DatePicker
                label="From Date"
                value={customFrom}
                onChange={setCustomFrom}
                slotProps={{ textField: { fullWidth: true, size: "small", placeholder: "dd/MM/yyyy",sx: {
                    "& .MuiOutlinedInput-root": {
                      borderWidth: "2px",
                      border: "#f0f0f0",
                      "& fieldset": { borderWidth: "2px" },
                      "&:hover fieldset": { borderWidth: "2px" },
                      "&.Mui-focused fieldset": {
                        borderWidth: "2px",
                        border: "#81C784",
                      },
                    },
                  }, } }}
                format="dd/MM/yyyy"
              />
              <DatePicker
                label="To Date"
                value={customTo}
                onChange={setCustomTo}
                slotProps={{ textField: { fullWidth: true, size: "small", placeholder: "dd/MM/yyyy", sx: {
                    "& .MuiOutlinedInput-root": {
                      borderWidth: "2px",
                      border: "#f0f0f0",
                      "& fieldset": { borderWidth: "2px" },
                      "&:hover fieldset": { borderWidth: "2px" },
                      "&.Mui-focused fieldset": {
                        borderWidth: "2px",
                        border: "#81C784",
                      },
                    },
                  },} }}
                 format="dd/MM/yyyy"
              />
            </Box>
          )}
        </LocalizationProvider>

       <Box
  display="flex"
  flexDirection={{ xs: "column", sm: "row" }}
  justifyContent="flex-end"
  alignItems="flex-end"
  mt={3}
  gap={1}
>
    <ButtonComponent
        label="Cancel"
        onClick={onClose}
        loading={false}
        color="error"
        loaderColor="secondary"
        variant="outlined"
    size="small"
    sx={{
      width: { xs: "100%", sm: "auto" },
    }}
      />
       <ButtonComponent
        label="Apply"
        onClick={handleApply}
        loading={false}
        variant="contained"
        size="small"
    sx={{
      width: { xs: "100%", sm: "auto" },
    }}
      />
</Box>

      </Box>
    </Popover>
  );
};

export  default DashboardFilterPopover
