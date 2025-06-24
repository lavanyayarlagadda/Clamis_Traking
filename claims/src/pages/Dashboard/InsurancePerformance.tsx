import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  useTheme,
  Tooltip
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Dropdown from '../../Components/reusable/Dropdown';

const InsurancePerformance: React.FC = () => {
  const theme = useTheme()
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

  // Truncate and tooltip map
  const truncatedLabels = data.map((item) => ({
    full: item.name,
    short: item.name.length > 10 ? item.name.slice(0, 10) + '…' : item.name
  }));

  return (
    <Card
      elevation={3}
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}>
              Insurance Company Performance
            </Typography>
            <Box sx={{ minWidth: 180 }}>
              <Dropdown
                value={selectedInsurance}
                options={insuranceOptions}
                onChange={handleTimeChange}
              />
            </Box>
          </Stack>
        }
        sx={{ px: 3, pt: 3, pb: 0 }}
      />
  
      <CardContent sx={{ px: 3, pt: 1, pb: 3 }}>
        <Box height={300}>
          <LineChart
            height={300}
            xAxis={[
              {
                id: 'company',
                data: truncatedLabels.map(label => label.short),
                scaleType: 'point',
                label: 'Insurance Company',
                valueFormatter: (value) =>
                  value.length > 12
                    ? `${value.slice(0, 10)}…` // truncating the label
                    : value,

              },
            ]}
            series={[
              {
                id: 'amount',
                data: data.map(d => d.amount),
                label: 'Settlement Amount',
                color: '#3b82f6',
              },
              {
                id: 'claims',
                data: data.map(d => d.claims),
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
                fill: '#4b5563',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: 60,
                 cursor: 'default',
              },
              '.MuiChartsLegend-series text': {
                fontSize: 13,
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

export default InsurancePerformance;