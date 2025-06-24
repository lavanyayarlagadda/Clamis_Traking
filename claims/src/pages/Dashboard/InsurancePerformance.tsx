import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Dropdown from '../../components/reusable/Dropdown';

const InsurancePerformance: React.FC = () => {
  // Dropdown options and state
  const timeOptions = ['All Time', 'Last Quarter', 'Last Month'];
  const [selectedTime, setSelectedTime] = React.useState<string>(timeOptions[0]);

  // Format currency for y-axis
  const formatCurrency = (value: number) => `₹${(value / 100000).toFixed(1)}L`;

  // Sample data for different time periods
  const allTimeData = [
    { name: 'NTR Vaidyaseva', amount: 1245678, percentage: 28, claims: 450 },
    { name: 'ICICI Lombard', amount: 1245678, percentage: 28, claims: 425 },
    { name: 'Star Health', amount: 1023456, percentage: 23, claims: 380 },
    { name: 'HDFC ERGO', amount: 876543, percentage: 19, claims: 320 },
    { name: 'Bajaj Allianz', amount: 745321, percentage: 17, claims: 275 },
    { name: 'Others', amount: 576892, percentage: 13, claims: 180 },
  ];

  const lastQuarterData = [
    { name: 'NTR Vaidyaseva', amount: 456789, percentage: 30, claims: 150 },
    { name: 'ICICI Lombard', amount: 423456, percentage: 28, claims: 140 },
    { name: 'Star Health', amount: 345678, percentage: 23, claims: 120 },
    { name: 'HDFC ERGO', amount: 276543, percentage: 18, claims: 100 },
    { name: 'Bajaj Allianz', amount: 245321, percentage: 16, claims: 90 },
    { name: 'Others', amount: 176892, percentage: 12, claims: 60 },
  ];

  const lastMonthData = [
    { name: 'NTR Vaidyaseva', amount: 145678, percentage: 32, claims: 45 },
    { name: 'ICICI Lombard', amount: 134567, percentage: 30, claims: 42 },
    { name: 'Star Health', amount: 102345, percentage: 23, claims: 38 },
    { name: 'HDFC ERGO', amount: 87654, percentage: 19, claims: 32 },
    { name: 'Bajaj Allianz', amount: 74532, percentage: 16, claims: 27 },
    { name: 'Others', amount: 57689, percentage: 13, claims: 18 },
  ];

  // Get data based on selected time period
  const getData = () => {
    switch (selectedTime) {
      case 'Last Quarter':
        return lastQuarterData;
      case 'Last Month':
        return lastMonthData;
      default:
        return allTimeData;
    }
  };

  const data = getData();

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
  };

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
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h6" fontWeight="medium" color="text.primary">
              Insurance Company Performance
            </Typography>
            <Box sx={{ width: '40%' }}>
              <Dropdown
                value={selectedTime}
                options={timeOptions}
                onChange={handleTimeChange}
              />
            </Box>
          </Stack>
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
              '.MuiChartsAxis-tickLabel': { 
                fontSize: 12, 
                transform: 'rotate(-45deg)',
                transformOrigin: 'right',
                textAnchor: 'end'
              },
              '.MuiChartsLegend-root': { mt: 2 },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsurancePerformance;