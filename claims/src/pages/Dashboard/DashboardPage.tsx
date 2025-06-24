import React, { useState } from 'react';
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
} from '@mui/material';



// import { ClaimAmountChart } from '@/components/dashboard/ClaimAmountChart';
// import { ClaimsByStatus } from '@/components/dashboard/ClaimsByStatus';
// import { InsurancePerformance } from '@/components/dashboard/InsurancePerformance';
// import { SettlementReconciliationTrends } from '@/components/dashboard/SettlementReconciliationTrends';
// import { ReconciliationStatusDistribution } from '@/components/dashboard/ReconciliationStatusDistribution';
// import { AgingBucketDistribution } from '@/components/dashboard/AgingBucketDistribution';
import { CalendarToday, LocalActivity } from '@mui/icons-material';
import KPIMetrics from './KPIMetrics';
import MonthlyClaimsTrend from './MonthlyClaims';
import ClaimAmountChart from './ClaimsAmountChart';
import ClaimsByStatus from './ClaimsByStatus';
import InsurancePerformance from './InsurancePerformance';
import ReconciliationStatusDistribution from './ReconcilationStatusDistribution';
import AgingBucketDistribution from './AginBucketDistribution';
import SettlementReconciliationTrends from './SettlementReconciliationTrends';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

  const handlePeriodChange = (event: SelectChangeEvent<string>) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #ffffff, #ecfdf5)', p: 3 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, backgroundColor: 'primary.main', borderRadius: 2 }}>
              <LocalActivity  />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold" color="text.primary">
                Healthcare Claims Dashboard
              </Typography>
              <Typography color="text.secondary">
                Monitor and analyze your healthcare claims performance
              </Typography>
            </Box>
          </Box>

          <Card elevation={1} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 2 }}>
              <CalendarToday  />
              <FormControl variant="outlined" size="small">
                <InputLabel id="period-select-label">Period</InputLabel>
                <Select
                  labelId="period-select-label"
                  value={selectedPeriod}
                  onChange={handlePeriodChange}
                  label="Period"
                  sx={{ width: 160 }}
                >
                  <MenuItem value="today">Today</MenuItem>
                  <MenuItem value="week">This Week</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                  <MenuItem value="custom">Custom Date</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Box>

        {/* KPI Metrics */}
        <KPIMetrics />

        {/* Chart Sections */}
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={3}>
          <MonthlyClaimsTrend />
          <ClaimAmountChart />
        </Box>

         <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={3}>
          <ClaimsByStatus />
          <InsurancePerformance />
        </Box>
*
         <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={3}>
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
