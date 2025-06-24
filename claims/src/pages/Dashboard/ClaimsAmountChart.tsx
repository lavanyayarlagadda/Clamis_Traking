import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const ClaimAmountChart: React.FC = () => {
  const months = ['JAN', 'FEB', 'MAR', 'APR'];
  const claimAmount = [4234567, 4876543, 5214789, 4567890];
  const approvedAmount = [3890234, 4456789, 4789456, 4123567];

  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  return (
    <Card
      elevation={1}
      sx={{
        bgcolor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="medium" color="text.primary">
            Claim Amount vs Approved Amount
          </Typography>
        }
      />
      <CardContent>
        <Box height={300}>
          <BarChart
            height={300}
            xAxis={[{ id: 'months', data: months, scaleType: 'band', label: 'Month' }]}
            series={[
              {
                id: 'claimAmount',
                data: claimAmount,
                label: 'Claim Amount',
                color: '#3b82f6',
              },
              {
                id: 'approvedAmount',
                data: approvedAmount,
                label: 'Approved Amount',
                color: '#10b981',
              },
            ]}
            yAxis={[{ valueFormatter: formatCurrency }]}
            margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
            grid={{ horizontal: true }}
            sx={{
              '.MuiChartsLegend-root': { mt: 2 },
              '.MuiChartsAxis-tickLabel': { fontSize: 12 },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClaimAmountChart;
