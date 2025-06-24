import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from '@mui/material';
import {
  BarChart,
  LineChart,
  ChartsXAxis,
  ChartsYAxis,
  ChartsLegend,
  ChartsTooltip,
  ChartsGrid,
} from '@mui/x-charts';

const AgingBucketDistribution: React.FC = () => {
  const data = [
    { bucket: '0-7 days', claims: 456, amount: 1867890, avgAge: 3.5 },
    { bucket: '8-15 days', claims: 234, amount: 945678, avgAge: 11.2 },
    { bucket: '16-30 days', claims: 156, amount: 623456, avgAge: 23.8 },
    { bucket: '31-60 days', claims: 89, amount: 356789, avgAge: 45.6 },
    { bucket: '61-90 days', claims: 45, amount: 178234, avgAge: 75.3 },
    { bucket: '>90 days', claims: 23, amount: 91234, avgAge: 120.5 },
  ];

  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

  const buckets = data.map((d) => d.bucket);

  return (
    <Card
      elevation={1}
      sx={{
        bgcolor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" fontWeight="medium">
            Aging Bucket Distribution
          </Typography>
        }
      />
      <CardContent>
        <Box sx={{ position: 'relative', height: 450 }}>
          {/* Bar Chart */}
          <BarChart
            height={400}
            margin={{ top: 30, bottom: 70, left: 60, right: 70 }}
            xAxis={[
              {
                id: 'bucket',
                data: buckets,
                scaleType: 'band',
              },
            ]}
            yAxis={[
              {
                id: 'claims-amount',
                label: 'Claims & Amount',
              },
            ]}
            series={[
              {
                id: 'claims',
                label: 'Claims Count',
                data: data.map((d) => d.claims),
                color: '#3b82f6',
              },
              {
                id: 'amount',
                label: 'Amount',
                data: data.map((d) => d.amount),
                color: '#10b981',
              },
            ]}
            grid={{ horizontal: true }}
            // tooltip={{}}
            // legend={{}}
          />

          {/* Line Chart (Overlay) */}
          <LineChart
            height={400}
            margin={{ top: 30, bottom: 70, left: 60, right: 70 }}
            xAxis={[
              {
                id: 'bucket-line',
                data: buckets,
                scaleType: 'point',
              },
            ]}
            yAxis={[
              {
                id: 'avg-age',
                label: 'Average Age (Days)',
                position: 'right',
              },
            ]}
            series={[
              {
                id: 'avgAge',
                label: 'Average Age (Days)',
                data: data.map((d) => d.avgAge),
                color: '#ef4444',
                curve: 'monotoneX',

              },
            ]}

            // legend={{ hidden: true }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: 'none',
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgingBucketDistribution;
