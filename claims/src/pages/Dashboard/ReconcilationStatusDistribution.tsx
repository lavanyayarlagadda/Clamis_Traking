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
import Dropdown from '../../components/reusable/Dropdown';

interface StatusData {
  name: string;
  value: number; // percentage
  amount: number;
  color: string;
}

const ReconciliationStatusDistribution: React.FC = () => {
  // Dropdown options and state
  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

  // Sample data for different insurance types
  const allData: StatusData[] = [
    { name: 'Fully Reconciled', value: 72, amount: 2867890, color: '#22c55e' },
    { name: 'Pending Reconciled', value: 15, amount: 598234, color: '#eab308' },
    { name: 'Unreconciled', value: 8, amount: 323456, color: '#ef4444' },
    { name: 'Others', value: 5, amount: 156789, color: '#a855f7' }
  ];

  const ntrData: StatusData[] = [
    { name: 'Fully Reconciled', value: 68, amount: 1867890, color: '#22c55e' },
    { name: 'Pending Reconciled', value: 18, amount: 498234, color: '#eab308' },
    { name: 'Unreconciled', value: 10, amount: 273456, color: '#ef4444' },
    { name: 'Others', value: 4, amount: 106789, color: '#a855f7' }
  ];

  const privateData: StatusData[] = [
    { name: 'Fully Reconciled', value: 75, amount: 1000000, color: '#22c55e' },
    { name: 'Pending Reconciled', value: 12, amount: 100000, color: '#eab308' },
    { name: 'Unreconciled', value: 5, amount: 50000, color: '#ef4444' },
    { name: 'Others', value: 8, amount: 50000, color: '#a855f7' }
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

  const formatCurrency = (value: number): string => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  const handleInsuranceChange = (value: string) => {
    setSelectedInsurance(value);
  };

  return (
    <Card
      elevation={3}
      sx={{
        bgcolor: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardHeader
        title={
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h6" fontWeight={500} color="text.primary">
              Reconciliation Status Distribution
            </Typography>
            <Box sx={{ width: '40%' }}>
              <Dropdown
                value={selectedInsurance}
                options={insuranceOptions}
                onChange={handleInsuranceChange}
              />
            </Box>
          </Stack>
        }
        sx={{ px: 3, pt: 3, pb: 0 }}
      />
      <CardContent sx={{ px: 3, pt: 2, pb: 3 }}>
        {data.map((item, index) => (
          <Box key={index} mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" fontWeight={500} color="text.secondary">
                {item.name}
              </Typography>
              <Box textAlign="right">
                <Typography variant="body2" fontWeight={600} color="text.primary">
                  {item.value}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatCurrency(item.amount)}
                </Typography>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={item.value}
              sx={{
                height: 10,
                borderRadius: 5,
                mt: 1,
                backgroundColor: '#e5e7eb',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: item.color,
                  borderRadius: 5,
                  transition: 'width 0.5s ease-in-out',
                },
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReconciliationStatusDistribution;