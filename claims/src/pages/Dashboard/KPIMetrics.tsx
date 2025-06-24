import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Tooltip,
} from '@mui/material';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment'; // For Total Claims
import DoneAllIcon from '@mui/icons-material/DoneAll';       // For Claims Settled
import PaidIcon from '@mui/icons-material/Paid';             // For Settled Amount
import PercentIcon from '@mui/icons-material/Percent';       // For Settlement Rate
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; // For Reconciliation Rate


interface Metric {
  title: string;
  value: string;
  icon: React.ReactElement;
  trend: string;
  trendUp: boolean;
  color: string;
}

const KPIMetrics: React.FC = () => {
  const metrics: Metric[] = [
    {
      title: 'Total Claims',
      value: '5,039',
      icon: <AssignmentIcon />,
      trend: '+12.5%',
      trendUp: true,
      color: 'blue',
    },
    {
      title: 'Claims Settled',
      value: '4,100',
      icon: <DoneAllIcon  />,
      trend: '+8.3%',
      trendUp: true,
      color: 'green',
    },
    {
      title: 'Settled Amount',
      value: '₹1.64Cr',
      icon: <PaidIcon  />,
      trend: '+15.2%',
      trendUp: true,
      color: 'purple',
    },
    {
      title: 'Settlement Rate',
      value: '92.3%',
      icon: <PercentIcon  />,
      trend: '+2.1%',
      trendUp: true,
      color: 'teal',
    },
    {
      title: 'Reconciliation Rate',
      value: '87.6%',
      icon: <CompareArrowsIcon  />,
      trend: '-1.2%',
      trendUp: false,
      color: 'orange',
    },
    {
      title: 'Avg. Reconciliation Time',
      value: '4.8 days',
      icon: <AccessTimeIcon />,
      trend: '-0.5 days',
      trendUp: true,
      color: 'red',
    },
  ];

  const getColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: '#e3f2fd',
      green: '#e8f5e9',
      purple: '#f3e5f5',
      teal: '#e0f2f1',
      orange: '#fff3e0',
      red: '#ffebee',
    };
    return colorMap[color] || '#e3f2fd';
  };

  const getIconColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: '#1976d2',
      green: '#388e3c',
      purple: '#7b1fa2',
      teal: '#00897b',
      orange: '#f57c00',
      red: '#d32f2f',
    };
    return colorMap[color] || '#1976d2';
  };

  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={index}>
          <Card elevation={1}
            sx={{
              bgcolor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)',
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Avatar sx={{ bgcolor: getColor(metric.color), color: getIconColor(metric.color), width: 40, height: 40 }}>
                  {metric.icon}
                </Avatar>
                <Box display="flex" alignItems="center" gap={0.5} color={metric.trendUp ? 'green' : 'red'} fontWeight="medium">
                  {metric.trendUp ? (
                    <TrendingUpIcon fontSize="small" />
                  ) : (
                    <TrendingDownIcon fontSize="small" />
                  )}
                  <Typography variant="body2">{metric.trend}</Typography>
                </Box>
              </Box>

              <Box mt={3}>
                <Typography variant="h5" fontWeight="bold">
                  {metric.value}
                </Typography>
                <Tooltip title={metric.title}>
                  <Typography variant="body2" color="text.secondary"
                   sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {metric.title}
                  </Typography>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPIMetrics;
