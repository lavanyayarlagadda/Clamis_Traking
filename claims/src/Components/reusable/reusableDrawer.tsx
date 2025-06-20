// components/ReusableDrawer.tsx

import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ReusableDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  heading: string;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  clearOnClick?:()=> void;
}

const ReusableDrawer: React.FC<ReusableDrawerProps> = ({
  open,
  onClose,
  onSubmit,
  heading,
  children,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  clearOnClick
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 430,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            bgcolor: "#eaf1ff",
          }}
        >
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {heading}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              bgcolor: "#e0e0e0",
              "&:hover": {
                bgcolor: "#d32f2f",
                color: "#fff",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* CONTENT */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>{children}</Box>

        {/* FOOTER */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            bgcolor: "#f9fafc",
          }}
        >
          <Button
            onClick={clearOnClick ? clearOnClick :onClose}
            variant="outlined"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
            }}
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
            }}
          >
            {submitLabel}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ReusableDrawer;
