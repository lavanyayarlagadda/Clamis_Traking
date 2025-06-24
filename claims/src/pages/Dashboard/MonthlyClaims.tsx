import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
  useTheme,
  Divider
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Dropdown from '../../components/reusable/Dropdown';

const MonthlyClaimsTrend: React.FC = () => {
  const theme = useTheme();

  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

  const allData = {
    months: ['JAN', 'FEB', 'MAR', 'APR'],
    totalClaims: [1156, 1289, 1347, 1247],
    reconciledClaims: [1000, 1100, 1000, 1000]
  };

  const ntrData = {
    months: ['JAN', 'FEB', 'MAR', 'APR'],
    totalClaims: [800, 900, 950, 850],
    reconciledClaims: [700, 800, 750, 700]
  };

  const privateData = {
    months: ['JAN', 'FEB', 'MAR', 'APR'],
    totalClaims: [356, 389, 397, 397],
    reconciledClaims: [300, 300, 250, 300]
  };

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

  const { months, totalClaims, reconciledClaims } = getData();

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
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: theme.palette.text.primary, letterSpacing: 0.3 }}>
              Monthly Claims Trend
            </Typography>
            <Box sx={{ minWidth: 180 }}>
              <Dropdown
                value={selectedInsurance}
                options={insuranceOptions}
                onChange={handleInsuranceChange}
              // label="Insurance Type"
              />
            </Box>
          </Stack>
        }
         sx={{ px: 3, pt: 3, pb: 0 }}
      />

      <CardContent
        // sx={{ pt: 1 }}
        sx={{ px: 3, pt: 1, pb: 3 }}
      >
        <Box height={300}>
          <LineChart
            xAxis={[{ id: 'months', data: months, scaleType: 'point', label: 'Month' }]}
            series={[
              {
                id: 'totalClaims',
                data: totalClaims,
                label: 'Total Claims',
                color: '#3b82f6',
              },
              {
                id: 'reconciledClaims',
                data: reconciledClaims,
                label: 'Reconciled Claims',
                color: '#10b981',
              },
            ]}
            height={300}
            margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
            grid={{ horizontal: true, vertical: true }}
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

export default MonthlyClaimsTrend;
