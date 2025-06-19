import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Metric {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

const metrics: Metric[] = [
  {
    title: 'Total Tasks',
    count: 120,
    icon: <AssignmentIcon fontSize="large" />,
    color: '#1976d2',
  },
  {
    title: 'To Do',
    count: 35,
    icon: <HourglassEmptyIcon fontSize="large" />,
    color: '#ed6c02',
  },
  {
    title: 'In Progress',
    count: 45,
    icon: <LoopIcon fontSize="large" />,
    color: '#0288d1',
  },
  {
    title: 'Completed',
    count: 40,
    icon: <CheckCircleIcon fontSize="large" />,
    color: '#2e7d32',
  },
];

const MetricsCards: React.FC = () => {
  return (
    <Grid container spacing={2} sx={{marginBottom:"1rem"}}>
      {metrics.map((metric) => (
        <Grid  key={metric.title} sx={{ flexGrow: 1 }} size={{ xs: 12, sm: 6, md:3 }}>
          <Card
            sx={{
              backgroundColor: metric.color,
              color: 'white',
              height: '100%',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h5">{metric.title}</Typography>
                  <Typography variant="h5" fontWeight="bold">{metric.count}</Typography>
                </Box>
                <Box>{metric.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsCards;
