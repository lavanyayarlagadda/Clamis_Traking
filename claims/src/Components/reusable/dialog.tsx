import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Close } from "@mui/icons-material";

type DynamicClaimDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  data: {
    claimInfo?: Record<string, any>;
    financialDetails?: Record<string, any>;
    timeline?: {
      label: string;
      description: string;
      date: string;
    }[];
  };
};

export const DynamicClaimDialog = ({ open, onClose, title, data }: DynamicClaimDialogProps) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          py: 2,
          px: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {data.claimInfo && (
            <Grid size={{xs:12,md:6}}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 2, boxShadow: 1, borderColor: "#d0d7de" }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Claim Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(data.claimInfo).map(([label, value]) => (
                  <Info key={label} label={label} value={value} />
                ))}
              </Paper>
            </Grid>
          )}

          {data.financialDetails && (
            <Grid size={{xs:12,md:6}}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 2, boxShadow: 1, borderColor: "#d0d7de" }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Financial Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {Object.entries(data.financialDetails).map(([label, value]) => (
                  <Info key={label} label={label} value={value} color="#1e88e5" />
                ))}
              </Paper>
            </Grid>
          )}

          {data.timeline && data.timeline.length > 0 && (
            <Grid size={{xs:12}}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 2, boxShadow: 1, borderColor: "#d0d7de" }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Claim Timeline
                </Typography>
                <Divider sx={{ mb: 2 }} />
               <List sx={{ position: "relative", pl: 2 }}>
  {data.timeline.map((item, idx) => (
    <Box key={idx} sx={{ position: "relative", pl: 2 }}>
      {/* Connecting Line - centered behind dot */}
     {Array.isArray(data.timeline) && idx !== data.timeline.length - 1 && (

        <Box
          sx={{
            position: "absolute",
            top: 16, // below the dot center
            left: 22, // center of the dot (adjust based on icon size)
            width: "2px",
            height: "100%",
            bgcolor: "#4caf50", // green
            zIndex: 0,
          }}
        />
      )}

      {/* Dot and content */}
      <ListItem alignItems="flex-start" disableGutters sx={{ position: "relative", zIndex: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <FiberManualRecordIcon
            sx={{ fontSize: 14, color: "#4caf50", zIndex: 1, position: "relative" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body1" fontWeight="bold">
              {item.label}
            </Typography>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          }
        />
        <Typography variant="caption" sx={{ ml: 2, color: "#999" }}>
          {item.date}
        </Typography>
      </ListItem>
    </Box>
  ))}
</List>

              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const Info = ({
  label,
  value,
  color = "inherit",
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
    <Typography variant="body2" sx={{ color: "#666" }}>
      {label}
    </Typography>
    <Typography fontWeight={600} sx={{ color }}>
      {value}
    </Typography>
  </Box>
);
