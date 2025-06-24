import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const MonthlyClaimsTrend: React.FC = () => {
  const months = ['JAN', 'FEB', 'MAR', 'APR'];
  const totalClaims = [1156, 1289, 1347, 1247];
  const reconciledClaims = [1000, 1100, 1000, 1000];

  return (
    <Card
      elevation={1}
      sx={{
        bgcolor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="medium" color="text.primary">
            Monthly Claims Trend
          </Typography>
        }
      />
      <CardContent>
        <Box height={300}>
          <LineChart
            xAxis={[{ id: 'months', data: months, scaleType: 'point', label: 'Month' }]}
            series={[
              {
                id: 'totalClaims',
                data: totalClaims,
                label: 'Total Claims',
                color: '#3b82f6',
              },
              {
                id: 'reconciledClaims',
                data: reconciledClaims,
                label: 'Reconciled Claims',
                color: '#10b981',
              },
            ]}
            height={300}
            margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
            grid={{ horizontal: true, vertical: true }}
            sx={{
              '.MuiChartsAxis-tickLabel': { fontSize: 12 },
              '.MuiChartsLegend-root': { mt: 2 },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyClaimsTrend;
