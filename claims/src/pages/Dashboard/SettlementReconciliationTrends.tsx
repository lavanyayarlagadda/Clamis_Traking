import React from 'react';
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
  ChartsLegend,
  ChartsGrid,
  AreaPlot,
} from '@mui/x-charts';
import { Card, CardContent, CardHeader, Typography, Box, Stack } from '@mui/material';
import Dropdown from '../../components/reusable/Dropdown';

const SettlementReconciliationTrends = () => {
  // Dropdown options and state
  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

  // Format currency for y-axis
  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  // Sample data for different insurance types
  const allData = [
    { month: 'Jan', settled: 3845678, reconciled: 3523456 },
    { month: 'Feb', settled: 4123456, reconciled: 3867890 },
    { month: 'Mar', settled: 4467891, reconciled: 4123678 },
    { month: 'Apr', settled: 3987456, reconciled: 3645234 },
  ];

  const ntrData = [
    { month: 'Jan', settled: 2845678, reconciled: 2523456 },
    { month: 'Feb', settled: 3123456, reconciled: 2867890 },
    { month: 'Mar', settled: 3467891, reconciled: 3123678 },
    { month: 'Apr', settled: 2987456, reconciled: 2645234 },
  ];

  const privateData = [
    { month: 'Jan', settled: 1000000, reconciled: 1000000 },
    { month: 'Feb', settled: 1000000, reconciled: 1000000 },
    { month: 'Mar', settled: 1000000, reconciled: 1000000 },
    { month: 'Apr', settled: 1000000, reconciled: 1000000 },
  ];

  // Get data based on selected insurance
  const getData = () => {
    switch (selectedInsurance) {
      case 'NTR vaidhya seva':
        return ntrData;
      case 'Private Insurance':
        return privateData;
      default:
        return allData;
    }
  };

  const data = getData();

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

  return (
    <Card
      elevation={1}
      sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h6" fontWeight={500} color="text.primary">
              Settlement vs Reconciliation Trends
            </Typography>
            <Box sx={{ width: '40%' }}>
              <Dropdown
                value={selectedInsurance}
                options={insuranceOptions}
                onChange={handleInsuranceChange}
              />
            </Box>
          </Stack>
        }
      />
      <CardContent>
        <ChartContainer
          series={[
            {
              type: 'line',
              id: 'settled',
              label: 'Settled',
              dataKey: 'settled',
              color: '#3b82f6',
              area: true, // This makes it an area chart
            },
            {
              type: 'line',
              id: 'reconciled',
              label: 'Reconciled',
              dataKey: 'reconciled',
              color: '#10b981',
              area: true, // This makes it an area chart
            },
          ]}
          xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
          yAxis={[{ valueFormatter: formatCurrency }]}
          dataset={data}
          height={320}
          sx={{
            '.MuiChartsAxis-tickLabel': {
              fontSize: 12,
            },
          }}
        >
          <ChartsGrid horizontal vertical />
          <ChartsXAxis />
          <ChartsYAxis />
          <ChartsTooltip />
          <ChartsLegend />
          <AreaPlot /> {/* This renders the area under the lines */}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SettlementReconciliationTrends;