import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
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
import Dropdown from '../../components/reusable/Dropdown';

const AgingBucketDistribution: React.FC = () => {
  // Dropdown options and state
  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

  // Sample data for different insurance types
  const allData = [
    { bucket: '0-7 days', claims: 456, amount: 1867890, avgAge: 3.5 },
    { bucket: '8-15 days', claims: 234, amount: 945678, avgAge: 11.2 },
    { bucket: '16-30 days', claims: 156, amount: 623456, avgAge: 23.8 },
    { bucket: '31-60 days', claims: 89, amount: 356789, avgAge: 45.6 },
    { bucket: '61-90 days', claims: 45, amount: 178234, avgAge: 75.3 },
    { bucket: '>90 days', claims: 23, amount: 91234, avgAge: 120.5 },
  ];

  const ntrData = [
    { bucket: '0-7 days', claims: 356, amount: 1367890, avgAge: 3.8 },
    { bucket: '8-15 days', claims: 184, amount: 745678, avgAge: 11.5 },
    { bucket: '16-30 days', claims: 106, amount: 523456, avgAge: 24.1 },
    { bucket: '31-60 days', claims: 59, amount: 256789, avgAge: 46.2 },
    { bucket: '61-90 days', claims: 35, amount: 128234, avgAge: 76.0 },
    { bucket: '>90 days', claims: 13, amount: 61234, avgAge: 125.3 },
  ];

  const privateData = [
    { bucket: '0-7 days', claims: 100, amount: 500000, avgAge: 3.2 },
    { bucket: '8-15 days', claims: 50, amount: 200000, avgAge: 10.8 },
    { bucket: '16-30 days', claims: 50, amount: 100000, avgAge: 23.0 },
    { bucket: '31-60 days', claims: 30, amount: 100000, avgAge: 44.5 },
    { bucket: '61-90 days', claims: 10, amount: 50000, avgAge: 74.0 },
    { bucket: '>90 days', claims: 10, amount: 30000, avgAge: 115.0 },
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
  const buckets = data.map((d) => d.bucket);
  const formatCurrency = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

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
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h6" fontWeight="medium">
              Aging Bucket Distribution
            </Typography>
            <Box sx={{ width: '20%' }}>
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
                label: 'Amount (₹L)',
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
                label: 'Avg Age (Days)',
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
