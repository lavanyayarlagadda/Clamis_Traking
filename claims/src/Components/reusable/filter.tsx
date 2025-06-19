import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  Stack,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TuneIcon from "@mui/icons-material/Tune"; // For header icon

export function DynamicFilterBar({
  filters,
  onApply,
  onExport,
}: {
  filters: any[];
  onApply: () => void;
  onExport: () => void;
}) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fafafa",
      }}
    >
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <TuneIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Filter Reconciled Claims
            </Typography>
          </Box>
        }
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          {filters.map((filter, idx) => {
            // if (filter.type === "select") {
            //   return (
            //     <FormControl key={idx} sx={{ minWidth: 200 }} size="small">
            //       <InputLabel>{filter.label}</InputLabel>
            //       <Select
            //         value={filter.value}
            //         label={filter.label}
            //         onChange={(e) => filter.onChange(e.target.value)}
            //       >
            //         {filter.options.map((opt: string) => (
            //           <MenuItem key={opt} value={opt}>
            //             {opt}
            //           </MenuItem>
            //         ))}
            //       </Select>
            //     </FormControl>
            //   );
            // }
            if (filter.type === "date") {
              return (
                <TextField
                  key={idx}
                  label={filter.label}
                  type="date"
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{ minWidth: 200 }}
                />
              );
            }
            return null;
          })}

          <Stack direction="row" spacing={1} mt={{ xs: 2, sm: 0 }}>
            <Button
              variant="contained"
              onClick={onApply}
              startIcon={<FilterAltIcon />}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              onClick={onExport}
              startIcon={<FileDownloadIcon />}
            >
              Export
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
