import React, { useState } from "react";
import {
  Box,
  Grid,
} from "@mui/material";
import {
  FilterList,
} from "@mui/icons-material";
import KPIMetrics from "./KPIMetrics";
import MonthlyClaimsTrend from "./MonthlyClaims";
import ClaimAmountChart from "./ClaimsAmountChart";
import ClaimsByStatus from "./ClaimsByStatus";
import InsurancePerformance from "./InsurancePerformance";
import ReconciliationStatusDistribution from "./ReconcilationStatusDistribution";
import AgingBucketDistribution from "./AginBucketDistribution";
import SettlementReconciliationTrends from "./SettlementReconciliationTrends";
import DashboardFilterPopover from "./CalendarFilter";



const Dashboard: React.FC = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenFilter(false);
  };

  const handleApply = (from: Date | null, to: Date | null, label: string) => {
    console.log("Applied Period:", label);
    console.log("From:", from);
    console.log("To:", to);
    // You can dispatch or setState here
    setOpenFilter(false);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Grid
          size={{ xs: 8, sm: 12 }}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-end", sm: "flex-end", gap: 3 },
            alignItems: "center",
          }}
        >
  <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: "white",
            color: "#2563EB",
            fontSize: "14px",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#BAE6FD",
            },
            mt: 0,
          }}
          onClick={() => setOpenFilter(true)}
        >
          <FilterList fontSize="small" />
          Filter 
        </Box>
        </Grid>

        <DashboardFilterPopover
          anchorEl={anchorEl}
          onClose={handleClose}
          onApply={handleApply}
          open={openFilter}
        />

        {/* KPI Metrics */}
        <KPIMetrics />

        {/* Chart Sections */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", lg: "1fr 1fr" }}
          gap={3}
        >
          <MonthlyClaimsTrend />

          <ClaimAmountChart />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", lg: "1fr 1fr" }}
          gap={3}
        >
          <ClaimsByStatus />

          <InsurancePerformance />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", lg: "1fr 1fr" }}
          gap={3}
        >
          <SettlementReconciliationTrends />
          <ReconciliationStatusDistribution />
        </Box>

        <Box>
          <AgingBucketDistribution />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
