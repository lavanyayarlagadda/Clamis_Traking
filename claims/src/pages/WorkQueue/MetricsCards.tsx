import React from 'react';
import { Card, CardContent,  Grid, Typography, Box, Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Metric {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  iconBg: string;
}

const metrics: Metric[] = [
  {
    title: 'Total Tasks',
    count: 120,
    icon: <AssignmentIcon />,
    bgColor: '#e3f2fd', // light blue
    iconBg: '#90caf9',
  },
  {
    title: 'To Do',
    count: 35,
    icon: <HourglassEmptyIcon />,
    bgColor: '#fff3e0', // light orange
    iconBg: '#ffb74d',
  },
  {
    title: 'In Progress',
    count: 45,
    icon: <LoopIcon />,
    bgColor: '#e0f7fa', // light cyan
    iconBg: '#4dd0e1',
  },
  {
    title: 'Completed',
    count: 40,
    icon: <CheckCircleIcon />,
    bgColor: '#e8f5e9', // light green
    iconBg: '#81c784',
  },
];

const MetricsCards: React.FC = () => {
  return (
    <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
      {metrics.map((metric) => (
        <Grid key={metric.title} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              backgroundColor: metric.bgColor,
              borderRadius: 3,
              boxShadow: 1,
              height: '100%',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {metric.title}
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {metric.count}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    backgroundColor: metric.iconBg,
                    width: 40,
                    height: 40,
                  }}
                >
                  {metric.icon}
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsCards;
