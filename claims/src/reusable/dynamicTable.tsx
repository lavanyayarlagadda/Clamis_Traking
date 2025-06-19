import React from "react";
import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type ColumnType = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};

type ActionType = {
  label: string;
  icon: React.ReactNode;
  onClick: (row: any) => void;
};

type DynamicTableProps = {
  title: string;
  countLabel: string;
  columns: ColumnType[];
  data: any[];
  actions?: ActionType[];
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  title,
  countLabel,
  columns,
  data,
  actions = [],
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        backgroundColor: "#f9fbfc", // light background
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)", // light shadow
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          gap:2
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <CheckCircleIcon color="success" fontSize="small" />
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
        <Chip label={countLabel} color="success" size="small" />
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <Table stickyHeader sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    backgroundColor: "#f3f4f6",
                    minWidth: "max-content",
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    backgroundColor: "#f3f4f6",
                    minWidth: "max-content",
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                hover
                sx={{
                  transition: "background 0.3s",
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      whiteSpace: "nowrap",
                      minWidth: "max-content",
                    }}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell sx={{ whiteSpace: "nowrap", minWidth: "max-content" }}>
                    {actions.map((action, i) => (
                      <Button
                        key={i}
                        size="small"
                        variant="outlined"
                        onClick={() => action.onClick(row)}
                        startIcon={action.icon}
                        sx={{
                          mr: 1,
                          textTransform: "none",
                          borderRadius: 2,
                          fontSize: "0.75rem",
                        }}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DynamicTable;
