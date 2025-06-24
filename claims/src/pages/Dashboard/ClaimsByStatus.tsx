import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  useTheme,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import Dropdown from '../../Components/reusable/Dropdown'

const ClaimsByStatus: React.FC = () => {
    const theme = useTheme();
  // Dropdown options
  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

 
  const allData = [
    { id: 0, label: 'Approved', value: 3245, color: '#10b981' },
    { id: 1, label: 'Settled', value: 2890, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 2234, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 656, color: '#f59e0b' },
  ];

  const ntrData = [
    { id: 0, label: 'Approved', value: 2245, color: '#10b981' },
    { id: 1, label: 'Settled', value: 1890, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 1234, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 456, color: '#f59e0b' },
  ];

  const privateData = [
    { id: 0, label: 'Approved', value: 1000, color: '#10b981' },
    { id: 1, label: 'Settled', value: 1000, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 1000, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 200, color: '#f59e0b' },
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
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

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
          <Stack direction="row" justifyContent="space-between"alignItems="center" spacing={2}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}>
              Claims by Status
            </Typography>
            <Box sx={{ minWidth: 180 }}>
            <Dropdown
              // label="Insurance Type"
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
          <PieChart
            series={[
              {
                data,
                innerRadius: 40,
                outerRadius: 80,
                arcLabel: (item) => `${((item.value / total) * 100).toFixed(1)}%`,
                arcLabelMinAngle: 10,
              },
            ]}
            slotProps={{
              legend: {
                direction: 'horizontal',
                position: { vertical: 'bottom', horizontal: 'center' },
              },
            }}
            height={250}
             sx={{
              '.MuiChartsAxis-tickLabel': {
                fontSize: 12,
                fill: '#4b5563',
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

export default ClaimsByStatus;
