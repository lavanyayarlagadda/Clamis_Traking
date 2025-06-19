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
  title
}: {
  filters: any[];
  onApply: () => void;
  onExport: () => void;
  title: string;
}) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >      <CardHeader title={title} />
      <CardContent>
        <Box display="flex" flexWrap="wrap" gap={2}>
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