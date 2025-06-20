import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


// interface FilterDrawerProps {
//   open: boolean;
//   onClose: () => void;
//   filters: {
//     // dateRange: any;
//     dateRange: { startDate?: string; endDate?: string } | null;
//     insuranceCompanies: string[];
//     reconciliationStatus: string | null;
//   };
//   onChange: (filters: FilterDrawerProps["filters"]) => void;
//   insuranceOptions: string[];
// }
interface FilterState {
  dateRange: {
    startDate?: string;
    endDate?: string;
  } | null;
  insuranceCompanies: string[];
  reconciliationStatus: 'Manual Reconciled' | 'Agent Reconciled' | null;
  claimStatus?: string | null;
  claimAge?: string | null;
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  insuranceOptions: string[];
  includeExtraFilters?: boolean;
  pageType: "reconciliation" | "unreconciliation"; 
}
export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  filters,
  onChange,
  insuranceOptions,
  includeExtraFilters,
  pageType
}) => {
  // const statuses = ["Manual", "Auto"];
  const statuses: FilterState["reconciliationStatus"][] = [
    "Manual Reconciled",
    "Agent Reconciled",
  ];

  const handleToggleInsurance = (company: string) => {
    const newList = filters.insuranceCompanies.includes(company)
      ? filters.insuranceCompanies.filter((c) => c !== company)
      : [...filters.insuranceCompanies, company];
    onChange({ ...filters, insuranceCompanies: newList });
  };


  const handleClear = () => {
    onChange({
      dateRange: null,
      insuranceCompanies: [],
      reconciliationStatus: null,
      claimStatus: null,
      claimAge: null,
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 340, display: "flex", flexDirection: "column", height: "100%" }}>
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
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Filter Claims
          </Typography>
          <IconButton size="small"
            onClick={onClose}
            sx={{
              bgcolor: "#e0e0e0",
              "&:hover": {
                bgcolor: "#d32f2f",
                color: "#fff",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
          {/* Payment Date */}
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              Payment Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.dateRange?.startDate || ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  dateRange: {
                    ...filters.dateRange,
                    startDate: e.target.value,
                  },
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="End Date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={filters.dateRange?.endDate || ""}
              onChange={(e) =>
                onChange({
                  ...filters,
                  dateRange: {
                    ...filters.dateRange,
                    endDate: e.target.value,
                  },
                })
              }
            />
          </Box>

          {/* Insurance Companies */}
          <Box mb={3}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              Insurance Companies
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {insuranceOptions.map((company) => (
                <Chip
                  key={company}
                  label={company}
                  clickable
                  variant={filters.insuranceCompanies.includes(company) ? "filled" : "outlined"}
                  color={filters.insuranceCompanies.includes(company) ? "primary" : "default"}
                  onClick={() => handleToggleInsurance(company)}
                />
              ))}
            </Box>
          </Box>

          {/* Reconciliation Status */}
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
               {pageType === "reconciliation" ? "Reconciliation Status" : "UnReconciliation Status"}
            </Typography>
            <Box display="flex" gap={1}>
              {statuses.map((status) => (
                <Chip
                  key={status}
                  label={status}
                  clickable
                  variant={filters.reconciliationStatus === status ? "filled" : "outlined"}
                  color={filters.reconciliationStatus === status ? "success" : "default"}
                  // onClick={() => handleStatusSelect(status)}
                  onClick={() => {
                    onChange({
                      ...filters,
                      reconciliationStatus: filters.reconciliationStatus === status ? null : status,
                    });
                  }}
                />
              ))}
            </Box>
          </Box>

          {includeExtraFilters && (
            <>
              {/* Claim Status */}
              {/* Claim Status */}
              <Box mb={2}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Claim Status
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {["Pending", "Approved", "Rejected"].map((status) => (
                    <Chip
                      key={status}
                      label={status}
                      clickable
                      variant={filters.claimStatus === status ? "filled" : "outlined"}
                      color={filters.claimStatus === status ? "info" : "default"}
                      onClick={() =>
                        onChange({
                          ...filters,
                          claimStatus: filters.claimStatus === status ? null : status,
                        })
                      }
                    />
                  ))}
                </Box>
              </Box>


              {/* Claim Age */}
              <Box >
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Claim Age
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  placeholder="Enter number of days"
                  value={filters.claimAge || ""}
                  onChange={(e) => onChange({ ...filters, claimAge: e.target.value })}
                />
              </Box>
            </>
          )}

        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            bgcolor: "#f9fafc",
          }}
        >
          <Button
            onClick={handleClear}
            variant="outlined"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
            }}
          >
            Clear
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
            }}
          >
            Apply
          </Button>
        </Box>

      </Box>
    </Drawer>
  );
};