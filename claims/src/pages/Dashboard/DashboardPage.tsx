import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Button,
} from "@mui/material";

// import { ClaimAmountChart } from '@/components/dashboard/ClaimAmountChart';
// import { ClaimsByStatus } from '@/components/dashboard/ClaimsByStatus';
// import { InsurancePerformance } from '@/components/dashboard/InsurancePerformance';
// import { SettlementReconciliationTrends } from '@/components/dashboard/SettlementReconciliationTrends';
// import { ReconciliationStatusDistribution } from '@/components/dashboard/ReconciliationStatusDistribution';
// import { AgingBucketDistribution } from '@/components/dashboard/AgingBucketDistribution';
import {
  CalendarToday,
  Filter,
  FilterList,
  FilterOutlined,
  LocalActivity,
} from "@mui/icons-material";
import KPIMetrics from "./KPIMetrics";
import MonthlyClaimsTrend from "./MonthlyClaims";
import ClaimAmountChart from "./ClaimsAmountChart";
import ClaimsByStatus from "./ClaimsByStatus";
import InsurancePerformance from "./InsurancePerformance";
import ReconciliationStatusDistribution from "./ReconcilationStatusDistribution";
import AgingBucketDistribution from "./AginBucketDistribution";
import SettlementReconciliationTrends from "./SettlementReconciliationTrends";
import CalendarFilterDialog from "./CalendarFilter";
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
          // maxWidth: "1200px",
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
            justifyContent: { xs: "center", sm: "flex-end", gap: 3 },
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpenFilter(true);
            }}
          >
            <FilterList />
            <span style={{ marginLeft: 5 }}>Filter</span>
          </Button>
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
       <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={4}
          sx={{alignItems: 'stretch', mt:2}}
        >
          <Box
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <MonthlyClaimsTrend />
          </Box>

          <Box
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ClaimAmountChart />
          </Box>

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
