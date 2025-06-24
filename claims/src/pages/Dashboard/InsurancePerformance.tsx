import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  LinearProgress,
  Stack
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const InsurancePerformance: React.FC = () => {
  const data = [
    { name: 'NTR Vaidyaseva', amount: 1245678, percentage: 28, claims: 450 },
    { name: 'ICICI Lombard', amount: 1245678, percentage: 28, claims: 425 },
    { name: 'Star Health', amount: 1023456, percentage: 23, claims: 380 },
    { name: 'HDFC ERGO', amount: 876543, percentage: 19, claims: 320 },
    { name: 'Bajaj Allianz', amount: 745321, percentage: 17, claims: 275 },
    { name: 'Others', amount: 576892, percentage: 13, claims: 180 },
  ];

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
            Insurance Company Performance
          </Typography>
        }
      />
      <CardContent>


        <Box height={300}>
          <LineChart
            height={300}
            xAxis={[
              {
                id: 'company',
                data: data.map((d) => d.name),
                scaleType: 'point',
                label: 'Insurance Company',
              },
            ]}
            series={[
              {
                id: 'amount',
                data: data.map((d) => d.amount),
                label: 'Settlement Amount',
                color: '#3b82f6',
              },
              {
                id: 'claims',
                data: data.map((d) => d.claims),
                label: 'Claims Count',
                color: '#10b981',
              },
            ]}
            yAxis={[
              {
                id: 'y-left',
                valueFormatter: formatCurrency,
              },
            ]}
            margin={{ top: 20, bottom: 60, left: 60, right: 20 }}
            sx={{
              '.MuiChartsAxis-tickLabel': { fontSize: 12, transform: 'rotate(-45deg)' },
              '.MuiChartsLegend-root': { mt: 2 },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsurancePerformance;
