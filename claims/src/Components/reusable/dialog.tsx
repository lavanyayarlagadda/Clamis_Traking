import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

export function DynamicDialog({
  open,
  onClose,
  title,
  data,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  data: any;
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {Object.entries(data || {}).map(([key, val]) => (
            <Grid size={{xs:6}}>
              <Typography variant="subtitle2" color="text.secondary">
                {key}
              </Typography>
              <Typography>123</Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}