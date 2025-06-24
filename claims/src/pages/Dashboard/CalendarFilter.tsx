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

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onApply: (from: Date | null, to: Date | null, label: string) => void;
}

const DashboardFilterPopover = ({ anchorEl, onClose, onApply,open }: Props) => {

  const [type, setType] = useState("today");

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

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
       sx={{  display: "flex", padding: 1, mt: 14 }}
    >
      <Box sx={{ p: 3, width: 320 }}>
        <Typography variant="subtitle1" mb={1}>
          Select Period
        </Typography>
        <Select
          fullWidth
          size="small"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
          <MenuItem value="quarter">Quarter</MenuItem>
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="custom">Custom Range</MenuItem>
        </Select>

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
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
              <DatePicker
                label="To Date"
                value={customTo}
                onChange={setCustomTo}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            </Box>
          )}
        </LocalizationProvider>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} size="small" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleApply} variant="contained" size="small">
            Apply
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export  default DashboardFilterPopover
