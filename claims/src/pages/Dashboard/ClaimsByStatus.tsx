import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const ClaimsByStatus: React.FC = () => {
  const data = [
    { id: 0, label: 'Approved', value: 3245, color: '#10b981' },
    { id: 1, label: 'Settled', value: 2890, color: '#3b82f6' },
    { id: 2, label: 'Reconciled', value: 2234, color: '#8b5cf6' },
    { id: 3, label: 'Unreconciled', value: 656, color: '#f59e0b' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

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
            Claims by Status
          </Typography>
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
    position: { vertical: 'bottom', horizontal: 'center' }, // ✅ valid values
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
