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
  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

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
      { name: 'NTR Vaidyaseva', amount: 954789, percentage: 58, claims: 200 },
  ];

 
  // Get data based on selected time period


const allData = allTimeData;
const ntrData = allTimeData.filter((d) => d.name === 'NTR Vaidyaseva');
const privateData = allTimeData.filter((d) =>
  ['ICICI Lombard', 'Star Health', 'HDFC ERGO', 'Bajaj Allianz'].includes(d.name)
);

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


  const handleTimeChange = (value: string) => {
    setSelectedInsurance(value);
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
                value={selectedInsurance}
                options={insuranceOptions}
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