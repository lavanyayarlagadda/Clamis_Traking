import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  LinearProgress
} from '@mui/material';

interface StatusData {
  name: string;
  value: number; // percentage
  amount: number;
  color: string;
}

const ReconciliationStatusDistribution: React.FC = () => {
  const data: StatusData[] = [
    { name: 'Fully Reconciled', value: 72, amount: 2867890, color: '#22c55e' }, // green-500
    { name: 'Pending Reconciled', value: 15, amount: 598234, color: '#eab308' }, // yellow-500
    { name: 'Unreconciled', value: 8, amount: 323456, color: '#ef4444' }, // red-500
    { name: 'Others', value: 5, amount: 156789, color: '#a855f7' } // purple-500
  ];

  const formatCurrency = (value: number): string => {
    return `₹${(value / 100000).toFixed(1)}L`;
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
          <Typography variant="h6" fontWeight="medium" color="text.primary">
            Reconciliation Status Distribution
          </Typography>
        }
      />
      <CardContent>
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
                backgroundColor: '#e5e7eb', // gray-200
                '& .MuiLinearProgress-bar': {
                  backgroundColor: item.color,
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
