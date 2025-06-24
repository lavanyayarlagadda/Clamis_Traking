import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Dropdown from '../../components/reusable/Dropdown';

const MonthlyClaimsTrend: React.FC = () => {
  // Dropdown options
  const insuranceOptions = ['All', 'NTR vaidhya seva', 'Private Insurance'];
  const [selectedInsurance, setSelectedInsurance] = React.useState<string>(insuranceOptions[0]);

  // Sample data - in a real app, this would come from an API based on selection
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

  const { months, totalClaims, reconciledClaims } = getData();

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
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h6" fontWeight="medium" color="text.primary">
              Monthly Claims Trend
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
      />
      <CardContent>
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
              '.MuiChartsAxis-tickLabel': { fontSize: 12 },
              '.MuiChartsLegend-root': { mt: 2 },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyClaimsTrend;