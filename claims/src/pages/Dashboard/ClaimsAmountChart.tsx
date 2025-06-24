import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Dropdown from '../../components/reusable/Dropdown';

const ClaimAmountChart: React.FC = () => {
  // Dropdown options and state
  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

  // Format currency for y-axis
  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  // Sample data with settled amounts added
  const allData = {
    months: ['JAN', 'FEB', 'MAR', 'APR'],
    claimAmount: [4234567, 4876543, 5214789, 4567890],
    approvedAmount: [3890234, 4456789, 4789456, 4123567],
    settledAmount: [3750000, 4300000, 4650000, 4000000] // Added settled amounts
  };

  const ntrData = {
    months: ['JAN', 'FEB', 'MAR', 'APR'],
    claimAmount: [3234567, 3876543, 4214789, 3567890],
    approvedAmount: [2890234, 3456789, 3789456, 3123567],
    settledAmount: [2750000, 3300000, 3650000, 3000000] // Added settled amounts
  };

  const privateData = {
    months: ['JAN', 'FEB', 'MAR', 'APR'],
    claimAmount: [1000000, 1000000, 1000000, 1000000],
    approvedAmount: [900000, 900000, 900000, 900000],
    settledAmount: [850000, 850000, 850000, 850000] // Added settled amounts
  };

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

  const { months, claimAmount, approvedAmount, settledAmount } = getData();

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

  return (
    <Card
      elevation={3}
      sx={{
        bgcolor: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
              Claim vs Approved vs Settled Amount
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
        sx={{ px: 3, pt: 3, pb: 0 }}
      />
      <CardContent sx={{ px: 3, pt: 1, pb: 3 }}>
        <Box height={300}>
          <BarChart
            height={300}
            xAxis={[{ 
              id: 'months', 
              data: months, 
              scaleType: 'band', 
              label: 'Month' 
            }]}
            series={[
              {
                id: 'claimAmount',
                data: claimAmount,
                label: 'Claim Amount',
                color: '#3b82f6', // Blue
              },
              {
                id: 'approvedAmount',
                data: approvedAmount,
                label: 'Approved Amount',
                color: '#10b981', // Green
              },
              {
                id: 'settledAmount',
                data: settledAmount,
                label: 'Settled Amount',
                color: '#8b5cf6', // Purple
              },
            ]}
            yAxis={[{ valueFormatter: formatCurrency }]}
            margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
            grid={{ horizontal: true }}
            sx={{
              '.MuiChartsLegend-root': {
                mt: 2,
                fontSize: 13,
              },
              '.MuiChartsAxis-tickLabel': {
                fontSize: 12,
                fill: '#4b5563',
              },
              '.MuiChartsAxis-line': {
                stroke: '#e5e7eb',
              },
              '.MuiChartsGrid-line': {
                stroke: '#f3f4f6',
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClaimAmountChart;