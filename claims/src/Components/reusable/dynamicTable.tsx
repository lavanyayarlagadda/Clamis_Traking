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
  Tooltip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SvgIconComponent } from '@mui/icons-material';
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
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  title,
  countLabel,
  columns,
  data,
  actions = [],
  chipColor,
  Icon,
  iconColor =  chipColor,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0)
  }

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
  )

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
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
  {iconColor && Icon && <Icon sx={{ color: iconColor }} fontSize="small" />}
  <Typography variant="h6" fontWeight="bold">
    {title}
  </Typography>
 <Chip
  label={countLabel}
  size="small"
  sx={{
    backgroundColor: chipColor, // e.g., '#48D56B'
    color: '#fff',               // white text for better contrast
    fontWeight: 500,
  }}
/>

</Box>

        {/* RIGHT SIDE: Search + Download */}
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
                    // minWidth: "max-content",
                    width:"100px"
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {/* <TableBody>
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
          </TableBody> */}
          <TableBody>
            {paginatedData.map((row, idx) => (
              <TableRow key={idx} hover>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    {actions.map((action, i) => (
                      <Button
                        key={i}
                        size="small"
                        variant="outlined"
                        onClick={() => action.onClick(row)}
                        startIcon={action.icon}
                        sx={{ mr: 1, textTransform: "none", fontSize: "0.75rem" }}
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
  );
};

export default DynamicTable;