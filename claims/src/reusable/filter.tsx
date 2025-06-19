import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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
    <Card sx={{ mb: 2 }}>
      <CardHeader title="Filter Reconciled Claims" />
      <CardContent>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filters.map((filter, idx) => {
            if (filter.type === "select") {
              return (
                <Select
                  key={idx}
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  displayEmpty
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value="">{filter.label}</MenuItem>
                  {filter.options.map((opt: string) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              );
            }
            if (filter.type === "date") {
              return (
                <TextField
                  key={idx}
                  label={filter.label}
                  type="date"
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ minWidth: 200 }}
                />
              );
            }
            return null;
          })}
          <Button variant="contained" onClick={onApply}>
            Apply
          </Button>
          <Button variant="outlined" onClick={onExport}>
            Export
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
