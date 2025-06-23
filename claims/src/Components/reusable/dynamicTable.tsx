import React, { useState } from "react";
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
  TablePagination,
  TextField,
  IconButton,
  Tooltip,
  Popover,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { Settings, SvgIconComponent } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";

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
  chipColor?: string;

  Icon?: SvgIconComponent;
  iconColor?: string;
  defaultColumnKeys?: string[];
  minColumns?: number;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  title,
  countLabel,
  columns,
  data,
  actions = [],
  chipColor,
  Icon,
  iconColor = chipColor,
  defaultColumnKeys,
  minColumns = 5,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColumnKeys, setSelectedColumnKeys] = useState<string[]>(
    defaultColumnKeys ?? columns.map((col) => col.key).slice(0, minColumns)
  );
  const [tempSelectedColumnKeys, setTempSelectedColumnKeys] =
    useState<string[]>(selectedColumnKeys);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDownload = () => {
    const csv = [
      columns.map((col) => col.label).join(","),
      ...data.map((row) => columns.map((col) => row[col.key]).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const open = Boolean(anchorEl);
  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setTempSelectedColumnKeys(selectedColumnKeys); // reset temp on open
    setError(null);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setError(null);
  };

  // Toggle column selection with min 5 columns enforced
  const toggleColumn = (key: string) => {
    if (tempSelectedColumnKeys.includes(key)) {
      // Trying to deselect
      if (tempSelectedColumnKeys.length <= minColumns) {
        setError(`You must select at least ${minColumns} columns.`);
        return; // prevent deselecting below min
      }
      setTempSelectedColumnKeys((prev) => prev.filter((k) => k !== key));
      setError(null);
    } else {
      // Selecting column
      setTempSelectedColumnKeys((prev) => [...prev, key]);
      setError(null);
    }
  };

  const handleApply = () => {
    if (tempSelectedColumnKeys.length < minColumns) {
      setError(`You must select at least ${minColumns} columns.`);
      return;
    }
    setSelectedColumnKeys(tempSelectedColumnKeys);
    handleClose();
  };

  const handleUnselectAll = () => {
    setTempSelectedColumnKeys([]);
    setError(`You must select at least ${minColumns} columns.`);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          p: 3,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Header Section */}

        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* LEFT SIDE: Icon, Title, Chip */}
          <Box display="flex" alignItems="center" gap={1}>
            {iconColor && Icon && (
              <Icon sx={{ color: iconColor }} fontSize="small" />
            )}
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            <Chip
              label={countLabel}
              size="small"
              sx={{
                backgroundColor: chipColor, // e.g., '#48D56B'
                color: "#fff", // white text for better contrast
                fontWeight: 500,
              }}
            />
          </Box>

          {/* RIGHT SIDE: Search + Download + Settings */}
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Tooltip title="Download CSV" arrow>
              <IconButton
                onClick={handleDownload}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Manage Columns" arrow>
              <IconButton
                onClick={handleSettingsClick}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                <Settings fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
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
                {columns
                  .filter((col) => selectedColumnKeys.includes(col.key))
                  .map((col) => (
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
                      width: "100px",
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    backgroundColor: row.manualReconciled ? "#48D56B" : "white",
                  }}
                >
                  {columns
                    .filter((col) => selectedColumnKeys.includes(col.key))
                    .map((col) => (
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
                    <TableCell
                      sx={{ whiteSpace: "nowrap", minWidth: "max-content" }}
                    >
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

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>

      {/* Popover for column selector */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box p={2} sx={{ minWidth: 220 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Select Columns
          </Typography>
          <Button
            size="small"
            onClick={handleUnselectAll}
            sx={{ mb: 1, textTransform: "none" }}
          >
            Unselect All
          </Button>
          <FormGroup>
            {columns.map((col) => {
              const isChecked = tempSelectedColumnKeys.includes(col.key);
              const willDeselect =
                isChecked && tempSelectedColumnKeys.length <= minColumns;
              return (
                <FormControlLabel
                  key={col.key}
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={() => toggleColumn(col.key)}
                      disabled={willDeselect} // disable if minColumns reached & trying to deselect
                    />
                  }
                  label={col.label}
                />
              );
            })}
          </FormGroup>

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}

          <Box mt={1} display="flex" justifyContent="flex-end" gap={1}>
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleApply}
              disabled={tempSelectedColumnKeys.length < minColumns}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default DynamicTable;
