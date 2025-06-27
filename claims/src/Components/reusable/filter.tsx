// FilterDrawer.tsx
import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  TextField,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ButtonComponent } from "./Button";
import { DropdownComponent, DropdownOption } from "./Dropdown";

interface FilterValues {
  fromDate: Date | null;
  toDate: Date | null;
  insuranceCompanies: string[];
  claimStatus?: string | null;
  claimAge?: string | null|number;
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  insuranceOptions: string[];
  pageType: "reconciliation" | "unreconciliation";
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  filters,
  onChange,
  insuranceOptions,
  pageType,
}) => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const handleDateChange = (
    value: Date | null,
    field: "fromDate" | "toDate"
  ) => {
    onChange({
      ...filters,
      [field]: value,
      ...(field === "fromDate" &&
      filters.toDate &&
      value &&
      filters.toDate < value
        ? { toDate: null }
        : {}),
    });
  };

  const handleClear = () => {
    onChange({
      fromDate: null,
      toDate: null,
      insuranceCompanies: [],
      claimStatus: null,
      claimAge: null,
    });
  };

const claimAgeOptions: DropdownOption[] = [
  { label: "None", value: "" },
  { label: "0-7 days", value: "0-7" },
  { label: "7-15 days", value: "7-15" },
  { label: "15-30 days", value: "15-30" },
  { label: "30-60 days", value: "30-60" },
  { label: "60-90 days", value: "60-90" },
];



  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
sx={{
  width: '100%', // Full width of container
  maxWidth:{xs:500,sm:600}, // Optional cap to prevent stretching on large screens
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}}

      >
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            bgcolor: "#eaf1ff",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Filter Claims
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
          {/* DATE RANGE */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box p={0} display="flex" flexWrap="wrap" gap={2} borderRadius={2}>
              {/* Date Range */}
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  flexDirection: { md: "row", sm: "row",xs:'column' },
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  flex="1"
                  maxWidth="170px"
                >
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    From Date
                  </Typography>
                  <DatePicker
                    open={openFrom}
                    onOpen={() => setOpenFrom(true)}
                    onClose={() => setOpenFrom(false)}
                    value={filters.fromDate}
                    onChange={(val) => handleDateChange(val, "fromDate")}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        placeholder: "dd/MM/yyyy",
                        onClick: () => setOpenFrom(true),
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              {filters.fromDate ? (
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onChange({ ...filters, fromDate: null });
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

                <ArrowForward sx={{ alignSelf: "center", marginTop: {sm:4} }} />

                <Box
                  display="flex"
                  flexDirection="column"
                  flex="1"
                  maxWidth="170px"
                >
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    To Date
                  </Typography>
                  <DatePicker
                    open={openTo}
                    onOpen={() => setOpenTo(true)}
                    onClose={() => setOpenTo(false)}
                    value={filters.toDate}
                    onChange={(val) => handleDateChange(val, "toDate")}
                    format="dd/MM/yyyy"
                    shouldDisableDate={(date) => {
                      if (!filters.fromDate) return false; // ✅ return a boolean
                      return date < filters.fromDate;
                    }}
                    slotProps={{
                      textField: {
                        placeholder: "dd/MM/yyyy",
                        onClick: () => setOpenTo(true),
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              {filters.toDate ? (
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onChange({ ...filters, toDate: null });
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

          {/* INSURANCE COMPANIES */}
          <Box mb={3} mt={2}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Insurance Companies
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {insuranceOptions.map((company) => {
                const isSelected = filters.insuranceCompanies.includes(company);
                return (
                  <Chip
                    key={company}
                    label={company}
                    clickable={!isSelected}
                    onClick={() => {
                      if (!isSelected) {
                        onChange({
                          ...filters,
                          insuranceCompanies: [
                            ...filters.insuranceCompanies,
                            company,
                          ],
                        });
                      }
                    }}
                    onDelete={
                      isSelected
                        ? () =>
                            onChange({
                              ...filters,
                              insuranceCompanies:
                                filters.insuranceCompanies.filter(
                                  (c) => c !== company
                                ),
                            })
                        : undefined
                    }
                    sx={{
                      backgroundColor: isSelected ? "#4DB6AC" : "#e0e0e0",
                      color: isSelected ? "#fff" : "#000",
                      "& .MuiChip-deleteIcon": {
                        color: "#fff",
                      },
                    }}
                  />
                );
              })}
            </Box>
            {pageType !== "unreconciliation" && (
            <Box>
  <Typography
    variant="subtitle1"
    fontWeight="bold"
    mb={1}
    id="claim-age-label"
    mt={2}
  >
    Claim Age (days)
  </Typography>
 <DropdownComponent
  options={claimAgeOptions}
  value={
    claimAgeOptions.find((opt) => opt.value === filters.claimAge) || null
  }
  onChange={(val) =>
    onChange({
      ...filters,
     claimAge: val?.value ?? "",
    })
  }
/>

</Box>
            )}
          </Box>

          {/* Extra Filters for "unreconciliation" */}
          {pageType === "unreconciliation" && (
            <>
              {/* CLAIM STATUS */}
              <Box mb={2} mt={2}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Claim Status
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {["Pending", "Approved", "Rejected"].map((status) => (
                    <Chip
                      key={status}
                      label={status}
                      clickable
                      variant={
                        filters.claimStatus === status ? "filled" : "outlined"
                      }
                      color={
                        filters.claimStatus === status ? "info" : "default"
                      }
                      onClick={() =>
                        onChange({
                          ...filters,
                          claimStatus:
                            filters.claimStatus === status ? null : status,
                        })
                      }
                    />
                  ))}
                </Box>
              </Box>
              <Box sx={{mt:2}}>
  <Typography
    variant="subtitle1"
    fontWeight="bold"
    mb={1}
    id="claim-age-label"
  >
    Claim Age (days)
  </Typography>
 <DropdownComponent
  options={claimAgeOptions}
  value={
    claimAgeOptions.find((opt) => opt.value === filters.claimAge) || null
  }
  onChange={(val) =>
    onChange({
      ...filters,
     claimAge: val?.value ?? "",
    })
  }
/>

</Box>
            </>
          )}
        </Box>

        {/* FOOTER */}
        <Box
  sx={{
    p: 2,
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: {  sm: 'row', md: 'row' }, 
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 2, // space between buttons
    bgcolor: '#f9fafc',
  }}
>
  <ButtonComponent
      label="Clear"
      onClick={handleClear}
      loading={false}
      color="error"
      loaderColor="secondary"
      variant="outlined"
   sx={{
      borderRadius: 2,
      px: 3,
      width: { xs: '100%', md: 'auto' }, 
    }}
    />
     <ButtonComponent
      label="Apply"
      onClick={onClose}
      loading={false}
      variant="contained"
  sx={{
      borderRadius: 2,
      px: 3,
      width: { xs: '100%', md: 'auto' }, 
    }}
    />
</Box>

      </Box>
    </Drawer>
  );
};
