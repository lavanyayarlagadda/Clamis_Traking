import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Chip,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ArrowForward from "@mui/icons-material/ArrowForward";

interface FilterValues {
  fromDate: Date | null;
  toDate: Date | null;
  insuranceCompanies: string[];
  reconciledBy: string;
}

const insuranceOptions = [
  "Niva Bupa",
  "Star Health",
  "HDFC Ergo",
  "ICICI Lombard",
];

const reconciledOptions = ["Manual", "Agent"];

const ClaimsFilterBar = () => {
  const [filters, setFilters] = useState<FilterValues>({
    fromDate: null,
    toDate: null,
    insuranceCompanies: [],
    reconciledBy: "",
  });

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleDateChange = (value: Date | null, field: "fromDate" | "toDate") => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "fromDate" && prev.toDate && value && prev.toDate < value
        ? { toDate: null }
        : {}),
    }));
  };



  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        p={1}
        display="flex"
        flexWrap="wrap"
        gap={2}
        borderRadius={2}
      >
        {/* Date Range */}
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            flexDirection: { md: "row", sm: "column" },
          }}
        >
          <Box display="flex" flexDirection="column" flex="1" maxWidth="170px">
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
   From Date
  </Typography>
            <DatePicker
              label="From Date"
              open={openFrom}
              onOpen={() => setOpenFrom(true)}
              onClose={() => setOpenFrom(false)}
              value={filters.fromDate}
              onChange={(newValue) => handleDateChange(newValue, "fromDate")}
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  placeholder: "dd/MM/yyyy",
                  onClick: () => setOpenFrom(true),
                  sx: {
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
                  },
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {filters.fromDate ? (
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setFilters((prev) => ({
                                ...prev,
                                fromDate: null,
                              }));
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => setOpenFrom(true)}>
                            <CalendarToday />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Box>

          <ArrowForward sx={{ alignSelf: "center" }} />

          <Box display="flex" flexDirection="column" flex="1" maxWidth="170px">
             <Typography variant="subtitle1" fontWeight="bold" mb={1}>
   To Date
  </Typography>
            <DatePicker
              label="To Date"
              open={openTo}
              onOpen={() => setOpenTo(true)}
              onClose={() => setOpenTo(false)}
              value={filters.toDate}
              onChange={(newValue) => handleDateChange(newValue, "toDate")}
              format="dd/MM/yyyy"
              shouldDisableDate={(date) => {
                if (!filters.fromDate) return false;
                return (
                  new Date(date).setHours(0, 0, 0, 0) <
                  new Date(filters.fromDate).setHours(0, 0, 0, 0)
                );
              }}
              minDate={filters.fromDate || undefined}
              slotProps={{
                textField: {
                  placeholder: "dd/MM/yyyy",
                  onClick: () => setOpenTo(true),
                  sx: {
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
                  },
                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        {filters.toDate ? (
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setFilters((prev) => ({
                                ...prev,
                                toDate: null,
                              }));
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => setOpenTo(true)}>
                            <CalendarToday />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Box>
        </Box>

      </Box>
    </LocalizationProvider>
    
 <Box display="flex" flexDirection="column" gap={3} p={2}>
      {/* Insurance Multi-Select */}
    <Box>
  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
    Insurance Companies
  </Typography>
  <Box display="flex" flexWrap="wrap" gap={1}>
    {insuranceOptions.map((option) => {
      const isSelected = filters.insuranceCompanies.includes(option);
      return (
        <Chip
          key={option}
          label={option}
          clickable={!isSelected}
          onClick={() => {
            if (!isSelected) {
              setFilters((prev) => ({
                ...prev,
                insuranceCompanies: [...prev.insuranceCompanies, option],
              }));
            }
          }}
          onDelete={
            isSelected
              ? () => {
                  setFilters((prev) => ({
                    ...prev,
                    insuranceCompanies: prev.insuranceCompanies.filter(
                      (item) => item !== option
                    ),
                  }));
                }
              : undefined
          }
          sx={{
            backgroundColor: isSelected ? "#4DB6AC" : "#e0e0e0",
            color: isSelected ? "#fff" : "#000",
            "& .MuiChip-deleteIcon": {
              color: "#fff",
              fontSize: "18px",
              ":hover": { color: "#fff" },
            },
          }}
        />
      );
    })}
  </Box>
</Box>


      {/* Reconciled By Single Select */}
     <Box>
  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
    Reconciled By
  </Typography>
  <Box display="flex" gap={1}>
    {reconciledOptions.map((option) => {
      const isSelected = filters.reconciledBy === option;
      return (
        <Chip
          key={option}
          label={option}
          clickable={!isSelected}
          onClick={() => {
            if (!isSelected) {
              setFilters((prev) => ({
                ...prev,
                reconciledBy: option,
              }));
            }
          }}
          onDelete={
            isSelected
              ? () =>
                  setFilters((prev) => ({
                    ...prev,
                    reconciledBy: "",
                  }))
              : undefined
          }
          sx={{
            backgroundColor: isSelected ? "#4DB6AC" : "#e0e0e0",
            color: isSelected ? "#fff" : "#000",
            "& .MuiChip-deleteIcon": {
              color: "#fff",
              fontSize: "18px",
              ":hover": { color: "#fff" },
            },
          }}
        />
      );
    })}
  </Box>
</Box>

    </Box>

        </>
  );
};

export default ClaimsFilterBar;
