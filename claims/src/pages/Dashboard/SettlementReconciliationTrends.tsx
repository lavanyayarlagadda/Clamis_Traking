import React from 'react';
import {
  ChartContainer,
  ChartsXAxis,
  ChartsYAxis,
  ChartsTooltip,
  ChartsLegend,
  ChartsGrid,
  LinePlot,
} from '@mui/x-charts';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

const SettlementReconciliationTrends = () => {
  const data = [
    { month: 'Jan', settled: 3845678, reconciled: 3523456 },
    { month: 'Feb', settled: 4123456, reconciled: 3867890 },
    { month: 'Mar', settled: 4467891, reconciled: 4123678 },
    { month: 'Apr', settled: 3987456, reconciled: 3645234 },
  ];

  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  return (
    <Card
      elevation={1}
      sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}
    >
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={500} color="text.primary">
            Settlement vs Reconciliation Trends
          </Typography>
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
      area: true,
    },
    {
      type: 'line',
      id: 'reconciled',
      label: 'Reconciled',
      dataKey: 'reconciled',
      color: '#10b981',
      area: true,
    },
  ]}
  xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
  yAxis={[{ valueFormatter: formatCurrency }]}
  dataset={data}
  height={320}
>
  <ChartsGrid />
  <ChartsXAxis />
  <ChartsYAxis />
  <ChartsTooltip />
  <ChartsLegend  />
  <LinePlot />
</ChartContainer>

      </CardContent>
    </Card>
  );
};

export default SettlementReconciliationTrends;
