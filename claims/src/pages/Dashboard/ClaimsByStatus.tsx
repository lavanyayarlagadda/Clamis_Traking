import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import Dropdown from '../../components/reusable/Dropdown'

const ClaimsByStatus: React.FC = () => {
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
      elevation={1}
      sx={{
        bgcolor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="start">
            <Typography variant="h6" fontWeight="medium" color="text.primary">
              Claims by Statusss
            </Typography>
            <Box sx={{width:"40%"}}>
            <Dropdown
              // label="Insurance Type"
              value={selectedInsurance}
              options={insuranceOptions}
              onChange={handleInsuranceChange}
            />
            </Box>
          </Stack>
        }
      />
      <CardContent>
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
            height={300}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClaimsByStatus;
