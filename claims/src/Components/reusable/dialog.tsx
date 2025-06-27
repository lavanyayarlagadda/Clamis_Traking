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
  Tooltip
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Close } from "@mui/icons-material";

type DynamicClaimDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  pageType: "reconciliation" | "unreconciliation";
  data?: {
    claimInfo?: Record<string, any>;
    financialDetails?: Record<string, any>;
    exceptionDetails?: Record<string, any>;
    timeline?: {
      label: string;
      description: string;
      date: string;
    }[];
  };
};

export const DynamicClaimDialog = ({ open, onClose, title, data, pageType }: DynamicClaimDialogProps) => {
  if (!data) return null;
  const timeline = data.timeline ?? [];
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
          {/* Left side: Claim Info + Financial Details */}
          <Grid size={{ xs: 12, md: 6 }} >
            <Grid container spacing={3}>
              {data.claimInfo && (
                <Grid size={{ xs: 12 }}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 2, borderColor: "#d0d7de", height: "100%" }}
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
                <Grid size={{ xs: 12 }}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 2, borderColor: "#d0d7de", height: "100%" }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Financial Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {Object.entries(data.financialDetails).map(([label, value]) => (
                      <Info key={label} label={label} value={value} color={label === "Approved Amount" ? "#4caf50" : label === "Difference" ? "#dc295e" : "#1e88e5"} />
                    ))}
                  </Paper>
                </Grid>
              )}

              {pageType === "unreconciliation" && data.exceptionDetails && (
                <Grid size={{ xs: 12 }}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 3, borderRadius: 2, borderColor: "#d0d7de", height: "100%" }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Exception Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {Object.entries(data.exceptionDetails).map(([label, value]) => (
                      <Info key={label} label={label} value={value} color={label === "Exception Type" ? "#dc295e" : "#1e88e5"} />
                    ))}
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Right side: Timeline */}
          {data.timeline && data.timeline.length > 0 && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 2, borderColor: "#d0d7de", height: "100%" }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Claim Timeline
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List sx={{ position: "relative", pl: 2 }}>
                  {data.timeline.map((item, idx) => (
                    <Box key={idx} sx={{ position: "relative", pl: 2 }}>
                      {/* Connecting line */}
                      {idx !== timeline.length - 1 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 16,
                            left: 22,
                            width: "2px",
                            height: "100%",
                            bgcolor: "#4caf50",
                            zIndex: 0,
                          }}
                        />
                      )}

                      {/* Dot and content */}
                      <ListItem alignItems="flex-start" disableGutters sx={{ position: "relative", zIndex: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: 14,
                              color: item.label.toLowerCase().includes("exception") || item.label.toLowerCase().includes("rejected") ? "#dc3545" : "#4caf50",
                              zIndex: 1
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="bold">
                              {item.label}
                            </Typography>
                          }
                          // secondary={
                          //   <Typography variant="body2" color="text.secondary">
                          //     {item.description}
                          //   </Typography>
                          // }
                          secondary={
                            item.description.split(" ").length > 4 ? (
                              <Tooltip title={item.description} arrow>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: 200,
                                    cursor: "pointer",
                                  }}
                                >
                                  {item.description}
                                </Typography>
                              </Tooltip>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>
                            )
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
    <Typography fontWeight={600} >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color }}>
      {value}
    </Typography>
  </Box>
);
