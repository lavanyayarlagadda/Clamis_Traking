import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



export interface HospitalInfo {
  label: string;
  value: string;
  color?: string;
}


type Props = {
  open: boolean;
  onClose: () => void;
  hospitalDetails: HospitalInfo[];
  assignees: string[];
  reasons: string[];
  priorities: string[];
};

const ManualReconciliationDialog: React.FC<Props> = ({
  open,
  onClose,
  hospitalDetails,
  assignees,
  reasons,
  priorities,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Manual Reconciliation - CLM009
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Dynamic Hospital Info */}
        <Box sx={{ mb: 2, p: 2, backgroundColor: "#e6f7f1", borderRadius: 3  }}>
          <Grid container spacing={2}>
            {hospitalDetails.map((item, index) => (
              <Grid size={{xs:4}} key={index}>
                <Typography variant="subtitle2">{item.label}</Typography>
                <Typography color={item.color ?? "text.primary"}>{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2}>
          <Grid size={{xs:6}}>
            <TextField
              label="Revised Settlement Amount"
              fullWidth
              type="number"
              placeholder="Enter revised amount"
            />
          </Grid>
          <Grid size={{xs:6}}>
            <TextField select label="Assign To" fullWidth>
              {assignees.map((assignee, index) => (
                <MenuItem key={index} value={assignee}>
                  {assignee}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs:6}}>
            <TextField select label="Reconciliation Reason" fullWidth>
              {reasons.map((reason, index) => (
                <MenuItem key={index} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs:6}}>
            <TextField select label="Priority Level" fullWidth>
              {priorities.map((priority, index) => (
                <MenuItem key={index} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{xs:6}}>
            <TextField
              label="Required Documents"
              fullWidth
              multiline
              minRows={2}
              placeholder="List any additional documents needed"
            />
          </Grid>
          <Grid size={{xs:6}}>
            <TextField
              label="Additional Comments"
              fullWidth
              multiline
              minRows={2}
              placeholder="Add any relevant comments or notes"
            />
          </Grid>

          {/* File Upload */}
          <Grid size={{xs:12}}>
            <Box
              sx={{
                border: "2px dashed #ccc",
                p: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography>Drop files here or click to browse</Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Choose Files
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Save as Draft
          </Button>
          <Button variant="contained" color="primary">
            Start Reconciliation Process
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ManualReconciliationDialog;
